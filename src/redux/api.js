import axios from "axios";

const apiUrl = (endpoint) => {
  return window.API_BASE_URL + window.API_PATH + endpoint;
}


export function postApi(endpoint, data) {
  return axios({
    method: "post",
    url: apiUrl(endpoint),
    data: data,
  });
}


export function getApi(endpoint, params) {
  return axios({
    method: "get",
    url: apiUrl(endpoint),
    params: params,
  });
}


export function deleteApi(endpoint, params) {
  return axios({
    method: "delete",
    url: apiUrl(endpoint),
    params: params
  })
}
