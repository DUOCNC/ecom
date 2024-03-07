import React, {FC} from 'react';
import {MainStackScreenProps} from 'ui/screens/MainStack';
import {Layout} from 'common-ui';

type Props = MainStackScreenProps<'Main'>;

const TabHome: FC<Props> = ({navigation, route}: Props) => {
  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.SafeAreaContainer edges={['bottom']}></Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default TabHome;
