import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.dashboardContainer}>
        {/*timeline charts*/}
        <div>

        </div>
        {/*links*/}
        <div className={styles.linksWrapper}>
          <div className={styles.linksContainer}>
            <div className={styles.linksList}>
              <div>{[...Array(10)].map((x, i) =>
                <div className={styles.linkListItemWrapper} key={i}>

                  <div className={styles.linkListItem} >
                    <div className={styles.checkboxContainer}>
                        <span className={styles.itemCheckbox}>
                          <div className="checkbox--SMALL">
                          <input
                            id="3wUECjG" type="checkbox" className="checkbox--input"/>
                          <label tabIndex="0" htmlFor="3wUECjG" className="checkmark-icon checkbox-icon">
                          </label>
                        </div>
                        </span>
                    </div>
                    <div className={styles.listItemData}>
                      <div className={styles.topLineData}>
                        <time className={styles.linkCreatedAt} dateTime="2020-02-26">Feb 16</time>
                        <div className={styles.iconTags}>
                          tags
                        </div>
                      </div>
                      <div className={styles.secondLineData}>
                        <div className={styles.linkTitle}>Designing a URL Shortening service like TinyURL - Grokking the System Design Interview</div>
                      </div>
                      <div className={styles.bottomLineData}>
                        <a href="https://bit.ly/first-35G" className={styles.shortLink}>bit.ly/first-35G</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

                </div>
            </div>
            <div className={styles.linkData}>
              <div className={styles.mainData}>
                <div className={styles.mainDataTopRow}>
                  <time dateTime="2021-10-27">
                    CREATED OCT 27, 2020, 12:20 PM
                  </time>
                  <span><span className="info-wrapper--divider">|</span><span className="item-detail--created-link">Dhruv Mehta</span></span>
                </div>
                <div className={styles.mainDataSecondRow}>
                  <h3 className={styles.linkDataTitle}>
                    first
                  </h3>
                  <small><a className={styles.linkDataOriginalLink} href="https://teams.microsoft.com/_#/school/tab::3717002657/19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2?threadId=19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2&messageId=classroom&replyChainId=1603798096840&ctx=channel" target="_blank">https://teams.microsoft.com/_#/school/tab::3717002657/19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2?threadId=19:5b8dd51c766e45c3968b7062d3a58878@thread.tacv2&messageId=classroom&replyChainId=1603798096840&ctx=channel</a></small>
                </div>
                <div className={styles.mainDataBottomRow}>
                  <div className={styles.bottomRowItem}>
                    <a href="https://bit.ly/first-35G" className={styles.shortLink}>bit.ly/first-35G</a>
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
                <div>
                {/*  clicks time graph */}
                </div>
              </div>
              <div className={styles.referrerBlock}>
                <div className={styles.referrerTitle}>
                  <h2>Referrer</h2>
                </div>
                <div>
                {/*  referrer graphs */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
