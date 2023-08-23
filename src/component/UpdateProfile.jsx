

import  { useRef, useState } from "react"

import { Card, Button, Form, Alert} from "react-bootstrap";

import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";




const UpdateProfile = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfRef = useRef();
    const nameRef = useRef();
    const {currentUser, changeEmail, changePassword} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfRef.current.value) {
                return setError("Password do not match")
        }

        const promises = []

        setError("")
        setLoading(true)

        if(emailRef.current.value !== currentUser.email) {
          promises.push(changeEmail(emailRef.current.value))
        }

        if(passwordRef.current.value) {
          promises.push(changePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
          navigate("/login")
        }).catch(() => {
          setError("failed to update account")
        }).finally(() => {
          setLoading(false)
        })
       
    }

   
  return (
    <div>

    <Card>
        <Card.Body>
            <h1 className="text-center mb-4 colorPurple">Update Profile </h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form className="testStart" onSubmit={handleSubmit}>

                <Form.Group id="name">
                <Form.Label >Name</Form.Label>
                <Form.Control type="text" required ref={nameRef}/>
                </Form.Group>


                <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required ref={emailRef} defaultValue={currentUser.email}/>
                </Form.Group>

                <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  ref={passwordRef} placeholder="Leave blank to keep same"/>
                </Form.Group>

                <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password"  ref={passwordConfRef} placeholder="Leave blank to keep same"/>
                </Form.Group>

                <Button type="submit" disabled={loading} className="w-100 mt-4 btn-warning colorPurple" >Update</Button>
            </Form>
        </Card.Body>
    </Card>
 

    <div className="w-100 text-center mt-2">
       <Link to={"/dashboard"}>Cancel</Link>
    </div>
    </div>
  )
};

export default UpdateProfile;





