import React, {FC, useCallback, useState} from 'react';
import {MainStackScreenProps} from '..';
import {ErrorType, Layout} from 'common-ui';
import {colors} from 'assets/v2';
import {MainView} from 'ui/view';
import {MainRouteConfig} from 'config/RouteConfig';
import {View} from 'react-native';
import Typography from 'common-ui/components/Typography';

type Props = MainStackScreenProps<'Main'>;

const MainScreen: FC<Props> = ({navigation}) => {

  return (
    <Layout.Screen barStyle="dark-content" backgroundColor={colors.base.white}>
      <Layout.SafeAreaContainer>
        <View>
          <Typography text="Hello, World!"/>
        </View>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default MainScreen;
