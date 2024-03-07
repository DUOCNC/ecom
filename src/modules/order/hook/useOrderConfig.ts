import {useAppSelector} from 'hook';
import {useMemo} from 'react';

const useOrderConfig = () => {
  const orderConfig = useAppSelector(state => state.orderConfig);
  const data = useMemo(() => orderConfig, [orderConfig]);
  return data;
};

export {useOrderConfig};
