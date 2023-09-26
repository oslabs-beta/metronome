import * as React from "react";

import ComponentTree from "./ComponentTree";

import { useEffect, useState } from "react";
import "../components/index.css";

const App = () => {
  const [idk, setIdk] = useState([]);

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
    <div className="container">
      <ComponentTree fiberTree={idk} />
      {/* <img src="metronome.png" />; */}
    </div>
  );
};

export default App;
