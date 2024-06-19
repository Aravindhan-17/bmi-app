import React, { useState } from 'react';
import './App.css';

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [error,setError] = useState("");

  const clear = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setBmiStatus("");
    setError("");
  }

  const calculate = () => {
    
    if(height && !weight){
      setError("Please enter the weight value");
      return;
    }else if(weight && !height){
      setError("Please enter the height value");
      return;
    }
    if (height && weight && !isNaN(height) && !isNaN(weight)) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
      if (bmiValue < 18.5) {
        setBmiStatus("You are underweight😢");
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setBmiStatus("You are in healthy weight👌");
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setBmiStatus("You are overweight🤨");
      } else if (bmiValue >= 30 && bmiValue <= 34.9) {
        setBmiStatus("Obese 1");
      } else if (bmiValue >= 35 && bmiValue <= 39.9) {
        setBmiStatus("Obese 2");
      } else if (bmiValue >= 40) {
        setBmiStatus("Obese 3");
      }
      setError("");
    } else {
      setBmi(null);
      setBmiStatus("");
      setError("Please enter the numeric value for height and weight");
    }
  }

  const handleEvent = (e)=>{
       setError("");
      const {name,value} = e.target;
      if(name === "height"){
        setHeight(value);
      }else if(name ==="weight"){
        setWeight(value);
      }
      setBmi(null);
  }

  return (
    <div className="container">
      <div className="box"></div>
      <div className="data">
        <h1>BMI Calculator</h1>
        {error && <p className="error">{error}</p>}
        <div className="input-container">
          <label htmlFor='height'>Height in(Cm):</label>
          <input type="number" name='height' id='height' value={height} placeholder='Enter your height' onChange={handleEvent} />
        </div>
        <div className="input-container">
          <label htmlFor='weight'>Weight in(Kg):</label>
          <input type="number" name='weight' id='weight' value={weight} placeholder='Enter your weight' onChange={handleEvent} />
        </div>
        <button id='calc' onClick={calculate}>Calculate BMI</button>
        <button id='clear' onClick={clear}>Clear</button>
        {bmi && <div className="result">
          <p>Your BMI is: {bmi}</p>
          <p>Status: {bmiStatus}</p>
        </div>}
      </div>
    </div>
  )
}

export default App;
