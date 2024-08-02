import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { barData } from "../api/index";

const BarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  width: 60%;
  @media (max-width: 768px) {
    padding: 6px 10px;
    width: 80%;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 420;
  color: ${({ theme }) => theme.text_primary};
  padding-bottom: 40px;
`;

const BarGraph = ({ id }) => {
  const [meeting, setMeeting] = useState([]);
  const [work, setWork] = useState([]);
  const [breakT, setBreakT] = useState([]);

  const fetchData = async () => {
    const data = { empid: id };

    try {
      const response = await barData(data);
      const responseData = response.data;

      const meetingData = [];
      const workData = [];
      const breakData = [];

      for (let i = 0; i < responseData.length; i++) {
        const dayData = responseData[i];

        for (let j = 0; j < dayData.length; j++) {
          const task = dayData[j];

          if (task.type === "Meeting") {
            meetingData.push(task.time);
          } else if (task.type === "Work") {
            workData.push(task.time);
          } else if (task.type === "Break") {
            breakData.push(task.time);
          }
        }
      }

      setMeeting(meetingData);
      setWork(workData);
      setBreakT(breakData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartOptions = {
    colors: ["#00e396", "#feb019", "#008ffb"],
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    style: {
      colors: "#ac9ffc", // Set the text color to white
    },
  };

  const chartSeries = [
    {
      name: "Meeting",
      data: meeting,
    },
    {
      name: "Work",
      data: work,
    },
    {
      name: "Break",
      data: breakT,
    },
  ];

  return (
    <BarContainer>
      <Title>Weekly Statistics</Title>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        style={{ width: "100%" }}
      />
    </BarContainer>
  );
};

export default BarGraph;