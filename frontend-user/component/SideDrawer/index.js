import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { LOADED } from "../../constants";
import { postCreateMinifyLink } from "../../redux/actions";
import { createMinifyStatus } from "../../redux/selectors";
import styles from "../../styles/Home.module.scss";

const index = ({
  createMinifyLink,
  createMinifyState,
  sideDrawerOpen,
  onSideDrawerClosed,
}) => {
  const { requestState, error } = createMinifyState;
  const [isSideDrawerOpen, changeSideDrawerOpen] = useState(sideDrawerOpen);
  const [textValue, textValueChange] = useState("");

  const toggleSideDrawerOpen = () => {
    changeSideDrawerOpen((prevState) => !prevState);
  };

  const onOverlayClicked = () => {
    toggleSideDrawerOpen();
    textValueChange("");
  };

  const handleTextAreaChange = (event) => {
    textValueChange(event.target.value);
  };

  const onClickedOnCreateButton = () => {
    createMinifyLink(textValue);
  };

  useEffect(() => {
    changeSideDrawerOpen(sideDrawerOpen);
  }, [sideDrawerOpen]);

  useEffect(() => {
    console.log(isSideDrawerOpen);
    if (!isSideDrawerOpen) {
      onSideDrawerClosed();
    }
  }, [isSideDrawerOpen]);

  useEffect(() => {
    console.log(requestState);
    if (requestState === LOADED) {
      toggleSideDrawerOpen();
    }
  }, [requestState]);

  return (
    <div
      className={[
        styles.sideDrawerMain,
        isSideDrawerOpen ? styles.open : styles.close,
      ].join(" ")}
    >
      <div className={styles.sideOverlay} onClick={onOverlayClicked}></div>
      <div className={styles.sideDrawer}>
        <div className={styles.sideDrawerContainer}>
          <div className={styles.sideDrawerHeader}>
            <h2>Create Link</h2>
            <span className={styles.closeIcon} onClick={toggleSideDrawerOpen}>
              x
            </span>
          </div>

          <div className={styles.sideDrawerContent}>
            <div className={styles.input}>
              <label className={styles.inputLabel}>Enter Long Url</label>
              <textarea
                className={styles.inputText}
                rows="2"
                maxLength={6144}
                autoComplete="off"
                onChange={handleTextAreaChange}
                value={textValue}
              />
            </div>
          </div>

          <div className={styles.sideDrawerBottom}>
            <div>
              <button
                type="button"
                className={styles.createButtonLink}
                onClick={onClickedOnCreateButton}
              >
                create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStatesToProps = (state, _ownProps) => {
  return {
    createMinifyState: createMinifyStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMinifyLink: (textValue) => dispatch(postCreateMinifyLink(textValue)),
  };
};

export default memo(connect(mapStatesToProps, mapDispatchToProps)(index));
