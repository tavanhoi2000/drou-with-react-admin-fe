import axios from "axios";

export const LOGIN_URL = window.API_BASE_URL + "/api/admin/login";
export const REGISTER_URL = window.API_BASE_URL + "/api/auth/register";
export const REQUEST_PASSWORD_URL = window.API_BASE_URL + "/api/auth/forgot-password";

export const ME_URL = window.API_BASE_URL + "/api/auth/me";

export function login(params) {
  const bodyFormData = new FormData();
  Object.keys(params).forEach((key) => {
    bodyFormData.append(key, params[key]);
  });

  return axios({
    method: "post",
    url: LOGIN_URL,
    data: bodyFormData,
  });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
