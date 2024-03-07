import {useEffect, useState} from 'react';
import {EnumTypeHrm} from '../config';
import {getReasons} from '../services';

export function useReasonData<T extends {active?: number}>(
  requestType: EnumTypeHrm,
) {
  const [reasons, setReasons] = useState<T[]>([]);

  useEffect(() => {
    if (!requestType) return;

    let ignored = false;

    // getReasonHrm(requestType)
    getReasons<T>(requestType).then(data => {
      if (data && !ignored) {
        setReasons(data.filter(item => item.active === 1));
      }

      return;
    });

    return () => {
      ignored = true;
    };
  }, [requestType]);

  return {reasons};
}
