import Head from "next/head";
import styles from "../styles/Home.module.scss";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function Home() {
  const options = {
    chart: {
      type: "column",
      backgroundColor: "#2b3d4b",
    },
    title: {
      text: ""
    },
    xAxis: {
      type: "datetime",
      startOnTick: true,
      tickInterval: 86400000,
      tickWidth: 1,
      tickColor: "#35637C",
      lineColor: "#35637C",
      dateTimeLabelFormats: {
        day: "%b %e"
      },
      labels: {
        step: 7
      }
    },
    yAxis: {
      min: 0,
      visible: false,
    },
    tooltip: {
      formatter: function () {
        return Highcharts.dateFormat("%A, %b %e", this.x) + "<br/>" + "Total Clicks: <b>" + this.y + "</b>";
      },
      nullFormatter: function(){ 
        return Highcharts.dateFormat("%A, %b %e", this.x) + "<br/>" + "Total Clicks: 0" ;
      },
      outside: true
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
      text: "Browser market shares in January, 2018",
    },
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
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
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
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.dashboardContainer}>
        {/*timeline charts*/}
        <div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        {/*links*/}
        <div className={styles.linksWrapper}>
          <div className={styles.linksContainer}>
            <div className={styles.linksList}>
              <div>
                {[...Array(15)].map((x, i) => (
                  <div className={styles.linkListItemWrapper} key={i}>
                    <div className={styles.linkListItem}>
                      <div className={styles.checkboxContainer}>
                        <span className={styles.itemCheckbox}>
                          <div className="checkbox--SMALL">
                            <input
                              id="3wUECjG"
                              type="checkbox"
                              className="checkbox--input"
                            />
                            <label
                              tabIndex="0"
                              htmlFor="3wUECjG"
                              className="checkmark-icon checkbox-icon"
                            ></label>
                          </div>
                        </span>
                      </div>
                      <div className={styles.listItemData}>
                        <div className={styles.topLineData}>
                          <time
                            className={styles.linkCreatedAt}
                            dateTime="2020-02-26"
                          >
                            Feb 16
                          </time>
                          <div className={styles.iconTags}>tags</div>
                        </div>
                        <div className={styles.secondLineData}>
                          <div className={styles.linkTitle}>
                            Designing a URL Shortening service like TinyURL -
                            Grokking the System Design Interview
                          </div>
                        </div>
                        <div className={styles.bottomLineData}>
                          <a
                            href="https://bit.ly/first-35G"
                            className={styles.shortLink}
                          >
                            bit.ly/first-35G
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.linkData}>
              <div className={styles.mainData}>
                <div className={styles.mainDataTopRow}>
                  <time dateTime="2021-10-27">
                    CREATED OCT 27, 2020, 12:20 PM
                  </time>
                  <span>
                    <span className={styles.infoWrapper_Divider}>|</span>
                    <span className="item-detail--created-link">
                      Dhruv Mehta
                    </span>
                  </span>
                </div>
                <div className={styles.mainDataSecondRow}>
                  <h3 className={styles.linkDataTitle}>first</h3>
                  <small>
                    <a
                      className={styles.linkDataOriginalLink}
                      href="https://teams.microsoft.com/_#/school/tab::3717002657/19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2?threadId=19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2&messageId=classroom&replyChainId=1603798096840&ctx=channel"
                      target="_blank"
                    >
                      https://teams.microsoft.com/_#/school/tab::3717002657/19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2?threadId=19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2&messageId=classroom&replyChainId=1603798096840&ctx=channel
                    </a>
                  </small>
                </div>
                <div className={styles.mainDataBottomRow}>
                  <div className={styles.bottomRowItem}>
                    <a
                      href="https://bit.ly/first-35G"
                      className={styles.shortLink}
                    >
                      bit.ly/first-35G
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
                <div className={styles.totalClicksDisplay}>
                  <div className={styles.totalClicksTitle}>
                    <span className={styles.totalClicksData}>10</span>
                    <span className={styles.totalClicksIcon}>icon</span>
                  </div>
                  <div className={styles.totalClicksDescription}>
                    <small>Total Click</small>
                  </div>
                </div>
                <div>{/*  clicks time graph */}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
