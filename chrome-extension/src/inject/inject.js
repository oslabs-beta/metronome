// RETRIVE GLOBAL HOOK AND SAVE IN REACTDEVGLOBALHOOK VARIABLE
const reactDevGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

// STORE THE PARSED FIBER TREE INFORMATION
// EACH ELEMENT WILL REPRESENT ONE RERENDER THAT OCCURED
const eventList = [];

// FUNCTION: FOR PARSING REACT FIBER TREE
// const parseTree = (reactFiberTree) => {
//   if (reactFiberTree === null) return null;
//   else if (typeof reactFiberTree.elementType === "function") {
//     const elemObj = {
//       name: reactFiberTree.elementType.name,
//       actualDuration: reactFiberTree.actualDuration,
//       selfBaseDuration: reactFiberTree.selfBaseDuration,
//       child: parseTree(reactFiberTree.child),
//       sibling: parseTree(reactFiberTree.sibling),
//     };
//     return elemObj;
//   } else {
//     return parseTree(reactFiberTree.child) || parseTree(reactFiberTree.sibling);
//   }
// };

const parseTree = (reactFiberTree) => {
  if (!reactFiberTree) return null;

  if (typeof reactFiberTree.elementType === "function") {
    return {
      name: reactFiberTree.elementType.name,
      actualDuration: reactFiberTree.actualDuration,
      selfBaseDuration: reactFiberTree.selfBaseDuration,
      child: parseTree(reactFiberTree.child),
      sibling: parseTree(reactFiberTree.sibling)
    };
  }

  const children = [];

  let currentNode = reactFiberTree.child;
  while (currentNode) {
    children.push(parseTree(currentNode));
    currentNode = currentNode.sibling;
  }

  return children.length ? children : null;
};

// FUNCTION: CREATING CUSTOMIZED ONCOMMITFIBER ROOT FUNCTION
const customOnCommitFiberRoot = (onCommitFiberRoot) => {
  return (...args) => {
    const fiberRoot = args[1];
    console.log(
      "INJECT.JS: FIBER ROOT FROM THE CUSTOM ONCOMMITFIBERROOT",
      fiberRoot
    );
    eventList.push(parseTree(fiberRoot.current));
    const eventListStr = JSON.stringify(eventList[eventList.length - 1]);

    console.log("current fiber tree", eventList[eventList.length - 1]);

    window.postMessage({ type: "EVENT_LIST", eventListStr });

    console.log("INJECT.JS: eventList", eventList);
    console.log();
    return onCommitFiberRoot(...args);
  };
};

// INVOKE CUSTOMONCOMMITFIBERROOT TO CREATE CUSTOM FUNCTION AND OVERRIDE WITH THE ACTUAL ONE
reactDevGlobalHook.onCommitFiberRoot = customOnCommitFiberRoot(
  reactDevGlobalHook.onCommitFiberRoot
);

// REACT DEV TOOL GLOBAL HOOK
