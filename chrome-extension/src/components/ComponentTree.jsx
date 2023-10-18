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
  console.log(fiberTree);

  // const getChildren = (tree) => {
  //   const children = [];
  //   if (!tree) return children;
  //   while (tree.sibling) {
  //     children.push(tree.sibling);
  //     tree = tree.sibling;
  //   }

  //   return children;
  // };

  // const parseTreeInTreeStructure = (tree) => {
  //   if (!tree) return;
  //   let obj;
  //   console.log("parsetree", tree);
  //   if (tree === null) return null;
  //   else {
  //     console.log("result of invokign getChildren", getChildren(tree));
  //     if (tree.child) {
  //       obj = {
  //         name: tree.name,
  //         // attributes: {
  //         //   actualDuration: tree.actualDuration,
  //         //   selfBaseDuration: tree.selfBaseDuration,
  //         // },
  //         children: [tree.child, ...getChildren(tree.child)].map((elem) =>
  //           parseTreeInTreeStructure(elem)
  //         ),
  //       };
  //     } else {
  //       obj = {
  //         name: tree.name,
  //         // attributes: {
  //         //   actualDuration: tree.actualDuration,
  //         //   selfBaseDuration: tree.selfBaseDuration,
  //         // },
  //         children: [...getChildren(tree.child)].map((elem) =>
  //           parseTreeInTreeStructure(elem)
  //         ),
  //       };
  //     }
  //     return obj;
  //   }
  // };

  // const removeNFCsFromChildArray = (tree) => {
  //   if (tree.children === null) return null;
  //   let parsedChildArray = [];
  //   for (let i = 0; i < tree.children.length; i++) {
  //     const el = tree.children[i];
  //     if (el.name === "NFC") {
  //       parsedChildArray = parsedChildArray.concat(
  //         removeNFCsFromChildArray({ name: tree.name, children: el.children })
  //       );
  //     } else parsedChildArray.push(el);
  //   }

  //   console.log("Parsed Child Array", parsedChildArray);
  //   return parsedChildArray;
  // };

  // const removeAllNFCs = (tree) => {
  //   //ASSUMING THAT THE ROOT NODE OF TREE IS NOT A NFC
  //   const immediateChildren = removeNFCsFromChildArray(tree);
  //   const actualChildren = immediateChildren.map((child) => {
  //     return { name: child.name, children: removeAllNFCs(child) };
  //   });
  //   return actualChildren;
  // };

  // const final = (tree) => {
  //   return { name: tree.name, children: removeAllNFCs(tree) };
  // };

  // const result = parseTreeInTreeStructure(fiberTree[0])
  //   ? final(parseTreeInTreeStructure(fiberTree[0]).children[0])
  //   : null;

  // if (parseTreeInTreeStructure(fiberTree[0])) {
  //   if (parseTreeInTreeStructure(fiberTree[0]).name !== "NFC") {
  //     result = final(parseTreeInTreeStructure(fiberTree[0]));
  //   } else {
  //     console.log("debugging!");
  //     result = final(parseTreeInTreeStructure(fiberTree[0]));
  //     //result = final(parseTreeInTreeStructure(fiberTree[0]).children[0]);
  //   }
  // } else {
  //   result = null;
  // }

  //create a new parsedTree with helper function that prevents circular object error.
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
