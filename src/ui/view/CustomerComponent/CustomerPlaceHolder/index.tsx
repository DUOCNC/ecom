import React from 'react';
import {Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {normalize} from 'utils/DimensionsUtils';

const width = Dimensions.get('window').width;
const placeholderWidth = width - normalize(24) * 2;

const CustomerPlaceholder: React.FC = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item
          width={placeholderWidth}
          height={normalize(25)}
          marginTop={normalize(10)}
        />
        <SkeletonPlaceholder.Item
          width={placeholderWidth}
          height={normalize(25)}
          marginTop={normalize(10)}
        />
        <SkeletonPlaceholder.Item
          width={placeholderWidth}
          height={normalize(25)}
          marginTop={normalize(10)}
        />
        <SkeletonPlaceholder.Item
          width={placeholderWidth}
          height={normalize(25)}
          marginTop={normalize(10)}
        />
        <SkeletonPlaceholder.Item
          width={placeholderWidth}
          height={normalize(25)}
          marginTop={normalize(10)}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default CustomerPlaceholder;
