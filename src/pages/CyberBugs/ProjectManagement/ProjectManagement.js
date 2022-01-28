import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Avatar, Popover, AutoComplete } from "antd";
import ReactHtmlParser from "react-html-parser";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_USER_PROJECT_API,
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_USER_API,
  OPEN_DRAWER,
  OPEN_FORM_EDIT_PROJECT,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";
import { Popconfirm, message } from "antd";

export default function ProjectManagement(props) {
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );
  const dispatch = useDispatch();
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const [state, setState] = useState({ filteredInfo: null, sortedInfo: null });
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch({
      type: GET_LIST_PROJECT_SAGA,
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
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

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "creator",
      // dataIndex: 'creator',
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "members",
      // dataIndex: 'creator',
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return <Avatar key={index} src={member.avatar}></Avatar>;
            })}
            {record.members?.length > 3 ? <Avatar>..</Avatar> : ""}
            <Popover
              placement="rightTop"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    style={{ width: "100%" }}
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelect, option) => {
                      setValue(option.label);

                      dispatch({
                        type: ADD_USER_PROJECT_API,
                        userProject: [
                          {
                            projectId: record.id,
                            userId: valueSelect,
                          },
                        ],
                      });
                    }}
                    onSearch={(value) => {
                      dispatch({
                        type: GET_USER_API,
                        keyWord: value,
                      });
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: "50%" }}>+</Button>
            </Popover>
          </div>
        );
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let contentJSX = ReactHtmlParser(text);

    //     return <div key={index}>{contentJSX}</div>;
    //   },
    // },
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
                  type: OPEN_FORM_EDIT_PROJECT,
                  title: "Edit Project",
                  Component: <FormEditProject></FormEditProject>,
                };

                dispatch(action);

                const actionEditProject = {
                  type: EDIT_PROJECT,
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_PROJECT_SAGA,
                  idProject: record.id,
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
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
