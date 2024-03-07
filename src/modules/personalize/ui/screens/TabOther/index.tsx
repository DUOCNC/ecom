import React, {FC} from 'react';
import {Layout} from 'common-ui';
import {MainStackScreenProps} from 'ui/screens/MainStack';

type Props = MainStackScreenProps<'Main'>;

const TabOther: FC<Props> = ({}: Props) => {
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.ScreenHeaderBack title="Thêm" />
      <Layout.SafeAreaContainer edges={['bottom']}></Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default TabOther;
