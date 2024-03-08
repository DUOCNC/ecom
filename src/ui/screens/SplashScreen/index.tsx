import {logo_shg} from 'assets/images';
import {Layout} from 'common-ui';
import React, {FC, useCallback} from 'react';
import {Image} from 'react-native';
import {VerifyVersionView} from 'ui/view';

const SplashScreen: FC = () => {
  const onVerifyVersion = useCallback(() => {
    // accountService.getConfig();
  }, []);
  return (
    <Layout.Screen barStyle="light-content">
      <VerifyVersionView onVerifyVersion={onVerifyVersion}>
        <Layout.Container alignItems="center" justifyContent="center">
          <Image source={logo_shg} />
        </Layout.Container>
      </VerifyVersionView>
    </Layout.Screen>
  );
};

export default SplashScreen;
