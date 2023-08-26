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

const Profile = () => {
  // useParams hook to use as ID parameter
  let { profileId } = useParams();
  // useState for profile related variables
  const [profileInfo, setProfileInfo] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  // Context
  const { isLoggedIn, getItemFromLocalStorage } = useContext(MyContext);
  //
  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().min(1).max(64).required(),
    newPassword: Yup.string().min(1).max(100).required(),
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
        {/* */}
        <div className=" right flex flex-row">
          {/* left side */}
          <div className="profile__left-side">
            <div className="profile__left-side-title">Profile Information</div>
          </div>
          {/* right side */}
          <div className="profile__right-side">
            <div className="profile__right-side-profileInfo">
              <div>
                <div>Username : </div>
                <div>First Name : </div>
                <div>Last Name : </div>
              </div>

              <div className=" flex flex-column justify-start">
                <div className="flex justify-start">{profileInfo.username}</div>
                <div className="flex justify-start">
                  {profileInfo.firstname}
                </div>
                <div className="flex justify-start">{profileInfo.lastname}</div>
              </div>
            </div>
            <div>
              <div
                className="profile__button pointer"
                onClick={() => setChangePassword((prevData) => !prevData)}
              >
                <ChangeCircleIcon /> Change Password
              </div>
              <div
                className="profile__button pointer"
                onClick={OnClickDeleteAccount}
              >
                <DeleteIcon /> Delete Account
              </div>
            </div>
          </div>
        </div>
        {/* Change Password Formik */}
        <div
          className={`profile-change-passsword-container ${
            changePassword ? "" : "hidden"
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
                    className={`${changePassword ? "error-message" : "hidden"}`}
                  >
                    <ErrorMessage name="newPassword" component="div" />
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
                    className={`${changePassword ? "error-message" : "hidden"}`}
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
                <button type="submit" className="submit-button">
                  Change Password
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
