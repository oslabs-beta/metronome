import "./App.css";
import { useState, useEffect, Profiler } from "react";
import AnimalShow from "./AnimalShow";

function getRandomAnimal() {
  const animals = ["bird", "cat", "cow", "dog", "gator", "horse"];
  return animals[Math.floor(Math.random() * animals.length)];
}

function App() {
  const [animals, setAnimal] = useState([]);

  // const bgPort = chrome.runtime.connect();
  // console.log(bgPort);

  function onRender(
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) {
    console.log("id ", id);
    console.log("phase ", phase);
    console.log("actualDuration", actualDuration);
    console.log("baseDuration", baseDuration);
    console.log("startTime", startTime);
    console.log("commitTime", commitTime);
  }
  // console.log(window);
  // const rdt = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  // console.log(rdt);
  // const isReact = rdt.renderers.get(1);
  // console.log("isReact", isReact);
  // console.log(isReact.getCurrentFiber());
  // console.log("oncommitfiberroot", rdt.onCommitFiberRoot);

  const handleClick = () => {
    setAnimal([...animals, getRandomAnimal()]);
  };

  const renderedAnimals = animals.map((animal, index) => {
    return <AnimalShow type={animal} key={index} />;
  });

  return (
    <div className="app">
      <button onClick={handleClick}>Add Animal</button>
      <div className="animal-list">{renderedAnimals}</div>
    </div>
  );
}

export default App;
