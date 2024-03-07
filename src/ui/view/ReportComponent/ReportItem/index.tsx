import {Colors} from 'assets/colors';
import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text/enums';
import CTTypography from 'components/CTTypography';
import {ReportItemViewer} from 'model/viewer/ReportViewer';
import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {ReportItemStyle} from './style';

const ReportItem: FC<ReportItemViewer> = (item: ReportItemViewer) => {
  return (
    <>
      <View style={[ReportItemStyle.item]} key={item.id}>
        <Image style={ReportItemStyle.icon} source={item.icon} />
        <View style={ReportItemStyle.rowText}>
          <CTTypography.Text
            text={`${item.title}`}
            level="2"
            style={{color: Colors.Text}}
            numberOfLines={2}
            ellipsizeMode="tail"
            font={Font.Medium}
          />
          <CTTypography.Text
            style={[ThemeStyle.subText, ReportItemStyle.subText]}
            text={`${item.subTitle}`}
            numberOfLines={2}
            ellipsizeMode="tail"
          />
        </View>
      </View>
    </>
  );
};

export default ReportItem;
