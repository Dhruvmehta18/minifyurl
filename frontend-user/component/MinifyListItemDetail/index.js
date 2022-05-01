import React, { memo, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "../../styles/Home.module.scss";
import { getMinifyDetail } from "../../redux/selectors";
import { connect, useDispatch, useSelector } from "react-redux";
import { LOADED } from "../../constants";
import { fetchMinifyDetail } from "../../lib/slices/minify";
import getRedirectUrl from "../../lib/utility/getRedirectUrl";
import { REDIRECT_SERVICE_URL } from "../../lib/config/config";
import PerformanceChart from "../PerformanceChart";

const index = ({ minifyIdentity }) => {
  const dispatch = useDispatch();
  const minifyDetail = useSelector((state) => getMinifyDetail(state));
  const { requestState, data: mininfyData, error } = minifyDetail;
  const options = {
    chart: {
      type: "column",
      backgroundColor: "#2b3d4b",
      height: 225,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      startOnTick: true,
      tickInterval: 86400000,
      tickWidth: 1,
      tickColor: "#35637C",
      lineColor: "#35637C",
      dateTimeLabelFormats: {
        day: "%b %e",
      },
      labels: {
        step: 7,
      },
    },
    yAxis: {
      min: 0,
      visible: false,
    },
    tooltip: {
      formatter: function () {
        return (
          Highcharts.dateFormat("%A, %b %e", this.x) +
          "<br/>" +
          "Total Clicks: <b>" +
          this.y +
          "</b>"
        );
      },
      nullFormatter: function () {
        return (
          Highcharts.dateFormat("%A, %b %e", this.x) +
          "<br/>" +
          "Total Clicks: 0"
        );
      },
      outside: true,
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        width: 100,
      },
    },
    series: [
      {
        showInLegend: false,
        name: "",
        data: [
          [Date.UTC(2021, 3, 1, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 2, 0, 0, 0, 0), 13],
          [Date.UTC(2021, 3, 3, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 4, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 5, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 6, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 7, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 8, 0, 0, 0, 0), 13],
          [Date.UTC(2021, 3, 9, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 10, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 11, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 12, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 13, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 14, 0, 0, 0, 0), 0],
          [Date.UTC(2021, 3, 15, 0, 0, 0, 0), 18],
          [Date.UTC(2021, 3, 16, 0, 0, 0, 0), 12],
          [Date.UTC(2021, 3, 17, 0, 0, 0, 0), 13],
          [Date.UTC(2021, 3, 18, 0, 0, 0, 0), 18],
          [Date.UTC(2021, 3, 19, 0, 0, 0, 0), 12],
          [Date.UTC(2021, 3, 20, 0, 0, 0, 0), 13],
          [Date.UTC(2021, 3, 21, 0, 0, 0, 0), 18],
          [Date.UTC(2021, 3, 22, 0, 0, 0, 0), 12],
          [Date.UTC(2021, 3, 23, 0, 0, 0, 0), 13],
          [Date.UTC(2021, 3, 24, 0, 0, 0, 0), 18],
          [Date.UTC(2021, 3, 25, 0, 0, 0, 0), 12],
          [Date.UTC(2021, 3, 26, 0, 0, 0, 0), 13],
          [Date.UTC(2021, 3, 27, 0, 0, 0, 0), 18],
          [Date.UTC(2021, 3, 28, 0, 0, 0, 0), 12],
          [Date.UTC(2021, 3, 29, 0, 0, 0, 0), 13],
          [Date.UTC(2021, 3, 30, 0, 0, 0, 0), 18],
          [Date.UTC(2021, 3, 31, 0, 0, 0, 0), 12],
        ],
      },
    ],
  };
  const pieChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "",
    },
    colors: [
      "#435f72",
      "#496e84",
      "#4f7e96",
      "#538fa8",
      "#579fba",
      "#5bb0cc",
      "#5ec2de",
      "#62d4ef",
      "#65e6ff",
    ],
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    legend: {
      layout: "proximate",
      align: "right",
      floating: true,
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        innerSize: "60%",
        data: [
          {
            name: "Chrome",
            y: 61.41,
          },
          {
            name: "Internet Explorer",
            y: 11.84,
          },
          {
            name: "Firefox",
            y: 10.85,
          },
          {
            name: "Edge",
            y: 4.67,
          },
          {
            name: "Safari",
            y: 4.18,
          },
          {
            name: "Sogou Explorer",
            y: 1.64,
          },
          {
            name: "Opera",
            y: 1.6,
          },
          {
            name: "QQ",
            y: 1.2,
          },
          {
            name: "Other",
            y: 2.61,
          },
        ],
      },
    ],
  };

  const linkData = {
    ...options,
    chart: {
      ...options.chart,
      backgroundColor: "#fff",
    },
  };
  useEffect(() => {
    if (minifyIdentity && minifyIdentity !== "") {
      dispatch(fetchMinifyDetail(minifyIdentity));
    }
  }, [minifyIdentity]);
  return (
    <div className={styles.linkData}>
      {minifyIdentity && minifyIdentity !== "" && requestState === LOADED && (
        <div>
          <div className={styles.mainData}>
            <div className={styles.mainDataTopRow}>
              <time dateTime="2021-10-27">{`CREATED ${mininfyData.creationTime}`}</time>
              <span>
                <span className={styles.infoWrapper_Divider}>|</span>
                <span className="item-detail--created-link">
                  {mininfyData.userId}
                </span>
              </span>
            </div>
            <div className={styles.mainDataSecondRow}>
              <h3 className={styles.linkDataTitle}>first</h3>
              <small>
                <a
                  className={styles.linkDataOriginalLink}
                  href={mininfyData.originalLink}
                  target="_blank"
                >
                  {mininfyData.originalLink}
                </a>
              </small>
            </div>
            <div className={styles.mainDataBottomRow}>
              <div className={styles.bottomRowItem}>
                <a
                  href={getRedirectUrl(mininfyData.minifyId)}
                  className={styles.shortLink}
                  target="_blank"
                >
                  {REDIRECT_SERVICE_URL}/<b>{mininfyData.minifyId}</b>
                </a>
              </div>
              <div className={styles.bottomRowItem}>
                <button>Copy</button>
              </div>

              <div className={styles.bottomRowItem}>
                <button>Share</button>
              </div>

              <div className={styles.bottomRowItem}>
                <button>Edit</button>
              </div>
              <div className={styles.bottomRowItem}>
                <button>Redirect</button>
              </div>

              <div className={styles.bottomRowItem}>
                <button>Qr Code</button>
              </div>
            </div>
          </div>
          <div className={styles.clicksData}>
            <PerformanceChart LeftComponent={LeftClicksData} type="detail" minifyIdentity={minifyIdentity}/>
          </div>
          <div className={styles.referrerBlock}>
            <div className={styles.referrerTitle}>
              <h2>Referrer</h2>
            </div>
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={pieChartOptions}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LeftClicksData = memo(({totalClicks}) => {
  return (
    <div className={styles.totalClicksDisplay}>
      <div className={styles.totalClicksTitle}>
        <span className={styles.totalClicksData}>{totalClicks}</span>
        <span className={styles.totalClicksIcon}>icon</span>
      </div>
      <div className={styles.totalClicksDescription}>
        <small>Total Click</small>
      </div>
    </div>
  );
});

export default index;
