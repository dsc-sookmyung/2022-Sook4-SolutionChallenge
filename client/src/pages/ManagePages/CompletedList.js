import React, { useState, useEffect, useContext } from 'react';
import { DonateWaitingList } from '../../components';
import { AuthContext } from '../../App';
import { getApi } from '../../api';

/* 각각 waiting list, completed list 에서는 클릭했을 때 들어오는 api에 따라 달라지도록만 한다 */

const CompletedList = () => {
    const [componentList, setComponentList] = useState([]);
    const [curService, setCurService] = useState('accepted');
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState([
        {
            donateStatus: "COMPLETE",
        }, {
            donateStatus: "REJ_DISTANCE",
        }, {
            donateStatus: "REJ_TIME",
        }, {
            donateStatus: "REJ_AMOUNT",
        }
    ]);
    const [curStatus, setCurStatus] = useState(status[0]);

    useEffect(() => {
        const getDonationsList = async () => {
            if(curStatus === status[0]) {
                await getApi(
                    curStatus,
                    "/api/donate",
                    authContext.state.token
                )
                .then(({ data }) => {
                    if(data) {
                        setComponentList(data.content);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        };
        getDonationsList();
    }, [authContext.state.token, authContext.state.userSeq, curStatus, status]);

    const getDeclineList = async () => {
        let tmp = [];
        for(let i=1;i<=3;i++) {
            await getApi(
                status[i],
                "/api/donate",
                authContext.state.token
            )
            .then(({ data }) => {
                if(data) {
                    tmp.push(...data.content);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }

        setComponentList(tmp);
    };

    const setCurClick = (now) => {
        if(now === 'accepted' && curService !== now) {
            setComponentList([]);
            setCurStatus(status[0]);
        }
        else if(now === 'declined' && curService !== now) {
            setComponentList([]);
            setCurStatus(status[1]);
            getDeclineList();
        }
        setCurService(now);
    };
    
    return (
        <div>
            <div className='button-section'>
                <div
                    onClick={()=>setCurClick('accepted')}
                    style={{
                        color: curService === 'accepted' ? '#F2F2F2' : '#443826',
                        backgroundColor: curService === 'accepted' ? '#443826' : '#F2F2F2',
                        cursor: 'pointer',
                    }}
                >ACCEPTED</div>
                <div
                    onClick={()=>setCurClick('declined')}
                    style={{
                        color: curService === 'declined' ? '#F2F2F2' : '#443826',
                        backgroundColor: curService === 'declined' ? '#443826' : '#F2F2F2',
                        cursor: 'pointer',
                    }}
                >DECLINED</div>
            </div>
            <DonateWaitingList list={componentList} now={curService} />
        </div>
    );
};

export default CompletedList;