import React, { memo, useEffect, useState } from "react";

import OrbRadio from "../../component/OrdRadio";

import TelemetryTimelineCharts from "../../component/TelemetryTimelineCharts";
import axiosInstance from "../../lib/axios";
import styles from "../../styles/Home.module.scss";

const index = memo(({ LeftComponent, type = "detail", ...extraProps }) => {
  const [performanceData, setPerformanceData] = useState([]);
  const [totalClicks, setTotalClicks] = useState(0);
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
        console.log(response.data);
        setPerformanceData([...response.data.performanceDetail]);
        setTotalClicks(response.data?.summary?.[0]?.id || 0);
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
      <LeftComponent totalClicks={totalClicks} />
      <TelemetryTimelineCharts performanceData={performanceData} />
    </>
  );
});

export default index;
