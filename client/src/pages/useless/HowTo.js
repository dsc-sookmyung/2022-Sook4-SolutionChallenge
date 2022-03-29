import React from "react";
import ReactPlayer from 'react-player'
import '../styles/Howto.css';

const HowTo = () => {
    return (
        <div className="Howto">
            <ReactPlayer
                    className='react-player'
                    url={'https://youtu.be/aNwPdOY_5-o'}    // 플레이어 url
                    width='60vw'         // 플레이어 크기 (가로)
                    height='35vw'        // 플레이어 크기 (세로)
                    playing={false}        // 자동 재생 on
                    muted={false}          // 자동 재생 on
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}            // pip 모드 설정 여부
                    
                />
        </div>
    );
};

export default HowTo;
