export const customFetch = ({ url, method, json, username, password, bearerToken }) => {
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
  return fetch(url, {
    method: method,
    body: (method === 'GET' || method === 'DELETE') ? null : json,
    headers: !bearerToken 
      ? { ...headers, 'Content-type': 'application/json; charset=UTF-8' } 
      : { 'Accept': 'application/json', 'Authorization': 'Bearer ' + bearerToken }
  })
    .then(res => res.json());
};
