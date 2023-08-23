import { useState }from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {

  const {signInWithGoogle} = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSignInWithGoogle = async () => {
        
    try {
        
        setLoading(true)
        await signInWithGoogle()
        navigate("/chat");
        } catch (error) {
        console.log(error);
    }
        
    setLoading(false)
  }


  return (
    <div className="container boarding-container ">
      <div className="row justify-content-center mt-0">
        <div className="col-12 col-md-8 col-lg-6 p-0 backgroundColorPurple">



          <div className="text-center ">
            <img src="../praypic.png" alt="pray-girl" className="img-fluid pray-img" />
          </div>

        <div className="bottom-rectangle p-5  text-light">
          <div className="text-center mb-4 fs-1 fw-bold  font-monospace discoveryText">
            <p className="text-start lightTextColor" >Discover the timeless wisdom of <span className="yelloColor">the Vedas.</span></p>
          </div>

          <div className="text-center mb-4 journeyText">
            <p className="text-start">
              Sign up and <span className="yelloColor">journey through ancient knowledge with Arya </span>
            </p>
          </div>

          <div className="d-flex justify-content-center mb-3 socialMediaLogos-boarding">
            <img src="../facebook.png" alt="facebook" className="me-2" />
            <img src="../google.png" alt="google" onClick={handleSignInWithGoogle} className="me-2" />
            <img src="../apple-logo.png" alt="apple" />
          </div>

          <div className="text-center my-3 helper helper-boarding">
            <div className="text-2">
              <p>OR</p>
            </div>
            <div className="border"></div>
          </div>

          <div className="text-center mb-3">
            <button className="btn btn-warning w-100 mt-3" disabled={loading} > 
            <Link to={"signup"}> Signup with email </Link>
           
            </button>
          </div>

          <div className="text-center">
            Existing account? <Link to={"login"}>Login</Link>
          </div>

        </div>
    </div>
      </div>
    </div>
  );
};

export default Onboarding;