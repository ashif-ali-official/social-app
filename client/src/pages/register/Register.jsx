import './Register.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value === password.current.value){

            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try{

                axios.post("/auth/register", user);
                navigate("/login");

            } catch(err){
                console.log(err);
            }
            
        } else{
            confirmPassword.current.setCustomValidity("Passwords didn't match!")
        }
    }

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
                        type="text" 
                        className="loginInput" 
                        ref={username} 
                        placeholder="Username"
                        required
                    />
                    <input 
                        type="email" 
                        className="loginInput" 
                        ref={email} 
                        placeholder="Email"
                        required
                    />
                    <input 
                        type="password" 
                        className="loginInput" 
                        ref={password} 
                        placeholder="Password"
                        minLength="6"
                        required
                    />
                    <input 
                        type="password" 
                        className="loginInput" 
                        ref={confirmPassword} 
                        placeholder="Confirm Password"
                        minLength="6"
                        required                        
                    />
                    <div className="buttons">
                        <button className="loginButton" type="submit">Sign Up</button>
                        <Link to="/login"><button className="loginRegisterButton">Log in</button></Link>
                    </div>
                </form>
            </div>

        </div>

    </div>
  )
}
