import {
  ActivityIndicator,
  Linking,
  PanResponder,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {ErrorType, Layout, TextInput, Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {MainRouteConfig} from 'config/RouteConfig';
import {MainStore} from 'reduxs/MainStore';
import {saveTask} from 'reduxs/TaskReducer';
import taskService from 'modules/personalize/services/TaskService';
import {TaskEntity} from 'modules/personalize/models/entities';
import style from './style';
import CTRadio from 'components/Form/CTRadio';
import {
  MetafieldEntity,
  SubTaskEntity,
} from 'modules/personalize/models/entities/TaskEntity';
import {useDispatch} from 'react-redux';
import {hideModal, showLoading} from 'reduxs/Modals/ModalReducer';
import {showError} from 'utils/ToastUtils';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {PanGestureHandler, ScrollView} from 'react-native-gesture-handler';
import moment, {Moment} from 'moment';
import {useCountdown} from 'hook/countDown';
import UserSelectionView from './UserSelectionView';
import {Task} from 'modules/personalize/models/responses/TaskResponse';
import Hyperlink from 'react-native-hyperlink';
import {QuizStep} from 'modules/personalize/enums';

type Props = MainStackScreenProps<'Quiz'>;
const QuizScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const {quizId, backScreen} = route.params;
  const [startAt] = useState<Moment>(moment());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | false>(false);
  const [taskEntity, setTaskEntity] = useState<TaskEntity>();
  const dispatch = useDispatch();
  const [now] = useState(new Date().getTime());
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [taskResponse, setTaskResponse] = useState<Task>();

  const workingTime = () => {
    if (!taskEntity) {
      return 0;
    }
    if (!taskEntity.getWorkingTime()) {
      return 0;
    }
    return taskEntity.getWorkingTime() * 60 * 1000;
  };

  const [minutes, seconds] = useCountdown(now + workingTime());
  useEffect(() => {
    //get data
    taskService.getTaskDetailService(
      quizId,
      (res, data) => {
        setTaskResponse(res);
        setTaskEntity(data);
      },
      (err: ErrorType | false) => {
        setError(err);
      },
      () => setLoading(true),
      () => {
        setLoading(false);
        setFirstLoad(false);
      },
    );
  }, [quizId]);

  const onFinish = useCallback(() => {
    if (!taskEntity) {
      showError('Không tìm thấy câu trả lời');
      return;
    }
    taskService.updateTaskService(
      startAt,
      taskEntity,
      res => {
        MainStore.dispatch(
          saveTask({
            task: {...res.getResponse(quizId), step: QuizStep.finish},
            taskEntity: taskEntity,
          }),
        );
        navigation.navigate(MainRouteConfig.Main);
      },
      err => {
        showError(err);
        dispatch(hideModal());
      },
      () => {
        dispatch(showLoading());
      },
      () => {
        dispatch(hideModal());
      },
    );
  }, [dispatch, navigation, quizId, startAt, taskEntity]);

  const handleSelectAnswer = useCallback(
    (subTaskId: number, key: string, value?: string) => {
      if (!taskEntity) {
        return;
      }
      // Thực hiện xử lý khi người dùng chọn câu trả lời
      const newTask = taskEntity?.chooseAnswer(
        taskEntity,
        subTaskId,
        key,
        value,
      );
      if (!newTask || !taskResponse || !newTask.getSubTasks()) {
        return;
      }
      const task = TaskEntity.clone(taskResponse, newTask.getSubTasks());
      setTaskEntity(task);
    },
    [taskEntity, taskResponse],
  );

  let count = useRef(0);

  count.current += 1;
  console.log('count', count);

  console.log('taskEntity', taskEntity?.getTemplate()?.getTitle());

  const renderMetafields = useCallback(
    (
      subTaskId: number,
      metafields: Array<MetafieldEntity>,
      isEnterAnswer: boolean,
    ) => {
      if (isEnterAnswer) {
        const metafield = metafields.find(e => e.getKey() === 'optionE');
        return (
          <TextInput
            onChangeText={value =>
              handleSelectAnswer(subTaskId, 'optionE', value)
            }
            value={metafield?.getValue() ?? ''}
            placeholder="Nhập câu trả lời"
            placeholderTextColor={colors.secondary.o400}
          />
        );
      }
      return metafields.map(metafield => (
        <TouchableOpacity
          key={metafield.getKey()}
          onPress={() => handleSelectAnswer(subTaskId, metafield.getKey())}>
          <View style={style.optionItem}>
            <CTRadio selected={metafield.getSelected()} />
            <Typography
              text={metafield.getValue()}
              style={style.optionContent}
            />
          </View>
        </TouchableOpacity>
      ));
    },
    [handleSelectAnswer],
  );

  const renderItem = useCallback(
    (question: SubTaskEntity, index: number) => {
      return (
        <View key={question.getId()} style={style.question}>
          <Hyperlink
            onPress={url => {
              Linking.openURL(url);
            }}>
            <Text style={style.titleText}>
              {question.getTitleDisplay(index)}
            </Text>
          </Hyperlink>
          <View style={style.option}>
            {question.template.getMetafieldEntities() &&
              renderMetafields(
                question.getId(),
                question.template.getMetafieldEntities(),
                question.template.isEnterAnswer(),
              )}
          </View>
        </View>
      );
    },
    [renderMetafields],
  );

  const renderQuestions = useCallback(
    (task: TaskEntity) => {
      if (task === null || !task.getSubTasks()) {
        return;
      }

      return (
        <View>
          {task
            .getSubTasks()
            .map((subTask, index) => renderItem(subTask, index))}
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderItem],
  );

  const onSwipeLeft = (event: any) => {
    const {translationX} = event.nativeEvent;
    if (translationX < 0) {
      return;
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Chặn việc di chuyển nếu người dùng vuốt trái/phải
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Xử lý sự kiện di chuyển
        // ...
      },
      // Các phương thức khác của PanResponder
      // ...
    }),
  ).current;

  const renderCountDown = useMemo(() => {
    if (loading) {
      return <ActivityIndicator size="small" />;
    }
    if (!firstLoad && minutes + seconds < 0) {
      return (
        <Typography
          style={style.pr50}
          color={colors.error.o500}
          text="Hết thời gian làm bài, Vui lòng làm lại."
        />
      );
    }
    return (
      <Typography
        type="h3"
        color={colors.primary.o500}
        text={
          minutes + seconds > 0
            ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
            : ''
        }
      />
    );
  }, [firstLoad, loading, minutes, seconds]);

  const backMain = useCallback(() => {
    MainStore.dispatch(
      saveTask({
        task: {
          step: QuizStep.waiting,
          quizId: quizId,
          status: 'waiting',
        },
        taskEntity: taskEntity,
      }),
    );
    if (backScreen) {
      navigation.navigate(MainRouteConfig.Main, {backScreen: backScreen});
      return;
    }
    navigation.navigate(MainRouteConfig.Main);
  }, [backScreen, navigation, quizId, taskEntity]);

  const renderAction = useMemo(() => {
    if (loading) {
      return <ActivityIndicator size="small" />;
    }
    if (minutes + seconds < 0) {
      return (
        <TouchableOpacity onPress={backMain}>
          <Typography
            text="Đóng"
            textType="medium"
            type="h3"
            color={colors.primary.o500}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={onFinish}>
        <Typography
          text="Nộp bài"
          textType="medium"
          type="h3"
          color={colors.primary.o500}
        />
      </TouchableOpacity>
    );
  }, [backMain, loading, minutes, onFinish, seconds]);

  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        style={style.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Layout.ScreenHeaderAction
          title="Bài kiểm tra"
          onBackPress={() => {}}
          right={renderAction}
        />
        <Layout.Container>
          <Layout.Loading loading={loading}>
            <Layout.Error error={error}>
              <PanGestureHandler onHandlerStateChange={onSwipeLeft}>
                <View
                  {...panResponder.panHandlers}
                  style={style.container}
                  onResponderMove={e => {
                    e.stopPropagation();
                  }}>
                  {taskEntity ? (
                    <React.Fragment>
                      <View style={style.title}>
                        <Typography
                          textType="medium"
                          type="h2"
                          text={taskEntity.getTemplate()?.getTitle()}
                        />
                      </View>
                      <View style={style.countdown}>
                        <Typography
                          textType="medium"
                          text="Thời gian: "
                          color={colors.secondary.o500}
                        />
                        {renderCountDown}
                      </View>
                      {taskEntity && <UserSelectionView task={taskEntity} />}
                      <View style={style.body}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                          {taskEntity && taskEntity.getSubTasks() ? (
                            renderQuestions(taskEntity)
                          ) : (
                            <View />
                          )}
                        </ScrollView>
                      </View>
                    </React.Fragment>
                  ) : (
                    <View />
                  )}
                </View>
              </PanGestureHandler>
            </Layout.Error>
            <SafeAreaView edges={['bottom']} />
          </Layout.Loading>
        </Layout.Container>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};
export default QuizScreen;
