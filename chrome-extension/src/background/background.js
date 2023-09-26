console.log("Background Script");

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   chrome.runtime.sendMessage(
//     {
//       message: "background_to_popup",
//       data: msg,
//     },
//     (response) => {
//       console.log(response);
//     }
//   );
//   console.log(msg);
//   console.log(sender);
//   sendResponse("From the background script!");
// });
