import React from 'react';
import {Image, View} from 'react-native';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import {ic_account} from 'assets/images';
import {NotBuyLineItemStyled} from './style';
import {NotBuyEachAssigneeList} from 'modules/analytic/models/responses/AnalyticResponse';

interface Props {
  data: NotBuyEachAssigneeList;
}

const NotBuyLineItem = (props: Props) => {
  const {data} = props;
  return (
    <View style={NotBuyLineItemStyled.rowItem}>
      <View style={NotBuyLineItemStyled.avatarContainer}>
        <Image source={ic_account} style={NotBuyLineItemStyled.avatar} />
      </View>
      <View style={NotBuyLineItemStyled.viewInfo}>
        <CTTypography.Text level="1" ellipsizeMode="clip" text={data.name} />
        <View style={NotBuyLineItemStyled.accountCode}>
          <CTTypography.Text
            level="3"
            style={{color: '#667085'}}
            font={Font.Regular}
            ellipsizeMode="clip"
            text={
              <>
                Số khách không mua:
                <CTTypography.Text
                  text={` ${data.customerNotBuyCount}`}
                  style={NotBuyLineItemStyled.value}
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
                Doanh thu đánh rơi:
                <CTTypography.Text
                  text={` ${data.missedRevenue}đ`}
                  style={NotBuyLineItemStyled.redTextBold}
                />
              </>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default NotBuyLineItem;
