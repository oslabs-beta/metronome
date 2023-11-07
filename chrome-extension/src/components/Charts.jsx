import * as React from "react";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import {useState, useEffect} from "react";
const Charts = ({ eventList }) => {
  console.log("eventList in Charts", eventList);
  // const [componentList, setComponentList] =useState({});
  const renderedComponents = {};

  const getDescendant = (node) => {
    console.log("name of the node", node.name);
    //base case
    if (node.children.length === 0) return;
    node.children.forEach((child) => {
      if (child.actualDuration !== 0 && child.selfBaseDuration !== 0) {
        if (renderedComponents[child.name]) {
          renderedComponents[child.name].numRender += 1;
          renderedComponents[child.name].events.push({
            actualDuration: child.actualDuration,
            selfBaseDuration: child.selfBaseDuration,
          });
        } else {
          renderedComponents[child.name] = {
            events: [
              {
                actualDuration: child.actualDuration,
                selfBaseDuration: child.selfBaseDuration,
              },
            ],
            numRender: 1,
          };
        }
      }
      getDescendant(child);
    });
  };

  const analyze = (eventL) => {
    // console.log("event input in analyze", eventL);
    if (eventL.actualDuration > 0) {
      console.log("In the very first if block", eventL.children.length);
      if (eventL.children.length === 0) {
        if (eventL.selfBaseDuration > 0) {
          console.log("Component getting updated");
          if (renderedComponents[eventL.name]) {
            renderedComponents[eventL.name].numRender += 1;
            renderedComponents[eventL.name].events.push({
              actualDuration: eventL.actualDuration,
              selfBaseDuration: eventL.selfBaseDuration,
            });
          } else {
            renderedComponents[eventL.name] = {
              events: [
                {
                  actualDuration: eventL.actualDuration,
                  selfBaseDuration: eventL.selfBaseDuration,
                },
              ],
              numRender: 1,
            };
          }
        }
      } else {
        let sumChildDurations = 0;
        eventL.children.forEach((child) => {
          sumChildDurations += child.actualDuration;
        });

        console.log("this is the sumChild Duration", sumChildDurations);
        console.log(
          "this is the current node actual duration",
          eventL.actualDuration
        );
        if (sumChildDurations < eventL.actualDuration) {
          console.log("Component getting updated");
          if (renderedComponents[eventL.name]) {
            renderedComponents[eventL.name].numRender += 1;
            renderedComponents[eventL.name].events.push({
              actualDuration: eventL.actualDuration,
              selfBaseDuration: eventL.selfBaseDuration,
            });
          } else {
            renderedComponents[eventL.name] = {
              events: [
                {
                  actualDuration: eventL.actualDuration,
                  selfBaseDuration: eventL.selfBaseDuration,
                },
              ],
              numRender: 1,
            };
          }

          // TRAVERSE THROUGH ALL OF ITS PARENTS DESCENDANT
          getDescendant(eventL);
        } else {
          eventL.children.forEach((child) => analyze(child));
        }
      }
    }
  };

  const parseRender = (eventListObj) => {
    // console.log("eventlistobj", eventListObj);
    for (let i = 0; i < eventListObj.length; i++) {
      // Assuming Root Node is the only NFC Component
      if (eventListObj[i].name === "NFC") {
        console.log("if Block is called");
        analyze(eventListObj[i].children[0]);
      } else {
        console.log("else block is called");
        analyze(eventListObj[i]);
      }
    }
    console.log("final render component", JSON.stringify(renderedComponents));
    // console.log("final render component", renderedComponents);
  };

  // useEffect((parseRender)=>{
  //   parseRender(eventList);
  //   setComponentList(renderedComponents);
  // },[eventList])
  parseRender(eventList);

  console.log(
    "This is the rendered component in the chart",
    renderedComponents
  );

  return (
    <div>
      <PieChart renderedComponents={renderedComponents}/>
      <BarChart renderedComponents={renderedComponents} />
    </div>
  );
};

export default Charts;
