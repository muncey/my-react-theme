const blankAppOptions = {
  baseUrl: null,
  title: null,
  subtitle: null
}

let appOptions = null;



/**
 * Gets a value from a hidden input field on the hosting page
 */
export function getDomValueOrDefault(selector, defaultValue) {
  const el = document.querySelector(selector);
  return el ? el.value : defaultValue;
}

/**
 * Gets the global settings for the application.
 */
export function getAppOptions() {
  appOptions = appOptions || blankAppOptions;
  // get the base url
  appOptions.baseUrl = getDomValueOrDefault('.wp-base-url', 'https://www.munceyweb.com/wp-json/wp/v2');
  appOptions.title = 'Muncey web';
  appOptions.subtitle = ''
  return appOptions;
}
