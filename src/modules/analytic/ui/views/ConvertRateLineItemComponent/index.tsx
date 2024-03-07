import React, {createRef} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import {ic_account, ic_edit} from 'assets/images';
import {ConvertRateLineItemStyled} from './style';
import {ConvertRateEachAssigneeList} from 'modules/analytic/models/responses/AnalyticResponse';
import {Keyboard, KeyboardRef} from 'common-ui';

interface Props {
  data: ConvertRateEachAssigneeList;
}

const ConvertRateLineItem = (props: Props) => {
  const keyboardRef = createRef<KeyboardRef>();
  const {data} = props;
  const onOpenKeyBoard = () => {
    keyboardRef.current?.open();
  };
  const onConfirmValue = (state: number) => {
    keyboardRef.current?.close();
  };

  return (
    <View style={ConvertRateLineItemStyled.rowItem}>
      <View style={ConvertRateLineItemStyled.avatarContainer}>
        <Image source={ic_account} style={ConvertRateLineItemStyled.avatar} />
      </View>
      <View style={ConvertRateLineItemStyled.viewInfo}>
        <CTTypography.Text level="1" ellipsizeMode="clip" text={data.name} />
        <View style={ConvertRateLineItemStyled.accountCode}>
          <CTTypography.Text
            level="3"
            style={{color: '#667085'}}
            font={Font.Regular}
            ellipsizeMode="clip"
            text={
              <>
                Số khách mua hàng:
                <CTTypography.Text
                  text={` ${data.customerBuyCount}`}
                  style={ConvertRateLineItemStyled.value}
                />
              </>
            }
          />
          <CTTypography.Text
            level="3"
            style={{color: '#667085'}}
            font={Font.Regular}
            ellipsizeMode="clip"
            text={
              <>
                Tỷ lệ chuyển đổi:
                <CTTypography.Text
                  text={` ${data.convertRate ? data.convertRate : 0}%`}
                  style={ConvertRateLineItemStyled.valueRate}
                />
              </>
            }
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={onOpenKeyBoard}
        style={ConvertRateLineItemStyled.btnEdit}>
        <Image source={ic_edit} />
      </TouchableOpacity>
      <Keyboard
        onConfirm={onConfirmValue}
        title={'Tỷ lệ chuyển đổi'}
        initValue={data.convertRate}
        ref={keyboardRef}
        max={6}
      />
    </View>
  );
};

export default ConvertRateLineItem;
