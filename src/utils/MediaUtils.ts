import {AppConfig} from 'config/AppConfig';
import {URL} from 'react-native-url-polyfill';

const toFullUrl = (url: string | undefined | null, origin: string) => {
  try {
    return new URL(url ?? '');
  } catch (error) {
    let slash = (url || '').startsWith('/') ? '' : '/';
    return new URL(`${origin}${slash}${url}`);
  }
};

const generateMediaUrl = (
  origin: string,
  url: string | undefined | null,
): string | undefined => {
  if (!url) {
    return undefined;
  }
  const fullUrl = toFullUrl(url, origin);
  const deprecatedDomains = [
    'https://np-cdn.yody.io',
    'https://cdn.yody.io',
    'https://np.yodycdn.com',
    'https://np.cdn.yody.io',
    'https://yody-media.s3.ap-southeast-1.amazonaws.com',
    'https://files-xls.s3.ap-southeast-1.amazonaws.com',
    'https://yody-prd-media.s3.ap-southeast-1.amazonaws.com',
  ];

  const isInDeprecatedDomain = deprecatedDomains.includes(fullUrl.origin);
  if (isInDeprecatedDomain) {
    return `${origin}${fullUrl.pathname}${fullUrl.search}`;
  }

  return fullUrl.toString();
};

export const getMediaUrl = (url: string | undefined | null) => {
  return generateMediaUrl(AppConfig.CDN as any, url);
};
export const generateFileUrl = (url: string | undefined) => {
  const origin = AppConfig.CDN;
  return generateMediaUrl(origin as any, url);
};
