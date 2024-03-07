import {yody_logo} from 'assets/images';
import {Layout} from 'common-ui';
import React, {FC, useCallback} from 'react';
import {Image} from 'react-native';
import {accountService} from 'services';
import {VerifyVersionView} from 'ui/view';

const SplashScreen: FC = () => {
  const onVerifyVersion = useCallback(() => {
    accountService.getConfig();
  }, []);
  return (
    <Layout.Screen barStyle="dark-content">
      <VerifyVersionView onVerifyVersion={onVerifyVersion}>
        <Layout.Container alignItems="center" justifyContent="center">
          <Image source={yody_logo} />
        </Layout.Container>
      </VerifyVersionView>
    </Layout.Screen>
  );
};

export default SplashScreen;
