import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import { getApi } from "../api";
import { useNavigate } from "react-router-dom";
import '../styles/Signup.css';

const LoginForm = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [loginErrorMsg, setLoginErrorMsg] = useState("");
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        ///////// 임의로 로그인 /////////
        // authContext.dispatch({
        //     type: "login",
            // token: "1234",
            // email: "test@test.com",
            // userSeq: 13,
        // });
        
        // localStorage.setItem(
        //     "loggedInfo",
        //     JSON.stringify({ 
        //         token: "1234",
        //         email: "test@test.com",
        //         userSeq: 13,
        //     })
        // );
        ////////////////////////////////////
        
        const post = async () => {
            try {
                const res = await axios.post("https://beanyard.app:8080/api/auth/login",
                    userData, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: "application/json",
                        }
                    }
                )
                // console.log('res.data', res.data);
                // console.log('res', res);
                authContext.dispatch({
                    type: "login",
                    token: res.headers.authorization,
                    email: res.data,
                    userSeq: null,
                });
                localStorage.setItem(
                    "loggedInfo",
                    JSON.stringify({ 
                        token: res.headers.authorization,
                        email: res.data,
                        userSeq: null,
                    })
                );
                // if (authContext.state.token !== "") {
                //     navigate("/maincafe"); // 로그인 성공 시 메인페이지로 이동
                // }
            } catch (e) {
                console.log(e);
                setLoginErrorMsg("Login failed. Try another!");
            }
        }
        await post();
    };

    useEffect(()=> {
        const getUserInfo = async () => {
            await getApi(
                {},
                `/api/user?userName=${authContext.state.email}`,
                authContext.state.token
            )
            .then(({ status, data }) => {
                if (status === 200) {
                    // console.log(data.userSeq);
                    authContext.dispatch({
                        type: "login",
                        token: authContext.state.token,
                        email: authContext.state.email,
                        userSeq: data.userSeq,
                    });

                    localStorage.setItem(
                        "loggedInfo",
                        JSON.stringify({
                            token: authContext.state.token,
                            email: authContext.state.email, 
                            userSeq: data.userSeq,
                        })
                    );

                    // console.log(data)
                    if (authContext.state.token !== "") {
                        if(data.userSeq === 3) navigate('/donations');
                        else navigate("/maincafe"); // 로그인 성공 시 메인페이지로 이동
                    }
                };
            })
            .catch((e) => {
                console.log(e);
            });
        }
        getUserInfo();
    }, [authContext.state.token, authContext, navigate]);

    return (
        <form className="Login-outer-form" onSubmit={submitHandler}>
            <div className="form-group">
                <div className="form-item">
                    <input
                        type="text"
                        name="email"
                        placeholder="EMAIL"
                        onChange={
                            (e) => setUserData({ ...userData, email: e.target.value })
                        }
                        value={userData.email}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="form-item">
                    <input
                        type="password"
                        name="password"
                        placeholder="PASSWORD"
                        onChange={(e) =>
                            setUserData({ ...userData, password: e.target.value })
                        }
                        value={userData.password}
                    />
                </div>
            </div>
            <p className= {loginErrorMsg === "Confirmed!" ? 
                "login-confirm-text" : 
                "login-error-text"}>
                {loginErrorMsg}
            </p>
            <br></br>
            <button
                className="Login-button"
                type="submit"
            >LOG IN</button>
            <br />
        </form>
    );
};

export default LoginForm;
