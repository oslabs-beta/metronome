// CONTENT SCRIPT
// WILL SERVE AS A SCRIPT WHICH IS ABLE TO ACCESS
// THE CURRENT DOM OF THE TABE THE USER IS CURRENTLY IN

// FUNCTION: FOR INJECTING SCRIPT INTO CURRENT DOM
const inject = (fileName) => {
  console.log("CONTENTSCRIPT.JS: INJECTING SCRIPT");
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.runtime.getURL(fileName));
  document.body.appendChild(script);
  console.log("CONTENTSCRIPT.JS: SCRIPT INJECTION SUCCESSFULL");
};

// INVOKE INJECT FUNCTION TO INJECT SCRIPT
inject("inject.js");

// WAITING FOR MESSAGE FROM INJECT.JS
// WHEN MESSAGE IS RECIEVED, IT SENDS ANOTHER MESSAGE TOO APP.JSX
window.addEventListener("message", (event) => {
  console.log("message from inject.js", event.data.eventListStr);
  if (event.data.type && event.data.type === "EVENT_LIST") {
    console.log("event", event);
    chrome.runtime.sendMessage({
      action: event.data.type,
      data: event.data.eventListStr,
    });
  }
});
