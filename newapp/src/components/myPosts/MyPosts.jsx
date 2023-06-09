import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/appContext.jsx";
import Comments from "../comments/Comments.jsx";
import logo from './img.jpg';

import "./myPosts.css";

export default function MyPosts({ userInfo }) {
  const { feedMetric, user, setFeedMetric } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [showComment, setShowComment] = useState(false);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      const response = await fetch(`http://localhost:4005/post/${postId}`);
      const data = await response.json();
      setPost(data);
    
    };
    fetchPostData();
  }, [postId]);

  const likeHandler = async () => {
    if (!isLiked) {
 
      await fetch(`http://localhost:4005/post/${post.postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id,isLiked}),
      });
    } else {
      feedMetric[post.post_id][1] -= 1;
      await fetch(`http://localhost:4005/post/${post.postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });
    }
    setIsLiked(!isLiked);
  };

  const handleDelete = async (e) => {
    try {
      await fetch(`http://localhost:4005/post/${post.postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // navigate to user's profile page or home page
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      comment_body: reply,
      user_id: userInfo.id,
      post_id: post.postId,
      username: userInfo.username,
    };
   
  };

  if (!post) {
    return <div>Loading...</div>;
    }
    
    return (
    <div className="my-post-container">
    <div className="my-post-header">
    <img src={logo} alt="user-profile-pic" />
    <div className="my-post-userinfo">
    <p className="my-post-username">{user.username}</p>
    <p className="my-post-date">
  
    </p>
    </div>
    {post.user_id = user.id && (
    <IconButton className="my-post-delete-btn" onClick={handleDelete}>
    <DeleteIcon />
    </IconButton>
    )}
    </div>
    <div className="my-post-body">
    <p>{post.post_description}</p>
    <div className="my-post-likes-comments">
    <Button
    className="my-post-like-btn"
    startIcon={
    isLiked ? (
    <FavoriteIcon fontSize="small" />
    ) : (
    <FavoriteBorderTwoToneIcon fontSize="small" />
    )
    }
    onClick={likeHandler}
    >
    {post.likes}
    </Button>
  
    </div>
    {showComment && (
    <div className="my-post-comments-section">
   
    <form onSubmit={handleSubmit}>
    <input
    type="text"
    placeholder="Add a comment"
 
    onChange={(e) => setReply(e.target.value)}
    />
    <Button type="submit">Submit</Button>
    </form>
    </div>
    )}
    </div>
    </div>
    );
    }
