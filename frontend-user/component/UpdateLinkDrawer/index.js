import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADED } from "../../constants";
import { postUpdateMinifyLink } from "../../lib/slices/minify";
import { getMinifyDetail, updateMinifyStatus } from "../../redux/selectors";
import styles from "../../styles/Home.module.scss";
import SideDrawer from "../SideDrawer";

const index = ({ sideDrawerOpen, onSideDrawerClosed, minifyIdentity }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => getMinifyDetail(state));
  const updateMinifyState = useSelector((state) => updateMinifyStatus(state));
  const { requestState, error } = updateMinifyState;
  const [textValue, textValueChange] = useState(data?.originalLink || "");
  const [titleValue, titleValueChange] = useState(data?.title || "");
  const [isSideDrawerOpen, changeSideDrawerOpen] = useState(false);

  const toggleSideDrawerOpen = () => {
    changeSideDrawerOpen((prevState) => !prevState);
  };

  const onOverlayClicked = () => {
    toggleSideDrawerOpen();
    textValueChange("");
    titleValueChange("");
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

  const handleTitleValueChange = (event) => {
    titleValueChange(event.target.value);
  };

  const onClickedOnCreateButton = useCallback(() => {
    dispatch(
      postUpdateMinifyLink({
        original_url: textValue,
        title: titleValue,
        minify_id: minifyIdentity,
      })
    );
  }, [textValue, titleValue, minifyIdentity]);

  useEffect(() => {
    if (requestState === LOADED) {
      toggleSideDrawerOpen();
    }
  }, [requestState]);

  return (
    <SideDrawer
      sideDrawerOpen={isSideDrawerOpen}
      sideDrawerHeaderText={"Update Link"}
      onOverlayClicked={onOverlayClicked}
      onToggle={toggleSideDrawerOpen}
      sideDrawerContentElement={
        <CreateLinkDrawerContent
          handleTextAreaChange={handleTextAreaChange}
          textValue={textValue}
          titleValue={titleValue}
          titleValueChange={handleTitleValueChange}
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

const CreateLinkDrawerContent = ({
  handleTextAreaChange,
  textValue,
  titleValue,
  titleValueChange,
}) => {
  return (
    <>
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
      <div className={styles.input}>
        <label className={styles.inputLabel}>Enter Title</label>
        <input
          className={styles.inputText}
          autoComplete="off"
          onChange={titleValueChange}
          value={titleValue}
        />
      </div>
    </>
  );
};

const CreateLinkDrawerBottom = memo(({ onClickedOnCreateButton }) => {
  return (
    <div>
      <button
        type="button"
        className={styles.createButtonLink}
        onClick={onClickedOnCreateButton}
      >
        update
      </button>
    </div>
  );
});

export default memo(index);
