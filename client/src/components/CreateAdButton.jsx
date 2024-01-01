import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const CreateAdButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleCreateAdClick = () => {
    if (isAuthenticated) {
      navigate("/sell");
    } else {
      loginWithRedirect({ screen_hint: "signup" });
    }
  };

  return (
    <Button
      color="info"
      variant="contained"
      style={{
        backgroundColor: "#026ada",
      }}
      onClick={handleCreateAdClick}
    >
      Post Ad
    </Button>
  );
};

export default CreateAdButton;
