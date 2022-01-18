import React, { Component } from "react";
import Axios from "axios";
import style from "./Todolist.css";

export default class Todolist extends Component {
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };

  getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      //console.log(result.data);
      // neu gọi api lay ve ket qua thanh cong
      // set lai state cua component
      this.setState({
        taskList: result.data,
      });
      //console.log("Thành công");
    });
    promise.catch((err) => {
      console.log(err.response.data);
      //console.log("Thất bại");
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                className="complete"
                type="button"
                onClick={() => {
                  this.checkTask(item.taskName);
                }}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  renderTaskToDoDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  this.rejectTask(item.taskName);
                }}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  checkTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  // dam se tu dong thuc thi sau khi noi dung component duoc render
  componentDidMount = () => {
    this.getTaskList();
  };

  handleChange = (e) => {
    let { value, name } = e.target;
    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...this.state.errors };
    let regexString = /^[a-z A-Z]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid!";
    } else {
      newErrors[name] = "";
    }

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };

  addTask = (e) => {
    e.preventDefault(); // dung su kien submit form
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: this.state.values.taskName,
      },
    });

    promise.then((result) => {
      this.getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  render() {
    return (
      <form onSubmit={this.addTask}>
        {/* <button
          onClick={() => {
            this.getTaskList();
          }}
        >
          Get task list
        </button> */}
        <div className="card">
          <div className="card__header">
            <img src={require("./bg.png")} />
          </div>
          {/* <h2>hello!</h2> */}
          <div className="card__body">
            <div className="card__content">
              <div className="form-group">
                <div className="card__title">
                  <h2>My Tasks</h2>
                  <p>September 9,2020</p>
                </div>
                <div className="card__add">
                  <input
                    name="taskName"
                    onChange={this.handleChange}
                    id="newTask"
                    type="text"
                    placeholder="Enter an activity..."
                  />

                  <button id="addItem" onClick={this.addTask}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <span className="text text-danger">
                  {this.state.errors.taskName}
                </span>
              </div>
              <div className="card__todo form-group">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskToDoDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
