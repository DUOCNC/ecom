import {BaseAxios} from 'common';
import {AppConfig} from 'config/AppConfig';
import {HttpConfig} from 'config/HttpConfig';
import {ResultConfig} from 'config/ResultConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {Result} from 'model/base/Result';
import {CountryCache} from 'model/cache/CountryCache';
import {DistrictCache} from 'model/cache/DistrictCache';
import {WardCache} from 'model/cache/WardCache';
import {CountryDto} from 'model/dto/ContentService/CountryDto';
import {DistrictDto} from 'model/dto/ContentService/DistrictDto';
import {WardDto} from 'model/dto/ContentService/WardDto';
import LocalStorageUtils from 'utils/LocalStorageUtils';

const CountryPath = 'countries';
const DistrictPath = 'districts';

const getCountryApi = async (
  onFinish: (countries: Array<CountryDto>) => void,
) => {
  const countries = await LocalStorageUtils.getCountries();
  if (countries !== null) {
    const countryCache: CountryCache = JSON.parse(countries);
    onFinish(countryCache.countries);
    return;
  }
  BaseAxios.get(`${ServiceConfig.Content}/${CountryPath}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        const result: Result<Array<CountryDto>> = response.data;
        if (result.code === ResultConfig.Ok) {
          const countryCache: CountryCache = {
            countries: result.data,
            timeExprie:
              new Date().getMilliseconds() + AppConfig.CONTENT_TIME_EXPIRE,
          };
          LocalStorageUtils.setCountries(JSON.stringify(countryCache));
          onFinish(result.data);
        }
      }
    })
    .catch(error =>
      console.log('Error ', 'Get data countries error = ', error),
    );
};

const getDistrictApi = async (
  countryId: number,
  onFinish: (districts: Array<DistrictDto>) => void,
) => {
  const districts = await LocalStorageUtils.getDistricts();
  let districtCaches: Array<DistrictCache> = [];
  if (districts !== null) {
    districtCaches = JSON.parse(districts);
    let index = districtCaches.findIndex(
      value =>
        value.countryId === countryId &&
        value.timeExprie > new Date().getMilliseconds(),
    );
    if (index !== -1) {
      onFinish(districtCaches[index].districts);
      return;
    }
  }
  BaseAxios.get(
    `${ServiceConfig.Content}/${CountryPath}/${countryId}/districts`,
  )
    .then(response => {
      if (response.status === HttpConfig.OK) {
        const result: Result<Array<DistrictDto>> = response.data;
        if (result.code === ResultConfig.Ok) {
          const districtCache: DistrictCache = {
            districts: result.data,
            countryId: countryId,
            timeExprie:
              new Date().getMilliseconds() + AppConfig.CONTENT_TIME_EXPIRE,
          };
          districtCaches.push(districtCache);
          LocalStorageUtils.setDistricts(JSON.stringify(districtCaches));
          onFinish(result.data);
        }
      }
    })
    .catch(error => console.log('Error ', 'Get data district error = ', error));
};

const getWardApi = async (
  districtId: number,
  onFinish: (wards: Array<WardDto>) => void,
) => {
  const wards = await LocalStorageUtils.getWards();
  let wardCaches: Array<WardCache> = [];
  if (wards !== null) {
    wardCaches = JSON.parse(wards);
    let index = wardCaches.findIndex(
      value =>
        value.district_id === districtId &&
        value.timeExprie > new Date().getMilliseconds(),
    );
    if (index !== -1) {
      onFinish(wardCaches[index].wards);
      return;
    }
  }
  BaseAxios.get(`${ServiceConfig.Content}/${DistrictPath}/${districtId}/wards`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        const result: Result<Array<WardDto>> = response.data;
        if (result.code === ResultConfig.Ok) {
          const wardCache: WardCache = {
            wards: result.data,
            district_id: districtId,
            timeExprie:
              new Date().getMilliseconds() + AppConfig.CONTENT_TIME_EXPIRE,
          };
          wardCaches.push(wardCache);
          LocalStorageUtils.setDistricts(JSON.stringify(wardCaches));
          onFinish(result.data);
        }
      }
    })
    .catch(error => console.log('Error ', 'Get data ward error = ', error));
};

export {getCountryApi, getDistrictApi, getWardApi};
