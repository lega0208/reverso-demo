/**
 * URL utility functions for parsing and assembling URLs
 */

const primaryParams = ['model', 'loadbalanced', 'tuneId', 'modelId'];

export function parseUrl(urlString = '') {
  const url = new URL(urlString);

  const data = {
    type: url.protocol.replace(':', ''),
    hostOrPath: url.hostname || url.pathname,
    preprocessors: {},
    extraParams: {},
  };

  url.searchParams.forEach((val, key) => {
    console.log(`searchParams: ${url.searchParams}`);
    if (key.includes('corrector')) {
      data.preprocessors[key.replace('corrector.', '')] = Boolean(val);
      return;
    }

    if (primaryParams.includes(key)) {
      data[key] = val;
      return;
    }

    data.extraParams[key] = val;
  });

  return data;
}

export function buildUrl({
  type,
  hostOrPath,
  preprocessors,
  extraParams,
  ...rest
}) {
  const urlHref = `${type}${hostOrPath}`;

  const searchParamsArray = [
    ...Object.entries(preprocessors).map(([key, val]) => [
      `corrector.${key}`,
      val,
    ]),
    ...primaryParams
      .filter(param => rest[param] !== undefined)
      .map(param => [param, rest[param]]),
    ...Object.entries(extraParams),
  ];

  const url = new URL(urlHref);
  url.searchParams = new URLSearchParams(searchParamsArray);

  return url.href;
}
