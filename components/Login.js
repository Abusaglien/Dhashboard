import React, {useRef} from "react";
import axios from "axios";

function Login() { 
  const userNameRef = useRef(); 
  const passwordRef = useRef();  
  function handleLogin(e) {
    e.prevenDefault();
    axios({
        url: "http://localhost:5001/login",
        method: "POST",
         data: { 
          userEmail: userNameRef.current.value,
          password: passwordRef.current.value,
         },
 //header: { token: localStorage.hetItem("token")}, OR//{Authorization:`Bearer ${localStorage.getItem("token")}}
         
    }).then(response => {
      // localhost.setItem("token", response.data.token);       //
      console.log(response);
    }).catch((err) => console.log(err));
    

  }                                                         
    return (
  
    <form>
        <div className="form_filed">
            <label htmlFor="username">User Name</label>
            <input type="text" name="userName" id="userName" ref={userNameRef} />
            </div>
            <div className="form_filed">
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" ref={passwordRef} />
            </div>
            <button onClick={handleLogin}>Login</button>
    </form>
  );
}

export default Login;