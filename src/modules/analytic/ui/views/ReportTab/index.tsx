import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {ReportTabConfig} from 'modules/analytic/config';
import React, {FC, useMemo} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {ReportTabButtonStyle} from './style';
import RevenueTabConfig from 'modules/analytic/config/RevenueTabConfig';

interface Props {
  idActive: string;
  onPress: (activeTab: string) => void;
  isRevenue?: boolean;
}

const ReportTabButton: FC<Props> = (props: Props) => {
  const {onPress, idActive, isRevenue} = props;

  const isActiveTab = (activeTab: string) => {
    return idActive === activeTab;
  };
  const tabConfig = useMemo(() => {
    return isRevenue ? RevenueTabConfig : ReportTabConfig;
  }, [isRevenue]);
  return (
    <React.Fragment>
      {tabConfig.map(e => {
        return (
          <TouchableOpacity
            key={e.getCode()}
            style={[
              ReportTabButtonStyle.button,
              isActiveTab(e.getCode()) && ReportTabButtonStyle.active,
            ]}
            onPress={() => onPress(e.getCode())}>
            <CTTypography.Text
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

export default ReportTabButton;
