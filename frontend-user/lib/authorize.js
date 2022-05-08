import * as setCookie from "set-cookie-parser";
import * as cookie from "cookie";
import { fetchUser, reset, updateAccessToken } from "./slices/auth";
import { wrapper } from "./store";
import axiosInstance from "./axios";

export const authorize = async ( store, context, callback ) => {
  const { req, res } = context;
  const { dispatch } = store; // get dispatch action
  const { accessToken, refreshToken } = store.getState().authReducer; // get accessToken from memory - redux.
  if (req) {
    axiosInstance.defaults.headers.cookie = req.headers.cookie || null;

    if (accessToken)
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    if (!accessToken) {
      // No accessToken path: Try to refresh the token.
      try {
        const response = await axiosInstance.post("/api/refreshToken", {
          refreshToken: refreshToken,
        });
        const newAccessToken = response.data.access.token;
        const newRefreshToken = response.data.refresh.token;
        const responseCookie = {
          name: "refresh-tokens",
          value: response.data.refresh.token,
        };
        axiosInstance.defaults.headers.cookie = cookie.serialize(
          responseCookie.name,
          responseCookie.value
        );
        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        res.setHeader("set-cookie", response.headers["set-cookie"]);
        await dispatch(
          updateAccessToken({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );
      } catch (error) {
        store.dispatch(reset());
        return null;
      }
    }

    try {
      const cbResponse = await callback(accessToken, store, res);
      if (axiosInstance.defaults.headers.setCookie) {
        res.setHeader("set-cookie", axiosInstance.defaults.headers.setCookie);
        await dispatch(
          updateAccessToken({
            accessToken: axiosInstance.defaults.headers.Authorization.split(" ")[1],
            refreshToken: refreshToken,
          })
        );
        delete axiosInstance.defaults.headers.setCookie;
      }
      return cbResponse;
    } catch (e) {
      store.dispatch(reset());
      return null;
    }
  }
};
// 1. We use wrapper from next-wrapper-redux library to wrap our gerServerSideProps
// with our redux store.
// property "context" contains req, res
export const user = ({ callback }) =>{
  return wrapper.getServerSideProps((store) => (context) => {
    const { dispatch } = store;
    // 2. Call our authorize Higher order Function
    const callbackAuth = (callback) => async (...props) => {
      // 3. If we currently don't have our user fetched
      // Then we're not authorized.
      // So try to fetch the user.
      if (!store.getState().authReducer.me)
        await dispatch(fetchUser());
      // 4. return the response from the callback
      return await callback(...props);
    }
    return authorize(
      store,
      context,
      callbackAuth(callback)
    );
  })};
