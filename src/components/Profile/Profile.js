import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// CSS
import "./Profile.css";

const Profile = () => {
  // useParams hook to use as ID parameter
  let { profileId } = useParams();
  // useState for profile related variables
  const [profileInfo, setProfileInfo] = useState("");
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
  useEffect(() => {
    FetchUserDataForProfile();
  }, []);
  return (
    <div>
      <div className="profile__container">
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

            <div>
              <div className="flex justify-start">{profileInfo.username}</div>
              <div className="flex justify-start">{profileInfo.firstname}</div>
              <div className="flex justify-start">{profileInfo.lastname}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
