import React, { useState } from "react";
import { Post } from "../components"

const initialData = [
    {
        cafeName: "ffffff",
        phone: "010-1233-2222",
        cafeLocation: "d",
        coffee: "d",
        time: "d",
    }
]

const CafeList = () => {
    const [applyList, setApplyList] = useState(initialData);
    
    return (
        <div>
            <h5>커피박 기부한 카페 리스트</h5>
            <Post 
                key={1}
                cafeName={applyList[0].cafeName}
                phone={applyList[0].phone}
                cafeLocation={applyList[0].cafeLocation}
                coffee={applyList[0].coffee}
                time={applyList[0].time}
                page={"mainfarmer"}
            />
        </div>
    );
};

export default CafeList;
