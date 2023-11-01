import { actions } from "../redux/auth";
export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (request) => {
      const {
        auth: { authToken },
      } = store.getState();

      if (authToken) {
        request.headers.Authorization = `Bearer ${authToken}`;
      }

      return request;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/login" && err.response) {
        if (err.response.status === 401) {
          store.dispatch(actions.logout());
        }
      }

      Promise.reject(err);
    }
  );
}
