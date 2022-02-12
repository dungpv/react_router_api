import React, { useState, useEffect, useRef } from "react";
import { Table, Button, Space, Input, Popconfirm } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ADD_USER_PROJECT_API,
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_USER_API,
  GET_USER_SEARCH,
  OPEN_FORM_CREATE_USER,
  OPEN_FORM_EDIT_USER,
  OPEN_FORM_USER,
  REMOVE_USER_PROJECT_API,
} from "../../../redux/constants/Cyberbugs/UserConstant";
import FormCreateUser from "../../../components/Forms/FormCreateEditUser/FormCreateUser";
import FormEditUser from "../../../components/Forms/FormCreateEditUser/FormEditUser";

const { Search } = Input;

export default function UserManagement(props) {
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const dispatch = useDispatch();

  //console.log(userSearch);

  const [state, setState] = useState({ filteredInfo: null, sortedInfo: null });
  const [value, setValue] = useState("");

  const searchRef = useRef(null);

  useEffect(() => {
    dispatch({
      type: GET_USER_API,
      keyword: "",
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    //console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const onSearch = (value) => {
    //console.log(value);
    dispatch({
      type: GET_USER_API,
      keyword: value,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setNameSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "name",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "Id",
      dataIndex: "userId",
      key: "userId",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (item2, item1) => {
        let name1 = item1.name?.trim().toLowerCase();
        let name2 = item2.name?.trim().toLowerCase();
        if (name2 < name1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (item2, item1) => {
        let email1 = item1.email?.trim().toLowerCase();
        let email2 = item2.email?.trim().toLowerCase();
        if (email2 < email1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (item2, item1) => {
        let phoneNumber1 = item1.phoneNumber?.trim().toLowerCase();
        let phoneNumber2 = item2.phoneNumber?.trim().toLowerCase();
        if (phoneNumber2 < phoneNumber1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return (
          <img
            key={index}
            src={record.avatar}
            width="30"
            height="30"
            style={{ borderRadius: "15px" }}
          />
        );
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: OPEN_FORM_EDIT_USER,
                  Component: <FormEditUser></FormEditUser>,
                  title: "Edit User",
                  textButtonSubmit: "Save",
                };

                dispatch(action);

                const actionEditUser = {
                  type: EDIT_USER,
                  userEditModel: record,
                };
                dispatch(actionEditUser);
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_USER_SAGA,
                  id: record.userId,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container-fluid mt-5">
      <h3>User Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setNameSort}>Sort Name</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
        <Button
          type="primary"
          onClick={() => {
            dispatch({
              type: OPEN_FORM_CREATE_USER,
              Component: <FormCreateUser></FormCreateUser>,
              title: "Signup User",
              textButtonSubmit: "Signup",
            });
          }}
        >
          Create User
        </Button>
      </Space>
      <Search
        name="search"
        placeholder="Search "
        allowClear
        enterButton="Search"
        size="medium"
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        rowKey={"userId"}
        dataSource={userSearch}
        onChange={handleChange}
      />
    </div>
  );
}
