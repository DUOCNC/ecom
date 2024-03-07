import {ic_search} from 'assets/images';
import {colors} from 'assets/v2';
import {SearchViewProps} from 'common-ui/types';
import React, {useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Typography from '../Typography';
import style from './style';

const SearchView: React.FC<SearchViewProps> = ({
  themeStyle = 'dark',
  title,
  right,
  onPress,
}) => {
  const theme = useMemo(() => {
    if (themeStyle === 'dark') {
      return style.dark;
    }
    return style.light;
  }, [themeStyle]);
  const iconStyle = useMemo(() => {
    if (themeStyle === 'dark') {
      return style.dark;
    }
    return style.light;
  }, [themeStyle]);
  const color = useMemo(() => {
    if (themeStyle === 'dark') {
      return colors.secondary.o500;
    }
    return colors.secondary.o500;
  }, [themeStyle]);
  return (
    <View>
      <View style={[style.container, theme]}>
        <TouchableOpacity onPress={onPress} style={style.btn}>
          <Image
            resizeMode="cover"
            style={[iconStyle, style.icon]}
            source={ic_search}
          />
          <Typography
            color={color}
            type="h4"
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[style.txt]}
            text={title}
          />
        </TouchableOpacity>
        {right && (
          <View style={style.rightView}>
            <View style={style.rule} />
            {right}
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchView;
