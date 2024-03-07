import React, {FC} from 'react';
import {ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {MainRouteConfig} from 'config/RouteConfig';
import MainScreen from './MainScreen';
import BarcodeScreen from './BarcodeScreen';

export interface RootStackParamList extends ParamListBase {
  Main: undefined;
  Countries: {countryId: number} | undefined;
  Cities: {
    returnLink: string;
    countryId: number;
    cityId?: number;
  };
  Area: {
    countryId: number;
    returnLink: string;
    data: any;
  };
}

export type MainStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={MainRouteConfig.Main}>
      <Stack.Screen name={'Main'} component={MainScreen} />
      <Stack.Screen
        name={'BarcodeScanner'}
        component={BarcodeScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
