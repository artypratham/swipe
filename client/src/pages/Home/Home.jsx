import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import AuthModal from "../../components/AuthModal/AuthModal";
import { useCookies } from "react-cookie";
import HomeBg from "../../components/HomeBg/HomeBg";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);


  const authToken = cookies.AuthToken;
  const handleClick = () => {

    if (authToken) {
        removeCookie('UserId', cookies.UserId);
        removeCookie('AuthToken', cookies.AuthToken);
        window.location.reload();
        return;
    }
  
    setShowModal(true)
    setIsSignUp(true)

  
  }
  return (
    <div className="overlay">
        <Navbar
            authToken={authToken}
            minimal={false}
            setShowModal={setShowModal}
            showModal={showModal}
            setIsSignUp={setIsSignUp}
        />
        <div className="home">
            <h1 className="primary-title"><span style={{color:"black"}}>swipe</span><span style={{color:"yellow"}}>&gt;</span> right</h1>
            <p className="tag-line">on your next dev partner</p>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Sign out' : 'Create Account'}
            </button>
            {showModal && (
                <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
            )}
        </div>

        <HomeBg />
    </div>
)
}
export default Home