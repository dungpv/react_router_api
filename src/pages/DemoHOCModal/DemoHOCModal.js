import React from "react";
import { useDispatch } from "react-redux";
import SlideDown from "../../HOC/Modal/SlideDown";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function DemoHOCModal() {
  const LoginWithSlideDown = () => new SlideDown(Login);

  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Login></Login>,
          });
        }}
      >
        Đăng nhập
      </button>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Register></Register>,
          });
        }}
      >
        Đăng ký
      </button>

      <LoginWithSlideDown></LoginWithSlideDown>
    </div>
  );
}
