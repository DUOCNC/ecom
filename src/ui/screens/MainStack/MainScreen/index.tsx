import React, {FC, useCallback, useEffect, useState} from 'react';
import {MainStackScreenProps} from '..';
import {ErrorType, Layout} from 'common-ui';
import {colors} from 'assets/v2';
import {MainView} from 'ui/view';
import {MainRouteConfig} from 'config/RouteConfig';
import {useAppSelector} from 'hook';
import {profileApi} from 'api/AuthenticationApi';
import {saveUser} from 'reduxs/UserReducer';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {useDispatch} from 'react-redux';

type Props = MainStackScreenProps<'Main'>;

const MainScreen: FC<Props> = ({navigation}) => {
  const [errorType] = useState<false | ErrorType>(false);
  const [msg] = useState<string>('');
  const dispatch = useDispatch();
  const {user, isAuthentication, isLoadDetail} = useAppSelector(
    state => state.user,
  );
  const onNavigateBarcode = useCallback(() => {
    navigation.navigate(MainRouteConfig.BarcodeScanner);
  }, [navigation]);

  useEffect(() => {
    if (!isLoadDetail) {
      LocalStorageUtils.getUserName().then((value: string | null) => {
        if (!value) {
          return;
        }
        profileApi(
          false,
          value,
          account => {
            dispatch(saveUser(account));
          },
          error => {
            console.log(error);
          },
        );
      });
    }
  }, [dispatch, isLoadDetail]);

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
