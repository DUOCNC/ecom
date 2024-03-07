import {BaseApi, BaseAxios, Result, StringUtils} from 'common';
import {CountryResponse, DistrictResponse, CityResponse} from 'model';
import {WardResponse} from 'model/responses';

class ContentApi extends BaseApi {
  private readonly BaseUrlApi = '/content-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getCountry() {
    let url = this.getUrl('countries');
    return BaseAxios.get<Result<Array<CountryResponse>>>(url);
  }

  getDistrict(countryId: number) {
    let url = this.getUrl(
      StringUtils.format('countries/{0}/districts', countryId),
    );
    return BaseAxios.get<Result<Array<DistrictResponse>>>(url);
  }

  getWard(districtId: number) {
    let url = this.getUrl(
      StringUtils.format('/districts/{0}/wards', districtId),
    );
    return BaseAxios.get<Result<Array<WardResponse>>>(url);
  }

  getCity(countryId: number) {
    let url = this.getUrl(
      StringUtils.format('countries/{0}/cities', countryId),
    );
    return BaseAxios.get<Result<Array<CityResponse>>>(url);
  }
}

export default ContentApi;
