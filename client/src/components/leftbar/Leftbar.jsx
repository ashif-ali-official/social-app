import "./Leftbar.css"
import { RssFeed, Chat, PlayCircle, Group, HelpOutline, Bookmark, WorkOutline, InsertInvitation, School } from "@mui/icons-material"
import {Users} from "../../dummyData";
import Friends from "../friends/Friends";

export default function Leftbar() {
  return (
    <div className="leftbar">
        
        <div className="leftbarWrapper">

            <ul className="leftbarList">

                <li className="leftbarListItem">
                    <RssFeed className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Feed</span>
                </li>

                <li className="leftbarListItem">
                    <Chat className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Chat</span>
                </li>

                <li className="leftbarListItem">
                    <PlayCircle className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Videos</span>
                </li>

                <li className="leftbarListItem">
                    <Group className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Groups</span>
                </li>

                <li className="leftbarListItem">
                    <Bookmark className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Bookmark</span>
                </li>

                <li className="leftbarListItem">
                    <HelpOutline className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Questions</span>
                </li>

                <li className="leftbarListItem">
                    <WorkOutline className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Jobs</span>
                </li>

                <li className="leftbarListItem">
                    <InsertInvitation className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Events</span>
                </li>

                <li className="leftbarListItem">
                    <School className="leftbarListItemIcon"/>
                    <span className="leftbarListItemText">Courses</span>
                </li>

            </ul>

            <button className="leftbarbutton">Show More</button>
            <hr className="leftbarHr"/>

            <ul className="leftbarFriendlist">

                {Users.map( u=> (
                    <Friends key={u.id} user = {u}/>
                ))}

            </ul>

        </div>

    </div>
  )
}
