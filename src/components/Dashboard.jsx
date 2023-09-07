import React from 'react';
import BarChart from './BarChart.jsx';
import FileUpload from './FileUpload.jsx';
import HistoricalChart from './HistoricalChart.jsx';
import Navbar from './Navbar.jsx';
import Overview from './Overview.jsx';
import PieChart from './PieChart.jsx';
import Tree from './Tree.jsx';

function Dashboard() {
  
//declare overview state
const [overview, setOverview] = useState({});

useEffect(()=>{
  const fetchOverview=async()=>{
    try{
      const response = await fetch("http://localhost:3000/api/dashboard/overview")
      const jsonData=await response.json();

      setOverview({jsonData});
    }
  }
})

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard