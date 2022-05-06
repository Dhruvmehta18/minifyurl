import React, { memo, useCallback, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styles from "../../styles/Home.module.scss";
import { getMinifyDetail } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { LOADED } from "../../constants";
import { fetchMinifyDetail } from "../../lib/slices/minify";
import getRedirectUrl from "../../lib/utility/getRedirectUrl";
import { REDIRECT_SERVICE_URL } from "../../lib/config/config";
import PerformanceChart from "../PerformanceChart";
import PieChart from "../PieChart";
import useToggle from "../../hooks/useToggle";

const index = ({ minifyIdentity }) => {
  const dispatch = useDispatch();
  const minifyDetail = useSelector((state) => getMinifyDetail(state));
  const { requestState, data: minifyData } = minifyDetail;

  const [teleRefSplitUp, setTeleRefSplitUp] = useState([]);
  const [isQrcodeDisplay, toggleIsQrCodeDisplay] = useToggle();

  const onPerformanceDataFetch = (data) => {
    const { telemetryRefererSplitUp } = data;
    console.log(telemetryRefererSplitUp);
    setTeleRefSplitUp([...telemetryRefererSplitUp]);
  };

  const onQrButtonClicked = useCallback(()=>{
    toggleIsQrCodeDisplay();
  }, [isQrcodeDisplay]);

  useEffect(() => {
    if (minifyIdentity && minifyIdentity !== "") {
      dispatch(fetchMinifyDetail(minifyIdentity));
    }
  }, [minifyIdentity]);

  return (
    <div className={styles.linkData}>
      {minifyIdentity && minifyIdentity !== "" && requestState === LOADED && (
        <>
          {isQrcodeDisplay && (
            <div className={styles.qrcodeContainer}>
              <div className={styles.qrcodeWrapper} onClick={onQrButtonClicked}>
                <div className={styles.qrcodeElementWrapper}>
                  <QRCodeCanvas
                    value={getRedirectUrl(minifyData.minifyId)}
                    size={200}
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <div className={styles.mainData}>
              <div className={styles.mainDataTopRow}>
                <time dateTime="2021-10-27">{`CREATED ${minifyData.creationTime}`}</time>
                <span>
                  <span className={styles.infoWrapper_Divider}>|</span>
                  <span className="item-detail--created-link">
                    {minifyData.userId}
                  </span>
                </span>
              </div>
              <div className={styles.mainDataSecondRow}>
                <h3 className={styles.linkDataTitle}>first</h3>
                <small>
                  <a
                    className={styles.linkDataOriginalLink}
                    href={minifyData.originalLink}
                    target="_blank"
                  >
                    {minifyData.originalLink}
                  </a>
                </small>
              </div>
              <div className={styles.mainDataBottomRow}>
                <div className={styles.bottomRowItem}>
                  <a
                    href={getRedirectUrl(minifyData.minifyId)}
                    className={styles.shortLink}
                    target="_blank"
                  >
                    {REDIRECT_SERVICE_URL}/<b>{minifyData.minifyId}</b>
                  </a>
                </div>
                <div className={styles.bottomRowItem}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        getRedirectUrl(minifyData.minifyId)
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>

                <div className={styles.bottomRowItem}>
                  <button>Edit</button>
                </div>

                <div className={styles.bottomRowItem}>
                  <button onClick={onQrButtonClicked}>Qr Code</button>
                </div>
              </div>
            </div>
            <div className={styles.clicksData}>
              <PerformanceChart
                LeftComponent={LeftClicksData}
                type="detail"
                minifyIdentity={minifyIdentity}
                onFetch={onPerformanceDataFetch}
              />
            </div>
            <div className={styles.referrerBlock}>
              <div className={styles.referrerTitle}>
                <h2>Referrer</h2>
              </div>
              <div>
                <PieChart data={teleRefSplitUp} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const LeftClicksData = memo(({ totalClicks }) => {
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
