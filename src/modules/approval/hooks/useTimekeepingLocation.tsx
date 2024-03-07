import {useEffect, useRef, useState} from 'react';
import {debounce} from 'lodash';
import {getTimekeepingLocations} from '../services';
import {TimekeepingLocations} from '../models/response';

export function useTimekeepingLocation() {
  const [timekeepingLocations, setTimekeepingLocations] = useState<
    TimekeepingLocations[]
  >([]);

  const searchLocation = useRef(
    debounce((query: string) => {
      getTimekeepingLocations().then(data => {
        if (data) {
          setTimekeepingLocations(data);
        }
      });
    }, 500),
  );

  useEffect(() => {
    let ignored = false;

    getTimekeepingLocations().then(data => {
      if (data && !ignored) {
        setTimekeepingLocations(data);
      }
    });

    return () => {
      ignored = true;
    };
  }, []);

  const optionsTimekeepingLocation = timekeepingLocations?.map(
    (time, index) => ({
      value: time.name,
      label: time.name,
      key: index,
    }),
  );

  return {
    timekeepingLocations,
    optionsTimekeepingLocation,
    searchLocation: searchLocation.current,
  };
}
