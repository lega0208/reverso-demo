/**
 * URL utility functions for parsing and assembling URLs
 */

const primaryParams = ['model', 'loadbalanced', 'tuneId', 'modelId'];

export function toParamsString(paramsObj = {}) {
  return Object.keys(paramsObj).length > 0
    ? `&${decodeURIComponent(new URLSearchParams(paramsObj).toString())}`
    : '';
}

export function fixParamString(paramString) {
  let fixedParamString = `${paramString}`;

  if (fixedParamString && !fixedParamString.startsWith('&')) {
    fixedParamString = `&${fixedParamString}`;
  }

  if (fixedParamString && fixedParamString.endsWith(' ')) {
    fixedParamString = fixedParamString
      .replace(/(?<==)([^=&]+) $/, '$1&')
      .replace(/(?<=&)([^=&]+) $/, '$1=')
      .replace(/([=&]) $/, '$1');
  }

  return fixedParamString;
}

export function parseUrl(urlString = '') {
  const url = new URL(urlString);

  const data = {
    type: url.protocol.replace(':', ''),
    hostOrPath: url.hostname || url.pathname,
    preprocessors: {},
    extraParams: {},
  };
  const extraParams = {};

  url.searchParams.forEach((val, key) => {
    if (key.includes('corrector')) {
      data.preprocessors[key.replace('corrector.', '')] = Boolean(val);
      return;
    }

    if (primaryParams.includes(key)) {
      data[key] = val;
      return;
    }

    extraParams[key] = val;
  });

  data.extraParams = toParamsString(data.extraParams);

  return data;
}

export function buildUrl({
  type,
  hostOrPath,
  preprocessors,
  extraParams,
  ...rest
}) {
  const urlHref = `${type}:${hostOrPath}`;

  const searchParamsArray = [
    ...Object.entries(preprocessors).map(([key, val]) => [
      `corrector.${key}`,
      val,
    ]),
    ...primaryParams
      .filter(param => rest[param] !== undefined)
      .filter(param => {
        switch (type) {
          case 'spoutnik':
            return param === 'loadbalanced' || param === 'model';
          case 'tf':
            return param === 'tuneId' || param === 'modelId';
          default:
            return false;
        }
      })
      .map(param => [param, rest[param]]),
  ];

  const url = new URL(urlHref);
  url.search = new URLSearchParams(searchParamsArray).toString();

  return `${decodeURIComponent(url.href)}${extraParams}`;
}
