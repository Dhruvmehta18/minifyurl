import Head from "next/head";

import { memo, useState } from "react";
import dynamic from "next/dynamic";

import SideDrawer from "../component/SideDrawer";
import LinksContainer from "../component/LinksContainer";
import PerformanceChart from "../component/PerformanceChart";
import OrdRadio from "../component/OrdRadio";
import styles from "../styles/Home.module.scss";
import CreateLinkDrawer from "../component/CreateLinkDrawer";

// Dynamicaly import the AuthGuard component.
const AuthGuard = dynamic(() =>
  import("../component/AuthGuard").then((mod) => mod.AuthGuard)
);

export const Home = () => {
  const [isSideDrawerOpen, changeSideDrawerOpen] = useState(false);

  const onSideDrawerClosed = () => {
    changeSideDrawerOpen(false);
  };

  const onCreateButtonClicked = () => {
    changeSideDrawerOpen(true);
  };

  return (
    <AuthGuard>
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
              <OrdRadio />
              <div className={styles.primaryLayoutBottomWrapper}>
                <PerformanceChart LeftComponent={leftDataComponent}  type="all"/>
              </div>
            </div>
          </div>
          <LinksContainer />
        </div>
        <CreateLinkDrawer
          sideDrawerOpen={isSideDrawerOpen}
          onSideDrawerClosed={onSideDrawerClosed}
        />
      </div>
    </AuthGuard>
  );
};

const leftDataComponent = memo(({ totalClicks, totalReferer }) => {
  return (
    <div className={styles.leftPerformanceContainer}>
      <div className={styles.leftPerformanceBottomContainer}>
        <div className={styles.totalNumbersItem}>
          <div className={styles.totalNumbers}>{totalClicks}</div>
          <div className={styles.totalNumbersLabel}>Total Clicks</div>
        </div>
        <div className={styles.totalNumbersItem}>
          <div className={styles.totalNumbers}>{totalReferer}</div>
          <div className={styles.totalNumbersLabel}>Referrers</div>
        </div>
      </div>
    </div>
  );
});

export default Home;
