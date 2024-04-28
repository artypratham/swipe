import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import './ChatHeader.css'
const ChatHeader = ({ user }) => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    const navigate = useNavigate();

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        navigate("/");
    }

    return (
        <div>
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photo of " + user.first_name}/>
                </div>
                
                <h3>{user.first_name}</h3>
            </div>
            <button className='logout-btn' onClick={logout}>logout  →</button>
            {/* <i className="log-out-icon" onClick={logout}>⇦</i> */}
        </div>
        <hr
                        style={{
                          color: "white",
                          width: "90%",
                          marginTop: "-1vh",
                        }}
                      />
        </div>
    )
}

export default ChatHeader

