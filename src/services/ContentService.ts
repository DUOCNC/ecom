import {ContentApi} from 'api';
import BaseService from './BaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from 'enums';
import {
  CityDistrictStorage,
  CityEntity,
  CityResponse,
  CityStorage,
  CountryEntity,
  CountryResponse,
  CountryStorage,
  DistrictEntity,
  DistrictResponse,
} from 'model';
import {WardStorage} from 'model/storage/WardStorage';
import {WardResponse} from 'model/responses';
import WardEntity from 'model/entities/WardEntity';

class ContentService extends BaseService {
  private readonly ContentExpireDate = 3600 * 24 * 30;
  private readonly contentApi: ContentApi;

  constructor() {
    super();
    this.contentApi = new ContentApi();
  }

  private saveCountryToCache(countries: Array<CountryResponse>) {
    let currentDateMs = new Date().getMilliseconds();
    let expireDateMs = currentDateMs + this.ContentExpireDate;
    let countryStorage: CountryStorage = {
      expire: expireDateMs,
      countries: countries,
    };
    AsyncStorage.setItem(
      AsyncStorageKey.COUNTRY,
      JSON.stringify(countryStorage),
    );
  }

  private getCountryFromCache(
    onEmpty: () => void,
    onSuccess: (countries: Array<CountryResponse>) => void,
  ) {
    AsyncStorage.getItem(AsyncStorageKey.COUNTRY).then(value => {
      if (value === null) {
        onEmpty();
        return;
      }
      let countryStorage: CountryStorage = JSON.parse(value);
      let currentDate = new Date().getMilliseconds();
      if (currentDate > countryStorage.expire) {
        onEmpty();
        return;
      }
      onSuccess(countryStorage.countries);
    });
  }

  private getCityDistrictFromCache(
    countryId: number,
    onEmpty: () => void,
    onSuccess: (districts: Array<DistrictResponse>) => void,
  ) {
    AsyncStorage.getItem(AsyncStorageKey.DISTRICT).then(value => {
      if (value === null) {
        onEmpty();
        return;
      }
      let cityDistrictStorage: CityDistrictStorage = JSON.parse(value);
      let index = cityDistrictStorage.cityDistricts.findIndex(
        cityDistrictDetail => cityDistrictDetail.countryId === countryId,
      );
      if (index === -1) {
        onEmpty();
        return;
      }
      let cityDistrictDetail = cityDistrictStorage.cityDistricts[index];
      let currentDate = new Date().getMilliseconds();
      if (currentDate > cityDistrictDetail.expire) {
        onEmpty();
        return;
      }
      onSuccess(cityDistrictDetail.data);
    });
  }

  private getWardFromCache(
    districtId: number,
    onEmpty: () => void,
    onSuccess: (wards: Array<WardResponse>) => void,
  ) {
    AsyncStorage.getItem(AsyncStorageKey.WARD).then(value => {
      if (value === null) {
        onEmpty();
        return;
      }
      let wardStorage: WardStorage = JSON.parse(value);
      let index = wardStorage.wards.findIndex(
        cityDistrictDetail => cityDistrictDetail.districtId === districtId,
      );
      if (index === -1) {
        onEmpty();
        return;
      }
      let wardDetail = wardStorage.wards[index];
      let currentDate = new Date().getMilliseconds();
      if (currentDate > wardDetail.expire) {
        onEmpty();
        return;
      }
      onSuccess(wardDetail.data);
    });
  }

