import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import emailjs from "@emailjs/browser";
import "./Appointment.css";

function Appointment() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = async () => {

    if (!name || !age || !bloodGroup || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    try {

      // 🔹 Save appointment to Firebase
      await addDoc(collection(db, "appointments"), {
        name,
        age,
        bloodGroup,
        date,
        time,
        status: "Booked",
        createdAt: Timestamp.now(),
      });

      // 🔹 Send Email using EmailJS
      const templateParams = {
        name: name,
        age: age,
        blood: bloodGroup,
        date: date,
        time: time
      };

      await emailjs.send(
        "service_d0mycg9",
        "template_sm7261w",
        templateParams,
        "p8SiSpXWnsj8pW_6g"
      );

      alert("Appointment Booked & Email Sent Successfully");

      setName("");
      setAge("");
      setBloodGroup("");
      setDate("");
      setTime("");

    } catch (error) {

      console.error(error);
      alert("Booking Failed");

    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-card">
        <h2>🏥 Book Doctor Appointment</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>O+</option>
          <option>O-</option>
          <option>AB+</option>
          <option>AB-</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={handleBook}>
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}

export default Appointment;