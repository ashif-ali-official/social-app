import './Rightbar.css';
import {Users} from "../../dummyData"
import Online from '../online/Online';
import { useState, useEffect } from "react"
import axios from "axios";

export default function Rightbar({ user }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/user/friends/" + await user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const HomeRightbar = () => {
    return(
      <>
        <div className="birthdayContainer">
          <img src={PF+"gift.png"} alt="" className="birthdayIcon" />
          <span className="birthdayText"> <b>Prince Jaiswal</b> and <b>2 other friends</b> have birthday today</span>
        </div>

        <img src={PF+"ad.png"} alt="" className="rightbarAd" />
        
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="onlineFriendList">

          {Users.map( u => (
            <Online key={u.id} user = {u}/>
          ))}

        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return(
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship ===2 ? "Married" : "It's Complicated"}</span>
          </div>

        </div>

        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">

          {friends.map( (friend) => {
            <div className="rightbarFollowing">
              <img 
                src={ friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} 
                alt={friend.username} 
                className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          })}

        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>

      <div className="rightbarWrapper">

        { user? <ProfileRightbar/> : <HomeRightbar/> }

      </div>

    </div>
  )
}
