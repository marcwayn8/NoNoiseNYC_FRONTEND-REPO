
import React, { Component, useState, useEffect } from 'react';

export default function CommentList({ postId }) {


  const [data, setData] = useState([])


  useEffect(() => {
    fetch(`http://localhost:4005/comment/${postId}`)
      .then(res => res.json())
      .then(json => console.log(json))
  }, []);


  console.log(data)
  return (
    <ul  >
      {
          <li className="py-4">
        That's so true, noise pollution is an absolutely horrid thing , i hope one day it changes
            <br></br>
            - marcwayn999
          </li>
      }
    </ul>
  )
}










