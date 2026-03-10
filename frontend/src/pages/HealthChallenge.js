import React, { useState } from "react";

function HealthChallenge() {

  const [water, setWater] = useState(false);
  const [steps, setSteps] = useState(false);
  const [sleep, setSleep] = useState(false);

  const completed = water && steps && sleep;

  return (

    <div
      style={{
        background: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "600px",
        color: "#222"
      }}
    >

      <h2 style={{color:"#0b3d91"}}>
        Daily Health Challenge 🏆
      </h2>

      <p>
        Complete these healthy habits today:
      </p>

      <div style={{marginTop:"20px"}}>

        <label style={{display:"block", marginBottom:"10px"}}>
          <input
            type="checkbox"
            checked={water}
            onChange={()=>setWater(!water)}
          /> 
          Drink 8 glasses of water 💧
        </label>

        <label style={{display:"block", marginBottom:"10px"}}>
          <input
            type="checkbox"
            checked={steps}
            onChange={()=>setSteps(!steps)}
          /> 
          Walk 5000 steps 🚶
        </label>

        <label style={{display:"block", marginBottom:"10px"}}>
          <input
            type="checkbox"
            checked={sleep}
            onChange={()=>setSleep(!sleep)}
          /> 
          Sleep 8 hours 😴
        </label>

      </div>

      {completed && (

        <div
          style={{
            marginTop:"20px",
            padding:"15px",
            background:"#e8f5e9",
            borderRadius:"10px",
            color:"#2e7d32",
            fontWeight:"bold"
          }}
        >

          🎉 Congratulations!  
          You completed today's health challenge.

        </div>

      )}

    </div>

  );

}

export default HealthChallenge;