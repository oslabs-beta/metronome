// import { disableValidation } from "schema-utils";

// RETRIVE GLOBAL HOOK AND SAVE IN REACTDEVGLOBALHOOK VARIABLE
const reactDevGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

// STORE THE PARSED FIBER TREE INFORMATION
// EACH ELEMENT WILL REPRESENT ONE RERENDER THAT OCCURED
let eventList = [];


window.addEventListener('message', (event) => {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  const message = event.data;

  // Only accept messages that we know are ours
  if (typeof message !== 'object' || message === null || !message.type) {
    return;
  }

  if (message.type === 'CLEAR_EVENT_LIST') {
    console.log('i am in inject.js addEventListener CLEAR_EVENT_LIST'
    )
    eventList=[]; // Clear the event list
  }
});

// FUNCTION: FOR PARSING REACT FIBER TREE
// const parseTree = (reactFiberTree) => {
//   if (reactFiberTree === null) return null;
//   else if (typeof reactFiberTree.elementType === "function") {
//       const elemObj = {
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
  if (reactFiberTree === null) return null;
  else if (typeof reactFiberTree.elementType === "function") {
    // console.log("In the else if block", reactFiberTree.elementType.name);
    const elemObj = {
      name: reactFiberTree.elementType.name,
      actualDuration: reactFiberTree.actualDuration,
      selfBaseDuration: reactFiberTree.selfBaseDuration,
      child: parseTree(reactFiberTree.child),
      sibling: parseTree(reactFiberTree.sibling),
    };
    return elemObj;
  } else {
    // console.log("In the else block", reactFiberTree.elementType);
    return {
      name: "NFC",
      child: parseTree(reactFiberTree.child),
      sibling: parseTree(reactFiberTree.sibling),
    };
    // return parseTree(reactFiberTree.child) || parseTree(reactFiberTree.sibling);
  }
};
// FUNCTION: CREATING CUSTOMIZED ONCOMMITFIBER ROOT FUNCTION
const customOnCommitFiberRoot = (onCommitFiberRoot) => {
  return (...args) => {
    const fiberRoot = args[1];
    console.log(
      "INJECT.JS: FIBER ROOT FROM THE CUSTOM ONCOMMITFIBERROOT",
      fiberRoot
    );
    console.log("this is the unparsed tree", fiberRoot.current);
    eventList.push(parseTree(fiberRoot.current));
    console.log("EVENT LIST BEFORE STRINGIFY", eventList);
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
