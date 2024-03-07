import React, {useEffect, useMemo, useState} from 'react';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {MainStackScreenProps} from '..';
import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import style from './style';
import {contentService} from 'services';
import {SelectItemView} from '../../../view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StringUtils} from 'common';
import WardEntity from 'model/entities/WardEntity';

type Props = MainStackScreenProps<'Ward'>;

const WardScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const [keyword, setKeyword] = useState<string>('');
  //@ts-ignore
  const {returnLink, data, districtId} = route.params;
  const [ward, setWard] = useState<Array<WardEntity>>([]);
  const dataFilter = useMemo(() => {
    if (keyword.trim() === '') {
      return ward;
    }
    return ward.filter(v => StringUtils.search(keyword, v.getName()));
  }, [ward, keyword]);
  const onSelect = (item: WardEntity) => {
    let index = ward.findIndex(district => district.getId() === item.getId());
    navigation.navigate(returnLink, {...data, itemWard: ward[index]});
  };
  useEffect(() => {
    contentService.loadWard(
      districtId || data?.itemClick?.getDistrictId(),
      rs => {
        setWard(rs);
      },
    );
  }, [data]);
  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.container}>
        <Layout.ScreenHeaderBack title="Chọn Phường/ Xã">
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
          <Layout.Loading position="top" loading={ward.length === 0}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[style.flatList, {paddingBottom: bottom}]}
              renderItem={({item}) => (
                <SelectItemView
                  selected={item.getId() === data?.itemWard?.getId()}
                  onPress={() => onSelect(item)}
                  value={item.getObjectRequest()}
                  display={item.getName()}
                />
              )}
              ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
              data={dataFilter}
              keyExtractor={item => item.getKey()}
            />
          </Layout.Loading>
        </Layout.Container>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default WardScreen;
