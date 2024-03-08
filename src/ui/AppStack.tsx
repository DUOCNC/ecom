import React, {FC, useEffect, useMemo} from 'react';
import AuthenticationStack from './screens/AuthenticationStack';
import MainStack from './screens/MainStack';
import {useAppSelector} from 'hook';
import {profileApi} from 'api/AuthenticationApi';
import LocalStorageUtils from 'utils/LocalStorageUtils';
import {saveUser} from 'reduxs/UserReducer';
import {useDispatch} from 'react-redux';

const AppStack: FC = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isLoading) {
      LocalStorageUtils.getUserName().then((value: string | null) => {
        profileApi(
          true,
          value ?? '',
          res => {
            dispatch(saveUser(res));
          },
          () => {},
        );
      });
    }
    return () => {};
  }, [dispatch, user.isLoadDetail, user.isLoading]);

  const app = useMemo(() => {
    return user.isAuthentication ? <MainStack /> : <AuthenticationStack />;
  }, [user]);

  return app;
};

export default AppStack;
