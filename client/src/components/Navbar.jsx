import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuIcon from "@mui/icons-material/Menu";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import CreateAdButton from "./CreateAdButton";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../context/AuthTokenContext";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isAuthenticated } = useAuth0();
  const { accessToken } = useAuthToken();
  const [username, setUserName] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    try {
      if (isAuthenticated && accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const temp =
          decodedToken[`${process.env.REACT_APP_AUTH0_AUDIENCE}/username`];
        setUserName(temp);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, [accessToken, isAuthenticated]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/" sx={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src="/logo-removebg-preview.png"
              alt="logo"
              style={{ maxHeight: 40, marginRight: 10 }}
            />
          </Link>
          <Typography variant="h6" color="grey" noWrap component="div">
            Huskies' Marketplace
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{
                backgroundColor: "black",

              }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },

              }}
            >

              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                Home
              </MenuItem>
              {isAuthenticated ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <LogoutButton />
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <LoginButton />
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseNavMenu}>
                <CreateAdButton />
              </MenuItem>
              {isAuthenticated && (
                <MenuItem onClick={handleCloseNavMenu} component={Link} to={`/profile/${username}`}>
                  Profile
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>

            <Link to="/">
              <Button color="warning">Home</Button>
            </Link>

            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            <CreateAdButton />
            {isAuthenticated && (
              <IconButton

                component={Link}
                to={`/profile/${username}`}
                sx={{
                  color: 'grey',
                  textShadow: '0 0 8px rgba(0, 0, 0, 0.6)',
                }}
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
