import * as React from "react";
import BarChart from "./BarChart";

const Charts = ({ fiberTree }) => {
  console.log("fiber tree from the charts", fiberTree);
  return (
    <div>
      <BarChart />
    </div>
  );
};

export default Charts;
