import React, {useEffect, useMemo, useState} from 'react';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {MainStackScreenProps} from '..';
import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import style from './style';
import {contentService} from 'services';
import {CityEntity} from 'model';
import {SelectItemView} from '../../../view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StringUtils} from 'common';

type Props = MainStackScreenProps<'Cities'>;

const CityScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const [keyword, setKeyword] = useState<string>('');
  let {countryId, cityId, returnLink} = route.params;
  const cityIdValue = useMemo(() => {
    if (!cityId) {
      return -1;
    }
    return cityId;
  }, [cityId]);

  const [cities, setCities] = useState<Array<CityEntity>>([]);
  const data = useMemo(() => {
    if (keyword.trim() === '') {
      return cities;
    }
    return cities.filter(v => StringUtils.search(keyword, v.getName()));
  }, [cities, keyword]);
  const onSelect = (v: number) => {
    let index = cities.findIndex(city => city.getId() === v);
    navigation.navigate(returnLink, {
      cityId: v,
      city: cities[index].getName(),
    });
  };
  useEffect(() => {
    contentService.loadCity(countryId, rs => setCities(rs));
  }, [countryId]);
  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.container}>
        <Layout.ScreenHeaderBack title="Chọn khu vực">
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
                selected={item.getId() === cityIdValue}
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

export default CityScreen;
