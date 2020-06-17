export const customFetch = ({ url, method, json, username, password, bearerToken }) => {

  //basic auth with usename and password if present
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));
  
  return fetch(url, {
    method: method,

    //if method is GET or DELETE don't inlcude body
    body: (method === 'GET' || method === 'DELETE') ? null : json,

    //if there is a bearer token include it with "Authorization: Bearer ${token}"
    headers: bearerToken 
      ? { 'Accept': 'application/json', 'Authorization': `Bearer ${bearerToken}` }
      : { ...headers, 'Content-type': 'application/json; charset=UTF-8' } 
  })
    .then(res => res.json());
};
