import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../../Context/ContextProvider";
// Formik and Yup related imports for form
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// CSS
import "./Confirmation.css";
// Icon
import EditIcon from "@mui/icons-material/Edit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUser = location.state;
  const [editingFirstName, setEditingFirstName] = useState(false);
  const [editingLastName, setEditingLastName] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [user, setUser] = useState(initialUser);
  const { localStorageThemeColor } = useContext(MyContext);
  // validation parameters of form
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3).max(64).required(),
    lastname: Yup.string().min(3).max(64).required(),
    username: Yup.string().min(3).max(64).required(),
  });
  // send registred form to back-end
  const onSubmitRegisterButton = async (event) => {
    try {
      if (event.password === event.confirmpassword) {
        const response = await fetch(`https://mainpage-back-end.onrender.com/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            password: initialUser.password,
          }),
          mode: "cors",
        });
        if (response.ok) {
          navigate("/login");
        } else {
          throw new Error("failed to fetch");
        }
      } else {
        alert("confirm password password fields do not match");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // State to store firstname edited values
  const [editedValueFirstName, setEditedValueFirstName] = useState(
    initialUser.firstname
  );
  // State to store lastname edited values
  const [editedValueLastName, setEditedValueLastName] = useState(
    initialUser.lastname
  );
  // State to store usernmae edited values
  const [editedValueUsername, setEditedValueUsername] = useState(
    initialUser.username
  );
  // save firstname field (does not send request to back-end)
  const onSubmitSaveEditFirstNameButton = (event) => {
    event.preventDefault();
    if (editedValueFirstName) {
      setUser((prevUser) => ({
        ...prevUser,
        firstname: editedValueFirstName,
      }));
    }
    setEditingFirstName(false);
  };
  // save lastname field (does not send request to back-end)
  const onSubmitSaveEditLastNameButton = (event) => {
    event.preventDefault();
    if (editedValueLastName) {
      setUser((prevUser) => ({
        ...prevUser,
        lastname: editedValueLastName,
      }));
    }
    setEditingLastName(false);
  };
  // save usernmae field (does not send request to back-end)
  const onSubmitSaveEditUsernameButton = (event) => {
    event.preventDefault();
    if (editedValueUsername) {
      setUser((prevUser) => ({
        ...prevUser,
        username: editedValueUsername,
      }));
    }
    setEditingUsername(false);
  };
  // Cancel edit for first name field
  const onCancelEditFirstNameButton = () => {
    setEditingFirstName(false);
    setEditedValueFirstName(user.lastname); // Revert edited value to original value
  };
  // Cancel edit for last name field
  const onCancelEditLastNameButton = () => {
    setEditingLastName(false);
    setEditedValueLastName(user.lastname); // Revert edited value to original value
  };
  // Cancel edit for username field
  const onCancelEditUsernameButton = () => {
    setEditingUsername(false);
    setEditedValueUsername(user.username); // Revert edited value to original value
  };
  return (
    <div className="confirmation__container">
      <div className="confirmation-title">
        <h2>User Information Confirmation</h2>
      </div>
      <Formik
        initialValues={user}
        onSubmit={(event) => {
          onSubmitRegisterButton(event);
        }}
        validationSchema={validationSchema}
      >
        <Form className="confirmation__formContainer">
          {/* 1 */}
          <div className="confirmation__div-center">
            <label>First Name:</label>
            <ErrorMessage name="firstname" component="div" />
          </div>
          {/* 2 */}
          <div className="confirmation__div-center">
            {!editingFirstName ? (
              <p>{user.firstname}</p>
            ) : (
              <Field
                type="text"
                name="firstname"
                className={` ${
                  localStorageThemeColor === "dark"
                    ? "confirmation__form-input-light"
                    : "confirmation__form-input-dark"
                } `}
                value={editedValueFirstName}
                onChange={(event) =>
                  setEditedValueFirstName(event.target.value)
                } // Update editedValue when input changes
              />
            )}
          </div>
          {/* 3 */}
          <div>
            {!editingFirstName ? (
              <>
                <div className="confirmation__div-center">
                  {/* Edit Button */}
                  <button
                    type="button"
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "confirmation__button-light"
                        : "confirmation__button-dark"
                    } `}
                    onClick={() => setEditingFirstName(true)}
                  >
                    <EditIcon /> Edit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="confirmation__div-center">
                  {/* Cancel button */}
                  <button
                    type="button"
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "confirmation__button-light"
                        : "confirmation__button-dark"
                    } `}
                    onClick={onCancelEditFirstNameButton}
                  >
                    <CancelIcon /> Cancel
                  </button>
                </div>
              </>
            )}
          </div>
          {/* 4 */}
          <div
            className={`${
              editingFirstName
                ? "confirmation__div-center"
                : "confirmation__div-center hidden"
            }`}
          >
            <button
              className={` ${
                localStorageThemeColor === "dark"
                  ? "confirmation__button-light"
                  : "confirmation__button-dark"
              } `}
              onClick={(event) => {
                onSubmitSaveEditFirstNameButton(event);
              }}
            >
              <SaveIcon /> Save
            </button>
          </div>
          {/* 5 */}
          <div className="confirmation__div-center">
            <label>Last Name:</label>
          </div>
          {/* 6 */}
          <div className="confirmation__div-center">
            {!editingLastName ? (
              <p>{user.lastname}</p>
            ) : (
              <Field
                type="text"
                name="lastname"
                className={` ${
                  localStorageThemeColor === "dark"
                    ? "confirmation__form-input-light"
                    : "confirmation__form-input-dark"
                } `}
                value={editedValueLastName}
                onChange={(event) => setEditedValueLastName(event.target.value)} // Update editedValue when input changes
              />
            )}
          </div>
          {/* 7 */}
          <div className="confirmation__div-center">
            {!editingLastName ? (
              <>
                <div className="confirmation__div-center">
                  {/* Edit Button */}
                  <button
                    type="button"
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "confirmation__button-light"
                        : "confirmation__button-dark"
                    } `}
                    onClick={() => setEditingLastName(true)}
                  >
                    <EditIcon /> Edit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="confirmation__div-center">
                  {/* Cancel button */}
                  <button
                    type="button"
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "confirmation__button-light"
                        : "confirmation__button-dark"
                    } `}
                    onClick={onCancelEditLastNameButton}
                  >
                    <CancelIcon /> Cancel
                  </button>
                </div>
              </>
            )}
          </div>
          {/* 8 */}
          <div
            className={`${
              editingLastName
                ? "confirmation__div-center"
                : "confirmation__div-center hidden"
            }`}
          >
            <button
              className={` ${
                localStorageThemeColor === "dark"
                  ? "confirmation__button-light"
                  : "confirmation__button-dark"
              } `}
              onClick={(event) => {
                onSubmitSaveEditLastNameButton(event);
              }}
            >
              <SaveIcon /> Save
            </button>
          </div>
          {/* 9 */}
          <div className="confirmation__div-center">
            <label>Username:</label>
          </div>
          {/* 10 */}
          <div className="confirmation__div-center">
            {!editingUsername ? (
              <p>{user.username}</p>
            ) : (
              <Field
                type="text"
                name="username"
                className={` ${
                  localStorageThemeColor === "dark"
                    ? "confirmation__form-input-light"
                    : "confirmation__form-input-dark"
                } `}
                value={editedValueUsername}
                onChange={(event) => setEditedValueUsername(event.target.value)} // Update editedValue when input changes
              />
            )}
          </div>
          {/* 11 */}
          <div className="confirmation__div-center">
            {!editingUsername ? (
              <>
                <div className="confirmation__div-center">
                  {/* Edit Button */}
                  <button
                    type="button"
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "confirmation__button-light"
                        : "confirmation__button-dark"
                    } `}
                    onClick={() => setEditingUsername(true)}
                  >
                    <EditIcon /> Edit
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="confirmation__div-center">
                  {/* Cancel button */}
                  <button
                    type="button"
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "confirmation__button-light"
                        : "confirmation__button-dark"
                    } `}
                    onClick={onCancelEditUsernameButton}
                  >
                    <CancelIcon /> Cancel
                  </button>
                </div>
              </>
            )}
          </div>
          {/* 12 */}
          <div
            className={`${
              editingUsername
                ? "confirmation__div-center"
                : "confirmation__div-center hidden"
            }`}
          >
            <button
              className={` ${
                localStorageThemeColor === "dark"
                  ? "confirmation__button-light"
                  : "confirmation__button-dark"
              } `}
              onClick={(event) => {
                onSubmitSaveEditUsernameButton(event);
              }}
            >
              <SaveIcon /> Save
            </button>
          </div>
          {/* 13 */}
          <div></div>
          {/* 14 */} {/* Submit Registration Confirmation Button */}
          <div className="confirmation__div-center">
            <button
              className={` ${
                localStorageThemeColor === "dark"
                  ? "confirmation__button-light"
                  : "confirmation__button-dark"
              } `}
            >
              <AppRegistrationIcon /> Register
            </button>
          </div>
          {/* 15 */} {/* Backt ot Registration Form Button */}
          <div className="confirmation__div-center">
            <button
              className={` ${
                localStorageThemeColor === "dark"
                  ? "confirmation__button-light"
                  : "confirmation__button-dark"
              } `}
              onClick={() => navigate("/register")}
            >
              <KeyboardBackspaceIcon /> Back to Registration
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Confirmation;
