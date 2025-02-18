import React, { useState } from "react";
import { Card, Form, Button, ProgressBar, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; // Importing Confetti for party pop effect
import "./BMICalculator.css";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState(null);
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [isConfettiVisible, setIsConfettiVisible] = useState(false); // To trigger confetti animation

  const navigate = useNavigate(); // Initialize useNavigate hook

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);
      determineCategory(bmiValue);
      calculateCalories(bmiValue, weight);

      // Trigger confetti and show modal
      setIsConfettiVisible(true);
      setShowModal(true);
    }
  };

  const calculateCalories = (bmiValue, weight) => {
    let baseCalories = 0;
    if (bmiValue < 18.5) {
      baseCalories = weight * 35; // Higher calories for underweight
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      baseCalories = weight * 30; // Normal calorie intake
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      baseCalories = weight * 25; // Lower calories for overweight
    } else {
      baseCalories = weight * 20; // Lowest for obese category
    }
    setCalories(Math.round(baseCalories)); // Round to nearest whole number
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/dashboard", { state: { bmi, category, calories } }); // Pass data via state
  };

  const determineCategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Normal Weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  const getProgressVariant = () => {
    if (category === "Underweight") return "info";
    if (category === "Normal Weight") return "success";
    if (category === "Overweight") return "warning";
    return "danger";
  };

  return (
    <Card className="p-4 shadow">
      <h3 className="text-center">BMI Calculator</h3>
      <Form>
        <Form.Group>
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Height (cm)</Form.Label>
          <Form.Control
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
        </Form.Group>
        <Button className="mt-3 w-100" variant="primary" onClick={calculateBMI}>
          Calculate BMI
        </Button>
      </Form>

      {bmi && (
        <div className="mt-4 text-center">
          <h4>Your BMI: {bmi}</h4>
          <h5 className={`text-${getProgressVariant()}`}>{category}</h5>
          <ProgressBar now={bmi} max={40} variant={getProgressVariant()} />
        </div>
      )}

      {/* Confetti Effect */}
      {isConfettiVisible && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Modal Popup */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Your BMI: {bmi}</h4>
          <h5 className={`text-${getProgressVariant()}`}>{category}</h5>
          <h6>Recommended Daily Caloric Intake: {calories} kcal</h6>
          <ProgressBar now={bmi} max={40} variant={getProgressVariant()} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close & Go to Dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default BMICalculator;
