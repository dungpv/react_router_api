import React, { useState } from "react";
import { Drawer, Button, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from "../../redux/constants/Cyberbugs/Cyberbugs";

export default function ModalCyberbugsHOC(props) {
  const {
    visible,
    title,
    ComponentContentModal,
    textButtonSubmit,
    callBackSubmit,
  } = useSelector((state) => state.ModalCyberbugsReducer);

  const dispatch = useDispatch();

  const showModal = () => {
    dispatch({
      type: OPEN_MODAL,
    });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_MODAL,
    });
  };
  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onOk={callBackSubmit}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={callBackSubmit}>
            {textButtonSubmit}
          </Button>,
        ]}
      >
        {ComponentContentModal}
      </Modal>
    </>
  );
}
