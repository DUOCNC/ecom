import React, {useEffect, useMemo, useState} from 'react';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {MainStackScreenProps} from '..';
import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import style from './style';
import {contentService} from 'services';
import {CountryEntity} from 'model';
import {SelectItemView} from '../../../view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StringUtils} from 'common';

type Props = MainStackScreenProps<'Countries'>;

const CountryScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const [keyword, setKeyword] = useState<string>('');
  const countryId = useMemo(() => {
    if (!route.params) {
      return -1;
    }
    return route.params.countryId;
  }, [route.params]);

  const [countries, setCountries] = useState<Array<CountryEntity>>([]);
  const data = useMemo(() => {
    if (keyword.trim() === '') {
      return countries;
    }
    return countries.filter(v => StringUtils.search(keyword, v.getName()));
  }, [countries, keyword]);
  const onSelect = (v: number) => {
    navigation.setParams({
      countryId: v,
    });
    navigation.goBack();
  };
  useEffect(() => {
    contentService.loadCountry(rs => setCountries(rs));
  }, []);
  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.container}>
        <Layout.ScreenHeaderBack title="Chọn quốc gia">
          <View style={style.formSearch}>
            <SearchInput
              placeholder="Nhập từ khóa tìm kiếm"
              value={keyword}
              onValueChange={value => setKeyword(value)}
            />
          </View>
        </Layout.ScreenHeaderBack>
        <Layout.Container>
          <FlatList
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[style.flatList, {paddingBottom: bottom}]}
            renderItem={({item}) => (
              <SelectItemView
                selected={item.getId() === countryId}
                onPress={v => onSelect(v)}
                value={item.getId()}
                display={item.getName()}
              />
            )}
            ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
            data={data}
            keyExtractor={item => item.getKey()}
          />
        </Layout.Container>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default CountryScreen;
