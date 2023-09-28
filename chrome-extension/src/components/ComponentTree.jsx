import React from "react";
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
//custom function to remove circular object error when passing parsedTree to fetch
  const customStringify = function (v) {
    const cache = new Set();
    return JSON.stringify(v, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          // Circular reference found
          try {
            // If this value does not reference a parent it can be deduped
           return JSON.parse(JSON.stringify(value));
          }
          catch (err) {
            // discard key if value cannot be deduped
           return;
          }
        }
        // Store value in our set
        cache.add(value);
      }
      return value;
    });
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

  //fetch request thats called when button is clicked
  const sendData = (result) =>{
    console.log("clicked on send data and this is what will be sent", result)
    fetch("http://localhost:3000/saveData", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: stringifiedResult
  }).then((response) => {
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
          <button style={{ width: "60rem", height: "3rem" }} onClick={sendData}>Click to send data</button>
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