import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./utils/Theme";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Login from "./components/Login";
import AddEmployee from "./pages/AddEmployee";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEmp from "./pages/DashboardEmp";
import AddTask from "./pages/AddTask";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";

const Trackminster = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.bgLight};
  overflow-y: hidden;
  overflow-x: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(currentUser);
  });
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 1110) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Trackminster>
            {menuOpen && (
              <Menu
                setMenuOpen={setMenuOpen}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            )}
            <Container>
              <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              <Routes>
                <Route
                  path="/"
                  exact
                  element={
                    currentUser?.role === "Admin" ? (
                      <DashboardAdmin />
                    ) : (
                      <DashboardEmp />
                    )
                  }
                />
                <Route
                  path="/employeedetails"
                  exact
                  element={<AddEmployee />}
                />
                {currentUser.role === "Employee" && (
                  <Route path="/addtask" exact element={<AddTask />} />
                )}
                <Route path="/profile/:id" exact element={<Profile />} />
                {currentUser.role === "Employee" && (
                  <Route path="/tasks" exact element={<Tasks />} />
                )}
                {currentUser.role === "Admin" && (
                  <Route path="/tasks/:id" exact element={<Tasks />} />
                )}
              </Routes>
            </Container>
          </Trackminster>
        ) : (
          <Trackminster>
            <Login />
          </Trackminster>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;