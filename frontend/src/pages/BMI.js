import React, { useState } from "react";

function BMI() {

  const [weight,setWeight] = useState("");
  const [height,setHeight] = useState("");
  const [result,setResult] = useState("");

  const calculateBMI = () => {

    if(!weight || !height){
      alert("Please enter weight and height");
      return;
    }

    const h = height / 100;
    const bmi = (weight / (h*h)).toFixed(1);

    let status = "";

    if(bmi < 18.5)
      status = "Underweight";

    else if(bmi < 24.9)
      status = "Normal";

    else if(bmi < 29.9)
      status = "Overweight";

    else
      status = "Obese";

    setResult("BMI: " + bmi + " (" + status + ")");
  };

  return (

    <div style={{
      background:"#ffffff",
      padding:"30px",
      borderRadius:"10px",
      maxWidth:"500px",
      color:"#222"
    }}>

      <h2 style={{color:"#0b3d91"}}>BMI Calculator</h2>

      <input
      type="number"
      placeholder="Weight (kg)"
      value={weight}
      onChange={(e)=>setWeight(e.target.value)}
      style={{
        width:"100%",
        padding:"10px",
        marginTop:"10px",
        marginBottom:"10px",
        background:"#fff",
        color:"#000",
        border:"1px solid #ccc",
        borderRadius:"6px"
      }}
      />

      <input
      type="number"
      placeholder="Height (cm)"
      value={height}
      onChange={(e)=>setHeight(e.target.value)}
      style={{
        width:"100%",
        padding:"10px",
        marginBottom:"10px",
        background:"#fff",
        color:"#000",
        border:"1px solid #ccc",
        borderRadius:"6px"
      }}
      />

      <button
      onClick={calculateBMI}
      style={{
        padding:"10px",
        width:"100%",
        background:"#0b3d91",
        color:"#fff",
        border:"none",
        borderRadius:"6px",
        cursor:"pointer"
      }}
      >
      Calculate BMI
      </button>

      <h3 style={{marginTop:"20px",color:"#000"}}>
        {result}
      </h3>

    </div>

  );

}

export default BMI;