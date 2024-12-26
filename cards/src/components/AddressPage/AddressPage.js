import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddressPage.css";

const AddressPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the address details and navigate to confirmation/payment
    console.log({ address, pinCode, city, location });
    navigate("/confirmation");
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          alert("Location set successfully!");
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="address-page">
      <h2>Add Your Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Pin Code:</label>
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="Enter your pin code"
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="form-group">
          <button type="button" onClick={handleLocation}>
            Set Location on Map
          </button>
          {location.lat && location.lng && (
            <p>
              Location: Latitude {location.lat}, Longitude {location.lng}
            </p>
          )}
        </div>
        <button type="submit" className="submit-button">
          Save & Proceed
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
