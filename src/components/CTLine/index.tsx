import {Colors} from 'assets/colors';
import React from 'react';
import {View} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

type Props = {
  paddingHorizontal?: number;
};

const CTLine: React.FC<Props> = ({paddingHorizontal}) => {
  return (
    <View
      style={{
        borderTopColor: Colors.Background2,
        borderTopWidth: normalize(8),
        marginHorizontal: normalize(paddingHorizontal ?? 0),
      }}
    />
  );
};

export default CTLine;
