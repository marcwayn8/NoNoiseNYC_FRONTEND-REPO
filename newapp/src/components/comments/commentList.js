
import React, { Component, useState, useEffect } from 'react';

export default function CommentList({ postId }) {

console.log(postId)
  const [data, setData] = useState([])
  const [username, setUserName] = useState([])


  useEffect(() => {
    fetch(`http://localhost:4005/comment/${postId}`)
      .then(res => res.json())
      .then(json => setData(json))


      fetch(`http://localhost:4005/users/${data.userId}`)
      .then(res => res.json())
      .then(json => setUserName(json))
  }, []);



  return (
    <ul  >
      {
          <li className="py-4">
      {data.commentDescription}
            <br></br>
        {username}
          </li>
      }
    </ul>
  )
}










