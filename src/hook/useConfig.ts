import {MobileConfigResponse} from 'model';
import {useMemo} from 'react';
import {useAppSelector} from './CustomReduxHook';

function useConfig(): MobileConfigResponse {
  const configReducer = useAppSelector(state => state.config);
  let data = useMemo(() => {
    return configReducer.config;
  }, [configReducer.config]);
  return data;
}

export default useConfig;
