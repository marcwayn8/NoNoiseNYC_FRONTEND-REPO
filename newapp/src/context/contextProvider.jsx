import {  useState, useEffect } from "react";
import AppContext from "./appContext";
import React from 'react'
import axios from 'axios'

const ContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const [feedMetric, setFeedMetric] = useState({});
  const [theme, setTheme] = useState("dark");
  const [complaint, setComplaints] = useState([]);
  const [likes,setLikes] = useState(0)

  function fetchLatestComplaints() {
    axios.get('http://localhost:4005/complaints')
        .then(response => {
            const latestComplaints = response.data;
            console.log(latestComplaints) 
            setComplaints(latestComplaints)
        })
        .catch(error => {
            console.error(`Error getting latest complaints: ${error}`);
        });
}
fetchLatestComplaints()

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    async function getFeed() {
      const res = await fetch("http://localhost:4005/post");
      const data = await res.json()
      setPosts(data)
      setLikes(data.likes)
    }

    async function getLikeCountAndCommentCount() {
      const map = {};
      const commentRes = await fetch("http://localhost:4005/comment");
      const commentData = await commentRes.json();
      for (let comment of commentData) {
        map[comment.post_id] = [parseInt(comment.likes), 0];
      }
      console.log(commentData)
      const likeRes = await fetch("http://localhost:4005/post");
      const likeData = await likeRes.json();
      console.log(likeData)
      setFeedMetric(map);
    }
    getFeed();
    getLikeCountAndCommentCount();
  }, []);

  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    if (!userToken) return;

    async function checkAuth() {
      const response = await fetch("http://localhost:4005/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToken),
      });

      const data = await response.json();
      if (data.isAuth) {
        setIsAuth(true);
      }
      const us = window.localStorage.getItem("currUser");
      const parsed = JSON.parse(us);
      setUser(parsed);
    }
    checkAuth();
  }, []);

  const context = {
    user,
    setUser,
    posts,
    setPosts,
    isAuth,
    setIsAuth,
    feedMetric,
    setFeedMetric,
    complaint,
    setComplaints,
    theme,
    toggleTheme,
   likes,setLikes
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;