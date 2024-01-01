import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthToken } from "../context/AuthTokenContext";

const Verification = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.authId) {
            navigate("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (accessToken) {
      verify();
    }
  }, [accessToken, navigate]);
  return <div>Loading...</div>;
};

export default Verification;
