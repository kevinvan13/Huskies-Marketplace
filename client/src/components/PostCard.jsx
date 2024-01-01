import React from "react";
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <Link to={`/details/${post.id}`} style={{ textDecoration: 'none' }}>
      <div className="postcard">
        <div className="postcard-image-container">
          <img
            className="postcard-image"
            src={post.images || "/logo-removebg-preview.png"}
            alt={post.title}
          />
        </div>
        <div className="postcard-info">
          <h4 className="postcard-title">{post.title}</h4>
          <p className="postcard-description">{post.description}</p>
          <p className="post-card-price">{"$" + post.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
