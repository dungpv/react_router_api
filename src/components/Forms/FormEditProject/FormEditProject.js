import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  GET_ALL_PROJECT_CATEGORY_SAGA,
  SET_SUBMIT_EDIT_PROJECT,
  UPDATE_PROJECT_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbugs";
import { withFormik } from "formik";
import * as Yup from "yup";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
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
  //   const submitForm = (e) => {
  //     e.preventDefault();
  //     alert("submit edit");
  //   };

  //componentdidmount
  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });

    dispatch({ type: SET_SUBMIT_EDIT_PROJECT, submitFunction: handleSubmit });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              disabled
              className="form-control"
              name="id"
              value={values.id}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              className="form-control"
              name="projectName"
              onChange={handleChange}
              value={values.projectName}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              initialValue={values.description}
              value={values.description}
              init={{
                selector: "textarea#myTextArea",
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
        </div>
      </div>
    </form>
  );
}

const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit?.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    //console.log("value", values);
    const action = {
      type: UPDATE_PROJECT_SAGA,
      projectUpdate: values,
    };
    props.dispatch(action);
  },
  displayName: "Edit Project",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
