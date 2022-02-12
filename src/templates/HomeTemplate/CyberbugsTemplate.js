import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import ModalCyberbugsHOC from "../../HOC/CyberbugsHOC/ModalCyberbugsHOC";
import "../../index.css";

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            {/* <!-- BODY --> */}
            <div className="jira">
              <SidebarCyberbugs></SidebarCyberbugs>
              <MenuCyberbugs></MenuCyberbugs>
              <Component {...propsRoute}></Component>
            </div>

            <ModalCyberBugs></ModalCyberBugs>
            <ModalCyberbugsHOC></ModalCyberbugsHOC>
          </>
        );
      }}
    />
  );
};
