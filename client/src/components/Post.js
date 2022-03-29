import React from "react";
import { Link } from "react-router-dom";
import '../styles/MainFarmer.css';

const Post = ({
        postSeq,
        cafeName,
        phone,
        cafeLocation,
        coffee,
        time,
        page, // page = mypagefarmer -> 신청버튼 X / mainfarmer -> 신청버튼 O
    }) => {
    
    return (
        <Link to={`/cafedetail/${postSeq}`} className="card-content">
            <div className="farmer-apply-card">
                <p className="card-content">카페이름: {cafeName}</p>
                <p className="card-content">전화번호: {phone}</p>
                <p className="card-content">주소: {cafeLocation}</p>
                <p className="card-content">신청한 커피박 양: {coffee}</p>
                <p className="card-content">커피박 수거 가능 시간: {time}</p>
            </div>
        </Link>        
    )
};

export default Post;
