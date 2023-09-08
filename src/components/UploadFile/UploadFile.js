import React, { useState } from "react";
// CSS
import "./UploadFile.css";
// Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// icons
import DnsIcon from "@mui/icons-material/Dns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadFile = () => {
  const [uploadResume, setUploadResume] = useState(null);
  const [typeOfUploadFile, setTypeOfUploadFile] = useState("");

  const initialValues = {
    nameOfResume: "",
    typeOfResume: "",
    uploadResume: "", // Initialize with an empty string
  };

  const validationSchema = Yup.object().shape({
    nameOfResume: Yup.string().required("Name is required"),
    typeOfResume: Yup.string().required("Type is required"),
  });

  const onSubmitResume = async (event) => {
    try {
      const formData = new FormData();
      formData.append("uploadResume", uploadResume);
      formData.append("typeOfResume", event.typeOfResume);
      formData.append("nameOfResume", event.nameOfResume);

      const response = await fetch("http://localhost:10000/auth/uploadResume", {
        method: "POST",
        body: formData,
        mode: "cors",
      });
      if (response.ok) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GetRadioButtonValue = (event) => {
    setTypeOfUploadFile(event.target.value);
  };

  return (
    <div className="uploadFile__container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitResume}
      >
        <Form className="addProject__formik-container">
          <div className="input-row">
            {/* Name of Resume */}
            <div className="addProject__formik-input-error-message-container">
              <DnsIcon sx={{ fontSize: 30 }} />
              <label name="nameOfResume">Resume/CV :</label>
              <ErrorMessage
                name="nameOfResume"
                component="div"
                className="error-message"
              />
            </div>

            <Field
              autoComplete="off"
              type="text"
              id="inputAddProjectForm"
              name="nameOfResume"
              placeholder="Resume Name"
            />
          </div>

          {/* File resume */}
          <div className="input-row">
            <Field
              autoComplete="off"
              id="inputContactForm"
              name="uploadResume"
              type="file"
              accept=".pdf,.xlsx,.xls"
              onChange={(event) => setUploadResume(event.target.files[0])}
            />
          </div>

          <div className="uploadFile_list-container">
            <ul className="uploadFile__list">
              <li className="uploadFile__list-item">
                <input
                  type="radio"
                  name="typeOfResume"
                  value="cv_english"
                  onChange={(e) => GetRadioButtonValue(e)}
                />
                <label name="cv">CV English</label>
              </li>
              <li className="uploadFile__list-item">
                <input
                  type="radio"
                  name="typeOfResume"
                  value="cv_japanese"
                  onChange={(e) => GetRadioButtonValue(e)}
                />
                <label name="cv">CV Japanese</label>
              </li>
              <li className="uploadFile__list-item">
                <input
                  type="radio"
                  name="typeOfResume"
                  value="resume_japanese"
                  onChange={(e) => GetRadioButtonValue(e)}
                />
                <label name="cv">Resume Japanese</label>
              </li>
            </ul>
          </div>
          <button type="submit">
            <CloudUploadIcon /> Send
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UploadFile;
