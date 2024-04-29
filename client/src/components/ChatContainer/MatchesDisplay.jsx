import axios from 'axios'
import { useEffect, useState } from 'react'
import './ChatContainer.css'
import { useCookies } from 'react-cookie'

const MatchesDisplay = ({ matches, setClickedUser }) => {

  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);


  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try{
      const response = await axios.get('https://swipe-server.vercel.app/users1',{

        params: {userIds: JSON.stringify(matchedUserIds)}
      })
      setMatchedProfiles(response.data);
    }catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMatches();

  }, [matches]);


    // const filteredMatchedProfiles = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id == userId).length > 0)


    const filteredMatchedProfiles = matchedProfiles?.filter(matchedProfile => 
      matchedProfile.matches?.filter(profile => profile.user_id === userId)?.length > 0
    );
    

  return (
    <div className='matches-display'>
    {filteredMatchedProfiles?.map((match) => (
      <div key={match.user_id} className="match-card" onClick={() => setClickedUser(match)}>
        <div className="profile-info">
          <div className="img-container" alt={match?.first_name + 'profile'}>
            <img src={match?.url} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      </div>
    ))}
  </div>
  );
}

export default MatchesDisplay;
