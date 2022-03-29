import React from "react";
import { SignupFormFarmer } from "../../components";
import '../styles/Signup.css';

const SignupFarmer = () => {

    return (
        <div className="Signup">
            <div className="Signup-title">
                <h2>Join us!</h2>
                <p>Fill out the form and...</p>
            </div>
                <SignupFormFarmer />
        </div>
    );
};

export default SignupFarmer;
