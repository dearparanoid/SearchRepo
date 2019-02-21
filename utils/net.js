import { API_URL } from '../common/constant';

export const createURL = (request_payload, type) => {
  let para = '';


  for (let key in request_payload) {
    if (key === 'method') para += `?method=${request_payload[key]}`;
    else para += `&${key}=${request_payload[key]}`;
  }
  
  const requestPath = `${API_URL}${type}/${para}&format=json&nojsoncallback=1`;
  return requestPath;
}