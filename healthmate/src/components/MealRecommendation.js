import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import Sidebar from '../pages/Sidebar';
import './MealRecommendation.css';  

const MealRecommendation = ({ bmi }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  let category = '';
  let mealPlan = {};

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
        <Col xs={12} className="text-center mb-3">
          <Button 
            variant="secondary" 
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </Button>
        </Col>

        {showSidebar && <Sidebar />} 

        <Col xs={12}>
          <h2 className="text-center mb-4">Meal Recommendations for {category} Category</h2>
          
          <Row className="g-4 justify-content-center">
            {Object.keys(mealPlan).map((meal, index) => (
              <Col xs={12} sm={6} md={3} key={index}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.5, delay: index * 0.2 }} 
                  whileHover={{ scale: 1.05 }} 
                >
                  <Card className="h-100 shadow-lg border-0 meal-card">
                    <Card.Body>
                      <Card.Title className="text-center">{meal.charAt(0).toUpperCase() + meal.slice(1)}</Card.Title>
                      <Card.Text>{mealPlan[meal]}</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="primary" onClick={() => alert("Save your meal plan")}>
                Save Plan
              </Button>
            </motion.div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MealRecommendation;
