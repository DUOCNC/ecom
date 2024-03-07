import {Typography} from 'common-ui';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import style from './style';
import {Location, LocationSelectedProvider} from 'model/providers';

interface Props {
  location: Location;
  locationSelected: LocationSelectedProvider;
  onSelect: (location: Location) => void;
}

const StoreItemView: React.FC<Props> = ({
  location,
  locationSelected,
  onSelect,
}) => {
  const onItemPress = () => onSelect(location);
  return (
    <View>
      <TouchableOpacity
        onPress={onItemPress}
        style={[
          style.container,
          locationSelected.locationId === location.id && style.selected,
        ]}>
        <Typography type="h4" textType="regular" text={location.name} />
      </TouchableOpacity>
    </View>
  );
};

export default StoreItemView;
