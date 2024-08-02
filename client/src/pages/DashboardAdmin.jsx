import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import EmployeeList from "../components/EmployeeList";

const DashContainer = styled.div`
  padding: 20px 30px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  @media (max-width: 1100px) {
    overflow-x: scroll;
  }
`;
const WelcomeHeading = styled.h1`
  font-size: 24px;
  padding: 10px 0px;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
`;
const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <DashContainer>
      <WelcomeHeading>Welcome, {currentUser.username}!</WelcomeHeading>
      <EmployeeList />
    </DashContainer>
  );
};

export default Dashboard;