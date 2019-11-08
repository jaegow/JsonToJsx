export const removeQueryParams = (url) => {
  let processed;
  if (url) {
    [processed] = url.split('?');
    if (!processed.length) processed = undefined;
  }
  return processed;
};

export const splitUrlFromQueryParams = (url) => {
  let search;
  let pathname;
  if (url) {
    [pathname, search] = url.split('?');
    if (pathname && !pathname.length) pathname = undefined;
    if (search && !search.length) {
      search = undefined;
    } else {
      search = `?${search}`;
    }
  }
  return {
    search,
    pathname,
  };
};
