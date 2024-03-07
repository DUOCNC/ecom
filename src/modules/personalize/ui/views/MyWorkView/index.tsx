import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {Typography} from 'common-ui';
import {MyWorkEntity} from 'modules/personalize/models';
import {homeService} from 'modules/personalize/services';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import MyActionStyle from './style';
import {useAuth} from 'providers/contexts/AuthContext';
import {useConfig} from 'hook';
import {MyWorkConfigType} from 'modules/personalize/enums/MyWorkConfigType';

type Props = {
  onNavigate: (link: string) => void;
  onOpenModalStoreDefault: (link: string) => void;
  hideFeature: boolean;
  onBlockContract?: (link: string) => void;
};

const MyWorkComponent: React.FC<Props> = ({
  onNavigate,
  onOpenModalStoreDefault,
  hideFeature,
  onBlockContract,
}) => {
  const {locationSelected} = useAuth();
  const [works, setWorks] = useState<Array<MyWorkEntity>>([]);
  const config = useConfig();

  const onItemPress = useCallback(
    (item: MyWorkEntity) => {
      if (item.isCheckContract()) {
        onBlockContract && onBlockContract(item.getLink());
        return;
      }
      if (item.isCheckStoreDefault() && locationSelected.locationId === -1) {
        onOpenModalStoreDefault(item.getLink());
        return;
      }
      onNavigate(item.getLink());
    },
    [
      locationSelected.locationId,
      onBlockContract,
      onNavigate,
      onOpenModalStoreDefault,
    ],
  );
  useEffect(() => {
    let getWork = homeService.getWorks(hideFeature);
    setWorks(getWork);
  }, [config.storeUseFeedback, hideFeature, locationSelected]);

  return (
    <View style={MyActionStyle.container}>
      <View style={MyActionStyle.header}>
        <Typography
          color={colors.primary.o500}
          textType="medium"
          type="h3"
          text="Lối tắt"
        />
      </View>
      <View style={MyActionStyle.subTitle}>
        <Typography text="Chung" type="h5" />
      </View>
      <View style={MyActionStyle.menu}>
        {works
          .filter(item => item.getType() === MyWorkConfigType.General)
          .map(item => (
            <TouchableOpacity
              key={item.getId()}
              onPress={() => onItemPress(item)}
              style={[MyActionStyle.btn]}>
              <Image source={item.getIcon()} />
              <Typography
                style={MyActionStyle.txtName}
                color={colors.secondary.o500}
                type="h5"
                textAlign="center"
                text={StringUtils.breakWithPositionWhiteSpace(
                  item.getName(),
                  2,
                )}
              />
            </TouchableOpacity>
          ))}
      </View>

      <View style={MyActionStyle.subTitle}>
        <Typography text="Bán hàng" type="h5" />
      </View>
      <View style={MyActionStyle.menu}>
        {works
          .filter(item => item.getType() === MyWorkConfigType.Retail)
          .map(item => (
            <TouchableOpacity
              key={item.getId()}
              onPress={() => onItemPress(item)}
              style={[MyActionStyle.btn]}>
              <Image source={item.getIcon()} />
              <Typography
                style={MyActionStyle.txtName}
                color={colors.secondary.o500}
                type="h5"
                textAlign="center"
                text={StringUtils.breakWithPositionWhiteSpace(
                  item.getName(),
                  2,
                )}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default MyWorkComponent;
