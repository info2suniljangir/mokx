import  { useEffect, useRef, useState } from "react";
// import { useAuth } from "../context/AuthContext";
import WelcomeChat from "./WelcomeChat";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

let newId = 4;

const Chat = () => {

  const [value, setValue] = useState("");
  const [chatIsStarted, setChatIsStarted] = useState(false); 
  const [messages, setMessages] = useState([
    // {
    //   id: 1,
    //   sender: "bot",
    //   text: "🙏 Namaste! I’m Arya, your AI Vedic help. I'm here to provide insights from Vedas for daily life concerns.\n\nWhether you seek guidance on mantras, general life advice, or specific Vedic interpretations, I’m here to assist you.",
    // },
    // {
    //   id: 2,
    //   sender: "user",
    //   text: "What is the mantra in Rigveda 10.2.3?",
    // },
    // {
    //   id: 3,
    //   sender: "bot",
    //   text: "I'll find that information for you.",
    // },
    // Add more messages here
  ]);
  const lastMessageRef = useRef(null);
  const { signout } = useAuth();
  // const { currentUser } = useAuth()
  const navigate = useNavigate();



  const options = {
    method: "POST", 
    body : JSON.stringify({
      messages: value,
      // messages: [{ role: "user", content: value }],
    }),
    headers: {
      "Content-Type" : "application/json",
    }
  }


  const getMessages = async () => {
    setChatIsStarted(true);
    // Increment newId and create the new message object.
    newId++;
    const newMessage = { id: newId, sender: "user", text: value };
  
    // Update the state using the functional update pattern.
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setValue("");
  
    try {
      const response = await fetch("http://localhost:3000/completions", options);
      const data = await response.json();
  
      // Use the latest state (prevMessages) obtained from the previous setMessages update.
      setTimeout(() => {
        newId++;
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: newId, sender: "bot", text: data.choices[0].message.content },
        ]);
      }, 1000);
    } catch (error) {
      console.error(error);
    }

  };

  const handleMessageClick = (suggestedText) => {
    setValue(suggestedText);
  }

  const handleLogout = async () => {
    try {
        await signout()
        navigate("/login")
        } catch (error) {
        alert("Failed to logout")
    }
}
  

    
  // Scroll down to the bottom whenever new messages are added
  useEffect(() => {
    lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
  }, [messages]);
  



  return (
    <div className="container-fluid colorPurple ">
      <div className="row justify-content-center mt-5 ">
   
      
        <div className="col-12 col-md-8 col-lg-8">
       

          <div className="d-flex justify-content-between align-items-center p-3 minWidth">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                {/* <img src="../Back.png" alt="Back" /> */}
              </div>
              <div className="ms-3 me-3">
                <img src="../profilepic.png" alt="Profile" />
              </div>
              <div className="">
                <p className="m-0 text-start fw-bold">Arya</p>
                <p className="m-0 text-body-tertiary">Vedic AI Bot</p>
              </div>
            </div>
            <div >
            <Link to={"/dashboard"}>
            <img className="me-3 ms-3" src="../dashboard.png"/>
            </Link>
            <img onClick={handleLogout} src="../shutdown.png" style={{width:"24px", height:"24px"}} /></div>
          </div>

          <div className="px-5 py-3 pb-5">

          <div className="messages-container" ref={lastMessageRef}>
      {chatIsStarted ? (
        messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.sender === 'bot'
                ? 'backgroundColorPurple text-light text-start bot-message'
                : 'bg-warning text-dark text-end user-message '
            } p-2 mb-3`}
          >
            {message.sender === "bot" && <div className="bot-pic">
            
          </div>}
            {message.text}

          </div>
        ))
      ) : (
        /* welcome chat */
        <WelcomeChat onMessageClick={handleMessageClick} />
      )}
    </div>

              
            
            

          </div>
        </div>

        <div className="inputBox">
            <div className="chat-input">
              <input 
              type="text" 
              value={value}
              placeholder="Type your message..." 
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => { e.key === "Enter" && getMessages()}}
              />
              <div className="input-buttons position-absolute end-0">
              <button className="btn p-1"
              onClick={getMessages}
              ><img src="../send.png"/></button>
              <button className="btn p-1"><img src="../microphone.png"/></button>
              </div>
            </div>
        </div>
             

    

      </div>




    </div>
  );
};

export default Chat;