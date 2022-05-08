import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../lib/axios";
import { fetchUser } from "../../lib/slices/auth";

export const AuthGuard = ({ children, redirectTo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // Get `me` object from client side redux store.
  const { loading, me, fetchUserCount, accessToken, refreshToken } =
    useSelector((state) => state.authReducer);

  const [accessTokenState, setAccessTokenState] = useState(accessToken);
  const [tryFetchUser, setTryFetchUser] = useState(fetchUserCount);

  useEffect(() => {
    if (!accessTokenState && loading !== "loading" && me == null) {
      const isAccessTokenEmpty =
        accessTokenState === null || accessTokenState === "";
      if (isAccessTokenEmpty) {
        if (localStorage.getItem("accessToken")) {
          setAccessTokenState(localStorage.getItem("accessToken"));
        } else {
          setTimeout(() => {
            router.push(redirectTo || "/login");
          }, 1200);
        }
      } else {
        dispatch(fetchUser());
      }
    } else {
      dispatch(fetchUser());
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    }
  }, [loading, me, accessToken, refreshToken, tryFetchUser, fetchUserCount]);
  // Loading indicator
  if (loading === "loading") {
    return <></>;
  }
  // Without role allow all authorized users
  if (accessTokenState) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};
