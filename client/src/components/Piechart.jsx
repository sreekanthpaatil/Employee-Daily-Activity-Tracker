import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";
import { pieData } from "../api/index";

const PieContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.bg};
  padding: 10px 40px;
  border-radius: 8px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 420;
  color: ${({ theme }) => theme.text_primary};
  padding-bottom: 40px;
`;

const Piechart = ({ day, id, colors }) => {
  const [state, setState] = useState([]);
  const [time, setTime] = useState([]);
  const [chartTitle, setChartTitle] = useState("");

  const fetchData = async () => {
    const type = [];
    const timeD = [];
    let data;
    if (day) {
      data = { date: new Date().toISOString(), empid: id };
      setChartTitle("Today's Statistics");
    } else {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);
      const previousDateISOString = currentDate.toISOString();
      data = { date: previousDateISOString, empid: id };
      setChartTitle("Yesterday's Statistics");
    }
    console.log(data);
    await pieData(data)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          type.push(res.data[i].type);
          timeD.push(res.data[i].time);
        }
      })
      .catch((error) => console.log(error));
    setState(type);
    setTime(timeD);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PieContainer>
      <Title>{chartTitle}</Title>
      <Chart
        type="pie"
        height={300}
        style={{ width: "100%" }}
        series={time}
        options={{
          noData: { text: "Empty Data" },
          labels: state,
          colors,
        }}
      />
    </PieContainer>
  );
};

export default Piechart;