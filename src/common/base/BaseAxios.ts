import AxiosProvider from 'common/provider/AxiosProvider';
import {AppConfig} from 'config/AppConfig';

const BaseAxios = AxiosProvider.getAxios(AppConfig.appVersion);

export default BaseAxios;
