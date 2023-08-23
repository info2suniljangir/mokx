

import  { useState } from "react"

import { Button, Card, Alert } from "react-bootstrap";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [error, setError] = useState("");
    const {currentUser, signout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setError("")
            await signout()
            navigate("/login")
            } catch (error) {
            setError("Failed to logout")
        }
    }


    console.log(currentUser)

  return (
    <div>
      <Card>

      <Card.Body>
      <h1 className="text-center mb-4">Profile</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <strong>Email:</strong> {currentUser.email}
      <p>Display Name: {currentUser.displayName}</p>
      <Link to={"/update-profile"} className="btn btn-primary w-100 mt-3 mb-3">Update profile</Link>
      <Link to={"/chat"}>Back To Chat</Link>
      </Card.Body>

      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  )
};

export default Dashboard;
