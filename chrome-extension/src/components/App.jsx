import * as React from "react";

import ComponentTree from "./ComponentTree";
import Charts from "./Charts";
import { useEffect, useState } from "react";
import "../components/index.css";

const App = () => {
  const [idk, setIdk] = useState([]);
  //state for navigating between tree and charts
  const [view, setView] = useState("treeView");
  //state for recording status, default to false;
  const [recStat, setRecStat] = useState(false);
  const [recButton, setRecButton] = useState("start profiling");

  const setStatus = () => {
    setRecStat((prevRecStat) => !prevRecStat);
  };
  //update recButton according to recStat
  useEffect(() => {
    if (!recStat) {
      setRecButton("start profiling");
    } else {
      setRecButton("stop profiling");
    }
  }, [recStat]);

  useEffect(() => {
    const msgListener = (request, sender, sendResponse) => {
      if (recStat) {
        console.log("inside use effect", JSON.parse(request.data));
        switch (request.action) {
          case "EVENT_LIST":
            setIdk([...JSON.parse(request.data)]);
            break;
        }
      }
    };

    chrome.runtime.onMessage.addListener(msgListener);

    return () => {
      chrome.runtime.onMessage.removeListener(msgListener);
    };
  }, [recStat]);

  return (
    <div className="app">
      <nav>
        <button onClick={() => setStatus()}>{recButton}</button>
        <button onClick={() => setView("treeView")}>Component Tree</button>
        <button onClick={() => setView("chartView")}>Charts</button>
      </nav>
      <div className="container">
        {view === "treeView" && (
          <ComponentTree fiberTree={idk[idk.length - 1]} />
        )}
        {view === "chartView" && <Charts eventList={idk} />}
        {/* <img src="metronome.png" />; */}
      </div>
    </div>
  );
};

export default App;
