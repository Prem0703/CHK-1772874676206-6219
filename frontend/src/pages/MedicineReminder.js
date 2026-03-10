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

<div style={{padding:"30px"}}>

  <h2>Medicine Reminder</h2>

  <input
    placeholder="Medicine Name"
    value={medicine}
    onChange={(e)=>setMedicine(e.target.value)}
  />

  <input
    type="time"
    value={time}
    onChange={(e)=>setTime(e.target.value)}
  />

  <button onClick={addReminder}>
    Add Reminder
  </button>

  <h3 style={{marginTop:"20px"}}>Your Reminders</h3>

  {reminders.map((r)=>(
    <div key={r.id}>
      💊 {r.medicine} at {r.time}
    </div>
  ))}

</div>

);

}

export default MedicineReminder;