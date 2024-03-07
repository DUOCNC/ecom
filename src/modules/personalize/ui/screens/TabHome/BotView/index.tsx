import {TaskEntity} from 'modules/personalize/models/entities';
import React, {useCallback, useMemo, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import MessageItemView from '../MessageItemView';
import {Typography} from 'common-ui';
import {MainStore} from 'reduxs/MainStore';
import {StringUtils} from 'common';
import {TabHomeStyle} from '../style';
import {TaskResultResponse} from 'modules/personalize/models/responses';
import {MainRouteConfig} from 'config/RouteConfig';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {saveTask} from 'reduxs/TaskReducer';
import {colors} from 'assets/v2';
import {ic_pegasus_bot_full} from 'assets/images';
import CountdownView from 'components/CountdownView';
import {QuizStep} from 'modules/personalize/enums';
import FileViewer from '../FileView';
import {style} from './style';
import taskService from 'modules/personalize/services/TaskService';
interface Props {
  taskEntity: TaskEntity | undefined;
  fullName: string | undefined;
  task: TaskResultResponse | null;
  onClose: () => void;
  backScreen?: string;
}

const BotView: React.FC<Props> = ({
  taskEntity,
  fullName,
  task,
  onClose,
  backScreen,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [delayTxt, setDelayTxt] = useState<string>('');
  const [type, setType] = useState<'study' | 'work'>('study');
  const handleLearn = () => {
    if (taskEntity) {
      taskService.logLearn(taskEntity);
    }
    MainStore.dispatch(
      saveTask({
        task: {
          step: QuizStep.learn,
          quizId: 0,
          status: 'learn',
        },
      }),
    );
  };
  const handleStartQuiz = useCallback(() => {
    if (taskEntity) {
      taskService.logQuiz(taskEntity);
    }
    navigation.navigate(MainRouteConfig.Quiz, {
      quizId: taskEntity?.getId(),
      backScreen: backScreen,
    });
  }, [backScreen, navigation, taskEntity]);

  const handleDelay = useCallback(
    (numberOfMinutes?: number, delayTxtParam?: string) => {
      if (delayTxtParam) {
        setDelayTxt(delayTxtParam);
      }
      MainStore.dispatch(
        saveTask({
          task: {
            step: QuizStep.delay,
            quizId: 0,
            status: undefined,
          },
        }),
      );
      if (taskEntity && numberOfMinutes) {
        taskService.delayTask(
          taskEntity,
          {
            numberOfMinutes,
          },
          () => {
            MainStore.dispatch(
              saveTask({
                task: {
                  step: QuizStep.accessDelay,
                  quizId: 0,
                  status: undefined,
                },
              }),
            );
          },
          () => {},
          () => {},
        );
      }
    },
    [taskEntity],
  );

  const firstMess = useMemo(() => {
    if (!task || !task.step) {
      return;
    }

    if (taskEntity?.haveTraining()) {
      const training = taskEntity.getTraining();
      return (
        <MessageItemView
          key="1"
          type="bot"
          component={
            <View>
              <Typography
                lineHeight={22}
                text={StringUtils.format(
                  'Chào {0} ^^ Bạn đang có một bài đào tạo nội bộ. Thời hạn hoàn thành là {1}. Vui lòng học nội dung đào tạo và thực hiện bài kiểm tra ngay nhé!',
                  fullName,
                  training?.getExpireTimeDis(),
                )}
              />
              {task.step === QuizStep.training ? (
                <View style={TabHomeStyle.row}>
                  {taskEntity?.isHaveDelay() && (
                    <TouchableOpacity
                      style={TabHomeStyle.botTaskWorkDelay}
                      onPress={() => {
                        setType('study');
                        handleDelay();
                      }}>
                      <Typography
                        text="Lát nữa sẽ học"
                        color={colors.primary.o900}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[
                      TabHomeStyle.botTaskWorkNow,
                      TabHomeStyle.botBtnTraining,
                    ]}
                    onPress={handleLearn}>
                    <Typography text="Học bài ngay" color={colors.base.white} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
            </View>
          }
        />
      );
    }

    return (
      <MessageItemView
        key="2"
        type="bot"
        component={
          <View>
            <Typography
              lineHeight={22}
              text={StringUtils.format(
                'Chào {0} ^^ Bạn đang có 1 bài kiểm tra cần làm . Hãy hoàn thành nó nhé!',
                fullName,
              )}
            />
            {task.step === QuizStep.waiting ? (
              <View style={TabHomeStyle.row}>
                {taskEntity?.isHaveDelay() && (
                  <TouchableOpacity
                    style={TabHomeStyle.botTaskWorkDelay}
                    onPress={() => {
                      setType('work');
                      handleDelay();
                    }}>
                    <Typography
                      text="Lát nữa sẽ làm"
                      color={colors.primary.o900}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={TabHomeStyle.botTaskWorkNow}
                  onPress={handleStartQuiz}>
                  <Typography text="Làm ngay" color={colors.base.white} />
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
          </View>
        }
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskEntity, fullName, task, navigation]);

  const startNowMess = useMemo(() => {
    if (!task || !task.step) {
      return;
    }
    if (
      taskEntity &&
      taskEntity.haveTraining() &&
      task.step >= QuizStep.learn
    ) {
      return (
        <MessageItemView
          key="4"
          type="answer"
          component={
            <View>
              <Typography text="Học bài ngay" lineHeight={22} />
            </View>
          }
        />
      );
    }
    if (task.step >= QuizStep.finish) {
      return (
        <MessageItemView
          key="3"
          type="answer"
          component={
            <View>
              <Typography text="Làm ngay" lineHeight={22} />
            </View>
          }
        />
      );
    }
  }, [task, taskEntity]);
  const delayMess = useMemo(() => {
    if (!task || !task.step) {
      return;
    }
    let component = [];

    if (task.step >= QuizStep.delay && task.step <= QuizStep.accessDelay) {
      component.push(
        <>
          <MessageItemView
            key="9"
            type="answer"
            component={
              <View>
                <Typography
                  text={`Lát nữa sẽ ${type === 'study' ? 'học' : 'làm'}`}
                  lineHeight={22}
                />
              </View>
            }
          />
          <MessageItemView
            key="11"
            type="bot"
            component={
              <View>
                <Typography
                  text={`Oke. Vậy tôi sẽ trở lại sau. Bạn muốn ${
                    type === 'study' ? 'học' : 'làm'
                  } bài sau khoảng bao nhiêu lâu nữa?`}
                  lineHeight={22}
                />
                <View style={TabHomeStyle.row}>
                  <TouchableOpacity
                    disabled={task.step === QuizStep.accessDelay}
                    style={TabHomeStyle.botTaskWorkDelay}
                    onPress={() => handleDelay(5, '5 phút')}>
                    <Typography
                      text="5 phút nữa"
                      color={
                        task.step === QuizStep.accessDelay
                          ? colors.primary.o200
                          : colors.primary.o900
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={task.step === QuizStep.accessDelay}
                    style={TabHomeStyle.botTaskWorkDelay}
                    onPress={() => handleDelay(20, '20 phút')}>
                    <Typography
                      text="20 phút nữa"
                      color={
                        task.step === QuizStep.accessDelay
                          ? colors.primary.o200
                          : colors.primary.o900
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={TabHomeStyle.row}>
                  <TouchableOpacity
                    disabled={task.step === QuizStep.accessDelay}
                    style={TabHomeStyle.botTaskWorkDelay}
                    onPress={() => handleDelay(60, '1 tiếng')}>
                    <Typography
                      text="1 tiếng nữa"
                      color={
                        task.step === QuizStep.accessDelay
                          ? colors.primary.o200
                          : colors.primary.o900
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={task.step === QuizStep.accessDelay}
                    style={TabHomeStyle.botTaskWorkDelay}
                    onPress={() => handleDelay(240, '4 tiếng')}>
                    <Typography
                      text="4 tiếng nữa"
                      color={
                        task.step === QuizStep.accessDelay
                          ? colors.primary.o200
                          : colors.primary.o900
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            }
          />
        </>,
      );
    }
    if (task.step === QuizStep.accessDelay) {
      component.push(
        <>
          <MessageItemView
            key="9"
            type="answer"
            component={
              <View>
                <Typography text={delayTxt} lineHeight={22} />
              </View>
            }
          />
          <MessageItemView
            key="11"
            type="bot"
            component={
              <View>
                <Typography
                  text={`Cảm ơn bạn. Tôi sẽ nhắc lại sau ${delayTxt} nữa`}
                  lineHeight={22}
                />
                <TouchableOpacity
                  style={TabHomeStyle.backMain}
                  onPress={() => {
                    onClose();
                    MainStore.dispatch(
                      saveTask({
                        task: null,
                      }),
                    );
                  }}>
                  <Typography
                    text="Trở lại màn hình chính"
                    color={colors.primary.o900}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        </>,
      );
    }
    if (task.step) {
      return component;
    }
  }, [delayTxt, handleDelay, onClose, task]);

  const testResultMess = useMemo(() => {
    if (!task || !task.step) {
      return;
    }
    let component = [];
    if (taskEntity && taskEntity?.getTraining()) {
      const training = taskEntity.getTraining();
      if (!training) {
        return;
      }
      if (task.step >= QuizStep.learn) {
        component.push(
          <View key="0001">
            <MessageItemView
              key="5"
              type="bot"
              component={
                <Typography
                  text="Tuyệt vời! Tôi gửi bạn nội dung bài học nhé."
                  lineHeight={22}
                />
              }
            />
            <MessageItemView
              key="20"
              type="bot"
              component={
                <View style={TabHomeStyle.row}>
                  <Typography text="Thời gian học " lineHeight={22} />
                  <CountdownView
                    m={training.getMinimumStudyTime()} //TODO thay bằng thời gian đào tạo tối thiểu
                    onFinish={() => {
                      MainStore.dispatch(
                        saveTask({
                          task: {
                            step: QuizStep.quiz,
                            quizId: 0,
                            status: 'quiz',
                          },
                        }),
                      );
                    }}
                  />
                </View>
              }
            />
            {training && (
              <MessageItemView
                type="bot"
                component={
                  <FileViewer
                    fileType={training.getMimetype()}
                    fileUrl={training.getContent()}
                    isBotView={true}
                    onPress={() => {
                      navigation.navigate(MainRouteConfig.File, {
                        fileType: training.getMimetype(),
                        fileUrl: training.getContent(),
                      });
                    }}
                  />
                }
              />
            )}
          </View>,
        );
      }
      if (task.step >= QuizStep.quiz) {
        component.push(
          <View key="0002">
            <MessageItemView
              key="6"
              type="bot"
              component={
                <View>
                  <Typography
                    text="Bạn đã đọc hiểu nội dung bài học rồi chứ?
                    Hãy làm bài kiểm tra nha."
                    lineHeight={22}
                  />
                  {task.step === QuizStep.quiz && (
                    <TouchableOpacity
                      style={TabHomeStyle.botTaskWorkNow1}
                      onPress={handleStartQuiz}>
                      <Typography text="Làm ngay" color={colors.base.white} />
                    </TouchableOpacity>
                  )}
                </View>
              }
            />
          </View>,
        );
      }
    }
    if (task.step >= QuizStep.finish && task.status === 'wrong') {
      component.push(
        <View key="0003">
          <MessageItemView
            key="7"
            type="bot"
            component={
              <View>
                <Typography
                  text={StringUtils.format('Kết quả: {0}', task.ratio)}
                  lineHeight={22}
                />
              </View>
            }
          />
          <MessageItemView
            key="8"
            type="bot"
            component={
              <View>
                <Typography
                  lineHeight={22}
                  text={StringUtils.format(
                    'Bạn chưa đạt đủ điểm mất rồi T.T Hãy làm lại bài kiểm tra nhé. Số lần được làm còn lại: {0}',
                    task.remainingTimes,
                  )}
                />
                {task.remainingTimes === 0 ? (
                  <TouchableOpacity
                    style={TabHomeStyle.botClose}
                    onPress={onClose}>
                    <Typography text="Đóng" color={colors.base.white} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={TabHomeStyle.botClose}
                    onPress={handleStartQuiz}>
                    <Typography text="Làm lại" color={colors.base.white} />
                  </TouchableOpacity>
                )}
              </View>
            }
          />
        </View>,
      );
    }
    if (task.step >= QuizStep.finish && task.status === 'completed') {
      component.push(
        <View key="0004">
          <MessageItemView
            key="9"
            type="bot"
            component={
              <View>
                <Typography
                  text={StringUtils.format('Kết quả: {0}', task.ratio)}
                  lineHeight={22}
                />
              </View>
            }
          />
          <MessageItemView
            key="10"
            type="bot"
            component={<Image source={ic_pegasus_bot_full} />}
          />
          <MessageItemView
            key="11"
            type="bot"
            component={
              <View>
                <Typography
                  lineHeight={22}
                  text={StringUtils.format(
                    'Chúc mừng {0} đã hoàn thành bài kiểm tra nha. Chúc bạn ca làm việc vui vẻ',
                    fullName,
                  )}
                />
                <TouchableOpacity
                  style={TabHomeStyle.botClose}
                  onPress={() => {
                    onClose();
                    MainStore.dispatch(
                      saveTask({
                        task: null,
                      }),
                    );
                  }}>
                  <Typography text="Đóng" color={colors.base.white} />
                </TouchableOpacity>
              </View>
            }
          />
        </View>,
      );
    }

    return component;
  }, [task, taskEntity, navigation, handleStartQuiz, onClose, fullName]);

  const messages = useMemo(() => {
    return (
      <View style={style.content} key="0005">
        {firstMess}
        {delayMess}
        {startNowMess}
        {testResultMess}
      </View>
    );
  }, [firstMess, startNowMess, testResultMess]);
  return <View key="0006">{messages}</View>;
};

export default BotView;
