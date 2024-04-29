import React from "react";
import "./ChatContainer.css";
import { useState } from "react";
import axios from "axios";

/*
const ChatInput = ({ user, clickedUser, getUsersMessages, getClickedUsersMessages }) => {

  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickUserId = clickedUser?.user_id;

  const addMessage = async () => {
      const message = {
        timestamp: new Date().toISOString(),
        from_user_id: userId,
        to_user_id: clickUserId,
        message: textArea
      };

      try{
            await axios.post('http://localhost:8000/message',{ message });
            getUsersMessages();
            getClickedUsersMessages();
            setTextArea("");
      } catch (error) {
          console.log(error);
      }



  }


  return (
   <div className='chat-input'>
        <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
        <br/>
        <button className="secondary-button" onClick={addMessage} >Submit</button>
   </div>
  );
}

export default ChatInput;
*/

const ChatInput = ({
  user,
  clickedUser,
  getUserMessages,
  getClickedUsersMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };

    try {
      await axios.post("https://swipe-server.vercel.app/message", { message });
      getUserMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
  
    <div className="input-wrapper">
      <div className="chat-input">
      
        <input className="message-input-box"
        value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
        />
      </div>
      <div className="send-button">
        <button className="msg-send-button" onClick={addMessage}> 
        send
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatInput;
