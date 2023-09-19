import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../../Context/ContextProvider";
// Formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// CSS
import "./Profile.css";
// icon
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

const Profile = () => {
  // useParams hook to use as ID parameter
  let { profileId } = useParams();
  // useState for profile related variables
  const [profileInfo, setProfileInfo] = useState({});
  const [changePassword, setChangePassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  // Context
  const { isLoggedIn, getItemFromLocalStorage, localStorageThemeColor } =
    useContext(MyContext);
  //
  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(1)
      .max(64)
      .required("Please, fill out your old password"),
    newPassword: Yup.string()
      .min(1)
      .max(100)
      .required("Please, fill out confirm password field"),
  });
  // fetch user's data from database
  const FetchUserDataForProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:10000/auth/profile/byId/${profileId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProfileInfo(data.profileInfo);
      } else {
        throw new Error("faield to fetch user profile data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // change account password
  const OnSubmitChangePasswordOfUser = async (event) => {
    try {
      const response = await fetch(
        "http://localhost:10000/auth/changePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accessToken: getItemFromLocalStorage,
          },
          body: JSON.stringify({
            userId: isLoggedIn.id,
            oldPassword: event.oldPassword,
            newPassword: event.newPassword,
          }),
          mode: "cors",
        }
      );
      if (response.ok) {
        alert("Password has been changed successfully");
        setChangePassword((prevData) => !prevData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Delete user account
  const OnClickDeleteAccount = async () => {
    const response = await fetch(
      `http://localhost:10000/auth/deleteAccount/${profileId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      }
    );
    if (response.ok) {
      localStorage.removeItem("accessToken");
      window.open("/login", "_self");
    }
  };
  useEffect(() => {
    FetchUserDataForProfile();
  }, []);
  return (
    <div className="">
      <div className="profile__container">
        <div className="profile__profile-information-container">
          <div className="b">Profile Information</div>
          <div>
            <div className="profile-profile-information">
              <div className="profile__profile-information-position">
                First Name:{" "}
              </div>
              <div className="profile__profile-information-position">
                {profileInfo.firstname}
              </div>
              <div className="profile__profile-information-position">
                Last Name:{" "}
              </div>
              <div className="profile__profile-information-position">
                {profileInfo.lastname}
              </div>
              <div className="profile__profile-information-position">
                Username:{" "}
              </div>
              <div className="profile__profile-information-position">
                {profileInfo.username}
              </div>
            </div>
            {/* Buttons: Change Password and Delete Account */}
            <div className="profile__buttons-container">
              <div>
                <button
                  className={` ${
                    localStorageThemeColor === "dark"
                      ? "profile__button-light"
                      : "profile__button-dark"
                  } `}
                  onClick={() => {
                    setChangePassword((prevData) => !prevData);
                  }}
                >
                  <ChangeCircleIcon /> Change Password
                </button>
              </div>
              <div>
                <button
                  className={` ${
                    localStorageThemeColor === "dark"
                      ? "profile__button-light"
                      : "profile__button-dark"
                  } `}
                  onClick={() => {
                    setDeleteAccount((prevData) => !prevData);
                  }}
                >
                  <DeleteIcon /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="confirmation-container">
          {/* Change Password Form */}
          <div
            className={`profile-change-passsword-container ${
              changePassword ? "none" : "hidden"
            }`}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={OnSubmitChangePasswordOfUser}
            >
              <Form>
                {/* Old Password */}
                <div className="">
                  <div className="flex justify-start items-center">
                    <label name="oldPassword">Old Password :</label>
                    <div
                      className={`${
                        changePassword ? "error-message" : "hidden"
                      }`}
                    >
                      <ErrorMessage name="oldPassword" component="div" />
                    </div>
                  </div>
                  <Field
                    autoComplete="off"
                    id="inputAddProjectForm"
                    name="oldPassword"
                    placeholder="Old Password"
                    type="password"
                    className="flex justify-start"
                  />
                </div>
                {/* New Password */}
                <div>
                  <div className="flex justify-start items-center">
                    <label name="newPassword">New Password :</label>
                    <div
                      className={`${
                        changePassword ? "error-message" : "hidden"
                      }`}
                    >
                      <ErrorMessage name="newPassword" component="div" />
                    </div>
                  </div>
                  <Field
                    autoComplete="off"
                    id="inputAddProjectForm"
                    name="newPassword"
                    placeholder="New Password"
                    type="password"
                    className="flex justify-start"
                  />
                </div>

                <div className="submit-button-container">
                  <button
                    type="submit"
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "profile__button-light"
                        : "profile__button-dark"
                    } `}
                  >
                    <ChangeCircleIcon /> Change Password
                  </button>

                  <button
                    className={` ${
                      localStorageThemeColor === "dark"
                        ? "profile__button-light"
                        : "profile__button-dark"
                    } `}
                    onClick={() => {
                      setChangePassword((prevData) => !prevData);
                    }}
                  >
                    <CancelIcon /> Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          {/* Confirmation of deleting Account */}
          <div
            className={`profile__delete-account-container ${
              deleteAccount ? "" : "hidden"
            }`}
          >
            Confirm Account Delete
            <div className="profile__delete-account">
              <div>
                <button
                  className={` ${
                    localStorageThemeColor === "dark"
                      ? "profile__button-light"
                      : "profile__button-dark"
                  } `}
                  onClick={() => {
                    setDeleteAccount((prevData) => !prevData);
                  }}
                >
                  <CancelIcon /> Cancel
                </button>
              </div>
              <div>
                <button
                  className={` ${
                    localStorageThemeColor === "dark"
                      ? "profile__button-light"
                      : "profile__button-dark"
                  } `}
                  onClick={OnClickDeleteAccount}
                >
                  <DeleteIcon /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
