import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../firebaseAuth";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Signup.css"; // Import the CSS file for custom styles

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row>
        <Col xs={12}>
          <motion.div 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Card className="signup-card shadow-lg">
              <Card.Body>
                <h2 className="text-center mb-4">Create an Account</h2>

                {error && <p className="error-text">{error}</p>}

                <Form onSubmit={handleSignup}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="primary" type="submit" className="w-100">
                      Sign Up
                    </Button>
                  </motion.div>
                </Form>

                <p className="text-center mt-3">
                  Already have an account? <a href="/">Login</a>
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
