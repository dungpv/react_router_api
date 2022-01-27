import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
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

  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <div className="container mr-5">
      <h3 className="text-center">Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName"></input>
        </div>

        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },
  displayName: "Create Project",
})(CreateProject);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};

export default connect(mapStateToProps)(createProjectForm);
