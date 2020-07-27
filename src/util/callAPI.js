import config from '../config/config';

export default async function callAPI(url, method, token, body) {
  return fetch(`${config.API_URL}${config.API_PREFIX}${url}`, {
    method: method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: body,
  });
}
