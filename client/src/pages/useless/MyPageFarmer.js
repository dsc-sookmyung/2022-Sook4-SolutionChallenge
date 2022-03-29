import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";
import { getApi } from "../../api";
import '../styles/MyPageFarmer.css';
import { Link } from "react-router-dom";

const MyPageFarmer = () => {
  const authContext = useContext(AuthContext);
  const [farmerData, setFarmerData] = useState({});
  const [applyList, setApplyList] = useState([]);

  const setVegType = (vegType) => {
    if (vegType === "PEPPER") return "고추";
  };

  useEffect(() => {
    const getFarmerProfile = async () => {
      await getApi(
        {
          userName: authContext.state.userName,
        },
        "/api/user",
        authContext.state.token
      )
        .then(({ status, data }) => {
          console.log(data);
          setFarmerData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const getFarmerCafe = async () => {
      await getApi(
        {},
        `/api/cafe/${authContext.state.userSeq}`,
        authContext.state.token
      )
        .then(({ status, data }) => {
          console.log(data);
          setApplyList(data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getFarmerProfile();
    getFarmerCafe();
  }, [authContext.state.token, authContext.state.userName, authContext.state.userSeq]);

  return (
    <div className="my-page-farmer">
      <div className="section">
        <div className="farmer-title">농부 닉네임</div>
        <div className="farmer-content">{farmerData.userName}</div>

        <div className="farmer-title">전화번호</div>
        <div className="farmer-content">{farmerData.phone}</div>

            <div className="farmer-title">키우는 작물</div>
            <div className="farmer-content">
                {setVegType(farmerData.vegType)}
            </div>
        </div>
        <div>
            <div className="title">내가 신청한 리스트</div>
            <div className="section apply-list">
                {
                    applyList.length ?
                    applyList.map((e, idx) => {
                        return (
                          <div className="apply-list-card" key={idx}>
                              <p className="card-content">카페이름: <span>{e.name}</span></p>
                              <p className="card-content">날짜: <span>{e.time.split(' ')[0]}</span></p>
                              <p className="card-content">주소: <span>{e.location}</span></p>
                              <p className="card-content">신청한 커피박 양: <span>{e.coffee}</span></p>
                              <p className="card-content">커피박 수거 가능 시간: <span>{e.time}</span></p>
                          </div>
                        )
                    }) :
                    <div>리스트가 아직 없습니다</div>
                }
            </div>
        </div>
      </div>
  );
};

export default MyPageFarmer;