  private getCountryFromApi(
    onSuccess: (countries: Array<CountryEntity>) => void,
  ) {
    this.contentApi
      .getCountry()
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          return;
        }
        let result = response.data;
        this.saveCountryToCache(result.data);
        let countryEntities = result.data.map(country =>
          CountryEntity.createFromResponse(country),
        );
        onSuccess(countryEntities);
      })
      .catch(e => this.handlerCatch(e));
  }

  private getDistrictFromApi(
    countryId: number,
    onSuccess: (districts: Array<DistrictResponse>) => void,
  ) {
    this.contentApi
      .getDistrict(countryId)
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          return;
        }
        let result = response.data;
        //this.saveCountryToCache(result.data);
        onSuccess(result.data);
      })
      .catch(e => this.handlerCatch(e));
  }

  private getWardFromApi(
    districtId: number,
    onSuccess: (wards: Array<WardResponse>) => void,
  ) {
    this.contentApi
      .getWard(districtId)
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          return;
        }
        let result = response.data;
        // this.saveCountryToCache(result.data);
        onSuccess(result.data);
      })
      .catch(e => this.handlerCatch(e));
  }

  loadCountry(onSuccess: (countries: Array<CountryEntity>) => void) {
    this.getCountryFromCache(
      () => {
        this.getCountryFromApi(onSuccess);
      },
      countries => {
        let countryEntities = countries.map(country =>
          CountryEntity.createFromResponse(country),
        );
        onSuccess(countryEntities);
      },
    );
  }

  loadCityDistrict(
    countryId: number,
    onSuccess: (districts: Array<DistrictEntity>) => void,
  ) {
    this.getCityDistrictFromCache(
      countryId,
      () => {
        this.getDistrictFromApi(countryId, districts => {
          onSuccess(
            districts.map(district =>
              DistrictEntity.createFromResponse(district),
            ),
          );
        });
      },
      districts => {
        onSuccess(
          districts.map(district =>
            DistrictEntity.createFromResponse(district),
          ),
        );
      },
    );
  }

  loadWard(
    districtId: number,
    onSuccess: (districts: Array<WardEntity>) => void,
  ) {
    this.getWardFromCache(
      districtId,
      () => {
        this.getWardFromApi(districtId, districts => {
          onSuccess(districts.map(ward => WardEntity.createFromResponse(ward)));
        });
      },
      districts => {
        onSuccess(districts.map(ward => WardEntity.createFromResponse(ward)));
      },
    );
  }

  private saveCitiesToCache(countryId: number, data: CityResponse[]) {
    AsyncStorage.getItem(AsyncStorageKey.CITIES).then(value => {
      let currentDateMs = new Date().getMilliseconds();
      let expireDateMs = currentDateMs + this.ContentExpireDate;
      let cityStorage: CityStorage = {
        cities: [],
      };
      if (value !== null) {
        cityStorage = JSON.parse(value);
      }
      let index = cityStorage.cities.findIndex(
        cityDetail => cityDetail.countryId === countryId,
      );
      if (index === -1) {
        cityStorage.cities.push({
          countryId: countryId,
          expire: expireDateMs,
          data: data,
        });
        return;
      }
      cityStorage.cities[index].expire = expireDateMs;
      cityStorage.cities[index].data = data;
    });
  }

  private getCityFromApi(
    countryId: number,
    onSuccess: (cities: Array<CityResponse>) => void,
  ) {
    this.contentApi
      .getCity(countryId)
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          return;
        }
        let result = response.data;
        this.saveCitiesToCache(countryId, result.data);
        onSuccess(result.data);
      })
      .catch(e => this.handlerCatch(e));
  }

  private getCityFromCache(
    countryId: number,
    onEmpty: () => void,
    onSuccess: (cities: Array<CityResponse>) => void,
  ) {
    AsyncStorage.getItem(AsyncStorageKey.CITIES).then(value => {
      if (value === null) {
        onEmpty();
        return;
      }
      let cityStorage: CityStorage = JSON.parse(value);
      let index = cityStorage.cities.findIndex(
        cityDetail => cityDetail.countryId === countryId,
      );
      if (index === -1) {
        onEmpty();
        return;
      }
      let cityDetail = cityStorage.cities[index];
      let currentDate = new Date().getMilliseconds();
      if (currentDate > cityDetail.expire) {
        onEmpty();
        return;
      }
      onSuccess(cityDetail.data);
    });
  }

  loadCity(countryId: number, onSuccess: (cities: Array<CityEntity>) => void) {
    this.getCityFromCache(
      countryId,
      () => {
        this.getCityFromApi(countryId, cities => {
          onSuccess(cities.map(city => CityEntity.createFromResponse(city)));
        });
      },
      cities => {
        onSuccess(cities.map(city => CityEntity.createFromResponse(city)));
      },
    );
  }
}

const contentService = new ContentService();

export default contentService;
