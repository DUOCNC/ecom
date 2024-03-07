import {ic_down_full} from 'assets/images';
import {colors} from 'assets/v2';
import {Typography} from 'common-ui';
import {StoreActiveEntity} from 'modules/personalize/models';
import {homeService} from 'modules/personalize/services';
import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {useAuth} from 'providers/contexts/AuthContext';
interface Props {
  onPressPickStore: () => void;
}

const HeaderHomeView: React.FC<Props> = ({onPressPickStore}) => {
  const {locationSelected} = useAuth();
  const [storeActive, setStoreActive] = useState<StoreActiveEntity>();
  useEffect(() => {
    let res = homeService.getStoreActiveEntity(locationSelected);
    setStoreActive(res);
  }, [locationSelected]);
  return (
    <View style={style.header}>
      <View style={style.headerStore}>
        <Image style={style.iconStore} source={storeActive?.getIcon()} />
      </View>
      <View style={style.headerCenter}>
        <Typography text={storeActive?.getTitle()} color={colors.base.white} />
        <TouchableOpacity onPress={onPressPickStore} style={style.btnStore}>
          <Typography
            type="h3"
            style={style.textStore}
            textType="medium"
            text={storeActive?.getName()}
            ellipsizeMode="clip"
            color={colors.base.white}
          />
          <Image style={style.icDown} source={ic_down_full} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderHomeView;
