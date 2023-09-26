import React, {useState , useEffect} from "react";
import Tree from "react-d3-tree";
import "../components/ComponentTree.css";
// import xhr from '../background/background'

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
    const sendData = (result) =>{
    fetch("http://localhost:3000/extensiondata", {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(result)
  }).then(function(response) {
      // check the response object for result
      console.log('response from backend', response)
      // ...
  });
  }


  console.log("parsed component tree", parseTree(fiberTree[0]));

  return (
    <>
      {result ? (
        <div style={{ width: "60rem", height: "60rem" }}>
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