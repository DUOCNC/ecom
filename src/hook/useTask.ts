import {useMemo} from 'react';
import {useAppSelector} from './CustomReduxHook';
import {TaskReducer} from 'model/reducer';

function useTask(): TaskReducer {
  const taskReducer = useAppSelector(state => state.task);

  let data = useMemo(() => {
    return taskReducer;
  }, [taskReducer]);
  return data;
}

export default useTask;
