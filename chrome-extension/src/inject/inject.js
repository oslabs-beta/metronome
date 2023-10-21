// RETRIVE GLOBAL HOOK AND SAVE IN REACTDEVGLOBALHOOK VARIABLE
const reactDevGlobalHook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

// STORE THE PARSED FIBER TREE INFORMATION
// EACH ELEMENT WILL REPRESENT ONE RERENDER THAT OCCURED
let eventList = [];

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
      actualDuration: reactFiberTree.actualDuration,
      selfBaseDuration: reactFiberTree.selfBaseDuration,
      child: parseTree(reactFiberTree.child),
      sibling: parseTree(reactFiberTree.sibling),
    };
    // return parseTree(reactFiberTree.child) || parseTree(reactFiberTree.sibling);
  }
};

const getChildren = (tree) => {
  const children = [];
  if (!tree) return children;
  while (tree.sibling) {
    children.push(tree.sibling);
    tree = tree.sibling;
  }

  return children;
};

const parseTreeInTreeStructure = (tree) => {
  if (!tree) return;
  let obj;
  console.log("parsetree", tree);
  if (tree === null) return null;
  else {
    console.log("result of invokign getChildren", getChildren(tree));
    if (tree.child) {
      obj = {
        name: tree.name,
        actualDuration: tree.actualDuration,
        selfBaseDuration: tree.selfBaseDuration,
        children: [tree.child, ...getChildren(tree.child)].map((elem) =>
          parseTreeInTreeStructure(elem)
        ),
      };
    } else {
      obj = {
        name: tree.name,
        actualDuration: tree.actualDuration,
        selfBaseDuration: tree.selfBaseDuration,
        children: [...getChildren(tree.child)].map((elem) =>
          parseTreeInTreeStructure(elem)
        ),
      };
    }
    return obj;
  }
};

const removeNFCsFromChildArray = (tree) => {
  if (tree.children === null) return null;
  let parsedChildArray = [];
  for (let i = 0; i < tree.children.length; i++) {
    const el = tree.children[i];
    if (el.name === "NFC") {
      parsedChildArray = parsedChildArray.concat(
        removeNFCsFromChildArray({
          name: tree.name,
          actualDuration: tree.actualDuration,
          selfBaseDuration: tree.selfBaseDuration,
          children: el.children,
        })
      );
    } else parsedChildArray.push(el);
  }

  console.log("Parsed Child Array", parsedChildArray);
  return parsedChildArray;
};

const removeAllNFCs = (tree) => {
  //ASSUMING THAT THE ROOT NODE OF TREE IS NOT A NFC
  const immediateChildren = removeNFCsFromChildArray(tree);
  const actualChildren = immediateChildren.map((child) => {
    return {
      name: child.name,
      actualDuration: child.actualDuration,
      selfBaseDuration: child.selfBaseDuration,
      children: removeAllNFCs(child),
    };
  });
  return actualChildren;
};

const final = (tree) => {
  return {
    name: tree.name,
    actualDuration: tree.actualDuration,
    selfBaseDuration: tree.selfBaseDuration,
    children: removeAllNFCs(tree),
  };
};

document.addEventListener("CustomEventFromContentScript", function (event) {
  console.log("Message from content script:", event.detail.message);
  eventList = [];
});

// FUNCTION: CREATING CUSTOMIZED ONCOMMITFIBER ROOT FUNCTION
const customOnCommitFiberRoot = (onCommitFiberRoot) => {
  return (...args) => {
    const fiberRoot = args[1];
    console.log(
      "INJECT.JS: FIBER ROOT FROM THE CUSTOM ONCOMMITFIBERROOT",
      fiberRoot
    );
    console.log("this is the unparsed tree", fiberRoot.current);
    eventList.push(
      final(parseTreeInTreeStructure(parseTree(fiberRoot.current)))
    );
    const eventListStr = JSON.stringify(eventList);

    window.postMessage({ type: "EVENT_LIST", eventListStr });

    return onCommitFiberRoot(...args);
  };
};

// INVOKE CUSTOMONCOMMITFIBERROOT TO CREATE CUSTOM FUNCTION AND OVERRIDE WITH THE ACTUAL ONE
reactDevGlobalHook.onCommitFiberRoot = customOnCommitFiberRoot(
  reactDevGlobalHook.onCommitFiberRoot
);

// REACT DEV TOOL GLOBAL HOOK
