import React, { memo, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "../../styles/Home.module.scss";
import TelemetryByMonth from "../../lib/chartsOptions/TelemetryByMonth";

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
const getDaysInMonth = (month, year) => {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getSanitizedPerformanceData = (
  daysInMonth = [],
  performanceData = []
) => {
  let perfDataIndex = 0;
  let sanitArray = [];
  for (let i = 0; i < daysInMonth.length; i++) {
    const data = [daysInMonth[i], 0];
    if (
      performanceData &&
      performanceData.length !== 0 &&
      performanceData[perfDataIndex] &&
      performanceData[perfDataIndex]._id === i
    ) {
      data[1] = performanceData[perfDataIndex].clickCount;
      perfDataIndex++;
    }
    sanitArray.push(data);
  }
  return sanitArray;
};

const index = memo(({ performanceData = [] }) => {
  const date = new Date();
  const performanceDataConversion = useMemo(() => {
    const daysInMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
    const performanceArray = getSanitizedPerformanceData(
      daysInMonth,
      performanceData
    );
    return performanceArray;
  }, [performanceData]);

  const options = TelemetryByMonth(performanceDataConversion);

  return (
    <div className={styles.performaceChartContainer}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
});

export default index;
