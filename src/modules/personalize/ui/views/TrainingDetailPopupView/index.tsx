import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Image, Keyboard, TouchableOpacity, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Typography, useBottomSheetBackHandler} from 'common-ui';
import {quizItemStyle, style} from './style';
import {TaskEntity} from 'modules/personalize/models/entities';
import {CTButtonIcon} from 'components/Button';
import {ic_close, ic_training_expire} from 'assets/images';
import QuizStatusView from '../../screens/TrainingScreen/QuizStatusView';
import colors from 'assets/v2/colors';
import {ThemeStyle} from 'assets/theme';
import FileViewer from '../../screens/TabHome/FileView';
import {MainRouteConfig} from 'config/RouteConfig';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {QuizStatus} from 'modules/personalize/enums';
import taskService from 'modules/personalize/services/TaskService';

export interface TrainingDetailProps {}

export type TrainingDetailPopupRef = {
  open: () => void;
  close: () => void;
  setTask: (store: TaskEntity) => void;
};

export type InventoryDetailStoreComponent = ForwardRefRenderFunction<
  TrainingDetailPopupRef,
  TrainingDetailProps
>;

const TrainingDetailPopupView: InventoryDetailStoreComponent = ({}, ref) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const modalRef = createRef<BottomSheetModal>();
  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };
  const [taskEntity, setTaskEntity] = useState<TaskEntity>(
    TaskEntity.createEmpty(),
  );
  const onStore = (s: TaskEntity) => {
    setTaskEntity(s);
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    setTask: onStore,
  }));
  const training = useMemo(() => {
    if (taskEntity.getTraining()) {
      return taskEntity.getTraining();
    }
    return null;
  }, [taskEntity]);

  const quizNow = (quizId: number) => {
    onClose();
    if (taskEntity) {
      taskService.logLearn(taskEntity);
      taskService.logQuiz(taskEntity);
    }
    navigation.navigate(MainRouteConfig.Quiz, {
      quizId: quizId,
      backScreen: 'Training',
    });
  };

  return (
    <BottomSheetModal
      index={0}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.4}
          pressBehavior="close"
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}
      onChange={handleSheetPositionChange}
      handleComponent={null}
      onDismiss={Keyboard.dismiss}
      snapPoints={[training ? '86%' : '40%']}
      ref={modalRef}>
      <View style={style.container}>
        <View style={style.header}>
          <CTButtonIcon
            onPress={onClose}
            style={style.icClose}
            icon={ic_close}
            iconStyle={style.iconClose}
          />
          <View>
            <Typography
              text="Chi tiết bài kiểm tra"
              textType="medium"
              type="h3"
            />
          </View>
        </View>
        <BottomSheetScrollView style={style.body}>
          <View style={[quizItemStyle.row, quizItemStyle.row1]}>
            <View style={quizItemStyle.row}>
              <Typography
                text="Hạn cuối:"
                color={colors.secondary.o500}
                type="h5"
              />
              <Typography
                text={taskEntity.getDueDateDis()}
                color={colors.secondary.o500}
                style={quizItemStyle.value}
                type="h5"
              />
            </View>
            {/* status */}
            <QuizStatusView status={taskEntity.getStatusValue()} />
          </View>
          <View style={[quizItemStyle.row, quizItemStyle.row1]}>
            <Typography
              text={taskEntity.getTitle()}
              type="h4"
              textType="medium"
              lineBreakMode="clip"
              numberOfLines={2}
              lineHeight={22}
            />
          </View>
          <View style={[quizItemStyle.row, quizItemStyle.row1]}>
            <View style={quizItemStyle.row}>
              <Typography
                text="Thời gian hoàn thành:"
                color={colors.secondary.o500}
                type="h5"
              />
              <Typography
                text={taskEntity.getTaskResultEntity()?.getFinishAt()}
                color={colors.secondary.o500}
                style={quizItemStyle.value}
                type="h5"
              />
            </View>
          </View>
          <View style={[quizItemStyle.row, quizItemStyle.row1]}>
            <View style={quizItemStyle.row}>
              <Typography
                text="Điểm:"
                color={colors.secondary.o500}
                type="h5"
              />
              <Typography
                text={taskEntity.getTaskResultEntity()?.getRatio()}
                color={colors.secondary.o500}
                style={quizItemStyle.value}
                type="h5"
              />
            </View>
          </View>
          <View style={[quizItemStyle.row, quizItemStyle.row1]}>
            <View style={quizItemStyle.row}>
              <Typography
                text="Số lần làm bài:"
                color={colors.secondary.o500}
                type="h5"
              />
              <Typography
                text={taskEntity.getNumberOfTested()}
                color={colors.secondary.o500}
                style={quizItemStyle.value}
                type="h5"
              />
            </View>
          </View>
          <View style={[quizItemStyle.row, quizItemStyle.row1]}>
            <View style={quizItemStyle.row}>
              <Typography
                text="Số câu đúng:"
                color={colors.secondary.o500}
                type="h5"
              />
              <Typography
                text={taskEntity.getNumberOfCorrectAnswers()}
                color={colors.secondary.o500}
                style={quizItemStyle.value}
                type="h5"
              />
            </View>
          </View>
          {/* Hết hạn */}
          {taskEntity.getStatusValue() === QuizStatus.Expire && (
            <View style={[quizItemStyle.extend]}>
              <View style={quizItemStyle.extendRow}>
                <Image source={ic_training_expire} />
              </View>
              <View style={quizItemStyle.extendRow}>
                <Typography
                  color={colors.secondary.o500}
                  type="h4"
                  text="Bạn đã hết thời hạn làm bài."
                />
              </View>
              <View style={quizItemStyle.extendRow}>
                <Typography
                  color={colors.secondary.o500}
                  type="h4"
                  text="Để làm bài lại vui lòng liên hệ với bộ phận Đào Tạo!"
                />
              </View>
            </View>
          )}
          {/* Hết số lần làm bài */}
          {taskEntity.overOfTimes() && (
            <View style={[quizItemStyle.extend]}>
              <View style={quizItemStyle.extendRow}>
                <Typography
                  color={colors.secondary.o500}
                  type="h4"
                  text="Bạn đã hết số lần làm bài."
                />
              </View>
              <View style={quizItemStyle.extendRow}>
                <Typography
                  color={colors.secondary.o500}
                  type="h4"
                  text="Hãy cố gắng vào bài kiểm tra tới nhé!"
                />
              </View>
            </View>
          )}
          {/* Làm bài ngay */}
          {taskEntity.doNow() && (
            <View style={[quizItemStyle.extend]}>
              <View style={quizItemStyle.extendRow}>
                <Typography
                  color={colors.secondary.o500}
                  type="h4"
                  text="Bạn đang có bài kiểm tra. Hãy thực hiện nhé!"
                />
              </View>
              <View style={quizItemStyle.extendRow}>
                <TouchableOpacity
                  style={ThemeStyle.buttonPrimary}
                  onPress={() => {
                    quizNow(taskEntity.getId());
                  }}>
                  <Typography
                    text="LÀM BÀI NGAY"
                    type="h4"
                    textType="medium"
                    color={colors.base.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {training && (
            <View>
              <View style={[style.line, ThemeStyle.separator]} />
              <View style={[quizItemStyle.row]}>
                <Typography
                  text="Nội dung bài học:"
                  color={colors.secondary.o500}
                  type="h5"
                />
              </View>
              <View style={[quizItemStyle.row, quizItemStyle.content]}>
                {training && (
                  <FileViewer
                    fileType={training.getMimetype()}
                    fileUrl={training.getContent()}
                    isBotView
                    onPress={() => {
                      onClose();
                      navigation.navigate(MainRouteConfig.File, {
                        fileType: training.getMimetype(),
                        fileUrl: training.getContent(),
                      });
                    }}
                  />
                )}
              </View>
            </View>
          )}
        </BottomSheetScrollView>
      </View>
    </BottomSheetModal>
  );
};

export default forwardRef(TrainingDetailPopupView);
