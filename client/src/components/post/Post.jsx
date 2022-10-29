import './Post.css';
import { MoreVert } from '@mui/icons-material'
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom"; 
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {
   
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser ] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect( () => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect( () => {
        const fetchUser = async () => {
          const res = await axios.get(`/user?userId=${post.userId}`);
          setUser(res.data);
        }
        fetchUser();
      }, [post.userId]);

    const likeHandler = () => {

        try{

            axios.put("/post/"+ post._id + "/like", {userId: currentUser._id});

        } catch(err){

        }

        setLike(isLiked ? like-1 : like+1 );
        setIsLiked(!isLiked)
    }

  return (
    <div className="post">
        
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" src={ PF + user.profilePicture } alt="" />
                    </Link>
                    <span className="postUsername">{ user.username }</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>

            <div className="postCenter">
                <span className="postCenterText">{post?.description}</span>
                <img src={ PF + post.img} alt="" className="postCenterImg" />
            </div>

            <div className="postBottom">

                <div className="postBottomLeft">
                    
                    <img src="/assets/like.png" alt="" onClick={likeHandler} className="likeIcon" />
                    <img src="/assets/heart.png" alt="" onClick={likeHandler} className="heartIcon" />
                    <span className="postLikeCounter">{like}</span>
                    
                </div>

                <div className="postBottomRight">

                    <span className="postCommentText">{post.comment? post.comment : "0" } comments</span>

                </div>

            </div>

        </div>

    </div>
  )
}
