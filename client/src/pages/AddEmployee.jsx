import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components";
import RememberMeIcon from "@mui/icons-material/RememberMe";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PasswordTwoToneIcon from "@mui/icons-material/PasswordTwoTone";
import CallIcon from "@mui/icons-material/Call";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useSelector } from "react-redux";
import { login, getEmployee, updateUser } from "../api";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.card};
  height: fit-content;
  padding: 30px 0px;
  width: 420px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerCard = styled.div`
  background: ${({ theme }) => theme.bgLight};
  height: 90%;
  width: 90%;
  border-radius: 8px;
`;
const Role = styled.div`
  color: ${({ theme }) => theme.text_primary};
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
`;
const Fields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  width: 100%;
  gap: 14px;
`;
const Field = styled.div`
  width: 90%;
  height: 32px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  padding: 2px 6px;
  padding-left: 0px;
`;
const Icon = styled.div`
  width: 20px;
  height: 32px;
  border-radius: 8px 0px 0px 8px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 99};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  padding: 2px 6px;
`;
const Input = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 0px 8px 8px 0px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 99};
  border-left: none;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  padding: 2px 6px;
`;
const FlexContainer = styled.div`
  width: 92%;
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;
const ButtonContainer = styled.div`
  width: 94%;
  background: ${({ theme }) => theme.primary + 99};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  height: 38px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;

const AddEmployee = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    contact: "",
    department: "",
    doj: "",
    role: "Employee",
  });
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    contact: "",
    department: "",
    doj: "",
    role: "Employee",
  });
  const handleSubmit = async () => {
    console.log(user);
    await login(user)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setUser({
      name: "",
      username: "",
      email: "",
      password: "",
      contact: "",
      department: "",
      doj: "",
      role: "Employee",
    });
  };
  const handleUpdate = async () => {
    console.log(updatedUser);
    await updateUser(currentUser._id, updatedUser)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setUpdatedUser({
      name: "",
      username: "",
      email: updatedUser.email,
      password: "",
      contact: "",
      department: "",
      doj: "",
      role: "Employee",
    });
  };
  useEffect(() => {
    const findData = async () => {
      const id = currentUser._id;
      await getEmployee(id).then((res) => {
        setUpdatedUser({ ...updatedUser, email: res.data.email });
      });
    };
    findData();
  }, [currentUser]);
  return (
    <>
      {currentUser?.role === "Admin" ? (
        <Modal open={true}>
          <Container>
            <Card>
              <InnerCard>
                <Role>Employee Details</Role>
                <Fields>
                  <Field>
                    <Icon>
                      <RememberMeIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="text"
                        placeholder="Name"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <FingerprintIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="text"
                        placeholder="Userame"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={user.username}
                        onChange={(e) =>
                          setUser({ ...user, username: e.target.value })
                        }
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <EmailOutlinedIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="email"
                        placeholder="Email"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <PasswordTwoToneIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="password"
                        placeholder="Password"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={user.password}
                        onChange={(e) =>
                          setUser({ ...user, password: e.target.value })
                        }
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <CallIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="tel"
                        placeholder="Contact"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={user.contact}
                        onChange={(e) =>
                          setUser({ ...user, contact: e.target.value })
                        }
                      />
                    </Input>
                  </Field>
                  <FlexContainer>
                    <Field>
                      <Icon>
                        <EventSeatIcon style={{ fontSize: "18px" }} />
                      </Icon>
                      <Input>
                        <input
                          type="text"
                          placeholder="Department"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={user.department}
                          onChange={(e) =>
                            setUser({ ...user, department: e.target.value })
                          }
                        />
                      </Input>
                    </Field>
                    <Field>
                      <Icon>
                        <CalendarMonthOutlinedIcon
                          style={{ fontSize: "18px" }}
                        />
                      </Icon>
                      <Input>
                        <input
                          type="date"
                          placeholder="Date of Joining"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={user.doj}
                          onChange={(e) =>
                            setUser({ ...user, doj: e.target.value })
                          }
                        />
                      </Input>
                    </Field>
                  </FlexContainer>
                  <ButtonContainer onClick={() => handleSubmit()}>
                    Register
                  </ButtonContainer>
                </Fields>
              </InnerCard>
            </Card>
          </Container>
        </Modal>
      ) : (
        <Modal open={true}>
          <Container>
            <Card>
              <InnerCard>
                <Role>Update Details</Role>
                <Fields>
                  <Field>
                    <Icon>
                      <RememberMeIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="text"
                        placeholder="Name"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={updatedUser.name}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            name: e.target.value,
                          })
                        }
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <FingerprintIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="text"
                        placeholder="Userame"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={updatedUser.username}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            username: e.target.value,
                          })
                        }
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <EmailOutlinedIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="email"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={updatedUser.email}
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <PasswordTwoToneIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="password"
                        placeholder="Password"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={updatedUser.password}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            password: e.target.value,
                          })
                        }
                      />
                    </Input>
                  </Field>
                  <Field>
                    <Icon>
                      <CallIcon style={{ fontSize: "18px" }} />
                    </Icon>
                    <Input>
                      <input
                        type="tel"
                        placeholder="Contact"
                        style={{
                          background: "inherit",
                          color: "inherit",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        value={updatedUser.contact}
                        onChange={(e) =>
                          setUpdatedUser({
                            ...updatedUser,
                            contact: e.target.value,
                          })
                        }
                      />
                    </Input>
                  </Field>
                  <FlexContainer>
                    <Field>
                      <Icon>
                        <EventSeatIcon style={{ fontSize: "18px" }} />
                      </Icon>
                      <Input>
                        <input
                          type="text"
                          placeholder="Department"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={updatedUser.department}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              department: e.target.value,
                            })
                          }
                        />
                      </Input>
                    </Field>
                    <Field>
                      <Icon>
                        <CalendarMonthOutlinedIcon
                          style={{ fontSize: "18px" }}
                        />
                      </Icon>
                      <Input>
                        <input
                          type="date"
                          placeholder="Date of Joining"
                          style={{
                            background: "inherit",
                            color: "inherit",
                            outline: "none",
                            border: "none",
                            width: "100%",
                          }}
                          value={updatedUser.doj}
                          onChange={(e) =>
                            setUpdatedUser({
                              ...updatedUser,
                              doj: e.target.value,
                            })
                          }
                        />
                      </Input>
                    </Field>
                  </FlexContainer>
                  <ButtonContainer onClick={() => handleUpdate()}>
                    Update
                  </ButtonContainer>
                </Fields>
              </InnerCard>
            </Card>
          </Container>
        </Modal>
      )}
    </>
  );
};

export default AddEmployee;