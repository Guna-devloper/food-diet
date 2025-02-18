import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";


const Dashboard = ({ userRole, bmiResult }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  // Function to determine BMI category dynamically
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    return "Obese";
  };

  useEffect(() => {
    if (bmiResult) {
      setUserData({
        name: "John Doe",
        email: "johndoe@example.com",
        bmi: bmiResult.bmi, // Get BMI from calculator result
        category: getBMICategory(bmiResult.bmi), // Determine category
        calories: bmiResult.calories || 2500, // Fallback if no value
      });
    }
  }, [bmiResult]); // Update whenever BMI changes

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container fluid className="my-4">
      <Row>
        <Col xs={12}>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#">HealthMate</Navbar.Brand>
            <Nav className="ml-auto">
              <NavDropdown title="Profile" id="navbar-profile-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={3} className="mb-4">
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title>Welcome, {userData?.name}</Card.Title>
              <Card.Text>Email: {userData?.email}</Card.Text>
              <Button variant="primary" onClick={() => navigate("/profile")}>
                View Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Render either User or Admin Dashboard */}
        {userRole === "admin@gmail.com" ? (
          <AdminDashboard />
        ) : (
          <UserDashboard userData={userData} />
        )}
      </Row>
    </Container>
  );
};

// Admin Dashboard (No Changes)
const AdminDashboard = () => {
  return (
    <Col xs={12} md={9}>
      <Card className="shadow-lg mb-4">
        <Card.Body>
          <Card.Title>User Management</Card.Title>
          <Button variant="success" onClick={() => alert("Adding User")}>
            Add New User
          </Button>
          <Button variant="danger" className="ml-2" onClick={() => alert("Removing User")}>
            Remove User
          </Button>
        </Card.Body>
      </Card>

      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title>Analytics Overview</Card.Title>
          <Button variant="primary" onClick={() => alert("Viewing Analytics")}>
            View Analytics
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

// User Dashboard (Updated with Dynamic BMI Data)
const UserDashboard = ({ userData }) => {
  return (
    <Col xs={12} md={9}>
      <Card className="shadow-lg mb-4">
        <Card.Body>
          <Card.Title>Your BMI: {userData?.bmi}</Card.Title>
          <Card.Text>Your BMI category: {userData?.category}</Card.Text>
          <Button variant="primary" onClick={() => alert("View BMI History")}>
            View BMI History
          </Button>
        </Card.Body>
      </Card>

      <Card className="shadow-lg mb-4">
        <Card.Body>
          <Card.Title>Personalized Meal Plan</Card.Title>
          <Card.Text>Based on your BMI, we recommend the following diet:</Card.Text>
          <Button variant="success" onClick={() => alert("View Meal Plan")}>
            View Meal Plan
          </Button>
        </Card.Body>
      </Card>

      <Card className="shadow-lg">
        <Card.Body>
          <Card.Title>Calorie Tracking</Card.Title>
          <Card.Text>Your current calorie intake: {userData?.calories} kcal</Card.Text>
          <Button variant="warning" onClick={() => alert("Track Calories")}>
            Track Calories
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Dashboard;
