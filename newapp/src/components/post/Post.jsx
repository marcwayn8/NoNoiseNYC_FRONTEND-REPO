import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";

import IconButton from "@mui/material/IconButton";
import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/appContext.jsx";
import CommentModal from "../comments/commentModal.js";
import CommentDropDown from "../comments/commentDropdown.js";
import "./post.css";
import img from './img.jpg'
import React from 'react';
import { generateUsername } from "../../generate.js";


export default function Post({ key,post, setPosts, userInfo }) {
  
  const { posts, feedMetric, user } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(true);
  const [likes,setLikes] = useState(post.likes);
  const [current,setCurrent] = useState("");
  


  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:4005/users/${post.user_id}`);
      const data = await res.json();
      console.log(data.username);
      data.username !== undefined ? setCurrent(data.username) : setCurrent(generateUsername());
    }
    fetchData();
  }, []);

  const handleDelete = async (e) => {
    try {
      const res = await fetch(`http://localhost:4005/post/${post.postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data)
      const filtered = data.filter((p) => p.postId !== post.postId);
       console.log(filtered)
      setPosts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async () => {
    if (!isLiked) {
      await fetch(`http://localhost:4005/post/${post.postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId:post.postId,isLiked:isLiked}),
      });

    } 
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft" id={`post-${post.postId}`}>
            <Link to={`/profile/${user.id}`}>
              <img className="postProfileImg" id="logo" src={img} alt="" />
            </Link>
            <span className="postUsername">{current}</span>
            <span className="postDate">
              {DateTime.fromISO().toRelative()}
            </span>
          </div>
          <div className="postTopRight">
            {post.user_id === user.id && (
              <IconButton aria-label="delete">
                <DeleteIcon
                  className="delete-comment"
                  type="submit"
                  onClick={()=>{handleDelete(post.PostId)}}
                />
              </IconButton>
            )}
          </div>
        </div>
        <div className="postCenter">
         
          <h2 >{post.post_title}  </h2>
         <center><h3>{post.post_type} </h3> </center> 
         
         <span className="postText">{post.post_description}</span>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft" onClick={()=>{setLikes(likes+1); likeHandler(); setIsLiked()}}>
            <IconButton aria-label="delete" >
              {!isLiked ? (
                <FavoriteBorderTwoToneIcon
                  className="likeIcon" 
                />
              ) : (
                <FavoriteIcon
                  className="likeIcon" 
                  
                />
              )}{likes}
            </IconButton>
           
          </div>
           {post.user_id === user.id ? (
        <center>
          <div className="viewComments">
            <span className="inline-flex items-center text-sm">
              <CommentDropDown postId={post.postId} className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </center>
      ) : null}
      {post.user_id === user.id ? (
      <div className="postBottomRight">
        
          <span className="postCommentText">
            {feedMetric[post.postId] && feedMetric[post.postId][0] > 0 && (
              <span className="postCommentText">
                {feedMetric[post.postId][0]} Comments
              </span>
            )}
            {feedMetric[post.postId] && feedMetric[post.postId][0] === 0 && (
              <span className="postCommentText">
                <span className="inline-flex items-center text-sm">
                  <button type="button" className="inline-flex hover:text-gray-500">
                    <CommentModal className="h-5 w-5" aria-hidden="true" postId={post.postId}/>
                  </button>
                </span>
              </span>
            )}
          </span>
      </div>
        ): null}
    </div>
    </div>
    </div>

  );
}