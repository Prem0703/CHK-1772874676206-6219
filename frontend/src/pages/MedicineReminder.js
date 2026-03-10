import React, { useState, useEffect } from "react";

function MedicineReminder() {

const [medicine, setMedicine] = useState("");
const [time, setTime] = useState("");
const [reminders, setReminders] = useState([]);

const addReminder = () => {

if (!medicine || !time) {
  alert("Enter medicine and time");
  return;
}

const newReminder = {
  id: Date.now(),
  medicine,
  time
};

setReminders([...reminders, newReminder]);

setMedicine("");
setTime("");

};

useEffect(() => {

const interval = setInterval(() => {

  const now = new Date();
  const currentTime =
    now.getHours().toString().padStart(2,"0") +
    ":" +
    now.getMinutes().toString().padStart(2,"0");

  reminders.forEach((r) => {

    if (r.time === currentTime) {
      alert("💊 Time to take medicine: " + r.medicine);
    }

  });

}, 60000);

return () => clearInterval(interval);

}, [reminders]);

return (

<div
  style={{
    padding:"30px",
    background:"#ffffff",
    borderRadius:"10px",
    color:"#222",
    maxWidth:"600px"
  }}
>

  <h2 style={{color:"#0b3d91"}}>Medicine Reminder</h2>

  <input
    placeholder="Medicine Name"
    value={medicine}
    onChange={(e)=>setMedicine(e.target.value)}
    style={{
      width:"100%",
      padding:"10px",
      marginTop:"10px",
      marginBottom:"10px",
      color:"#000",
      background:"#fff",
      border:"1px solid #ccc",
      borderRadius:"6px"
    }}
  />

  <input
    type="time"
    value={time}
    onChange={(e)=>setTime(e.target.value)}
    style={{
      width:"100%",
      padding:"10px",
      marginBottom:"10px",
      color:"#000",
      background:"#fff",
      border:"1px solid #ccc",
      borderRadius:"6px"
    }}
  />

  <button
    onClick={addReminder}
    style={{
      background:"#1976d2",
      color:"#fff",
      border:"none",
      padding:"10px 20px",
      borderRadius:"6px",
      cursor:"pointer"
    }}
  >
    Add Reminder
  </button>

  <h3 style={{marginTop:"20px", color:"#333"}}>Your Reminders</h3>

  {reminders.map((r)=>(
    <div key={r.id} style={{color:"#333", marginTop:"5px"}}>
      💊 {r.medicine} at {r.time}
    </div>
  ))}

</div>

);

}

export default MedicineReminder;