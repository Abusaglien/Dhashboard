import React, { useRef } from "react";
import axios from "axios";
import { response } from "express";
function SignUp() {                                                                           // 1
   const userNameRef = useRef();
   const passwordRef = useRef();
  const userEmailRef = useRef();   
   function handleSignUp(e) {                                                      //output form not refresh
       e.preventDefault();  
                                                               
     axios({
         url:"http://localhost:5001/SignUp",                                         //cors 5887-> 3000
         method: "POST",
        data: {
             userName: userNameRef.current.value,
             userEmail: userEmailRef.current.value,
             password: passwordRef.current.value,
         },
     }).then((response) => {
         console.log(response);
   });
     }
  return (                                                                                    //2
    <form>
        <div className="form_filed">
            <label htmlFor="username">User Name</label>
             <input type="text" name="userName" id="userName" ref={userNameRef}/>
            </div>
            <div className="form_filed">
            <label htmlFor="userEmail">User Email</label>
            <input type="email" name="userEmail" id="userEmail" ref={userEmailRef}/>
            </div>
            <div className="form_filed">
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" ref={passwordRef}/>
            </div>
            <button onClick={handleSignUp}>Sign Up</button>
    </form>
  );
}

export default SignUp;