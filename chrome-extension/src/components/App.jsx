import * as React from "react";

import ComponentTree from "./ComponentTree";
import Charts from "./Charts"
import { useEffect, useState } from "react";
import "../components/index.css";

const App = () => {
  const [idk, setIdk] = useState([]);
  //state for navigating between tree and charts
  const [view, setView] = useState('treeView');
  //state for recording status, default to false;
  const [recStat, setRecStat]=useState(false);
  const [recButton, setRecButton]=useState('start profiling');
  const [index, setIndex]=useState(0);
  const [curridk, setcurridk]=useState([]);
  const [idkrun, setidkrun]=useSate(false);

  const setStatus=()=>{
    setRecStat(prevRecStat=>(!prevRecStat));

  }
  //update recButton according to recStat
  useEffect((idk)=>{
    if(!recStat){
      setRecButton('start profiling');


    }
    else{setRecButton('stop profiling');

    if(idk){
      idk.length===0?setIndex(0):setIndex(idk.length-1);
    }
}
  },[recStat])

  //this one updates curridk with index 
  useEffect(()=>{

    if(idk){
      setcurridk(idk.slice(index));
    }

  },[index,idk])

  
  useEffect(() => {
    // reset eventlist if useEffect triggered by recStat change.
    if(recStat){
      if (chrome.runtime) {
        console.log('i am before CLEAR_EVENT_LIST in App.jsx');
        chrome.runtime.sendMessage({ action: 'CLEAR_EVENT_LIST' });
      }
    }
      const msgListener = (request, sender, sendResponse)=>{
        if(recStat){

          console.log("inside use effect", JSON.parse(request.data));
          switch(request.action){
            case"EVENT_LIST":
            setIdk([JSON.parse(request.data)]);
            setidkrun(true);
            break;
        }
        }
      };

        chrome.runtime.onMessage.addListener(msgListener);

        return ()=>{
          chrome.runtime.onMessage.removeListener(msgListener);
      
      }
  }

    //   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //     console.log("inside use Effect", JSON.parse(request.data));
    //     switch (request.action) {
    //       case "EVENT_LIST":
    //         setIdk([JSON.parse(request.data)]);
    //         break;
    //     }
    //   });
    // }
  , [recStat]);

  return (
    <div className="app">
      <nav>
        <button onClick={()=>setStatus()}>{recButton}</button>
        <button onClick={()=> setView('treeView')}>Component Tree</button>
        <button onClick={()=>setView('chartView')}>Charts</button>
      </nav>
    <div className="container">
      <div className='test'>{JSON.stringify(curridk)}</div>
      {view==='treeView' && <ComponentTree fiberTree={idk} />}
      {view==='chartView' && <Charts/>}
      {/* <img src="metronome.png" />; */}
    </div>

    </div>
  );
};

export default App;
