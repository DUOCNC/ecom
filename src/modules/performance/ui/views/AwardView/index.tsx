import {Typography} from 'common-ui';
import React from 'react';
import {ImageSourcePropType, View, Image, TouchableOpacity} from 'react-native';
import style from './style';
import {ic_right} from 'assets/images';
import {colors} from 'assets/v2';
import {AwardEntity} from 'modules/performance/models/entities';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/AuthenticationStack';
import {MainRouteConfig} from 'config/RouteConfig';

interface Props {
  image: ImageSourcePropType;
  data: Array<AwardEntity>;
}

const AwardView: React.FC<Props> = ({image, data}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleOnPress = () => {
    navigation.navigate(MainRouteConfig.Award);
  };
  return (
    <TouchableOpacity style={style.container} onPress={handleOnPress}>
      <Image source={image} />
      <View style={style.right}>
        <View style={style.header}>
          <Typography type="h3" text="Top thành tích" />
          <Image source={ic_right} />
        </View>
        {data.map(e => (
          <Typography
            key={e.getSubTitle()}
            color={colors.primary.o500}
            style={style.txt}
            ellipsizeMode="tail"
            numberOfLines={1}
            text={e.getTitle()}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default AwardView;
