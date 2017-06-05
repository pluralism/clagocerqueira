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


export function isActiveTab(tab, state) {
  return state.activeTab === tab;
}


export function isValidPhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^\+?(\d{9,})$/;
    return phoneNumberRegex.test(phoneNumber) === true;
}


export function isValidEmail(email) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email) === true;
}