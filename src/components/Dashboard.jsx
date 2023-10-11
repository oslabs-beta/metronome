
import React, { useEffect, useState } from 'react';
import OverviewChart from './OverviewChart';
import PieChart from './PieChart';
import BarChart from './BarChart';

const Dashboard = () => {
  // set up variable in which to store the metrics retrieved
  // from the database
  const [metrics, setMetrics] = useState(null);

  // fetch data from database for display on dashboard
  useEffect(() => {
    const fetchMetrics=async()=>{
      try{
        const response= await fetch("http://localhost:3000/api/dashboard/metrics")
        const jsonData=await response.json();

        setMetrics(jsonData);
        // console.log(metrics,'i am metrics in dashboard');
      }
      catch(err){
        console.log('error at fetchMetrics in dashboard.jsx: ',err);
      }
    };
    fetchMetrics();
    // fetch('localhost:3000/api/dashboard/metrics')
    // .then((data) => data.json())
    // .then((jsonData) => {
    //     setMetrics(jsonData);
    //     setBarChartData(parseBarChartData(metrics));
    //     setOverviewChartData(parseOverviewChartData(metrics));
    //     setPieChartData(parsePieChartData(metrics));
    // });
  }, []);

  return (
    <>
      <BarChart data={metrics} data-testid="bar-chart" />
      <OverviewChart data={metrics} data-testid="overview-chart" />
      <PieChart data={metrics} data-testid="pie-chart" />
  </>
  );
}

export default Dashboard;