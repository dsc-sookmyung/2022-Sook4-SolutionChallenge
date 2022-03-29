import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../App";
import { postApi } from "../api";
import '../styles/CafeDetail.css';
import axios from "axios";

const CafeDetail = () => {
    const authContext = useContext(AuthContext);
    const cafeSeq = window.location.pathname.split('/')[2];
    const [cafeData, setCafeData] = useState({});

    useEffect(() => {
        const getMyDonations = async () => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            };
            // const token = authContext.state.token;
            // if (token) {
            //     config.headers["Authorization"] = `Bearer ${token}`;
            // }
            await axios.get(`https://beanyard.app:8080/api/donate?cafeSeq=${cafeSeq}`, config)
            .then(({ status, data }) => {
                setCafeData(data.content[0]);
            })
            .catch((e) => {
                console.log(e);
            });
        };
        getMyDonations();
    }, [cafeSeq]);

    const apply = async () => {
        await postApi(
            {
                userSeq: authContext.state.userSeq,
                cafeSeq: cafeData.cafeSeq,
            },
            "/api/apply",
            authContext.state.token
        )
        .then(({ status, data }) => {
            // console.log(status);
            if(status === 200 || status === 201 || status === 204) {
                alert('Apply Completed.');
                window.history.back(-1);
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };

    return (
        <div className="cafe-detail">
            <div className="detail-info">
                <div className="detail-title">카페이름</div>
                <div className="detail-content">
                    {cafeData.name}
                </div>

                <div className="detail-title">위치</div>
                <div className="detail-content">
                    {cafeData.location}
                </div>

                <div className="detail-title">커피박 수거 가능 시간</div>
                <div className="detail-content">
                    {cafeData.time}
                </div>

                <div className="detail-title">커피박 양</div>
                <div className="detail-content">   
                    {cafeData.coffee}
                </div>

                <div className="detail-title">메세지</div>
                <div className="detail-content">
                    {cafeData.message}
                </div>
            </div>
            <button
                type="submit"
                onClick={apply}
                className="apply-btn"
            >
                신청하기
            </button>
        </div>
    );
};

export default CafeDetail;
