import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {ic_barcode} from 'assets/images';
import {colors} from 'assets/v2';
import {DimentionUtils, Text} from 'common-ui';
import {BottomMainConfig} from 'config/RouteConfig';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import TabIconView from '../TabIconView';
import style from './style';
import tabs from './tabs';
import {useAuth} from 'providers/contexts/AuthContext';
import useTask from 'hook/useTask';
import {requestUserPermission} from 'utils/NotificationUtils';
import {employeeService} from 'services/EmployeeService';

interface Props {
  onNavigateBarcode: () => void;
  onNavigateAccountStore: () => void;
}

const Tab = createBottomTabNavigator<MainBottomProps>();

export interface MainBottomProps extends ParamListBase {}

const MainView: React.FC<Props> = ({
  onNavigateBarcode,
  onNavigateAccountStore,
}) => {
  const {locationSelected, profile} = useAuth();
  const {task} = useTask();

  useEffect(() => {
    if (profile) {
      requestUserPermission(profile.code);
      employeeService.getEmployeeDetail(profile.code);
    }
  }, [profile]);

  useEffect(() => {
    if (locationSelected.selected) {
      return;
    }
    onNavigateAccountStore();
  }, [locationSelected, onNavigateAccountStore]);
  if (!locationSelected.selected) {
    return <View />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={({state, descriptors, navigation, insets}) => {
        if (state.index === 0 && task) {
          return;
        }
        return (
          <View
            style={[
              style.tabbar,
              {
                paddingTop: DimentionUtils.scale(6),
                height: insets.bottom + DimentionUtils.scale(56),
                paddingBottom: insets.bottom,
              },
            ]}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const isFocused = state.index === index;
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate(route.name);
                }
              };
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              if (route.name === BottomMainConfig.Search) {
                return (
                  <View key={route.key} style={style.centerTabBar}>
                    <TouchableOpacity
                      onPress={onNavigateBarcode}
                      style={style.btnCenter}
                      accessibilityRole="button"
                      accessibilityLabel={options.tabBarAccessibilityLabel}
                      testID={options.tabBarTestID}>
                      <Image style={style.icSearch} source={ic_barcode} />
                    </TouchableOpacity>
                  </View>
                );
              }
              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={style.defaultTabbar}>
                  {options.tabBarIcon &&
                    options.tabBarIcon({
                      focused: isFocused,
                      color: colors.primary.o500,
                      size: 12,
                    })}
                  <Text
                    size={11}
                    fontWeight="400"
                    style={style.txtTitle}
                    color={isFocused ? colors.primary.o500 : '#212B35'}
                    text={options.title}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
      initialRouteName={BottomMainConfig.Home}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.key}
          navigationKey={'TabHome'}
          options={{
            lazy: false,
            title: tab.name,
            tabBarIcon: propTabBar => (
              <TabIconView
                focused={propTabBar.focused}
                icon={tab.icon}
                activeIcon={tab.activeIcon}
              />
            ),
          }}
          name={tab.key}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default MainView;
