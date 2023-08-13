import React from "react";
//
import "./Register.css";
// Formik and Yup related imports for form
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Register = () => {
  let navigate = useNavigate();
  // initial values of formik
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  };
  // validation parameters of form
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3).max(64).required(),
    lastname: Yup.string().min(3).max(64).required(),
    username: Yup.string().min(3).max(64).required(),
    password: Yup.string().min(3).max(20).required(),
    confirmpassword: Yup.string().min(3).max(20).required(),
  });
  //Log In button
  const onSubmitRegisterButton = async (event) => {
    try {
      const response = await fetch(`http://localhost:10000/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: event.firstname,
          lastname: event.lastname,
          username: event.username,
          password: event.password,
        }),
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        navigate("/login");
      } else {
        throw new Error("failed to fetch");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register outline">
      <div className="register-container outline">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitRegisterButton}
        >
          <Form className="formContainer">
            <div className="register__register-name-container">
              <div className="register__register-name-item">
                {/* FirstName */}
                <div className="register__register-name-item-lable">
                  <label>
                    First<span className="b">*</span> :
                  </label>
                  <ErrorMessage name="firstname" component="span" />
                </div>
                <Field
                  autoComplete="off"
                  id="inputCreatePost"
                  name="firstname"
                  placeholder="FirstName goes here"
                />
              </div>
              {/* LastName */}
              <div className="register__register-name-item">
                <div className="register__register-name-item-lable">
                  <label>
                    Last<span className="b">*</span> :
                  </label>
                  <ErrorMessage name="lastname" component="span" />
                </div>
                <Field
                  autoComplete="off"
                  id="inputCreatePost"
                  name="lastname"
                  placeholder="LastName goes here"
                />
              </div>
            </div>
            {/* Username */}
            <div className="register__register-name-item-lable">
              <label>
                Username<span className="b">*</span> :
              </label>
              <ErrorMessage name="username" component="span" />
            </div>
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="Username goes here"
            />
            {/* Password */}
            <div className="register__register-name-item-lable">
              <label>
                Password<span className="b">*</span> :
              </label>
              <ErrorMessage name="password" component="span" />
            </div>
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Password goes here"
            />
            {/* Confirm Password */}
            <div className="register__register-name-item-lable">
              <label>
                Confirm Password<span className="b">*</span> :
              </label>
              <ErrorMessage name="confirmpassword" component="span" />
            </div>
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="confirmpassword"
              placeholder="Confirm Password goes here"
            />

            <button type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
