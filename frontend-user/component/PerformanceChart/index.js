import React, { memo, useEffect, useState } from "react";

import TelemetryTimelineCharts from "../../component/TelemetryTimelineCharts";
import axiosInstance from "../../lib/axios";

const index = memo(({ LeftComponent, type = "detail", ...extraProps }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalReferer, setTotalReferer] = useState(0);
  useEffect(() => {
    const fetchPerformance = async () => {
      const date = new Date();
      const params = {
        clickMonth: date.getMonth() + 1,
        clickYear: date.getFullYear(),
      };
      if (type === "detail") {
        params = {
          ...params,
          minifyId: extraProps.minifyIdentity,
        };
      }
      const queryString = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&");
      axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
      const response = await axiosInstance.get(
        `api/telemetry/fetchPerformance?${queryString}`
      );
      if (response.status === 200) {
        setPerformanceData([...response.data.performanceDetail]);
        setTotalClicks(response.data?.summary?.totalClick || 0);
        setTotalReferer(response.data?.summary?.totalReferer || 0);
        extraProps.onFetch && extraProps.onFetch(response.data);
      }
    };
    let myTimeout;
    myTimeout = setTimeout(() => {
      fetchPerformance();
    }, 1000);
    return () => {
      if (myTimeout) clearTimeout(myTimeout);
    };
  }, []);

  return (
    <>
      <LeftComponent totalClicks={totalClicks} totalReferer={totalReferer} />
      <TelemetryTimelineCharts performanceData={performanceData} />
    </>
  );
});

export default index;
