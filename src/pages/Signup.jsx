import  {  useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { isValidEmail } from "../component/FnComponent";
import { useAuth  } from "../context/AuthContext";




const Signup = () => {

  const navigate = useNavigate();
  const [newUser, setNewUser] = useState(
    {
      name:"",
      email: "",
      password:"",
      cnfrmPassword: "",
    }
  );
  const {signUp, currentUser} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const isEmailValid = isValidEmail(newUser.email);
  const passwordsMatch = newUser.password === newUser.cnfrmPassword;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newUser.password !== newUser.cnfrmPassword) {
            return setError("Password do not match")
    }

    try {
        setError("")
        setLoading(true)
        await signUp(newUser.email, newUser.password, newUser.name);
        navigate('/chat');
        // navigate('/dashboard');
        
    } catch {
        setError("Failed to create an account")
    }
        
    setLoading(false)
}



 


  function handleChange(e) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  }



  return (
    <div className="container-fluid colorPurple mt-0">
      <div className="row justify-content-center ">
        <div className="col-12 col-md-8 col-lg-8">

        <div className="d-flex justify-content-start">
        <Link to={"boarding"}>
        <img className="" onClick={() => navigate(-1)} src="../Back.png"/>
        </Link>
        </div>

        <div className=" ">
        <img className="logo-in-signup" src="../logo.png" alt="logo"/>
        </div>

          <span className=" fw-bold fs-4 ">Sign up with Email </span>

          {/* Showing error */}
          {error && <p className="fw-bold fs-6 lh-sm mt-2 mb-3" style={{color:"red"}}>{error}</p> }


          <p className="fw-normal fs-6 lh-sm mt-3 mb-3">Enter your details and dive into a realm of ancient wisdom! 💫</p>
          

          <form onSubmit={handleSubmit}>

                  {/* NAME */}
            <div className="mb-3 text-start">
              <label htmlFor="name" className="form-label mb-0 ">Your name</label>
              <input type="text" 
              className="form-control border-0 rounded-0 border-bottom" 
              id="name"
              name="name"
              // value={newUser.name}
              onChange={handleChange}
              required
               />
            </div>

                    {/* EMAIL */}
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label mb-0 ">Your email</label>
              <input
              type="email"
              className="form-control border-0 rounded-0 border-bottom" 
              id="email" 
              name="email"
              onChange={handleChange}
              // value={newUser.email}
              required
              />
              <div className="text-end">
             {!isEmailValid  && newUser.email !== '' && <span>Invalid email address</span>}
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
                // value={newUser.password}
                onChange={handleChange}
                required
              />
            </div>


                  {/* CONFIRM PASSWORD */}
            <div className="mb-3 text-start">
              <label htmlFor="cnfrm-password" className="form-label mb-0">Confirm Password</label>
              <input 
              type="password" 
              className="form-control border-0 rounded-0 border-bottom" 
              id="cnfrm-password" 
              name="cnfrmPassword"
              onChange={handleChange}
              // value={newUser.cnfrmPassword}
              required
              />
              <div className="text-end">
              {!passwordsMatch && newUser.cnfrmPassword !== '' && (<span>Password must match</span>)}
              </div>
            </div>

          {/* Signup button */}
            <button 
            className=" loginButton btn btn-warning w-100"
            disabled={loading}
            type="submit"
            >Sign Up</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;