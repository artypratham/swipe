import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../../components/ChatContainer/ChatContainer";
import "./Dashboard.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Dashboard = () => {
  const [lastDirection, setLastDirection] = useState();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("https://swipe-server.vercel.app/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("https://swipe-server.vercel.app/users", {
        params: { userId },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getUsers();
    }
  }, [user]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("https://swipe-server.vercel.app/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(userId);

  const filteredUsers = users?.filter(
    (user) => !matchedUserIds.includes(user.user_id)
  );

  return (
    <>
      {user && users && (
        <div className="dashboard">
          <div className="swipe-container">
            <div className="card-container">
              {filteredUsers.map((user) => (
                <TinderCard
                  className="swipe"
                  key={user.user_id}
                  onSwipe={(dir) => swiped(dir, user.user_id)}
                  onCardLeftScreen={() => outOfFrame(user.first_name)}
                >
                  <div className="card">
                    <div
                      style={{ backgroundImage: "url(" + user.url + ")" }}
                      className="card1"
                    ></div>
                    <div className="user-bio-data">
                      <div className="users-name">{user.first_name}</div>
                      <hr
                        style={{
                          color: "white",
                          width: "100%",
                          marginTop: "3vh",
                        }}
                      />
                      <div className="user-about-me">{user.about}</div>
                      <hr
                        style={{
                          color: "white",
                          width: "100%",
                          marginTop: "3vh",
                        }}
                      />
                     <h3 style={{textAlign:"left", margin:"0",padding:"0",fontWeight:"400"}}>SKILLS</h3>
                      <div
                        className="user-skills-data"
                        style={{ display: "flex", flexWrap: "wrap" }}
                      >
                        {Array.isArray(user.selectedSkillsSet) &&
                          user.selectedSkillsSet
                            .slice(0, 5)
                            .map((skill, index) => (
                              <div
                                key={index}
                                style={{
                                  width: `${skill.length * 10}px`,
                                  backgroundColor: "#3d3d3d",
                                  color :"white",
                                  margin: "3px",
                                  marginLeft: "-13px",
                                  padding: "5px 0px",
                                  borderRadius : "200px"
                                }}
                                className="skill-button"
                              >
                                {skill}
                              </div>
                            ))}
                      </div>

                      <div className="socials-icon">
                        <div className="round-button">
                          <a href={user.git_url}>
                            <FontAwesomeIcon icon={faGithub} className="icon" />
                          </a>
                        </div>
                        <div className="round-button">
                          <a href={user.linkedin_url}>
                            <FontAwesomeIcon
                              icon={faLinkedin}
                              className="icon"
                            />
                          </a>
                        </div>
                        <div className="user-looking-for">Looking for {user.look_for}</div>
                      </div>
                    </div>
                  </div>
                </TinderCard>
              ))}
            </div>
            <div className="swipe-info">
              {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
            </div>
          </div>
          <ChatContainer user={user} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
