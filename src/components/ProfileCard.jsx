import React from "react";
import "../styles/profile.css"; 

const ProfileCard = ({ user }) => {

  return (
    <div className="profile-card">
      <div className="profile-photo">
        <img src={user.avatar} alt="avatar" />
      </div>
      <div className="profile-info">
        <h2 className="profile-name">{user.name}</h2>
        <div className="profile-detail">
          <div className="label">Email</div>
          <div className="value">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        </div>
        <div className="profile-detail">
          <div className="label">Phone Number</div>
          <div className="value">{user.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
