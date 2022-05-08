import React, { memo, useCallback, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { LOADED } from "../../constants";
import { postCreateMinifyLink } from "../../lib/slices/minify";
import { createMinifyStatus } from "../../redux/selectors";
import styles from "../../styles/Home.module.scss";
import SideDrawer from "../SideDrawer";

const index = ({ sideDrawerOpen, onSideDrawerClosed }) => {
  const dispatch = useDispatch();
  const createMinifyState = useSelector((state) => createMinifyStatus(state));
  const { requestState, error } = createMinifyState;
  const [textValue, textValueChange] = useState("");
  const [isSideDrawerOpen, changeSideDrawerOpen] = useState(sideDrawerOpen);

  const toggleSideDrawerOpen = () => {
    changeSideDrawerOpen((prevState) => !prevState);
  };

  const onOverlayClicked = () => {
    toggleSideDrawerOpen();
    textValueChange("");
  };

  useEffect(() => {
    changeSideDrawerOpen(sideDrawerOpen);
  }, [sideDrawerOpen]);

  useEffect(() => {
    if (!isSideDrawerOpen) {
      onSideDrawerClosed();
    }
  }, [isSideDrawerOpen]);

  const handleTextAreaChange = (event) => {
    textValueChange(event.target.value);
  };

  const onClickedOnCreateButton = useCallback(() => {
    dispatch(postCreateMinifyLink(textValue));
  }, [textValue]);

  useEffect(() => {
    if (requestState === LOADED) {
      toggleSideDrawerOpen();
    }
  }, [requestState]);

  return (
    <SideDrawer
      sideDrawerOpen={isSideDrawerOpen}
      sideDrawerHeaderText={"Create Link"}
      onOverlayClicked={onOverlayClicked}
      onToggle={toggleSideDrawerOpen}
      sideDrawerContentElement={
        <CreateLinkDrawerContent
          handleTextAreaChange={handleTextAreaChange}
          textValue={textValue}
        />
      }
      sideDrawerBottomElement={
        <CreateLinkDrawerBottom
          onClickedOnCreateButton={onClickedOnCreateButton}
        />
      }
    />
  );
};

const CreateLinkDrawerContent = ({ handleTextAreaChange, textValue }) => {
  return (
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
  );
};

const CreateLinkDrawerBottom = ({ onClickedOnCreateButton }) => {
  return (
    <div>
      <button
        type="button"
        className={styles.createButtonLink}
        onClick={onClickedOnCreateButton}
      >
        create
      </button>
    </div>
  );
};

export default memo(index);
