import Head from "next/head";
import styles from "../styles/Home.module.scss";

import OrbRadio from "../component/OrdRadio";
import SideDrawer from "../component/SideDrawer";
import LinksContainer from "../component/LinksContainer";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState } from "react";

export default function Home() {
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

  const [isSideDrawerOpen, changeSideDrawerOpen] = useState(false);

  const onSideDrawerClosed = () => {
    changeSideDrawerOpen(false);
  };

  const onCreateButtonClicked = () => {
    changeSideDrawerOpen(true);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.dashboardContainer}>
        <nav className={styles.navigation}>
          <div className={styles.navigationWrapper}>
            <div className={styles.navItem}>
              <a aria-label="home" className={styles.brandContainer} href="/">
                <span className={styles.minifyBrand}>Minify</span>
              </a>
            </div>

            <div className={styles.navItem}>{/* search */}</div>
            <div
              className={[styles.navItem, styles.createButtonContainer].join(
                " "
              )}
            >
              <button
                type="button"
                className={styles.createButton}
                onClick={onCreateButtonClicked}
              >
                create
              </button>
            </div>
          </div>
        </nav>
        <div className={styles.primaryLayoutWrapper}>
          <div className={styles.performanceChartWrapper}>
            <OrbRadio />
            <div className={styles.primaryLayoutBottomWrapper}>
              <div className={styles.leftPerformanceContainer}>
                <div className={styles.leftPerformanceBottomContainer}>
                  <div className={styles.totalNumbersItem}>
                    <div className={styles.totalNumbers}>10</div>
                    <div className={styles.totalNumbersLabel}>Total Clicks</div>
                  </div>
                  <div className={styles.totalNumbersItem}>
                    <div className={styles.totalNumbers}>6</div>
                    <div className={styles.totalNumbersLabel}>Referrers</div>
                  </div>
                </div>
              </div>
              {/*timeline charts*/}
              <div className={styles.performaceChartContainer}>
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>
          </div>
        </div>

        {/*links*/}
        <LinksContainer/>
      </div>
      <SideDrawer
        sideDrawerOpen={isSideDrawerOpen}
        onSideDrawerClosed={onSideDrawerClosed}
      />
    </div>
  );
}
