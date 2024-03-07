import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import {AuthenticationConfig} from 'config/RouteConfig';
import LoginV2Screen from './LoginV2Screen';
import RegisterScreen from './RegisterScreen';
import {AppConfig} from 'config/AppConfig';

export interface RootStackParamList extends ParamListBase {
  Login: undefined;
  Register: undefined;
}

export type AuthStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticationStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        AppConfig.appVersion === 'v1'
          ? AuthenticationConfig.Login
          : AuthenticationConfig.LoginV2
      }>
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'LoginV2'} component={LoginV2Screen} />
      <Stack.Screen name={'Register'} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
