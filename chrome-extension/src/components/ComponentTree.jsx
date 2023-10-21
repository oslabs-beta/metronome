import React from "react";
import Tree from "react-d3-tree";
import "../components/ComponentTree.css";
import {
  customStringify,
  sendData,
  saveJSON,
} from "../helperFuncs/helperFuncs";
// import xhr from '../background/background'

function ComponentTree({ fiberTree }) {
  const stringifiedResult = customStringify(fiberTree);

  return (
    <>
      {fiberTree ? (
        <div style={{ width: "60rem", height: "60rem" }}>
          <button
            style={{ width: "60rem", height: "3rem" }}
            onClick={() => saveJSON(fiberTree, "parseTreeData")}
          >
            Click to download file
          </button>
          <button
            style={{ width: "60rem", height: "3rem" }}
            onClick={() => sendData(stringifiedResult)}
          >
            Click to send data
          </button>
          <div
            id="treeWrapper"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Tree
              data={fiberTree}
              orientation="vertical"
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
            />
          </div>
        </div>
      ) : (
        <h2>tree</h2>
      )}
    </>
  );
}

export default ComponentTree;
