import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../src/firebaseConfig"; // Ensure correct import

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <h2>Loading...</h2>;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
