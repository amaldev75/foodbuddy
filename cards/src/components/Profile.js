import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/hooks/hook";
import "../App.css"; // You can move styles to a separate CSS or styled components

export default function Profile() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Welcome, {user?.firstName}!</h1>
        {/* <p className="profile-email">{user?.email}</p> */}
      </div>

      <div className="profile-body">
        <div className="profile-info">
          <h2>Profile Information</h2>
          <ul>
            <li>
              <strong>First Name:</strong> {user?.firstName}
            </li>
            <li>
              <strong>Last Name:</strong> {user?.lastName}
            </li>
            <li>
              <strong>Email:</strong> {user?.email}
            </li>
            {/* You can add more fields like address, phone number, etc. */}
          </ul>
        </div>

        <div className="profile-actions">
          <button
            className="profile-btn back-btn"
            onClick={() => navigate("/main")}
          >
            <i className="fa fa-arrow-left"></i> Back to Home
          </button>
          <button
            className="profile-btn update-password-btn"
            onClick={() => navigate("/update-password")}
          >
            Update Password
          </button>
          <button
            className="profile-btn logout-btn"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
