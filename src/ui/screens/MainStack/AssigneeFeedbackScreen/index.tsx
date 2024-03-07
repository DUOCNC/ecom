import React, {useEffect, useState} from 'react';
import {FlatListItemControl, Layout, SearchInput} from 'common-ui';
import {MainStackScreenProps} from '..';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import style from './style';
import {SelectItemView} from '../../../view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AssigneeEntity from 'model/entities/AssigneeEntity';
import accountService from 'services/AccountService';
import {useDebounce} from 'hook';
import {useAuth} from 'providers/contexts/AuthContext';
import CTFLastList from 'components/CTFlatList';
import EmptyState from 'components/CTScreen/EmptyState';
import {bg_empty_employee} from 'assets/images';

type Props = MainStackScreenProps<'AssigneeFeedback'>;

const AssigneeFeedbackScreen: React.FC<Props> = ({navigation, route}) => {
  const bottom = useSafeAreaInsets().bottom;
  const [keyword, setKeyword] = useState<string>('');
  const {locationSelected} = useAuth();
  const debouncedKeyWord = useDebounce<string>(keyword, 800);
  let {returnLink, code} = route.params;
  const [assignee, setAssignee] = useState<Array<AssigneeEntity>>([]);
  const [loading, setLoading] = useState(false);
  const onSelect = (item: AssigneeEntity) => {
    let index = assignee.findIndex(
      assigneeItem => assigneeItem.getId() === item.getId(),
    );
    navigation.navigate(returnLink, {itemAssignee: assignee[index]});
  };

  useEffect(() => {
    setLoading(true);
    accountService.loadAssignee(
      debouncedKeyWord,
      rs => {
        setAssignee(rs);
        setLoading(false);
      },
      locationSelected.departmentId,
    );
  }, [debouncedKeyWord, locationSelected]);

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
            <CTFLastList
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[style.flatList, {paddingBottom: bottom}]}
              renderItem={({item}) => (
                <SelectItemView
                  selected={item.getId() === code}
                  onPress={() => onSelect(item)}
                  value={item.getObjectRequest()}
                  display={item.getCodeName()}
                />
              )}
              ItemSeparatorComponent={() => <FlatListItemControl.Separator />}
              data={assignee}
              keyExtractor={item => item.getId()}
              emptyView={
                <EmptyState
                  icon={bg_empty_employee}
                  title="Không tìm thấy nhân viên"
                />
              }
            />
          </Layout.Loading>
        </Layout.Container>
      </KeyboardAvoidingView>
    </Layout.Screen>
  );
};

export default AssigneeFeedbackScreen;
