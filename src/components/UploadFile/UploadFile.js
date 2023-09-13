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
  const [resumeName, setResumeName] = useState("");
  // formik initial values
  const initialValues = {
    nameOfResume: "",
    typeOfResume: "",
    uploadResume: "", // Initialize with an empty string
  };
  // formik validation schema
  const validationSchema = Yup.object().shape({
    nameOfResume: Yup.string().required("Name is required"),
    typeOfResume: Yup.string().required("Type is required"),
  });
  // get radio button value
  const GetRadioButtonValue = (event) => {
    setTypeOfUploadFile(event.target.value);
  };
  // upload file
  const UploadFile = (event) => {
    setUploadResume(event.target.files[0]);
  };
  // get resume name
  const onChangeResumeName = (event) => {
    setResumeName(event.target.value);
  };
  // submit form
  const onSubmitResume = async (event) => {
    console.log(event);
    try {
      const formData = new FormData();
      formData.append("uploadResume", uploadResume);
      formData.append("typeOfResume", typeOfUploadFile);
      formData.append("nameOfResume", resumeName);

      const response = await fetch("https://mainpage-back-end.onrender.com/auth/uploadResume", {
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

  return (
    <div className="uploadFile__container">
      <div>
        <div className="addProject__formik-container">
          <div className="input-row">
            {/* Name of Resume */}
            <div className="addProject__formik-input-error-message-container">
              <DnsIcon sx={{ fontSize: 30 }} />
              <label name="nameOfResume">Resume/CV :</label>
            </div>

            <input
              autoComplete="off"
              type="text"
              id="inputAddProjectForm"
              name="nameOfResume"
              placeholder="Resume Name"
              onChange={(event) => onChangeResumeName(event)}
            />
          </div>

          {/* File resume browse */}
          <div className="input-row">
            <input
              autoComplete="off"
              id="inputContactForm"
              name="uploadResume"
              type="file"
              accept=".pdf,.xlsx,.xls, .docx"
              onChange={(event) => UploadFile(event)}
            />
          </div>

          <div className="uploadFile_list-container">
            <ul className="uploadFile__list">
              {/* radio button: cv english */}
              <li className="uploadFile__list-item">
                <input
                  type="radio"
                  name="typeOfResume"
                  value="cv_english"
                  onChange={(e) => GetRadioButtonValue(e)}
                />
                <label name="cv">CV English</label>
              </li>
              {/* radio button: cv japanese */}
              <li className="uploadFile__list-item">
                <input
                  type="radio"
                  name="typeOfResume"
                  value="cv_japanese"
                  onChange={(e) => GetRadioButtonValue(e)}
                />
                <label name="cv">CV Japanese</label>
              </li>
              {/* radio button: resume japanese */}
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
          <button type="submit" onClick={onSubmitResume}>
            <CloudUploadIcon /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
