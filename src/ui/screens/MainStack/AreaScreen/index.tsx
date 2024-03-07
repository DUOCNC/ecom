import React, {useEffect, useMemo, useState} from 'react';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {MainStackScreenProps} from '..';
import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import style from './style';
import {contentService} from 'services';
import {DistrictEntity} from 'model';
import {SelectItemView} from '../../../view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StringUtils} from 'common';

type Props = MainStackScreenProps<'Area'>;

const AreaScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const [keyword, setKeyword] = useState<string>('');
  let {countryId, returnLink, data} = route.params;
  const [area, setArea] = useState<Array<DistrictEntity>>([]);
  const dataFilter = useMemo(() => {
    if (keyword.trim() === '') {
      return area;
    }
    return area.filter(v =>
      StringUtils.search(keyword, v.getNameCityAndDistrict()),
    );
  }, [area, keyword]);
  const onSelect = (item: DistrictEntity) => {
    let index = area.findIndex(district => district.getId() === item.getId());
    navigation.navigate(returnLink, {...data, itemClick: area[index]});
  };
  useEffect(() => {
    contentService.loadCityDistrict(countryId, rs => {
      setArea(rs);
    });
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
              autoFocus={true}
              placeholder="Nhập từ khóa tìm kiếm"
              value={keyword}
              onValueChange={value => setKeyword(value)}
            />
          </View>
        </Layout.ScreenHeaderBack>
        <Layout.Container>
          <Layout.Loading position="top" loading={area.length === 0}>
            <FlatList
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => (
                <SelectItemView
                  selected={item.getId() === data?.itemClick?.getId()}
                  onPress={() => onSelect(item)}
                  value={item.getObjectRequest()}
                  display={item.getNameCityAndDistrict()}
                />
              )}
              ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
              data={dataFilter}
              keyExtractor={item => item.getId()}
            />
          </Layout.Loading>
        </Layout.Container>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default AreaScreen;
