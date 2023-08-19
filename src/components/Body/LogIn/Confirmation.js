import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Formik
import { Formik, Form, Field } from "formik";
// CSS
import "./Confirmation.css";
// Icon
import EditIcon from "@mui/icons-material/Edit";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUser = location.state;
  const [editingFirstName, setEditingFirstName] = useState(false);
  const [editingLastName, setEditingLastName] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [user, setUser] = useState(initialUser);
  // send registred form to back-end
  const onSubmitRegisterButton = async (event) => {
    try {
      if (event.password === event.confirmpassword) {
        const response = await fetch(`http://localhost:10000/auth/register`, {
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
        onSubmit={() => {
          onSubmitRegisterButton();
        }}
      >
        <Form className="confirmation__formContainer">
          {/* FirstName */}
          <div className="confirmation__form-firstName outline">
            <div className="flex flex-row items-center justify-start">
              <label className="confirmation__form-label">First Name:</label>
              <div>
                {!editingFirstName && ( //{/* Input field and P tag */}
                  <div className="ml3 mr3">
                    <p className={`confirmation__form-text`}>
                      {user.firstname}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex flex-row items-center justify-start">
              {editingFirstName ? (
                <>
                  <Field
                    type="text"
                    name="firstname"
                    className={`confirmation__form-input`}
                    value={editedValueFirstName}
                    onChange={(event) =>
                      setEditedValueFirstName(event.target.value)
                    } // Update editedValue when input changes
                  />
                  {/* Save button */}
                  <div className="ml3 mr3">
                    <button
                      className={`confirmation__button`}
                      onClick={(event) => {
                        onSubmitSaveEditFirstNameButton(event);
                      }}
                    >
                      <SaveIcon /> Save
                    </button>
                  </div>
                  {/* Cancel button */}
                  <div className="ml2 mr2">
                    <button
                      type="button"
                      className={`confirmation__button`}
                      onClick={onCancelEditFirstNameButton}
                    >
                      <CancelIcon /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="ml5">
                  {/* Edit Button */}
                  <button
                    type="button"
                    className={`confirmation__button`}
                    onClick={() => setEditingFirstName(true)}
                  >
                    <EditIcon /> Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* LastName */}
          <div className="confirmation__form-firstName outline">
            <div className="flex flex-row items-center justify-start">
              <label className="confirmation__form-label">Last Name:</label>
              <div>
                {!editingLastName && ( //{/* Input field and P tag */}
                  <div className="ml3 mr3">
                    <p className={`confirmation__form-text`}>{user.lastname}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex flex-row items-center justify-start">
              {editingLastName ? (
                <>
                  <Field
                    type="text"
                    name="lastname"
                    className={`confirmation__form-input`}
                    value={editedValueLastName}
                    onChange={(event) =>
                      setEditedValueLastName(event.target.value)
                    } // Update editedValue when input changes
                  />
                  {/* Save button */}
                  <div className="ml3 mr3">
                    <button
                      className={`confirmation__button`}
                      onClick={(event) => {
                        onSubmitSaveEditLastNameButton(event);
                      }}
                    >
                      <SaveIcon /> Save
                    </button>
                  </div>
                  {/* Cancel button */}
                  <div className="ml2 mr2">
                    <button
                      type="button"
                      className={`confirmation__button`}
                      onClick={onCancelEditLastNameButton}
                    >
                      <CancelIcon /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="ml5">
                  {/* Edit Button */}
                  <button
                    type="button"
                    className={`confirmation__button`}
                    onClick={() => setEditingLastName(true)}
                  >
                    <EditIcon /> Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Username */}
          <div className="confirmation__form-firstName outline">
            <div className="flex flex-row items-center justify-start">
              <label className="confirmation__form-label">Username:</label>
              <div>
                {!editingUsername && ( //{/* Input field and P tag */}
                  <div className="mr4 ml3">
                    <p className={`confirmation__form-text`}>{user.username}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex flex-row items-center justify-start">
              {editingUsername ? (
                <>
                  <Field
                    type="text"
                    name="username"
                    className={`confirmation__form-input`}
                    value={editedValueUsername}
                    onChange={(event) =>
                      setEditedValueUsername(event.target.value)
                    } // Update editedValue when input changes
                  />
                  {/* Save button */}
                  <div className="ml3 mr3">
                    <button
                      className={`confirmation__button`}
                      onClick={(event) => {
                        onSubmitSaveEditUsernameButton(event);
                      }}
                    >
                      <SaveIcon /> Save
                    </button>
                  </div>
                  {/* Cancel button */}
                  <div className="ml2 mr">
                    <button
                      type="button"
                      className={`confirmation__button`}
                      onClick={onCancelEditUsernameButton}
                    >
                      <CancelIcon /> Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="ml5">
                  {/* Edit Button */}
                  <button
                    type="button"
                    className={`confirmation__button`}
                    onClick={() => setEditingUsername(true)}
                  >
                    <EditIcon /> Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Submit form*/}
          <div className="w-100 flex justify-end">
            {/* Submit Registration Confirmation Button */}
            <button
              onClick={onSubmitRegisterButton}
              className="confirmation__button"
            >
              <AppRegistrationIcon /> Register
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Confirmation;
