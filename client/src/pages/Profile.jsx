import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import ErrorComponent from "../components/ErrorComponent";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthToken } from "../context/AuthTokenContext";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userError, setUserError] = useState(null);
  const [postsError, setPostsError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const { accessToken } = useAuthToken();
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDeleteClick = async (postId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        toast.success("Post successfully deleted!");
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== postId)
        );
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Error deleting post.");
    }
  };

  const onFormSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/${editing.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast.success("Post successfully updated!");
        const updatedPost = await response.json();
        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.id === editing.id ? updatedPost : post
          )
        );
        setEditing(null);
        setTimeout(() => Navigate("/"), 4000);
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Error updating post.");
      setEditing(null);
      setTimeout(() => Navigate("/"), 4000);
    }
  };

  const EditForm = () => {
    return (
      <div className="post-edit-form-container">
        <button
          className="post-edit-form-closing-button"
          onClick={() => setEditing(null)}
        >
          <CloseIcon></CloseIcon>
        </button>
        <form className="post-edit-form" onSubmit={handleSubmit(onFormSubmit)}>
          <input
            {...register("title", { required: true })}
            id="title"
            type="text"
            placeholder={`Title: ${editing.title}`}
            className="post-edit-input"
          />
          {errors.title && <p>Title is required.</p>}
          <input
            {...register("description", { required: true })}
            id="description"
            type="text"
            placeholder={`Description: ${editing.description}`}
            className="post-edit-input"
          />
          {errors.description && <p>Description is required.</p>}
          <input
            {...register("price", { required: true })}
            id="price"
            type="number"
            placeholder={`Price: ${editing.price}`}
            className="post-edit-input"
          />
          {errors.price && <p>Price is required.</p>}
          <input
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder={`Email: ${editing.email}`}
            className="post-edit-input"
          />
          {errors.email && <p>Email is required.</p>}
          <button className="form-button" type="submit">
            Confirm Edit
          </button>
        </form>
      </div>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/${username}`
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          throw new Error("Error fetching user profile.");
        }
      } catch (err) {
        setUserError(err.message);
      }
    })();
  }, [username]);

  useEffect(() => {
    if (user) {
      const id = user.id;
      (async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/user/${id}/post`
          );
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
          } else {
            throw new Error("Error fetching user posts.");
          }
        } catch (err) {
          setPostsError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [username, user]);

  if (userError) {
    return <ErrorComponent error={userError}></ErrorComponent>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-main-container">
      {user && <UserCard user={user} />}
      {editing ? (
        <EditForm></EditForm>
      ) : postsError ? (
        <p>Error loading posts.</p>
      ) : posts.length !== 0 ? (
        <div className="listings-container">
          <ul className="listings">
            {posts.map((post) => (
              <li className="listing" key={post.id}>
                <Link className="listing-info-link" to={`/details/${post.id}`}>
                  {post.title}
                </Link>
                <p className="listing-info-subtext">{post.category}</p>
                <button
                  className="listing-button"
                  onClick={() => setEditing(post)}
                >
                  <EditIcon></EditIcon>
                </button>
                <button
                  className="listing-button"
                  onClick={() => handleDeleteClick(post.id)}
                >
                  <DeleteIcon></DeleteIcon>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>There are no posts for this user.</p>
      )}

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Profile;
