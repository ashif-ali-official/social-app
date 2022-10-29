import "./Topbar.css";
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {

  const { user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">

        <div className="topbarLeft">
          <Link to="/" >
            <span className="logo">Social</span>
          </Link>
        </div>

        <div className="topbarCenter">
          <div className="searchBar">
            <Search className="searchIcon"/>
            <input type="text" placeholder="Search for people, post or video" className="searchInput" />
          </div>
        </div>

        <div className="topbarRight">

          <div className="topbarLinks">
            <span className="topBarlink">Hompage</span>
            <span className="topBarlink">Timeline</span>
          </div>

          <div className="topbarIcons">

            <div className="topbarIconItem">
              <Person/>
              <span className="topbarIconBadge">1</span>
            </div>

            <div className="topbarIconItem">
              <Chat/>
              <span className="topbarIconBadge">1</span>
            </div>
            
            <div className="topbarIconItem">
              <Notifications/>
              <span className="topbarIconBadge">3</span>
            </div>

            <Link to={`/profile/${user.username}`}>
            <img src={ user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt={user.username} className="topbarImg" />
            </Link>
          </div>

        </div>

    </div>
  )
}
