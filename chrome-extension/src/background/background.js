console.log("Background Script");

// fetch("http://localhost:3000/extensiondata", {
//     method: 'POST',
//     mode: 'no-cors',
//     cache: 'no-cache',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: 'hello this is a test'
// }).then(function(response) {
//     // check the response object for result
//     console.log('response from backend', response)
//     // ...
// });

// export default xhr;


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
