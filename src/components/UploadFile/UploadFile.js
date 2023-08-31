import React, { useState } from "react";
// CSS
import "./UploadFile.css";
// Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// icons
import HttpIcon from "@mui/icons-material/Http";
import ImageIcon from "@mui/icons-material/Image";
import DnsIcon from "@mui/icons-material/Dns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadFile = () => {
  const [uploadImage, setUploadImage] = useState(null);

  const initialValues = {
    nameOfProject: "",
    urlOfProject: "",
    imageOfProject: null,
  };

  const validationSchema = Yup.object().shape({
    nameOfProject: Yup.string().min(1).max(64).required(),
    urlOfProject: Yup.string().min(1).max(100).required(),
  });
  // send request to back-end of formik
  const onSubmitContact = async (event) => {
    try {
      const formData = new FormData();
      formData.append("imageOfProject", uploadImage);
      formData.append("nameOfProject", event.nameOfProject);
      formData.append("urlOfProject", event.urlOfProject);

      const response = await fetch("http://localhost:10000/auth/addProject", {
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
    <div className="addProject__container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitContact}
      >
        <Form className="addProject__formik-container">
          <div className="input-row">
            {/* Name */}
            <div className="addProject__formik-input-error-message-container">
              <DnsIcon sx={{ fontSize: 30 }} />
              <label name="nameOfProject">Resume/CV :</label>
              <ErrorMessage
                name="nameOfProject"
                component="div"
                className="error-message"
              />
            </div>

            <Field
              autoComplete="off"
              id="inputAddProjectForm"
              name="nameOfProject"
              placeholder="Name Of Project"
            />
          </div>

          {/* Image */}
          <div className="input-row">
            <Field
              autoComplete="off"
              id="inputContactForm"
              name="imageOfProject"
              type="file"
              accept=".pdf,.xlsx,.xls"
              onChange={(event) => setUploadImage(event.target.files[0])}
            />
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
