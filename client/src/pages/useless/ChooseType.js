import React from "react";
import { Link } from "react-router-dom";
import '../styles/Signup.css';

const ChooseType = () => {

    return (
        <div className="ChooseType">
            <div className="ChooseType-title">Join as...</div>
            
            <div className="ChooseType-choose">
                <Link to='/signup/cafe'>
                    <div className="choose-cafe">A cafe owner</div>
                </Link>
                <Link to='/signup/farmer'>
                    <div className="choose-farmer">A farmer</div>
                </Link>
            </div>
        </div>
    );
};

export default ChooseType;
