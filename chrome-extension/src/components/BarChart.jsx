import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const BarChart = (data) => {
  // ***********************************************
  // TODO: parse component names and render times
  // from data prop. then sort render times into 
  // descending order
  // ***********************************************

  const componentNames = ['A', 'B', 'C']; // HARDCODED DUMMY DATA
  const renderTimes = [10, 50, 30];  // HARDCODED DUMMY DATA

  // function to add units (ms) to data points displayed 
  // in tooltips and on the chart's bars
  const unitFormatter = (val) => `${val} ms`;

  // configuration object for chart
  const [options, setOptions] = useState({
    title: {
      text: 'Component Render Times',
      align: 'center'
    },
    xaxis: {
      categories: componentNames,
      title: {
        text: 'Component'
      }
    },
    yaxis: {
      title: {
        text: 'Render Time (ms)'
      }
    },
    dataLabels: {
        formatter: unitFormatter
      },
    tooltip: {
      y: {
        formatter: unitFormatter
      }
    },
  });

  // render time data
  const [series, setSeries] = useState([
    {
      name: 'Render Time',
      data: renderTimes
    }
  ]);

  return (
    <Chart options={options} series={series} type='bar' width={500} height={500} />
  );
};

export default BarChart;