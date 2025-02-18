import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from '../pages/Sidebar';  // Import Sidebar Component
import './MealRecommendation.css';  // Import the CSS file here

const MealRecommendation = ({ bmi }) => {
  const [showSidebar, setShowSidebar] = useState(false); // Manage sidebar visibility

  let category = '';
  let mealPlan = {};

  // BMI Categories and Meal Plans
  if (bmi < 18.5) {
    category = 'Underweight';
    mealPlan = {
      breakfast: 'High-protein smoothie, scrambled eggs, toast',
      lunch: 'Chicken salad, quinoa, avocado',
      dinner: 'Salmon, sweet potatoes, broccoli',
      snacks: 'Greek yogurt, protein bar, almonds'
    };
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal';
    mealPlan = {
      breakfast: 'Oatmeal with fruits, scrambled eggs',
      lunch: 'Grilled chicken with vegetables, brown rice',
      dinner: 'Grilled fish, steamed veggies, quinoa',
      snacks: 'Mixed nuts, yogurt, fruit'
    };
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
    mealPlan = {
      breakfast: 'Greek yogurt with berries, chia seeds',
      lunch: 'Grilled chicken salad, avocado, kale',
      dinner: 'Baked salmon, steamed vegetables',
      snacks: 'Carrot sticks, hummus, almonds'
    };
  } else if (bmi >= 30) {
    category = 'Obese';
    mealPlan = {
      breakfast: 'Scrambled eggs with spinach, avocado',
      lunch: 'Grilled chicken, spinach, cucumber',
      dinner: 'Baked turkey, roasted Brussels sprouts',
      snacks: 'Boiled eggs, cucumber slices, nuts'
    };
  }

  return (
    <Container className="my-4">
      <Row>
        {/* Button to toggle sidebar */}
        <Button 
          variant="secondary" 
          className="mb-3" 
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
        </Button>

        {/* Sidebar visible based on state */}
        {showSidebar && <Sidebar />} {/* Sidebar will be visible only when showSidebar is true */}

        <Col xs={12} md={9}>
          <h2 className="text-center mb-4">Meal Recommendations for {category} Category</h2>
          
          <Row className="g-4">
            <Col xs={12} sm={6} md={3}>
              <Card className="h-100 shadow-lg border-0">
                <Card.Body>
                  <Card.Title className="text-center">Breakfast</Card.Title>
                  <Card.Text>{mealPlan.breakfast}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className="h-100 shadow-lg border-0">
                <Card.Body>
                  <Card.Title className="text-center">Lunch</Card.Title>
                  <Card.Text>{mealPlan.lunch}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className="h-100 shadow-lg border-0">
                <Card.Body>
                  <Card.Title className="text-center">Dinner</Card.Title>
                  <Card.Text>{mealPlan.dinner}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className="h-100 shadow-lg border-0">
                <Card.Body>
                  <Card.Title className="text-center">Snacks</Card.Title>
                  <Card.Text>{mealPlan.snacks}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => alert("Save your meal plan")}>
              Save Plan
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MealRecommendation;
