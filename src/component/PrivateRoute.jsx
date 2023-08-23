


import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useAuth } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  
  const {currentUser} = useAuth()

  return currentUser ? children : <Navigate to={"/login"} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node
};



export default PrivateRoute;
