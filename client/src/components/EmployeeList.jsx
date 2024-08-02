import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getEmployees } from "../api/index";

const Heading = styled.h1`
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  padding-bottom: 10px;
  text-align: start;
`;

const TableContainer = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TableHead = styled.div`
  height: 78px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.text_primary + 99};
  border-radius: 8px 8px 0px 0px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px 8px;
  @media (max-width: 1100px) {
    flex-wrap: nowrap;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 66px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.bgLight};
  border-bottom: 1px solid ${({ theme }) => theme.text_primary + 99};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.text_secondary + 50};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Topic = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 420;
  text-align: center;
`;

const RowLink = styled(Link)`
  text-decoration: none;
`;

const UserList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer>
      <Heading>Employee Details</Heading>
      <TableHead>
        <Topic style={{ width: "150px" }}>Name</Topic>
        <Topic style={{ width: "150px" }}>Username</Topic>
        <Topic style={{ width: "150px" }}>Department</Topic>
        <Topic style={{ width: "200px" }}>Email</Topic>
        <Topic style={{ width: "170px" }}>Contact</Topic>
        <Topic style={{ width: "180px" }}>Date of Joining</Topic>
      </TableHead>
      <div>
        {employees.map((employee) => (
          <RowLink to={`/profile/${employee._id}`} key={employee.id}>
            <Row>
              <Content style={{ width: "150px" }}>{employee.name}</Content>
              <Content style={{ width: "150px" }}>{employee.username}</Content>
              <Content style={{ width: "150px" }}>
                {employee.department}
              </Content>
              <Content
                style={{
                  width: "200px",
                  color: "#ac9ffc",
                  fontWeight: "500",
                }}
              >
                {employee.email}
              </Content>
              <Content style={{ width: "170px" }}>{employee.contact}</Content>
              <Content style={{ width: "180px" }}>{employee.doj}</Content>
            </Row>
          </RowLink>
        ))}
      </div>
    </TableContainer>
  );
};

export default UserList;