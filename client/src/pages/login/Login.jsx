import { useContext, useRef } from 'react';
import { Link } from "react-router-dom";
import './Login.css'
import { loginCall } from '../../ApiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from "@mui/material";

export default function Login() {

    const{ user, isFetching, error, dispatch } = useContext(AuthContext);

    const email = useRef();
    const password = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value, password: password.current.value}, dispatch)
    }

    console.log(user);

  return (
    <div className="login">

        <div className="loginWrapper">

            <div className="loginLeft">
                <h3 className="loginLogo">Social</h3>
                <span className="loginDesc">Connect with friends and the world around you on Social</span>
            </div>

            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input 
                        type="email" 
                        className="loginInput" 
                        placeholder="Email" 
                        ref={email} 
                        required/>
                    
                    <input 
                        type="password" 
                        className="loginInput" 
                        placeholder="Password" 
                        ref={password} 
                        minLength="6"
                        required
                    />
                    <button className="loginButtonL" type="submit">{ isFetching ? <CircularProgress color="inherit" size="20px"/> : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to="/register"><button className="loginRegisterButtonL">{ isFetching ? <CircularProgress color="inherit" size="20px"/> : "Create a New Account"}</button></Link>
                </form>
            </div>

        </div>

    </div>
  )
}
