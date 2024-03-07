import React, {useEffect, useState} from 'react';
import {ic_right} from 'assets/images';
import {OtherMenuTypeEntity, OtherMenuEntity} from 'modules/personalize/models';
import {otherService} from 'modules/personalize/services';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {OtherMenuType} from 'modules/personalize/enums';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';
import {Font} from 'components/Base/Text/enums';
import CTTypography from 'components/CTTypography';

type OtherMenuGroupType = {
  otherMenuType: OtherMenuTypeEntity;
  hideFeature: boolean;
  onItemPress: (OtherMenuEntity: OtherMenuEntity) => void;
  onSeeAllPress: (otherMenuType: OtherMenuType) => void;
};

const OtherMenuGroupView: React.FC<OtherMenuGroupType> = ({
  otherMenuType,
  hideFeature,
  onItemPress,
  onSeeAllPress,
}) => {
  const [otherMenuEntities, setOtherMenuEntities] = useState<
    Array<OtherMenuEntity>
  >([]);
  const onItem = (otherMenuEntity: OtherMenuEntity) => {
    onItemPress(otherMenuEntity);
  };
  const onSeeAll = () => {
    onSeeAllPress(otherMenuType.getType());
  };
  useEffect(() => {
    const getOtherMenu = otherService.getOtherMenu(
      otherMenuType.getType(),
      hideFeature,
    );
    setOtherMenuEntities(getOtherMenu);
  }, [hideFeature, otherMenuType]);
  return (
    <View style={style.container}>
      <View style={style.rowTitle}>
        <View style={style.title}>
          <CTTypography.Text
            level="2"
            font={Font.Medium}
            text={otherMenuType.getTitle()}
          />
        </View>
      </View>
      <View>
        {otherMenuEntities.map(otherMenuEntity => (
          <TouchableOpacity
            onPress={() => onItem(otherMenuEntity)}
            style={style.menuContainer}
            key={otherMenuEntity.getId()}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={style.menuIcon}
                resizeMode="contain"
                source={otherMenuEntity.getIcon()}
              />
              <Typography
                type="h3"
                color={colors.secondary.o900}
                text={otherMenuEntity.getName()}
              />
              {['support_user'].includes(otherMenuEntity.getId()) && (
                <View style={style.newFeature}>
                  <Typography
                    type="h5"
                    text="Mới"
                    color={colors.success.o500}
                  />
                </View>
              )}
            </View>
            <Image style={style.iconArrowRight} source={ic_right} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OtherMenuGroupView;
