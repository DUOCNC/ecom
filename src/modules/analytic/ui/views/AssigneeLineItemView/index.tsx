import React from 'react';
import {Image, View} from 'react-native';
import CTTypography from 'components/CTTypography';
import {Font} from 'components/Base/Text';
import {ic_account} from 'assets/images';
import {AssigneeLineItemStyled} from './style';
import {ReportAssigneeEntity} from 'modules/analytic/models/entities';
import {ThemeStyle} from 'assets/theme';

interface Props {
  assignee: ReportAssigneeEntity;
}

const AssigneeLineItem = (props: Props) => {
  const {assignee} = props;

  return (
    <View style={AssigneeLineItemStyled.rowItem} key={assignee.getCode()}>
      <View style={AssigneeLineItemStyled.avatarContainer}>
        <Image source={ic_account} style={AssigneeLineItemStyled.avatar} />
      </View>
      <View style={AssigneeLineItemStyled.viewInfo}>
        <CTTypography.Text
          level="3"
          ellipsizeMode="clip"
          text={assignee.getName()}
          font={Font.Medium}
        />
        <View style={AssigneeLineItemStyled.detail}>
          <CTTypography.Text
            level="3"
            style={AssigneeLineItemStyled.label}
            font={Font.Regular}
            ellipsizeMode="clip"
            text={
              <React.Fragment>
                Số khách mua hàng:
                <CTTypography.Text
                  text={` ${assignee.getCustomer()}`}
                  style={AssigneeLineItemStyled.value}
                />
              </React.Fragment>
            }
          />
          <CTTypography.Text
            level="3"
            style={AssigneeLineItemStyled.label}
            font={Font.Regular}
            ellipsizeMode="clip"
            text={
              <React.Fragment>
                Số khách đã tiếp:
                <CTTypography.Text
                  text={` ${assignee.getCustomersReceived()}`}
                  style={AssigneeLineItemStyled.value}
                />
              </React.Fragment>
            }
          />
          <View
            style={[ThemeStyle.separator, AssigneeLineItemStyled.separator]}
          />
        </View>
      </View>
    </View>
  );
};

export default AssigneeLineItem;
