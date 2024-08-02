import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { editTask } from "../api/index";

const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 40px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  height: fit-content;
  padding: 30px 0px;
  width: 450px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerCard = styled.div`
  height: fit-content;
  width: 90%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px dashed ${({ theme }) => theme.text_secondary + 99};
  position: relative;
`;

const Heading = styled.div`
  color: ${({ theme }) => theme.text_primary};
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  font-weight: 550;
  font-size: 18px;
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
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.text_secondary + 99};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
`;

const TextArea = styled.textarea`
  background: inherit;
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  resize: vertical;
  padding: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 4px 8px;
  background-color: inherit;
  color: ${({ theme }) => theme.text_secondary};
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  padding: 4px 8px;
  background-color: inherit;
  color: ${({ theme }) => theme.text_secondary};
  border: none;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
`;

const Option = styled.option`
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary};
`;

const FlexContainer = styled.div`
  display: flex;
  width: 94%;
  justify-content: space-between;
  gap: 12px;
`;

const ButtonContainer = styled.div`
  width: 94%;
  background: ${({ theme }) => theme.primary + 99};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;

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

const CloseIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 14px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_secondary};
`;

const EditTask = ({ selectedTask, onClose }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const renderYearOptions = () => {
    const years = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(
        <Option key={i} value={i}>
          {i}
        </Option>,
      );
    }
    return years;
  };

  const renderMonthOptions = () => {
    const months = [];
    for (let i = 1; i <= currentMonth; i++) {
      months.push(
        <Option key={i} value={i}>
          {i}
        </Option>,
      );
    }
    return months;
  };

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [task, setTask] = useState({
    desc: selectedTask.desc,
    type: selectedTask.type,
    startTime: selectedTask.startTime,
    time: selectedTask.time,
  });

  const renderTimeOptions = (range) => {
    const options = [];
    for (let i = 0; i < range; i++) {
      const value = i.toString().padStart(2, "0");
      options.push(
        <Option key={value} value={value}>
          {value}
        </Option>,
      );
    }
    return options;
  };

  const renderDateOptions = () => {
    const selectedYear = parseInt(year, 10);
    const selectedMonth = parseInt(month, 10);
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      if (
        selectedYear === currentYear &&
        selectedMonth === currentMonth &&
        i > currentDay
      ) {
        break;
      }
      dates.push(
        <Option key={i} value={i}>
          {i}
        </Option>,
      );
    }
    return dates;
  };

  const handleSaveClick = async () => {
    const selectedYear = parseInt(year, 10);
    const selectedMonth = parseInt(month, 10);
    const selectedDate = parseInt(date, 10);
    const selectedHours = parseInt(hours, 10);
    const selectedMinutes = parseInt(minutes, 10);
    const selectedSeconds = parseInt(seconds, 10);

    const timestamp = new Date(
      selectedYear,
      selectedMonth - 1,
      selectedDate,
      selectedHours + 5,
      selectedMinutes + 30,
      selectedSeconds,
    ).toISOString();
    task.startTime = timestamp.toString();
    setTask({ ...task, startTime: timestamp.toString() });
    setTask({ ...task, time: Number(task.time) });
    await editTask(selectedTask._id, task)
      .then((res) => {
        console.log(res);
        setTask({ desc: "", type: "", startTime: "", time: 0 });
        setYear("");
        setMonth("");
        setDate("");
        setHours("");
        setMinutes("");
        setSeconds("");
      })
      .catch((error) => console.log(error));
  };
  const extractDateTimeValues = (isoString) => {
    const dateObj = new Date(isoString);
    setYear(dateObj.getFullYear().toString());
    setMonth((dateObj.getMonth() + 1).toString());
    setDate(dateObj.getDate().toString());
    setHours(dateObj.getHours().toString());
    setMinutes(dateObj.getMinutes().toString());
    setSeconds(dateObj.getSeconds().toString());
  };

  useEffect(() => {
    extractDateTimeValues(selectedTask.startTime);
  }, [selectedTask]);

  return (
    <Modal open={true}>
      <Container>
        <AddContainer>
          <Card>
            <InnerCard>
              <CloseIconContainer onClick={() => onClose()}>
                <CloseRoundedIcon style={{ fontSize: "24px" }} />
              </CloseIconContainer>
              <Heading>Edit Task</Heading>
              <Fields>
                <Field>
                  <TextArea
                    rows="5"
                    placeholder="Description"
                    value={task.desc}
                    onChange={(e) => setTask({ ...task, desc: e.target.value })}
                  />
                </Field>
                <Field>
                  <Select
                    value={task.type}
                    onChange={(e) => setTask({ ...task, type: e.target.value })}
                  >
                    <Option value="">Type</Option>
                    <Option value="Break">Break</Option>
                    <Option value="Meeting">Meeting</Option>
                    <Option value="Work">Work</Option>
                  </Select>
                </Field>
                <FlexContainer>
                  <Field>
                    <Select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <Option value="" disabled selected hidden>
                        Year
                      </Option>
                      {renderYearOptions()}
                    </Select>
                  </Field>
                  <Field>
                    <Select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <Option value="" disabled selected hidden>
                        Month
                      </Option>
                      {renderMonthOptions()}
                    </Select>
                  </Field>
                  <Field>
                    <Select
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    >
                      <Option value="" disabled selected hidden>
                        Day
                      </Option>
                      {renderDateOptions()}
                    </Select>
                  </Field>
                </FlexContainer>
                <FlexContainer>
                  <Field>
                    <Select
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    >
                      <Option value="" disabled selected hidden>
                        Hours
                      </Option>
                      {renderTimeOptions(24)}
                    </Select>
                  </Field>
                  <Field>
                    <Select
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                    >
                      <Option value="" disabled selected hidden>
                        Min
                      </Option>
                      {renderTimeOptions(60)}
                    </Select>
                  </Field>
                  <Field>
                    <Select
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                    >
                      <Option value="" disabled selected hidden>
                        Sec
                      </Option>
                      {renderTimeOptions(60)}
                    </Select>
                  </Field>
                </FlexContainer>
                <Field>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Time in min"
                    value={task.time === 0 ? "" : task.time}
                    onChange={(e) =>
                      // eslint-disable-next-line radix
                      setTask({ ...task, time: parseInt(e.target.value) })
                    }
                  />
                </Field>
                <ButtonContainer onClick={handleSaveClick}>
                  Save Task
                </ButtonContainer>
              </Fields>
            </InnerCard>
          </Card>
        </AddContainer>
      </Container>
    </Modal>
  );
};

export default EditTask;