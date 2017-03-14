import fetch from 'isomorphic-fetch';


const defaultHeaders = {
  /**
   * Content-Type header: Indicates the media type of the entity-body
   * sent to the recipient
  */
  'Content-Type': 'application/graphql'
};


function buildHeaders() {
  return { ...defaultHeaders };
}


export function parseJSON(response) {
  return response.json();
}


function checkStatus(response) {
  // HTTP 2xx - success
  if(response.status >= 200 && response.status < 300)
    return response;
  else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}


export function httpPost(url, data) {
  return fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: data
  })
  .then(checkStatus)
  .then(parseJSON);
}



export function httpPostGraphQL(data) {
  return httpPost('/graphql', data);
}
