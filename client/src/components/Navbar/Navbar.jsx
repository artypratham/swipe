import ColorLogo from "../../assets/tinderLogo.png";
import WhiteLogo from "../../assets/tinderWhiteLogo.png";
import "./Navbar.css";

const Navbar = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

    const handleClick = () => {
      setShowModal(true)
      setIsSignUp(false)
    }

  
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? ColorLogo : WhiteLogo} alt="" />
      </div>

      {!authToken && !minimal && 
      <button 
      className="nav-button"
      onClick={handleClick}
      disabled = {showModal}
      >
        Log in
        </button>}
    </nav>
  )
}

export default Navbar
