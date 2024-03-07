import {sunhouse_logo_back} from 'assets/images';
import {Layout} from 'common-ui';
import React, {FC, useCallback} from 'react';
import {Image} from 'react-native';
import {VerifyVersionView} from 'ui/view';

const SplashScreen: FC = () => {
  const onVerifyVersion = useCallback(() => {}, []);
  return (
    <Layout.Screen barStyle="dark-content">
      <VerifyVersionView onVerifyVersion={onVerifyVersion}>
        <Layout.Container alignItems="center" justifyContent="center">
          <Image source={sunhouse_logo_back} />
        </Layout.Container>
      </VerifyVersionView>
    </Layout.Screen>
  );
};

export default SplashScreen;
