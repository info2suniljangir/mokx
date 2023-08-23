import PropTypes from 'prop-types';


const WelcomeChat = ({onMessageClick}) => {

  const handleClick = (e) => {
    onMessageClick(e.target.textContent);
  }
  return (
    <div>

<div className="chat-message backgroundColorPurple text-start bot-message text-light  p-2 mb-3 ">
            🙏 Namaste! I'm Arya, your AI Vedic help. I am here to provide insights from Vedas for daily life concerns.\n\nWhether you seek guidance on mantras, general life advice, or specific Vedic interpretations, I am here to assist you.",
    
            </div>

            <p>
              <img src="../Vector.png" alt="Vector" />
              You can ask queries like:
            </p>

            <div className="bg-warning rounded-4 py-2 mb-2 px-3 cursor-pointer">
              <div className="text-start " onClick={handleClick}>What is the mantra in Rigveda 10.2.3?</div>
            </div>

            <div className="bg-warning rounded-4 py-2 mb-2 px-3 cursor-pointer">
              <div className="text-start"  onClick={handleClick} >What are the prescribed Vedic remedies for snake bites?</div>
            </div>

            <div className="bg-warning rounded-4 py-2 mb-2 px-3 cursor-pointer">
              <div className="text-start"  onClick={handleClick} >Can you tell me the significance of the Gayatri Mantra?</div>
            </div>
      
    </div>
  )
}

WelcomeChat.propTypes = {
  onMessageClick: PropTypes.func,
};

export default WelcomeChat;
