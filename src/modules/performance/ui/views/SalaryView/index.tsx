import {Typography} from 'common-ui';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {colors} from 'assets/v2';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
interface Props {
  enable: boolean;
}

const SalaryView: React.FC<Props> = ({enable}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const onPress = () => {
    navigation.navigate(MainRouteConfig.ExpectedSalary);
  };
  return (
    <View style={[style.container, !enable && style.disable]}>
      <Typography
        color={colors.secondary.o900}
        type="h4"
        text="Xem ngay lương dự kiến"
      />
      <TouchableOpacity
        onPress={onPress}
        disabled={!enable}
        style={style.btnSee}>
        <Typography
          color={colors.primary.o500}
          textType="medium"
          type="h5"
          text="Xem ngay"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SalaryView;
