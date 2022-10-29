import { useState, useEffect, useContext } from 'react';
import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username}) {

  const [ posts, setPosts ] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect( () => {
    const fetchPost = async () => {
      const res = username ? await axios.get("/post/profile/"+ username) : await axios.get("post/timeline/" + user._id);
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchPost();
  },[username,user._id]);

  return (
    <div className='feed'>

      <div className="feedWrapper">
        
        <Share/>
        { posts.map( (p) => (
          <Post key={p._id} post={p}/>
        )) }

      </div>

    </div>
  )
}
