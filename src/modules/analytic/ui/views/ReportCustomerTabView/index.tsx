import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {ReportCustomerTabConfig} from 'modules/analytic/config';
import {ReportCustomerTab} from 'modules/analytic/enums/ReportConfig';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {ReportTabButtonStyle} from './style';

interface Props {
  idActive: string;
  onPress: (activeTab: ReportCustomerTab) => void;
}

const ReportCustomerTabView: FC<Props> = (props: Props) => {
  const {onPress, idActive} = props;

  const isActiveTab = (activeTab: string) => {
    return idActive === activeTab;
  };
  return (
    <React.Fragment>
      {ReportCustomerTabConfig.map(e => {
        return (
          <TouchableOpacity
            key={e.getCode()}
            style={[
              ReportTabButtonStyle.button,
              isActiveTab(e.getCode()) && ReportTabButtonStyle.active,
            ]}
            onPress={() => onPress(e.getCode())}>
            <CTTypography.Text
              level="2"
              text={e.getTitle()}
              font={isActiveTab(e.getCode()) ? Font.Medium : Font.Regular}
              style={[
                ReportTabButtonStyle.text,
                isActiveTab(e.getCode()) && ReportTabButtonStyle.textActive,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </React.Fragment>
  );
};

export default ReportCustomerTabView;
