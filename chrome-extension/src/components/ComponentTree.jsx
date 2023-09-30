import React from "react";
import Tree from "react-d3-tree";
import "../components/ComponentTree.css";
import { customStringify, sendData, saveJSON } from "../helperFuncs/helperFuncs";
// import xhr from '../background/background'

//fiberTree is passed down from App
function ComponentTree({ fiberTree }) {
  console.log(fiberTree);

  const getChildren = (tree) => {
    const children = [];
    if (!tree) return children;
    while (tree.sibling) {
      children.push(tree.sibling);
      tree = tree.sibling;
    }

    return children;
  };

  const parseTree = (tree) => {
    if (!tree) return;
    let obj;
    console.log("parsetree", tree);
    if (tree === null) return null;
    else {
      console.log("result of invokign getChildren", getChildren(tree));
      if (tree.child) {
        obj = {
          name: tree.name,
          attributes: {
            actualDuration: tree.actualDuration,
            selfBaseDuration: tree.selfBaseDuration,
          },
          children: [tree.child, ...getChildren(tree.child)].map((elem) =>
            parseTree(elem)
          ),
        };
      } else {
        obj = {
          name: tree.name,
          attributes: {
            actualDuration: tree.actualDuration,
            selfBaseDuration: tree.selfBaseDuration,
          },
          children: [...getChildren(tree.child)].map((elem) => parseTree(elem)),
        };
      }
      return obj;
    }
  };

  const result= parseTree(fiberTree[0]);
  //create a new parsedTree with helper function that prevents circular object error.
  const stringifiedResult = customStringify(result)

  console.log("parsed component tree", parseTree(fiberTree[0]));

  return (
    <>
      {result ? (
        <div style={{ width: "60rem", height: "60rem" }}>
          <button style={{ width: "60rem", height: "3rem" }} onClick={()=> saveJSON(result, 'parseTreeData')}>Click to download file</button>
          <button style={{ width: "60rem", height: "3rem" }} onClick={()=> sendData(stringifiedResult)}>Click to send data</button>
          <div
            id="treeWrapper"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "white",
            }}
          >
            <Tree
              data={result}
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

export default ComponentTree