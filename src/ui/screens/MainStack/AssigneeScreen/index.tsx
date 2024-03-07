import React, {useEffect, useState} from 'react';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {MainStackScreenProps} from '..';
import {View, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import style from './style';
import {SelectItemView} from '../../../view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import accountService from 'services/AccountService';
import {useDebounce} from 'hook';

type Props = MainStackScreenProps<'Assignee'>;

const AssigneeScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const [keyword, setKeyword] = useState<string>('');
  const debouncedKeyWord = useDebounce<string>(keyword, 800);
  let {returnLink, data} = route.params;
  const [assignee, setAssignee] = useState<Array<AssigneeEntity>>([]);
  const [loading, setLoading] = useState(false);
  const onSelect = (item: AssigneeEntity) => {
    let index = assignee.findIndex(
      assigneeItem => assigneeItem.getId() === item.getId(),
    );
    navigation.navigate(returnLink, {...data, itemAssignee: assignee[index]});
  };

  useEffect(() => {
    setLoading(true);
    accountService.loadAssignee(debouncedKeyWord, rs => {
      setAssignee(rs);
      setLoading(false);
    });
  }, [debouncedKeyWord]);

  return (
    <Layout.Screen barStyle="dark-content">
      <KeyboardAvoidingView
        keyboardVerticalOffset={-bottom}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={style.container}>
        <Layout.ScreenHeaderBack title="Nhân viên phụ trách">
          <View style={style.formSearch}>
            <SearchInput
              autoFocus={true}
              placeholder="Nhập từ khóa tìm kiếm"
              value={keyword}
              onValueChange={value => {
                setKeyword(value);
              }}
            />
          </View>
        </Layout.ScreenHeaderBack>
        <Layout.Container>
          <Layout.Loading position="top" loading={loading}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[style.flatList, {paddingBottom: bottom}]}
              renderItem={({item}) => (
                <SelectItemView
                  selected={item.getId() === data.itemAssignee.getId()}
                  onPress={() => onSelect(item)}
                  value={item.getObjectRequest()}
                  display={item.getCodeName()}
                />
              )}
              ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
              data={assignee}
              keyExtractor={item => item.getId()}
            />
          </Layout.Loading>
        </Layout.Container>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default AssigneeScreen;
