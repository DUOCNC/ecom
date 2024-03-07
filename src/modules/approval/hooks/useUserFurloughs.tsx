import {useEffect, useState} from 'react';
import {getFurlough} from '../services';
import {Furlough} from '../models/response/reasons';

export function useUserFurloughs() {
  const [furloughs, setFurloughs] = useState<Furlough | null>(null);

  useEffect(() => {
    let ignored = false;

    getFurlough().then(data => {
      if (data && !ignored) {
        setFurloughs(data as unknown as Furlough);
      }
    });

    return () => {
      ignored = true;
    };
  }, []);

  return {furloughs};
}
