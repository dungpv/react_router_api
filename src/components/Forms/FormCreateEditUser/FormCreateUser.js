import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Form, Input } from "antd";
import {
  SET_SUBMIT_CREATE_USER,
  SIGNUP_SAGA,
} from "../../../redux/constants/Cyberbugs/UserConstant";

function FormCreateUser(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;
  const dispatch = useDispatch();

  //componentdidmount
  useEffect(() => {
    dispatch({ type: SET_SUBMIT_CREATE_USER, submitFunction: handleSubmit });
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="createEditUser"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        email: values.email,
        phone: values.phoneNumber,
        name: values.name,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input name="email" onChange={handleChange} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          name="passWord"
          disabled={values.userId > 0 ? false : true}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          style={{
            width: "100%",
          }}
          name="phoneNumber"
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input name="name" onChange={handleChange} />
      </Form.Item>
    </Form>
  );
}

const CreateUserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = props;
    //console.log("userEdit", userEdit);
    if (userEdit?.userId > 0) {
      return {
        id: userEdit?.userId,
        email: userEdit.email,
        passWord: userEdit.passWord,
        name: userEdit.name,
        phoneNumber: userEdit.phoneNumber,
      };
    } else {
      return {
        email: "",
        passWord: "",
        name: "",
        phoneNumber: "",
      };
    }
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    //console.log("value", values);
    const action = {
      //   type: SIGNUP_SAGA,
      //   userObject: values,
    };
    props.dispatch(action);
  },
  displayName: "Signup User",
})(FormCreateUser);

const mapStateToProps = (state) => ({
  userEdit: state.UserLoginCyberBugsReducer.userEdit,
});

export default connect(mapStateToProps)(CreateUserForm);
