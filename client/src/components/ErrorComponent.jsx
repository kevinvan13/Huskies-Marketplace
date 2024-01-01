import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const ErrorComponent = ({ error }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="error">Error: {error}. Redirecting to homepage...</div>
  );
};

export default ErrorComponent;
