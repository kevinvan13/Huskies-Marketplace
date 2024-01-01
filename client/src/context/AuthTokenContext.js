import React, { useContext, useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const authTokenContext = createContext();

const AuthTokenProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState();
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          },
        });
        setAccessToken(token);
      } catch (err) {
        console.log(err);
      }
    };
    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);
  const value = { accessToken, setAccessToken };
  return (
    <authTokenContext.Provider value={value}>
      {children}
    </authTokenContext.Provider>
  );
};

const useAuthToken = () => {
  return useContext(authTokenContext);
};

export { useAuthToken, AuthTokenProvider };
