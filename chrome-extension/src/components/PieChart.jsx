import React, { useState } from "react";
import Chart from "react-apexcharts";

const PieChart = ({ renderedComponents }) => {
  const componentNames = [];
  const renderTimes = [];

  const sortData = () => {
    for (let name in renderedComponents) {
      console.log("i am inside PieChart sortData: name", name);
      //push name to componentNames
      componentNames.push(name);
      let time = 0;
      for (let i = 0; i < renderedComponents[name].events.length; i++) {
        time += renderedComponents[name].events[i].selfBaseDuration;
      }
      renderTimes.push(time);
    }
  };
  sortData();

  //  series: [44, 55, 41, 17, 15],
  //   chartOptions: {
  //     labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
  //   }

  // configuration object for chart
  const options = {
    title: {
      text: "Component Render Durations",
      align: "center",
    },
    chart: {
      type: "pie",
      height: "500px",
    },
    labels: componentNames,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
            position: "bottom",
          },
        },
      },
    ],
  };
  // bar data for chart

  return (
    <Chart
      className="piechart"
      options={options}
      series={renderTimes}
      type="pie"
      width="500px"
      height="500px"
    />
  );
};

export default PieChart;
