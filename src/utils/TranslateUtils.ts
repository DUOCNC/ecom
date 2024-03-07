import {en} from 'assets/lang/en';
import {vi} from 'assets/lang/vi';
import I18n from 'react-native-i18n';

const TranslateUtils = I18n;

TranslateUtils.fallbacks = true;

TranslateUtils.translations = {
  en: en,
  vi: vi,
};

TranslateUtils.defaultLocale = 'vi';

export default TranslateUtils;
