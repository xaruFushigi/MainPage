import React, { useContext } from "react";
//
import "./LogIn.css";
// Formik and Yup related imports for form
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
//
import { MyContext } from "../../../Context/ContextProvider";
// icon
import LockOpenIcon from "@mui/icons-material/LockOpen";

const LogIn = () => {
  //  const {} = useContext(MyContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  let navigate = useNavigate();
  // initial values of formik
  const initialValues = {
    username: "",
    password: "",
  };
  // validation parameters of form
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(64).required(),
    password: Yup.string().min(3).max(20).required(),
  });
  //Log In button
  const onSubmitLogInButton = async (event) => {
    try {
      const response = await fetch("https://mainpage-back-end.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: event.username,
          password: event.password,
        }),
        mode: "cors",
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn({
          username: data.username,
          id: data.id,
          statusLoggedIn: true,
        });
        window.open("/", "_self");
      } else {
        setIsLoggedIn({ ...isLoggedIn, statusLoggedIn: false });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitLogInButton}
        >
          <Form className="login__formContainer">
            <label>Username :</label>
            <ErrorMessage name="username" component="span" />
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="Username goes here"
            />

            <label>Password :</label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Password goes here"
            />

            <button type="submit">
              {" "}
              <LockOpenIcon /> Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LogIn;
