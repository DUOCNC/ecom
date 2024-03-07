import React from 'react';
import {DimentionUtils, ImageLoader, Typography} from 'common-ui';
import {Dimensions, TouchableOpacity, View} from 'react-native';
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
import {bg_empty_url} from 'assets/images';
import TagNewView from '../TagNewView';

interface HotNewsItemProps {
  data: NewsEntity;
}
const MAX_WIDTH = Dimensions.get('screen').width - 200;
const NewsItemView: React.FC<HotNewsItemProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onItemPress = () =>
    navigation.dispatch(
      StackActions.push(MainRouteConfig.NewsDetail, {
        id: data.getId(),
      }),
    );
  return (
    <TouchableOpacity onPress={onItemPress} style={style.container}>
      <View style={[style.content]}>
        <ImageLoader
          style={[style.image]}
          source={
            data.getThumbnailUrl()
              ? {uri: data.getThumbnailUrl()}
              : bg_empty_url
          }
        />
        <View
          style={{
            width: MAX_WIDTH,
            paddingTop: DimentionUtils.scale(10),
          }}>
          <View style={[style.row1]}>
            <Typography
              text={data.getCreatedAtStr()}
              color={colors.secondary.o400}
              type="h5"
            />
            {data.isTagNew() && <TagNewView />}
          </View>
          <Typography
            style={style.title}
            textType="medium"
            color={colors.secondary.o900}
            textAlign="left"
            numberOfLines={2}
            ellipsizeMode="tail"
            text={data.getTitle()}
            lineHeight={20}
            type="h3"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsItemView;
