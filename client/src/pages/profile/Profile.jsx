import './Profile.css'
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser ] = useState({});
  const username = useParams().username;

  useEffect( () => {
      const fetchUser = async () => {
        const res = await axios.get(`/user?username=${username}`); 
        setUser(res.data);
      }
      fetchUser();
    }, [username]);


  return (
    <>
      <Topbar/>
      <div className="profile">
        <Leftbar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={ user.coverPicture ? PF + user.coverPicture : PF + "post/noCover.jpg"} alt="" className="profileCoverImg" />
                    <img src={ user.profilePicture ? PF+user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.description}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={ user }/>
            </div>
        </div>
      </div>
    </>
  )
}
