import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();


  const [userLogin, setUserLogin] = useState(
    {
      email: "",
      password: "",
    }
  );

  // const isEmailValid = isValidEmail(userLogin.email);
  const {login, signInWithGoogle} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
        setError("")
        setLoading(true)
        await login(userLogin.email, userLogin.password);
        navigate("/chat");
        } catch (error) {
        setError("Failed to Login")
    }
        
    setLoading(false)
}


const handleSignInWithGoogle = async (e) => {

        e.preventDefault();
  try {
      setError("")
      setLoading(true)
      await signInWithGoogle()
      navigate("/dashboard");
      } catch (err) {
      setError("Failed to Login")
      console.log(error);
  }
      
  setLoading(false)
}



  return (
    <div className=" formContainer container colorPurple">
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8 col-lg-8">

        <div className="d-flex justify-content-start">
        <img onClick={() => navigate(-1)} src="../Back.png" className=" " />
        </div>

        <div className=" ">
        <img className="logo-in-signup" src="../logo.png" alt="logo"/>
        </div>

        
        


          <span className=" fw-bold fs-4 mt-2">Login to Mokx</span>
    
        {/* Showing error */}
          {error && <p className="fw-bold fs-6 lh-sm mt-2 mb-3" style={{color:"red"}}>{error}</p> }

          <p className="fw-normal fs-6 lh-sm mt-3 mb-3">
          Welcome back! Sign in using your social account or email to continue.</p>
          
          
          <div className="socialMediaLogos">
            <img  src="../facebook.png" alt="facebook" className="me-2" />
            <img  src="../google.png" onClick={handleSignInWithGoogle} alt="google" className="me-2" />
            <img  src="../apple-logo.png" alt="apple" />
          </div>


          <div className="helper my-3">
            <div className="text-2">
                <p>OR</p>
            </div>
            <div className="border"></div>
          </div>

          <form onSubmit={handleSubmit}>

              {/* EMAIL */}
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label mb-0 ">Email id</label>
              <input 
              type="email" 
              className="form-control border-0 rounded-0 border-bottom" 
              id="email"
              name="email"
              value={userLogin.email}
              onChange={handleChange}
              required
               />

              <div className="text-end">
              {/* {!isEmailValid  && userLogin.email !== '' && <span>Invalid email address</span>} */}
              </div>
            </div>

                  {/* PASSWORD */}
            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label mb-0">Password</label>
              <input 
              type="password" 
              className="form-control border-0 rounded-0 border-bottom" 
              id="password"
              name="password"
              value={userLogin.password}
              onChange={handleChange}
              required
               />
              
            </div>

            <button type="submit" disabled={loading} className=" loginButton btn btn-warning w-100">Login</button>
          </form>

          <p className="mt-3"> <Link to={"/forgot-password"} >Forgot password? </Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;