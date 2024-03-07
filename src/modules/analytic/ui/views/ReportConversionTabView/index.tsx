import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {ReportTabButtonStyle} from './style';
import {ReportConversionTabConfig} from 'modules/analytic/config';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';

interface Props {
  idActive: string;
  onPress: (activeTab: string) => void;
}

const ReportConversionTabView: FC<Props> = (props: Props) => {
  const {onPress, idActive} = props;

  return (
    <React.Fragment>
      {ReportConversionTabConfig.map(e => {
        return (
          <TouchableOpacity
            key={e.getCode()}
            style={[
              ReportTabButtonStyle.button,
              idActive === e.getCode() && ReportTabButtonStyle.active,
            ]}
            onPress={() => onPress(e.getCode())}>
            <Typography
              type="h3"
              text={e.getTitle()}
              textType={idActive === e.getCode() ? 'medium' : 'regular'}
              color={
                idActive === e.getCode()
                  ? colors.primary.o500
                  : colors.secondary.o500
              }
            />
          </TouchableOpacity>
        );
      })}
    </React.Fragment>
  );
};

export default ReportConversionTabView;
