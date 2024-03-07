import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {
  DimentionUtils,
  Layout,
  Typography,
  useBottomSheetBackHandler,
} from 'common-ui';
import {Font} from 'components/Base/Text';
import {CTButton} from 'components/Button';
import {
  BehaviorEntity,
  KeyBehaviorEntity,
  KeyBehaviorRequest,
} from 'modules/feedback/models/entities/BehaviorEntity';
import {feedbackService} from 'modules/feedback/services';
import React, {
  ForwardRefRenderFunction,
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Keyboard, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BehaviorItemView from '../BehaviorItem';
import Style from './style';

export interface BehaviorProps {
  onFinish: (fbEntity: BehaviorEntity[]) => void;
  onCancel?: (fbEntity: BehaviorEntity[]) => void;
  behaviorSelected?: BehaviorEntity[];
  totalNumberPerson: number;
}

export type BehaviorNotBuyPopupRef = {
  open: () => void;
  close: () => void;
  keyBehaviorEntity: KeyBehaviorEntity;
};

export type BehaviorNotBuyComponent = ForwardRefRenderFunction<
  BehaviorNotBuyPopupRef,
  BehaviorProps
>;

const ID_NO_CONSULTING = 8;

const BehaviorPopupNotBuyView: BehaviorNotBuyComponent = (
  {onFinish, onCancel, behaviorSelected, totalNumberPerson},
  ref,
) => {
  const [keyBehaviorEntity, setKeyBehaviorEntity] = useState<KeyBehaviorEntity>(
    new KeyBehaviorEntity([]),
  );
  const [data, setData] = useState<BehaviorEntity[]>([]);

  const modalRef = createRef<BottomSheetModal>();

  const onOpen = () => {
    modalRef.current?.present();
  };
  const onClose = () => {
    modalRef.current?.dismiss();
  };

  const {handleSheetPositionChange} = useBottomSheetBackHandler(modalRef);

  const onCheckedChange = (answer: BehaviorEntity) => {
    let newQuestion: KeyBehaviorEntity | undefined;
    const selected =
      keyBehaviorEntity
        ?.getKeyBehaviors()
        .findIndex(e => e.key_behavior_id === answer.getId()) === -1;
    keyBehaviorEntity.removeKeyBehaviors(ID_NO_CONSULTING);
    if (selected) {
      newQuestion = keyBehaviorEntity.addKeyBehavior({
        key_behavior_id: answer.getId(),
        quantity: 1,
      });
    } else {
      newQuestion = keyBehaviorEntity?.removeKeyBehaviors(answer.getId());
    }
    setKeyBehaviorEntity(newQuestion);
  };

  const handleSuccess = (data: BehaviorEntity[]) => {
    setData(data);
  };

  const handleSetValuePersonByKeyBehaviorId = (
    data: KeyBehaviorRequest,
    value: number,
  ) => {
    keyBehaviorEntity.setNumberByKeyBehavior(data, value);
    setKeyBehaviorEntity(KeyBehaviorEntity.clone(keyBehaviorEntity));
  };

  useEffect(() => {
    feedbackService.getListBehaviors(handleSuccess);
    const keyBEhaviorSelect = new KeyBehaviorEntity(
      (behaviorSelected || []).map(item => {
        if (item?.keyBehavior?.id) {
          return {
            key_behavior_id: item?.keyBehavior?.id,
            quantity: item.quantity,
          };
        }
        return {key_behavior_id: item.getId(), quantity: item.quantity};
      }),
    );
    setKeyBehaviorEntity(keyBEhaviorSelect);
  }, [behaviorSelected]);

  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
    keyBehaviorEntity: keyBehaviorEntity,
  }));

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
      <View style={Style.container}>
        <View style={Style.header}>
          <View>
            <Typography
              text="KH đến cửa hàng thông qua nguồn nào?"
              textType="medium"
              type="h3"
            />
          </View>
        </View>
        <View style={[Style.body]}>
          <BottomSheetFlatList
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <BehaviorItemView
                onCheckedChange={onCheckedChange}
                answer={item}
                totalNumberPerson={totalNumberPerson}
                selected={
                  keyBehaviorEntity
                    ?.getKeyBehaviors()
                    .findIndex(s => s.key_behavior_id === item.getId()) !== -1
                }
                valuePerson={keyBehaviorEntity
                  ?.getKeyBehaviors()
                  ?.find(s => s.key_behavior_id === item.getId())}
                handleSetValuePersonByKeyBehaviorId={
                  handleSetValuePersonByKeyBehaviorId
                }
              />
            )}
            keyExtractor={item => item.getId().toString()}
            data={data.filter(item => item.getId() !== ID_NO_CONSULTING)}
          />
        </View>
      </View>
      <Layout.ScreenBottom style={Style.screenBottom}>
        <CTButton
          onPress={() => {
            const value = keyBehaviorEntity
              .getKeyBehaviors()
              .filter(item => item.quantity)
              .map(behavior => {
                const result = data?.find(
                  item => item.getId() === behavior.key_behavior_id,
                );
                result && result.setQuality(behavior.quantity);
                return result as BehaviorEntity;
              });
            onFinish(value || []);
          }}
          text="Hoàn tất"
          font={Font.Medium}
          style={Style.viewBottomRight}
        />
      </Layout.ScreenBottom>
      <SafeAreaView edges={['bottom']} />
    </BottomSheetModal>
  );
};

export default forwardRef(BehaviorPopupNotBuyView);
