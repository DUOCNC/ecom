import CTLayout from 'components/CTLayout';
import CTStatusBar from 'components/CTStatusBar';
import React from 'react';
import ViewFeature from 'ui/view/Common/ViewFeature';

const FeatureScreen: React.FC = () => {
  return (
    <CTLayout.Container>
      <CTStatusBar barStyle="dark-content" />
      <CTLayout.HeaderBack title="Thông báo" />
      <CTLayout.Body>
        <ViewFeature />
      </CTLayout.Body>
    </CTLayout.Container>
  );
};

export default FeatureScreen;
