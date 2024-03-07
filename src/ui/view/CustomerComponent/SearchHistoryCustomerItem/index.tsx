import {ic_close, ic_history} from 'assets/images';
import {CTButtonIcon} from 'components/Button';
import CTTypography from 'components/CTTypography';
import {HistoryCustomerDto} from 'model/dto/MobileService/HistoryCustomer';
import {HistorySearchDto} from 'model/dto/MobileService/HistorySearchDto';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {SearchHistoryCustomerItemStyle} from './styles';

interface SearchCustomerHistoryItemProps {
  history: HistorySearchDto;
  onDelete: (key: number) => void;
  onNavigate: (id: number, name: string) => void;
}

const SearchCustomerHistoryItem: React.FC<SearchCustomerHistoryItemProps> = (
  props: SearchCustomerHistoryItemProps,
) => {
  const {history, onDelete, onNavigate} = props;
  const onPressCustomer = () => {
    const customers: HistoryCustomerDto =
      history.data !== null ? JSON.parse(history.data) : null;
    if (customers !== null) {
      onNavigate(customers.id, customers.name);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPressCustomer}
      style={SearchHistoryCustomerItemStyle.container}>
      <Image source={ic_history} />
      <CTTypography.Text
        level="2"
        style={SearchHistoryCustomerItemStyle.txtContainer}
        text={history.keyword}
      />
      <CTButtonIcon onPress={() => onDelete(history.id)} icon={ic_close} />
    </TouchableOpacity>
  );
};

export default SearchCustomerHistoryItem;
