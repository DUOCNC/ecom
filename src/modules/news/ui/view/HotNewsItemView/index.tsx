import React, {useMemo} from 'react';
import {bg_empty_url, ic_placeholder_6080} from 'assets/images';
import {DimentionUtils, ImageLoader, Typography} from 'common-ui';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {NewsEntity} from 'modules/news/model/entities';
import {StringUtils} from 'common';
import RenderHTML from 'react-native-render-html';

interface HotNewsItemProps {
  data: NewsEntity;
}

const MAX_WIDTH = DimentionUtils.scale(200);
const MAX_HEIGHT = DimentionUtils.scale(140);

const HotNewsItemView: React.FC<HotNewsItemProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onItemPress = () =>
    navigation.dispatch(
      StackActions.push(MainRouteConfig.NewsDetail, {
        id: data.getId(),
      }),
    );

  const enrichValue = useMemo(() => {
    if (
      data.getShortContent() === undefined ||
      data.getShortContent() === null
    ) {
      return StringUtils.format('<p>{0}</p>', 'Không có thông tin');
    }
    const maxContentHeight = DimentionUtils.scale(82); // Maximum height for the content in pixels
    const truncateContent = (content, maxLength) => {
      if (content.length <= maxLength) {
        return content;
      }
      return content.slice(0, maxLength) + '...'; // Add ellipsis
    };

    const truncatedHtmlContent = truncateContent(
      data.getShortContent(),
      maxContentHeight,
    );
    return truncatedHtmlContent;
  }, [data]);
  const content = useMemo(
    () => <RenderHTML source={{html: enrichValue}} />,
    [enrichValue],
  );
  return (
    <TouchableOpacity onPress={onItemPress} style={style.container}>
      <View
        style={[
          {
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
          },
          style.imageView,
        ]}>
        <ImageLoader
          placeholder={ic_placeholder_6080}
          style={[
            {
              width: MAX_WIDTH,
              height: MAX_HEIGHT,
            },
            style.image,
          ]}
          source={
            data.getThumbnailUrl()
              ? {uri: data.getThumbnailUrl()}
              : bg_empty_url
          }
        />
      </View>
      <View
        style={[
          {
            width: MAX_WIDTH,
          },
          style.content,
        ]}>
        <Typography
          text={data.getCreatedAtStr()}
          color={colors.secondary.o400}
        />
        <Typography
          style={style.title}
          textType="medium"
          color={colors.secondary.o900}
          textAlign="left"
          numberOfLines={2}
          ellipsizeMode="tail"
          text={data.getTitleUpperCase()}
          lineHeight={20}
        />
        <View style={style.shortContent}>{content}</View>
      </View>
    </TouchableOpacity>
  );
};

export default HotNewsItemView;
