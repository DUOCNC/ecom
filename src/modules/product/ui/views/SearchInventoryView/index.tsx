import React, {useEffect, useState} from 'react';
import {SearchInput} from 'common-ui';

type Props = {
  onSearch: (keyword: string) => void;
  onSearchPress: (keyword: string) => void;
};

const SearchInventoryView: React.FC<Props> = ({onSearch, onSearchPress}) => {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 0);
    return () => clearTimeout(timeout);
  }, [onSearch, value]);
  return (
    <SearchInput
      autoFocus
      value={value}
      onValueChange={v => setValue(v)}
      placeholder="Tìm kiếm cửa hàng"
      onSearchPress={onSearchPress}
    />
  );
};

export default SearchInventoryView;
