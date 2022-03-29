import React, { useContext, useEffect } from "react";
import { AuthContext } from "../App";
import { getApi } from "../api";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getLogout = async () => {
            await getApi({}, "/api/auth/logout")
            .then(({ status, data }) => {
                // console.log('status:', status);
                if(status === 200 || status === 201 || status === 204) {
                    navigate('/');
                    authContext.dispatch({
                        type: "logout",
                        token: null,
                        userName: null,
                        userType: null,
                        userSeq: null,
                    });
                    alert('Logout');
                    localStorage.clear();
                } else {
                    alert('Logout Failed');
                }
            })
            .catch((e) => {
                console.log(e);
            });
        };
        getLogout();
    }, [authContext, navigate]);

    return (
        <div></div>
    );
};

export default Logout;
