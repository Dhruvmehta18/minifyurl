import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as cookie from "cookie";
import * as setCookie from "set-cookie-parser";

// Create axios instance.
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// Create axios interceptor
createAuthRefreshInterceptor(axiosInstance, (failedRequest) => {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log(refreshToken);
  axiosInstance.post("/api/refreshToken", {refreshToken: refreshToken}).then((resp) => {
    // 1a. Clear old helper cookie used in 'authorize.ts' higher order function.
    if (axiosInstance.defaults.headers.setCookie) {
      delete axiosInstance.defaults.headers.setCookie;
    }
    console.log(resp);
    const accessToken = resp.data.access.token;
    const refreshToken = resp.data.refresh.token;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    // 2. Set up new access token
    const bearer = `Bearer ${accessToken}`;
    axiosInstance.defaults.headers.Authorization = bearer;

    // 3. Set up new refresh token as cookie
    axiosInstance.defaults.headers.setCookie = resp.headers["set-cookie"];
    axiosInstance.defaults.headers.cookie = cookie.serialize(
      "refresh-tokens",
      refreshToken
    );
    // 4. Set up access token of the failed request.
    failedRequest.response.config.headers.Authorization = bearer;

    // 5. Retry the request with new setup!
    return Promise.resolve();
  })}
);

export default axiosInstance;
