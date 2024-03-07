import {ic_tick_double} from 'assets/images';
import {StringUtils} from 'common';
import {Typography} from 'common-ui';
import React, {useMemo} from 'react';
import {Dimensions, Image, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import style from './style';

interface Props {
  title: string;
  value?: string | null;
}

const defaultWidth = Dimensions.get('screen').width - 48;

const VariantRowInfoView: React.FC<Props> = ({title, value}) => {
  const enrichValue = useMemo(() => {
    if (value === undefined || value === null) {
      return StringUtils.format('<p>{0}</p>', 'Không có thông tin');
    }
    return value;
  }, [value]);
  const content = useMemo(
    () => (
      <RenderHTML
        contentWidth={defaultWidth}
        source={{html: enrichValue}}
        tagsStyles={{
          p: style.pStyle,
          body: style.body,
        }}
      />
    ),
    [enrichValue],
  );
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image source={ic_tick_double} />
        <Typography
          type="h4"
          style={style.txtTitle}
          textType="medium"
          text={title}
        />
      </View>
      <View style={style.content}>{content}</View>
    </View>
  );
};

export default VariantRowInfoView;
