import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import Modal from "./HOC/Modal/Modal";
import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberBugs from "./pages/CyberBugs/ProjectDetail/indexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import UserManagement from "./pages/CyberBugs/UserManagement/UserManagement";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <>
      {/* <Modal></Modal> */}
      <DrawerCyberbugs></DrawerCyberbugs>
      <LoadingComponent></LoadingComponent>
      <Switch>
        {/* <Route
          exact
          path="/home"
          render={(propsRoute) => {
            return (
              <div>
                <Header />
                <Home {...propsRoute} />
              </div>
            );
          }}
        /> */}
        <HomeTemplate path="/home" exact Component={Home} />

        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <HomeTemplate path="/dragdrop" exact Component={DemoDragDrop} />
        <HomeTemplate
          path="/demodragdropdnd"
          exact
          Component={DragAndDropDnD}
        />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/todolistrfc" Component={TodolistRFC} />
        <HomeTemplate exact path="/todolistrcc" Component={Todolist} />
        <HomeTemplate exact path="/todolistredux" Component={ToDoListRedux} />
        <HomeTemplate
          exact
          path="/todolistsaga"
          Component={BaiTapToDoListSaga}
        />
        <HomeTemplate exact path="/demohocmodal" Component={DemoHOCModal} />
        <CyberbugsTemplate exact path="/cyberbugs" Component={indexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <CyberbugsTemplate
          exact
          path="/projectdetail/:projectId"
          Component={indexCyberBugs}
        />
        <CyberbugsTemplate
          exact
          path="/usermanagement"
          Component={UserManagement}
        />
        <CyberbugsTemplate exact path="/" Component={ProjectManagement} />
        <HomeTemplate exact path="*" Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
