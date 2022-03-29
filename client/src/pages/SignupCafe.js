import React from "react";
import { SignupFormCafe } from "../components";
import '../styles/Signup.css';

const SignupCafe = () => {
    
    return (
        <div className="Signup">
            <div className="Signup-left">
                <div className="Signup-title">
                    Become a member <br />
                    and make your BEANYARD!
                </div>
                <div className="Signup-subtitle">
                    <a href={"https://www.ycrowdy.com/r/gdscbeanyard"} target="_blank" rel="noopener noreferrer">
                        Do you want to grow your own garden?<br />
                        Go to funding page and get BeanYard Kit!
                    </a>
                </div>
            </div>
            <SignupFormCafe />
        </div>
    );
};

export default SignupCafe;
