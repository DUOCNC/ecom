import {Font} from 'components/Base/Text/enums';
import CTTypography from 'components/CTTypography';
import {ReportRetailMenuConfig} from 'modules/analytic/config';
import ReportRetailMenuEntity from 'modules/analytic/models/entities/ReportRetailMenuEntity';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import ReportMenu from 'ui/view/ReportComponent/ReportMenu';
import {ReportRetailMenuStyle} from './style';
type Props = {
  onPress: (screen: string) => void;
  hideFeature?: boolean;
};

const ReportRetailMenu: FC<Props> = (props: Props) => {
  const {onPress, hideFeature} = props;
  return (
    <View style={ReportRetailMenuStyle.container}>
      <View style={ReportRetailMenuStyle.rowTitle}>
        <CTTypography.Text
          text="CHI TIẾT BÁO CÁO"
          level="2"
          font={Font.Medium}
        />
      </View>
      {ReportRetailMenuConfig.map(
        (e: ReportRetailMenuEntity, index: number) => {
          if (hideFeature && !e.getShowFeature()) {
            return false;
          }
          return (
            <TouchableOpacity
              key={e.getId()}
              disabled={!e.getShowFeature()}
              onPress={() => {
                onPress(e.getScreen());
              }}>
              <ReportMenu
                id={e.getId()}
                title={e.getTitle()}
                screen={e.getScreen()}
                icon={e.getIcon()}
                showFeature={e.getShowFeature()}
                lastIndex={index + 1 === ReportRetailMenuConfig.length}
              />
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default ReportRetailMenu;
