import React from 'react';
import {FlatListItemControl, Layout} from 'common-ui';
import {MainStackScreenProps} from '..';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import style from './style';
import {SelectItemView} from '../../../view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GenderEntity, {Gender} from 'model/entities/GenderEntity';

type Props = MainStackScreenProps<'Gender'>;
export interface GenderSelect {
  title: string;
  value: string;
}
const GenderScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  let {returnLink, data} = route.params;
  const onSelect = (item: GenderEntity) => {
    navigation.navigate(returnLink, {...data, itemGender: item});
  };
  const dataLineItem = [
    new GenderEntity(Gender.Male, 'Nam'),
    new GenderEntity(Gender.Female, 'Nữ'),
    new GenderEntity(Gender.Other, 'Khác'),
  ];
  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.container}>
        <Layout.ScreenHeaderBack title="Chọn giới tính" />
        <Layout.Container>
          <FlatList
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[style.flatList, {paddingBottom: bottom}]}
            ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
            data={dataLineItem}
            keyExtractor={item => item.getValue()}
            renderItem={({item}) => (
              <SelectItemView
                key={item.getValue()}
                selected={item.getValue() === data.itemGender.getValue()}
                onPress={() => onSelect(item)}
                value={item.getObjectRequest()}
                display={item.getName()}
              />
            )}
          />
        </Layout.Container>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default GenderScreen;
