import React, { useState, useEffect} from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { checkSession } from "./fetchers/userFetcher";
import FileUpload from "./components/FileUpload";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // checks whether user has an active session or not on component loading
  // useEffect(() => {
  //   const checkUserSession = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await checkSession();
  //       if (res) {
  //         setIsLoggedIn(true);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   checkUserSession();
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              {/* {isLoggedIn ?  <Route exact path ="/" element={<FileUpload />}></Route> : <Route path="/" element={<Login />}></Route> } */}
              <Route exact path="/" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path ="/fileupload" element={<FileUpload/>}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    );
  }

export default App;