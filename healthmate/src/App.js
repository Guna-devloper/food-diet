import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import BMICalculator from "./components/BMICalculator";
import MealRecommendation from "./components/MealRecommendation";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [bmi, setBmi] = useState(null);
  const userRole = "user";
  const handleBmiCalculation = (calculatedBmi) => {
    setBmi(calculatedBmi);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        
        {/* BMICalculator page */}
        <Route 
          path="/Bmicalc" 
          element={<BMICalculator onBmiCalculated={handleBmiCalculation} />} 
        />
 
        {/* Meal Recommendation page, conditionally rendered if BMI exists */}
        <Route
          path="/meal-recommendation"
          element={bmi ? <MealRecommendation bmi={bmi} /> : <div>Please calculate BMI first.</div>}
        />
              <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />

      </Routes>

    </Router>
  );
};

export default App;
