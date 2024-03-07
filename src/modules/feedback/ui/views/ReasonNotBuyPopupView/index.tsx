import React, {
  createRef,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Keyboard, View} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {
  DimentionUtils,
  Layout,
  Typography,
  useBottomSheetBackHandler,
} from 'common-ui';
import Style from './style';
import ReasonItemView from '../ReasonItemView';
import {
  AnswerEntity,
  FeedbackEntity,
  QuestionEntity,
} from 'modules/feedback/models/entities';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CTButton} from 'components/Button';
import {Font} from 'components/Base/Text';
import {FeedbackQuestion} from 'modules/feedback/enums';

export interface ReasonNotBuyProps {
  onFinish: (fbEntity: FeedbackEntity) => void;
}

export type ReasonNotBuyPopupRef = {
  open: () => void;
  close: () => void;
  setFeedback: (store: FeedbackEntity) => void;
  setFeedbackForm: (store: FeedbackEntity) => void;
};

export type ReasonNotBuyComponent = ForwardRefRenderFunction<
  ReasonNotBuyPopupRef,
  ReasonNotBuyProps
>;

const ReasonNotBuyPopupView: ReasonNotBuyComponent = ({onFinish}, ref) => {
  const [feedbackEntity, setFeedbackEntity] = useState<FeedbackEntity>(
    FeedbackEntity.createEmpty(),
  );
  const [feedbackFormEntity, setFeedbackFormEntity] = useState<FeedbackEntity>(
    FeedbackEntity.createEmpty(),
  );
  const modalRef = createRef<BottomSheetModal>();

  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };

  const onFeedbackChange = (s: FeedbackEntity) => {
    setFeedbackEntity(s);
  };
  const onFeedbackFormChange = (s: FeedbackEntity) => {
    setFeedbackFormEntity(s);
  };
  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);
  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    setFeedback: onFeedbackChange,
    setFeedbackForm: onFeedbackFormChange,
  }));

  const data = useMemo(() => {
    if (!feedbackFormEntity) {
      return [];
    }
    return feedbackFormEntity.getAnswerReasons();
  }, [feedbackFormEntity]);

  const onCheckedChange = (answer: AnswerEntity) => {
    const question = feedbackEntity.getQuestionById(FeedbackQuestion.REASON);
    if (question) {
      let newQuestion: QuestionEntity;
      const selected =
        question
          .getAnswers()
          .findIndex(e => e.getAnswerId() === answer.getAnswerId()) === -1;
      if (selected) {
        newQuestion = question.addAnswer(answer, question);
      } else {
        newQuestion = question.removeAnswer(answer, question);
      }
      const newFeedbackEntity = feedbackEntity.updateAnswerReasons(
        feedbackEntity,
        newQuestion.getAnswers(),
      );
      setFeedbackEntity(newFeedbackEntity);
    }
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
      snapPoints={[DimentionUtils.scale(450)]}
      ref={modalRef}>
      {feedbackEntity && (
        <View style={Style.container}>
          <View style={Style.header}>
            <View>
              <Typography
                text="Lý do khách hàng không mua hàng?"
                textType="medium"
                type="h3"
              />
            </View>
          </View>
          <View style={[Style.body]}>
            <BottomSheetFlatList
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => (
                <ReasonItemView
                  onCheckedChange={onCheckedChange}
                  answer={item}
                  selected={
                    feedbackEntity
                      .getAnswerReasons()
                      .findIndex(
                        s => s.getAnswerId() === item.getAnswerId(),
                      ) !== -1
                  }
                />
              )}
              keyExtractor={item => item.getAnswerId().toString()}
              data={data}
            />
          </View>
        </View>
      )}
      <Layout.ScreenBottom>
        <View style={Style.viewBottom}>
          <CTButton
            onPress={() => {
              onFinish(feedbackEntity);
            }}
            text="Chọn xong"
            font={Font.Medium}
          />
        </View>
      </Layout.ScreenBottom>
      <SafeAreaView edges={['bottom']} />
    </BottomSheetModal>
  );
};

export default forwardRef(ReasonNotBuyPopupView);
