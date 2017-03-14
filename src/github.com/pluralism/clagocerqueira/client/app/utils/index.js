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


export function checkStatus(response) {
  if(response.status >= 200 && response < 300)
    return response;
  else{
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}


export function httpPost(url, data) {
  const body = JSON.stringify(data);

  return fetch(url, {
    method: 'post',
    headers: buildHeaders(),
    body: body
  })
  .then(checkStatus)
  .then(parseJSON);
}



export function httpPostGraphQL(data) {
  httpPost('/graphql', data);
}
