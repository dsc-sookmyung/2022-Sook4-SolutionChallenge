import React, { useState, useContext } from "react";
import { getApi, postApi } from "../../api";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css';


const SignupFormFarmer = () => {
    const [details, setDetails] = useState({
        userName: "",
        password: "",
        phone: "",
        vegType: "PEPPER",
        userType: "FARMER",
    });
    const [signupErrorMsg, setSignupErrorMsg] = useState("");
    const [userNameCheck, setUserNameCheck] = useState("");
    const [isUserNameChecked, setIsUserNameChecked] = useState(false);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const checkUsername = async (e) => {
        e.preventDefault();
        await getApi(
            {
                userName: details.userName,
            },
            "/api/user"
        )
        .then(({ status, data }) => {
            console.log('status:', status);
            if (status === 204) {
                setUserNameCheck("Available!");
                setIsUserNameChecked(true);
            } else {
                setUserNameCheck("Duplicated ID. Try another.");
                setIsUserNameChecked(false);
            }
        })
        .catch((e) => {
            console.log(e);
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(details);
        await postApi({
            userName: details.userName,
            password: details.password,
            phone: details.phone,
            vegType: details.vegType,
            userType: "FARMER",
            },
            "/api/user/register",
            authContext.state.token
            ).then(({ status, data }) => {
                console.log(data);
                navigate("/login"); // ȸ������ ���� �� �α���â���� �̵�
            })
            .catch((e) => {
                setSignupErrorMsg("Signup Failed") 
            })
    }
    return (
        <form className="Signup-outer-form" onSubmit={submitHandler}>
            <div className="form-group-userid">
            <div className="form-group">
                    <h5>User ID</h5>
                    <div className="userid-input">
                        <input
                            type="text"
                            name="userName"
                            placeholder=""
                            onChange={(e) =>
                                setDetails({ ...details, userName: e.target.value })
                            }
                            value={details.userName}
                        />
                        <button
                        className="userid-check-button"
                        onClick={checkUsername}
                        >Check</button>
                    </div>
                    <p className={
                        userNameCheck === "Available!" ? 
                        "username-check-text-true" : 
                        "username-check-text-false"
                    }>{userNameCheck}</p>
                </div>
            </div>
            <div className="form-group">
                <h5>Password</h5>
                <input
                    type="password"
                    name="password"
                    placeholder=""
                    onChange={(e) =>
                        setDetails({ ...details, password: e.target.value })
                    }
                    value={details.password}
                />
            </div>
            <div className="form-group">
                <h5>Phone</h5>
                <input
                    name="phone"
                    placeholder=""
                    onChange={(e) =>
                        setDetails({ ...details, phone: e.target.value })
                    }
                    value={details.phone}
                />
            </div>

            <div className="form-group">
                <h5>Vegetable</h5>
                <input
                    name="vegType"
                    placeholder=""
                    onChange={(e) =>
                        setDetails({ ...details, vegType: e.target.value })
                    }
                    disabled
                    value={details.vegType}
                />
            </div>

            <p>{signupErrorMsg}</p>
            <br></br>
            <button 
                className="Signup-submit-button"
                type="submit"
                disabled={!isUserNameChecked}
            >Sign Up</button>
        </form>
    );
};

export default SignupFormFarmer;
