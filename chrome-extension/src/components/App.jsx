import * as React from "react";

import ComponentTree from "./ComponentTree";
import Charts from "./Charts"
import { useEffect, useState } from "react";
import "../components/index.css";

const App = () => {
  const [idk, setIdk] = useState([]);
  //state for navigating between tree and charts
  const [view, setView] = useState('treeView');

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("inside use Effect", JSON.parse(request.data));
      switch (request.action) {
        case "EVENT_LIST":
          setIdk([JSON.parse(request.data)]);
          break;
      }
    });
  }, []);

  return (
    <div className="app">
      <nav>
        <button onClick={()=> setView('treeView')}>Component Tree</button>
        <button onClick={()=>setView('chartView')}>Charts</button>
      </nav>
    <div className="container">

      {view==='treeView' && <ComponentTree fiberTree={idk} />}
      {view==='chartView' && <Charts/>}
      {/* <img src="metronome.png" />; */}
    </div>

    </div>
  );
};

export default App;
