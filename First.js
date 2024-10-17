import React from "react";
import { useState } from 'react';
//import SignUp from "./components/SignUp";
import Login from "./components/Login";
//import {configureStore} from "./state/index";

//import User from "./components/User";

import "./App.css";
function First() {
  const [isLoginForm, setIsLoginForm] = useState(false);
  return (
    <div className="App">
      {isLoginForm ? <Login/> : <SignUp/>}                                          
      <button onClick={() => setIsLoginForm(!isLoginForm)}>
      {isLoginForm? "Click here to sigh Up" : "Click here to Login"}</button> 
    </div>
  )}
//console.log(First);
export default First;
