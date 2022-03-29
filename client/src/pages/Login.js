import React from "react";
import { LoginForm } from "../components";
import { Link } from "react-router-dom";
import '../styles/Signup.css';

const Login = () => {
    return (
        <div className="Login">
            <div className="Login-title">
                READY TO MAKE<br />
                YOUR BEANYARD?
            </div>
            <LoginForm />
            <div className="Login-or">
                <div className="Login-or-line"></div>
                OR
                <div className="Login-or-line"></div>
            </div>
            <Link to='/signup/cafe'>
                <button
                    className="Joinus-button"
                    type="submit"
                >JOIN US</button>
            </Link>
        </div>
    );
};

export default Login;
