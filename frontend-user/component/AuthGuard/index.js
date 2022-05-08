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

  const [accessTokenState, setAccessTokenState] = useState(accessToken)
  const [tryFetchUser, setTryFetchUser] = useState(fetchUserCount);

  useEffect(() => {
    console.log(accessTokenState, fetchUserCount, tryFetchUser);
    if (loading !== "loading" && me == null) {
      const isAccessTokenEmpty = accessTokenState == null || accessTokenState == "";
      if(isAccessTokenEmpty){
        setAccessTokenState(localStorage.getItem("accessToken"));
      }
      if ( !isAccessTokenEmpty && tryFetchUser == fetchUserCount
      ) {
        dispatch(fetchUser());
        setTryFetchUser(true);
      }
      if (isAccessTokenEmpty || tryFetchUser < fetchUserCount) router.push(redirectTo || "/login");
    } else {
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
  if (me) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};
