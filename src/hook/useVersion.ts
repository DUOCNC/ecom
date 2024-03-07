import {VersionReducer} from 'model';
import {useMemo} from 'react';
import {useAppSelector} from './CustomReduxHook';

function useVersion(): VersionReducer {
  const versionReducer = useAppSelector(state => state.version);
  let data = useMemo(() => {
    return versionReducer;
  }, [versionReducer]);
  return data;
}

export default useVersion;
