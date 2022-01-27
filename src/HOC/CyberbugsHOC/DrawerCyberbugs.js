import React, { useState } from "react";
import { Drawer, Button, Select, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
} from "../../redux/constants/Cyberbugs/Cyberbugs";

export default function DrawerCyberbugs(props) {
  const { visible, title, ComponentContentDrawer, callBackSubmit } =
    useSelector((state) => state.drawerReducer);

  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER,
    });
  };

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
  };

  return (
    <>
      {/* <Button onClick={showDrawer}>Show Drawer</Button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {/* Nội dung thay đổi của drawer */}
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
