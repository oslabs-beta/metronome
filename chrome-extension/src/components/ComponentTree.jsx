import React from "react";
import Tree from "react-d3-tree";
import "../components/ComponentTree.css";
import {
  customStringify,
  sendData,
  saveJSON,
} from "../helperFuncs/helperFuncs";
import { useCallback, useState } from "react";
// import xhr from '../background/background'

function ComponentTree({ fiberTree }) {
  const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const [dimensions, setDimensions] = useState();
    const containerRef = useCallback((containerElem) => {
      if (containerElem !== null) {
        const { width, height } = containerElem.getBoundingClientRect();
        setDimensions({ width, height });
        setTranslate({ x: width / 2, y: height / 12 });
      }
    }, []);
    return [dimensions, translate, containerRef];
  };
  const [dimensions, translate, containerRef] = useCenteredTree();

  const stringifiedResult = customStringify(fiberTree);

  return (
    <>
      {fiberTree ? (
        <div style={{ width: "100vw", height: "100vh" }}>
          <button
            className="download-btn"
            // style={{
            //   marginTop: "1.2rem",
            //   border: "2px solid black",
            //   borderRadius: "4px",
            //   backgroundColor: "white",
            //   color: "black",
            // }}
            onClick={() => saveJSON(fiberTree, "parseTreeData")}
          >
            Download Data
          </button>
          {/* <button
            style={{ width: "60rem", height: "3rem" }}
            onClick={() => sendData(stringifiedResult)}
          >
            Click to send data
          </button> */}
          <div
            id="treeWrapper"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
            ref={containerRef}
          >
            <Tree
              data={fiberTree}
              orientation="vertical"
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              dimensions={dimensions}
              translate={translate}
            />
          </div>
        </div>
      ) : (
        <h2 className="title">COMPONENT TREE</h2>
      )}
    </>
  );
}

export default ComponentTree;
