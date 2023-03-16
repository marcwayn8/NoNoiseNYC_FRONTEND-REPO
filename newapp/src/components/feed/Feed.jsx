import { useContext ,useState} from "react";
import AppContext from "../../context/appContext";
import Post from "../post/Post.jsx";
import Share from "../share/Share.jsx";
import "./feed.css";
import React from "react";

export default function Feed({ userInfo }) {

  const { user, setPosts, posts,likes,setLikes} = useContext(AppContext);
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share post={posts} setPosts={setPosts} user={user}/>
        {posts.map(p => 
          <Post key={p.postId} post={p} posts={posts} setPosts={setPosts} userInfo={user}  likes={likes} setLikes={setLikes}/>
                )}
      </div>
    </div>
  );
}