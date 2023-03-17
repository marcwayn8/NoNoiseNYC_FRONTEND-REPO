import { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { BiImageAdd } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import AppContext from "../../context/appContext";
import "./share.css";
import logo from "./img.jpg";
import React from 'react';


export default function Share() {
  const { user, setPosts} = useContext(AppContext);
const [type, setType] = useState("");
const [input, setInput] = useState("");
const [title, setTitle] = useState("");

async function createPost() {

if (input === "") return;
if (type === "") return;
if (title === "") return;

    const postInfo = {
      user_id: user.id,
      post_description: input,
      post_title: title,
      post_type: type
    };

    const result = await fetch("http://localhost:4005/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postInfo),
    });
    const parsed = await result.json();
    console.log(parsed)
  
    setPosts(parsed);
  
    setInput("");
    setType("")
    setTitle("")
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={logo} alt="Profile Pic" />
          <input
            value={title}
           
            className="shareInput"
            onChange={handleTitleChange}
          />
          <input
            value={type}
          
            className="shareInput"
            onChange={handleTypeChange}
          />
          <textarea
            value={input}
            placeholder={`Tell us more, ${user.username}...`}
            className="shareInput"
            onChange={handleInputChange}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <div>
                <IconButton aria-label="add-image">
                  <BiImageAdd className="shareIcon" />
                </IconButton>
              </div>
            </div>
          </div>
          <IconButton aria-label="send-post" className="addPost">
            <IoMdSend className="shareButton" onClick={(e)=>{  createPost() ; e.preventDefault();}} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}