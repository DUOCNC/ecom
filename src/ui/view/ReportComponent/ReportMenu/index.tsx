import {Colors} from 'assets/colors';
import {ic_right} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import CTTypography from 'components/CTTypography';
import {ReportMenuViewer} from 'model/viewer/ReportViewer';
import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {ReportMenuStyle} from './style';

const ReportMenu: FC<ReportMenuViewer> = (item: ReportMenuViewer) => {
  return (
    <>
      <View style={[ReportMenuStyle.item]} key={item.id}>
        <View style={ReportMenuStyle.left}>
          <View style={ReportMenuStyle.viewIcon}>
            <Image
              style={[
                ReportMenuStyle.icon,
                {tintColor: Colors.BgChart},
                !item.showFeature && {tintColor: Colors.Gray400},
              ]}
              source={item.icon}
            />
          </View>
          <View style={ReportMenuStyle.rowText}>
            <CTTypography.Text
              text={`${item.title}`}
              level="2"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={!item.showFeature && ReportMenuStyle.developing}
            />
          </View>
        </View>
        <Image
          source={ic_right}
          style={[
            ReportMenuStyle.icArrow,
            !item.showFeature && {tintColor: Colors.Gray400},
          ]}
        />
      </View>
      {!item.lastIndex && <View style={ThemeStyle.separator16} />}
    </>
  );
};

export default ReportMenu;
