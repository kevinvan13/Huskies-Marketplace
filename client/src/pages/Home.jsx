import React from "react";
import { useEffect, useState } from "react";
import Select from "react-select";
import PostCard from "../components/PostCard";
import { useAuth0 } from "@auth0/auth0-react";
import KeyIcon from "@mui/icons-material/Key";
import { Link } from "react-router-dom";

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [posts, setPosts] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/post?category=${filter}`
        );
        if (response.ok) {
          const data = await response.json();
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [filter]);

  const options = [
    {
      value: "",
      label: "All",
    },
    {
      value: "Appliances",
      label: "Appliances",
    },
    {
      value: "Books",
      label: "Books",
    },
    { value: "Fashion", label: "Fashion" },
    { value: "Electronics", label: "Computer & Electronics" },
    { value: "Furniture", label: "Furniture" },
    { value: "SportingGoods", label: "Sporting Goods" },
    { value: "Games", label: "Games" },
    { value: "PetSupplies", label: "Pet Supplies" },
  ];

  return isAuthenticated ? (
    <div className="home-main-container">
      <h1 className="home-main-header">
        Where Huskies Buy and Sell Top Electronics, Fashion, and More!
      </h1>
      <div className="filter-container">
        <Select
          className="filter"
          onChange={(option) => setFilter(option.value)}
          options={options}
        />
      </div>
      <div className="posts-container">
        {posts ? (
          posts.map((post) => <PostCard key={post.id} post={post}></PostCard>)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  ) : (
    <div className="home-welcome-container">
      <h1 className="home-welcome-header">
        Welcome to Huskies' Marketplace Public Beta.
      </h1>
      <p className="home-welcome-subtext">
        Join Us Now and Shop Across the Alumni Network!
      </p>
      <button
        className="home-welcome-signup-button"
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              screen_hint: "signup",
            },
          })
        }
      >
        <KeyIcon />
      </button>
      {posts && posts.length > 0 && (
        <div className="home-welcome-posts-container">
          <h4 className="home-welcome-header2">Recently Posted</h4>
          <div className="home-welcome-posts">
            {posts.slice(0, 5).map((post, index) => (
              <Link
                className="home-welcome-links"
                key={index}
                to={`/details/${post.id}`}
              >
                <span className="home-welcome-posts-title">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
