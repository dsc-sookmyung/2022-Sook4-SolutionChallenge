import React, { useState, useEffect, useContext } from 'react';
import { DonateWaitingList } from '../../components';
import { AuthContext } from '../../App';
import { getApi } from '../../api';

/* 각각 waiting list, completed list 에서는 클릭했을 때 들어오는 api에 따라 달라지도록만 한다 */

const WaitingList = () => {
    const [componentList, setComponentList] = useState([]);
    const [curService, setCurService] = useState('delivery');
    const authContext = useContext(AuthContext);
    const [donateType, setDonateType] = useState('POST');

    useEffect(() => {
        const getDonationsList = async () => {
            await getApi(
                {
                    donateType: donateType,
                    donateStatus: 'WAIT',
                },
                "/api/donate",
                authContext.state.token
            )
            .then(({ data }) => {
                setComponentList([]);
                if(data) setComponentList(data.content);
            })
            .catch((e) => {
                console.log(e);
            });
        };

        getDonationsList();
    }, [authContext.state.token, authContext.state.userSeq, donateType]);

    const setCurClick = async (now) => {
        if(now === 'delivery' && curService !== now) setDonateType('POST');
        else if(now === 'pickup' && curService !== now) setDonateType('DIRECT'); 
        setCurService(now);
    };
    
    return (
        <div>
            <div className='button-section'>
                <div
                    onClick={()=>setCurClick('delivery')}
                    style={{
                        color: curService === 'delivery' ? '#F2F2F2' : '#443826',
                        backgroundColor: curService === 'delivery' ? '#443826' : '#F2F2F2',
                        cursor: 'pointer',
                    }}
                >DELIVERY</div>
                <div
                    onClick={()=>setCurClick('pickup')}
                    style={{
                        color: curService === 'pickup' ? '#F2F2F2' : '#443826',
                        backgroundColor: curService === 'pickup' ? '#443826' : '#F2F2F2',
                        cursor: 'pointer',
                    }}
                >PICK UP</div>
            </div>
            <DonateWaitingList list={componentList} now={curService} />
        </div>
    );
};

export default WaitingList;