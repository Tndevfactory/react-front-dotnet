import * as React from "react";

import { TndevCtx } from "../contexts/TndevContext";
import Cookies from "js-cookie";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MoreIcon from "@mui/icons-material/MoreVert";

import Drawers from "./Drawers";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbarr() {
  const [methods, states] = TndevCtx();
  const { authMethods } = methods;
  const { apiLogin } = authMethods;
  const { loguedIn, setLoguedIn, user, setUser } = states;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  let navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    if (Cookies.get("token3s")) {
      Cookies.remove("token3s");
      Cookies.remove("user");
    }
    navigate(`/`);
    setLoguedIn(false);

    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!loguedIn && <MenuItem onClick={handleMenuClose}>Connexion</MenuItem>}

      {loguedIn && <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Connexion</MenuItem>
      <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>
    </Menu>
  );

  const preventDefault = (event) => event.preventDefault();

  const [state, setState] = React.useState({
    left: false,
    top: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawers state={state} anchor={state.left} toggleDrawer={toggleDrawer} />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          color: "Khaki",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1, display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(Object.keys(state)[0], true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            // noWrap
            component="div"
            sx={{
              display: { xs: "block", sm: "block" },
              fontSize: { xs: "1rem", md: "1.5rem" },
            }}
          >
            3S Incident Tracker
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ width: "50%", color: "orange" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                typography: "body",

                "& > :not(style) + :not(style)": {
                  ml: 2,
                },
                display: { xs: "none", md: "block" },
              }}
              onClick={preventDefault}
            >
              <Link
                to="/calendrier"
                style={{ color: "white", textDecoration: "none" }}
              >
                Calendrier
              </Link>
              <Link
                to="/incidents"
                style={{ color: "white", textDecoration: "none" }}
              >
                Incidents
              </Link>
              <Link
                to="/interventions"
                style={{ color: "white", textDecoration: "none" }}
              >
                Interventions
              </Link>
              <Link
                to="validations"
                style={{ color: "white", textDecoration: "none" }}
              >
                Validation
              </Link>
            </Box>
          </Box>
          <Box>
            <Typography>
              {" "}
              Ingénieur {loguedIn && `${user.fname} ${user.lname}`}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
