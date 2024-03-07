import {useAuth} from 'providers/contexts/AuthContext';
import useConfig from './useConfig';

function getValueFromObject<T extends Object>(
  obj: T,
  propName: keyof T,
): T[keyof T] | undefined {
  if (obj && propName in obj) {
    return obj[propName];
  }
  return undefined;
}

export const useStoreFeatureHook = (feature: string) => {
  const config = useConfig();
  const {locationSelected} = useAuth();
  let storeId: number | undefined;
  if (
    locationSelected &&
    !locationSelected.supported &&
    locationSelected.locationId !== -1
  ) {
    storeId = locationSelected.locationId;
  }
  if (config && feature in config) {
    const value = getValueFromObject(config, feature) as String;
    if (!value) {
      return true;
    }
    const storeConfig = value.split(',');

    if (!storeId) {
      return false;
    }
    if (storeConfig.findIndex(e => e === storeId?.toString()) !== -1) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};
