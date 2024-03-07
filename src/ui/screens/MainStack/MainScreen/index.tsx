import React, {FC, useCallback, useState} from 'react';
import {MainStackScreenProps} from '..';
import {ErrorType, Layout} from 'common-ui';
import {colors} from 'assets/v2';
import {MainView} from 'ui/view';
import {MainRouteConfig} from 'config/RouteConfig';

type Props = MainStackScreenProps<'Main'>;

const MainScreen: FC<Props> = ({navigation}) => {
  const [errorType] = useState<false | ErrorType>(false);
  const [msg] = useState<string>('');
  const onNavigateBarcode = useCallback(() => {
    navigation.navigate(MainRouteConfig.BarcodeScanner);
  }, [navigation]);

  return (
    <Layout.Screen barStyle="dark-content" backgroundColor={colors.base.white}>
      <Layout.Loading loading={false}>
        <Layout.Error subTitle={msg} error={errorType}>
          <MainView onNavigateBarcode={onNavigateBarcode} />
        </Layout.Error>
      </Layout.Loading>
    </Layout.Screen>
  );
};

export default MainScreen;
