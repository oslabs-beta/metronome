// CONTENT SCRIPT
// WILL SERVE AS A SCRIPT WHICH IS ABLE TO ACCESS
// THE CURRENT DOM OF THE TABE THE USER IS CURRENTLY IN
let script;

// FUNCTION: FOR INJECTING SCRIPT INTO CURRENT DOM
const inject = (fileName) => {
  console.log("CONTENTSCRIPT.JS: INJECTING SCRIPT");
  script = document.createElement("script");
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

// TESTING
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle the message received from the popup
  console.log("irdk whats happnign");
  const event = new CustomEvent("CustomEventFromContentScript", {
    detail: { message: "Hello from content script!" },
  });
  document.dispatchEvent(event);
  // script.onload = function () {
  //   console.log("hello idk whats happening");
  //   window.postMessage(
  //     { type: "FROM_CONTENT_SCRIPT", message: "Hello from content script!" },
  //     "*"
  //   );
  // };
  console.log(message);
});
