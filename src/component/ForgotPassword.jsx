



import  { useRef, useState } from "react"

import { Card, Button, Form, Alert} from "react-bootstrap";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";




const ForgotPassword = () => {

    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();



    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instruction")
            } catch (error) {
            setError("Failed to reset password")
        }
            
        setLoading(false)
    }

 
  return (
    <div>

    <Card>
        <Card.Body>
            <h1 className="text-center mb-4 colorPurple">Forgot Password</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            {message && <Alert variant="success">{message}</Alert>}

            <Form className="testStart" onSubmit={handleSubmit}>

                <Form.Group id="email">
                <Form.Label >Email</Form.Label>
                <Form.Control type="email" required ref={emailRef}/>
                </Form.Group>

                <Button type="submit" disabled={loading} className="w-100 mt-4 btn-warning colorPurple" >Reset Password</Button>
            </Form>

            <div className="w-100 text-center mt-3">
                <Link to={"/login"}>Login</Link>
            </div>
        </Card.Body>
    </Card>
 

    <div className="w-100 text-center mt-2">
      already have an account? <Link to={"/signup"}>Signup</Link>
    </div>
    </div>
  )
};

export default ForgotPassword;


