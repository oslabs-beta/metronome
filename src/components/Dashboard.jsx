
import React, { useEffect, useState } from 'react';
import OverviewChart from './OverviewChart';
import PieChart from './PieChart';
import BarChart from './BarChart';

const Dashboard = () => {
  // set up variable in which to store the metrics retrieved
  // from the database
  const [metrics, setMetrics] = useState(null);
  const [barChartData, setBarChartData] = useState(null); // data to populate bar chart with
  const [overviewChartData, setOverviewChartData] = useState(null); // data to populate overview chart with
  const [pieChartData, setPieChartData] = useState(null); // data to populate pie chart with

  // parse through metrics and pull data relevant to bar chart
  const parseBarChartData = (metrics) => {
    return data;
  };

  // parse through metrics and pull data relevant to overview chart
  const parseOverviewChartData = (metrics) => {
    return data;
  };

  // parse through metrics and pull data relevant to pie chart
  const parsePieChartData = (metrics) => {
    return data;
  }; 

  // fetch data from database for display on dashboard
  useEffect(() => {
    fetch('/api/metrics')
    .then((data) => data.json())
    .then((jsonData) => {
        setMetrics(jsonData);
        setBarChartData(parseBarChartData(metrics));
        setOverviewChartData(parseOverviewChartData(metrics));
        setPieChartData(parsePieChartData(metrics));
    });
  }, []);

  return (
    <>
      <BarChart data={barChartData} />
      <OverviewChart data={overviewChartData} />
      <PieChart data={pieChartData} />
    </>
  );
}

export default Dashboard;