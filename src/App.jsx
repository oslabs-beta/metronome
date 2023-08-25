import React, { useState, useEffect} from "react";
// import { Routes, Route } from "react-router-dom"
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import { checkSession } from "./fetchers/userFetcher";
import FileUpload from "./components/FileUpload";


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [view, setView] = useState('homepage');

  // // checks whether user has an active session or not on component loading
  // useEffect(() => {
  //   const checkUserSession = async () => {
  //     try {
  //       const res = await checkSession();
  //       if (res) {
  //         setIsLoggedIn(true);
  //         setIsLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUserSession();
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <div>
    //   <div>
    //     { isLoggedIn 
    //       ? 
    //         <FileUpload isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> 
    //       : 
    //         <Login setIsLoggedIn={setIsLoggedIn} view={view} setView={setView} />
    //     }
    //   </div>
    // </div>
    <div>
    <div>this is the main app</div>
    <FileUpload/>
    </div>
  );
}

export default App;