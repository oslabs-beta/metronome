import React, { useState } from 'react';
import Chart from 'react-apexcharts';

// bar chart to display component render frequencies
const BarChart = ({ renderedComponents }) => {
  // chart data
  const componentNames = []; // x-axis labels
  const renderFrequencies = []; // bar data

  // restructure data into 2D array to prepare for sorting
  const renderedComponentsArr = Object.entries(renderedComponents);
  // sort data in descending order by render frequency
  renderedComponentsArr.sort((componentA, componentB) => componentB[1].numRender - componentA[1].numRender);
  // populate chart data arrays
  renderedComponentsArr.forEach((component) => {
    componentNames.push(component[0]);
    renderFrequencies.push(component[1].numRender);
  });

  // configuration object for chart
  const options={
    title: {
      text: 'Component Render Frequencies',
      align: 'center',
    },
    xaxis: {
      categories: componentNames,
      title: {
        text: 'Component Name',
      },
    },
    yaxis: {
      title: {
        text: 'Render Frequency',
      },
      labels: {
        formatter: (val) => val.toFixed(0), // remove decimal points from frequency values
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  // bar data for chart
  const series= [
    {
      name: 'Render Frequency',
      data: renderFrequencies,
    }
  ];

  return (
    <Chart options={options} series={series} type='bar' width={500} height={500} />
  );
};

export default BarChart;