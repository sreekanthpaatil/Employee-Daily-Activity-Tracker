import React from "react";
import styled from "styled-components";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import AddIcon from "@mui/icons-material/Add";
import Person2Icon from "@mui/icons-material/Person2";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../images/Logo.png";

const MenuContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ setMenuOpen }) => (setMenuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;
const Elements = styled.div`
  padding: 4px 16px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + 50};
  }
`;
const NavText = styled.div`
  padding: 12px 0px;
`;
const Close = styled.div`
  display: none;
  @media (max-width: 1100px) {
    display: block;
  }
`;
const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px 8px;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
`;

const Image = styled.img`
  height: 40px;
  padding-right: 10px;
`;
// eslint-disable-next-line react/prop-types
const Menu = ({ setMenuOpen, darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <MenuContainer>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <Logo>
          <Image src={logo} />
          TRACKMINSTER
        </Logo>
      </Link>
      <Close>
        <CloseRounded
          onClick={() => setMenuOpen(false)}
          style={{ cursor: "pointer" }}
        />
      </Close>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "inherit", width: "100%" }}
      >
        <Elements>
          <HomeRoundedIcon />
          <NavText>Dashboard</NavText>
        </Elements>
      </Link>
      {currentUser?.role === "Admin" && (
        <Link
          to="/employeedetails"
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <AddIcon />
            <NavText>Add Employee</NavText>
          </Elements>
        </Link>
      )}
      {currentUser?.role === "Employee" && (
        <Link
          to="/addtask"
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <AddIcon />
            <NavText>Add Task</NavText>
          </Elements>
        </Link>
      )}
      {currentUser?.role === "Employee" && (
        <Link
          to="/tasks"
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <PlaylistAddCheckIcon />
            <NavText>My Tasks</NavText>
          </Elements>
        </Link>
      )}
      {currentUser && currentUser.role === "Employee" && currentUser._id && (
        <Link
          to={`/profile/${currentUser._id}`} // Change the route path to '/profile/:id'
          key={currentUser._id} // Use '_id' instead of 'id'
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <Elements>
            <Person2Icon />
            <NavText>Profile</NavText>
          </Elements>
        </Link>
      )}

      {darkMode ? (
        <Elements onClick={() => setDarkMode(false)}>
          <LightModeRoundedIcon />
          <NavText>Light Mode</NavText>
        </Elements>
      ) : (
        <Elements onClick={() => setDarkMode(true)}>
          <DarkModeRoundedIcon />
          <NavText>Dark Mode</NavText>
        </Elements>
      )}
    </MenuContainer>
  );
};

export default Menu;