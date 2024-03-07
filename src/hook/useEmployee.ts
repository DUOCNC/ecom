import {useMemo} from 'react';
import {useAppSelector} from './CustomReduxHook';
import {EmployeeResponse} from 'model/responses';

function useEmployee(): EmployeeResponse {
  const employeeReducer = useAppSelector(state => state.employee);
  let data = useMemo(() => {
    return employeeReducer.data;
  }, [employeeReducer.data]);
  return data;
}

export default useEmployee;
