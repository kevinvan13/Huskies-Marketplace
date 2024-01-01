import React from "react";
import { useForm } from "react-hook-form";
import { useAuthToken } from "../context/AuthTokenContext";
import { ToastContainer, toast } from "react-toastify";

const UserCard = ({ user }) => {
  const { accessToken } = useAuthToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating user.");
      }
      toast.success("User successfully updated!");
    } catch (err) {
      toast.error("Failed to update the user.");
    }
  };
  return (
    <div className="user-container">
      <img
        className="user-image"
        src="/anonymous-user.webp"
        alt={user.username}
      />
      <h4 className="user-title">{user.username}</h4>
      <p className="user-detail">
        {user.email}
        <br />
        Member Since{" "}
        {new Date(user.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}
        <br />
        Auth0Id: {user.authId}
        <br />
      </p>
      <div className="access-token-container">
        accessToken: {JSON.stringify(accessToken, null, 2)}
      </div>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <p className="user-info-update-prompt">Tell us more about yourself:</p>
        <label htmlFor="name">Name</label>
        <input
          {...register("name", { required: true })}
          id="name"
          type="text"
          placeholder={user.name === "" || !user.name ? "Unknown" : user.name}
          className="user-info-input"
        />
        {errors.name && <p>Name is required.</p>}
        <label htmlFor="address">Address</label>
        <input
          {...register("address", { required: true })}
          id="address"
          type="text"
          placeholder={
            user.address === "" || !user.address
              ? "1400-410 W Georgia St, Vancouver, BC V6B 1Z3"
              : user.address
          }
          className="user-info-input"
        />
        {errors.address && <p>Address is required.</p>}
        <button className="form-button" type="submit">
          Apply
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default UserCard;
