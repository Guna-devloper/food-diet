import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import './Sidebar.css'; // For styling the sidebar

const Sidebar = () => {
  return (
    <Col xs={12} md={3} className="sidebar">
      <div className="sidebar-content">
        <h4 className="sidebar-title">HealthMate</h4>
        <nav>
          <ul className="sidebar-nav">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            
            <li>
              <Link to="/meal-recommendation">Meal Recommendation</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Col>
  );
};

export default Sidebar;
