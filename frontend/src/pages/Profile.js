import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import "./Profile.css";

function Profile() {

  const auth = getAuth();
  const user = auth.currentUser;

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
    address: "",
    emergency: ""
  });

  /* ---------- LOAD PROFILE ---------- */

  useEffect(() => {

    const fetchProfile = async () => {

      if (!user) return;

      try {

        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }

      } catch (error) {

        console.log("Profile fetch error", error);

      }

    };

    fetchProfile();

  }, [user]);

  /* ---------- INPUT CHANGE ---------- */

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });

  };

  /* ---------- SAVE PROFILE ---------- */

  const handleSave = async () => {

    if (!user) return alert("User not logged in");

    if (!profile.name || !profile.phone) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {

      await setDoc(doc(db, "profiles", user.uid), profile);

      alert("Profile Saved Successfully ✅");

    } catch (error) {

      alert("Error saving profile");

    }

    setLoading(false);

  };

  return (

    <div className="profile-wrapper">

      <div className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">👤</div>

          <div>
            <h2>Patient Profile</h2>
            <p>Manage your personal medical details</p>
          </div>

        </div>

        <div className="profile-form">

          <div className="form-group">

            <label>Full Name</label>

            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />

          </div>

          <div className="form-row">

            <div className="form-group">

              <label>Age</label>

              <input
                name="age"
                value={profile.age}
                onChange={handleChange}
                placeholder="Enter age"
              />

            </div>

            <div className="form-group">

              <label>Blood Group</label>

              <select
                name="bloodGroup"
                value={profile.bloodGroup}
                onChange={handleChange}
              >

                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>

              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

          </div>

          <div className="form-group">

            <label>Address</label>

            <input
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter address"
            />

          </div>

          <div className="form-group">

            <label>Emergency Contact</label>

            <input
              name="emergency"
              value={profile.emergency}
              onChange={handleChange}
              placeholder="Emergency contact number"
            />

          </div>

          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default Profile;
