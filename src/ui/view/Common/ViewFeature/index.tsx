import {notify_feature} from 'assets/images';
import EmptyState from 'components/CTScreen/EmptyState';
import React from 'react';
import {View} from 'react-native';
import ViewFeatureStyle from './style';

const ViewFeature: React.FC = () => {
  return (
    <View style={ViewFeatureStyle.container}>
      <EmptyState
        icon={notify_feature}
        title="Tính năng hiện đang phát triển"
        subTitle="Bạn vui lòng quay lại sau!"
      />
    </View>
  );
};

export default ViewFeature;
