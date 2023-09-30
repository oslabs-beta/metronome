// import { disableValidation } from "schema-utils";

// RETRIVE GLOBAL HOOK AND SAVE IN REACTDEVGLOBALHOOK VARIABLE
const reactDevGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

// STORE THE PARSED FIBER TREE INFORMATION
// EACH ELEMENT WILL REPRESENT ONE RERENDER THAT OCCURED
const eventList = [];
// FUNCTION: FOR PARSING REACT FIBER TREE
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
      name: "THIS IS NOT A FUNCTIONAL COMPONENT",
      child: parseTree(reactFiberTree.child),
      sibling: parseTree(reactFiberTree.sibling),
    };
    // return parseTree(reactFiberTree.child) || parseTree(reactFiberTree.sibling);
  }
};

//Parse Tree function will get rid of all nonfunctional component and only retrieve data when the
//current element type is a functional component

// Unless if the non fucntional component had both a child and sibling it will check to see
// whether the child or sibling leads to a functional component.
// If it does then we need that nonfunctional element type in our parsed tree to store the child
// and the sibling

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
