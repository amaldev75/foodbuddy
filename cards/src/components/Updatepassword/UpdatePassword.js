import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/hook";
import "./Updatepassword.css";

export default function UpdatePassword() {
  const { user = {} } = useAuthContext();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Single checkbox to show/hide both passwords
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!user || !user._id) {
      setMessage("User ID is missing. Please log in again.");
      return;
    }

    try {
      const res = await axios.put("http://localhost:4000/api/users/update-password", {
        userId: user._id,
        oldPassword,
        newPassword,
      });
      setMessage(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="update-password-container">
      <h1>Update Password</h1>
      <form onSubmit={handlePasswordUpdate} className="update-password-form">
        {/* Old Password */}
        <div className="input-group">
          <label>Old Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        {/* New Password */}
        <div className="input-group">
          <label>New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        {/* Checkbox to Show Password */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="update-btn">
          Update Password
        </button>
      </form>

      {/* Message */}
      {message && <p className="message">{message}</p>}

      <button onClick={() => navigate("/profile")} className="back-btn">
        Back to Profile
      </button>
    </div>
  );
}
