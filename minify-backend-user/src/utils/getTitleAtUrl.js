const fetch = require('node-fetch');
const articleTitle = require('article-title');

const controller = new AbortController();

const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
  const controller = new AbortController();
  const promise = fetch(url, { signal: controller.signal, ...options });
  if (signal) signal.addEventListener('abort', () => controller.abort());
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};

const getTitleAtUrl = async (url) => {
  const response = await fetchTimeout(url, 1000, { signal: controller.signal });
  if (!response.ok) {
    return 'Some title';
  } else {
    const responseText = await response.text();
    return articleTitle(responseText);
  }
};

module.exports = {
  getTitleAtUrl,
};
