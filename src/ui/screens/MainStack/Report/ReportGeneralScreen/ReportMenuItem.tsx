import {ic_right} from 'assets/images';
import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import React, {FC} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {DataMenuProps} from './ReportGeneralMenu';
import {ReportGeneralStyle} from './style';

interface IDataMenuProps {
  item: DataMenuProps;
  handleMenuItemPress: (item: DataMenuProps) => void;
  separator?: boolean;
  hideFeature?: boolean;
}

const ReportMenuItem: FC<IDataMenuProps> = ({
  item,
  handleMenuItemPress,
  separator,
  hideFeature,
}) => {
  if (hideFeature && !item.showFeature) {
    return null;
  }
  return (
    <React.Fragment key={item.id.toString()}>
      <TouchableOpacity
        onPress={() => {
          handleMenuItemPress(item);
        }}
        style={ReportGeneralStyle.itemMenu}>
        <Image
          resizeMode="contain"
          style={ReportGeneralStyle.icon}
          source={item.icon}
        />
        <CTTypography.Text
          font={Font.Regular}
          style={ReportGeneralStyle.txtMenu}
          level="2"
          text={item.name}
        />
        <Image source={ic_right} />
      </TouchableOpacity>
      {separator ? <View style={ThemeStyle.separator} /> : <></>}
    </React.Fragment>
  );
};

export default ReportMenuItem;
