import {ThemeStyle} from 'assets/theme';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {HistorySearchDto} from 'model/dto/MobileService/HistorySearchDto';
import React, {useCallback, useMemo} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {
  CustomerPlaceHolder,
  SearchHistoryCustomerItem,
} from 'ui/view/CustomerComponent';
import {CustomerHistoryStyle} from './styles';

interface Props {
  histories: Array<HistorySearchDto>;
  max: number;
  onDelete: (key: number) => void;
  onNavigate: (id: number, name: string) => void;
  loading: boolean;
}

const CustomerHistoryView: React.FC<Props> = (props: Props) => {
  const {histories, onDelete, max, onNavigate, loading} = props;
  const onDeleteItem = useCallback(
    (key: number) => {
      onDelete(key);
    },
    [onDelete],
  );
  const view = useMemo(() => {
    return histories.length === 0 ? (
      <CTTypography.Text
        font={Font.Regular}
        level="2"
        style={CustomerHistoryStyle.txtEmpty}
        text="Không có lịch sử tìm kiếm"
      />
    ) : (
      histories.map(item => (
        <SearchHistoryCustomerItem
          onNavigate={onNavigate}
          key={item.id}
          onDelete={onDeleteItem}
          history={item}
        />
      ))
    );
  }, [histories, onDeleteItem, onNavigate]);
  return (
    <ScrollView style={CustomerHistoryStyle.scroll}>
      <View style={CustomerHistoryStyle.container}>
        <View style={CustomerHistoryStyle.header}>
          <CTTypography.Text
            font={Font.Regular}
            level="2"
            style={CustomerHistoryStyle.txtTitle}
            text="Lịch sử tìm kiếm"
          />
        </View>
        <View>{loading ? <CustomerPlaceHolder /> : view}</View>
        {max === histories.length && (
          <React.Fragment>
            <View style={ThemeStyle.separator24} />
            <TouchableOpacity style={CustomerHistoryStyle.bottomButton}>
              <CTTypography.Text text="Hiển thị tất cả" />
            </TouchableOpacity>
          </React.Fragment>
        )}
      </View>
    </ScrollView>
  );
};

export default CustomerHistoryView;
