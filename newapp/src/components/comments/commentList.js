import React, { useState, useEffect } from "react";

export default function CommentList({ postId }) {
  console.log(postId);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4005/comment/${postId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setComments(json);
      });
  }, []);


  return (
    <>
      <ul>
        {comments.map((comment) => (
      
          <li className="py-4">
           - {comment.commentDescription}
           -  <User userId={comment.userId} />
          </li>
        ))}
      </ul>
    </>
  );

  
}
function User({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4005/users/${userId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setUser(json);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div className="py-4">- {user.username}</div>;
}
