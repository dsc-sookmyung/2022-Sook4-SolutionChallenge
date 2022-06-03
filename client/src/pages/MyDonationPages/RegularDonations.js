import React, { useState, useContext, useEffect } from "react";
import '../../styles/MainCafe.css';
import { AuthContext } from "../../App";
import { getApi } from "../../api";
import dayjs from 'dayjs';

const RegularDonations = () => {
    const authContext = useContext(AuthContext);
    const [date, setDate] = useState(dayjs(new Date()).format('YYYY. MM. DD'));
    const [time, setTime] = useState(dayjs(new Date()).format('HH:MM'));

    const [info, setInfo] = useState([]);

    useEffect(() => {        
        const getDonationsList = async () => {
            if(authContext.state.userSeq) {
                await getApi(
                    {
                        userSeq: authContext.state.userSeq,
                    },
                    "/api/donate",
                    authContext.state.token
                )
                .then(({ data }) => {
                    if(data) {
                        setInfo(data.content);
                        setDate(dayjs(data.content.time).format('YYYY. MM. DD'));
                        setTime(dayjs(data.content.time).format('HH:MM'));
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        };
        setInfo([{
            donateSeq: 23,
            time: "2021. 02. 02 16:39:22",
            amount: 100,
            message: "메세지",
            lat: 12.0,
            lon: 12.0,
            locateName: "카페위치",
            cafeName: "지혜카페",
            donateStatus: "WAIT",
            donateType: "POST",
            donateCycl: "SHORT",
            userSeq:1,
            createdAt: "2022-05-29 01:41:35",
            weeks: ["SUNDAY", "FRIDAY"]
        }]);
        setDate(dayjs("2021. 02. 02 16:39:22").format('YYYY. MM. DD'));
        setTime(dayjs("2021. 02. 02 16:39:22").format('HH:MM'));
        getDonationsList();
    }, [date, authContext.state.token, authContext.state.userSeq]);

    const setStatus = (status) => {
        if(status === 'COMPLETE') return 'Donate Completed';
        else if(status === 'WAIT') return 'Donate Scheduled';
        else return 'Canceled';
    };

    const setCancelReason = (status) => {
        if(status === 'REJ_DISTANCE') return 'Impossible Distance';
        else if(status === 'REJ_TIME') return 'Impossible Time';
        else return 'Too Small Amount';
    };

    const method = (now) => {
        if(now === 'POST') return 'Pick up';
        else return 'Delivery';
    };

    return (
        <div className="main-cafe">
            <div className="donation-list">
                <div className="donation-list-contents">
                    {
                        info.length ?
                            info.map((e, idx) => {
                                return (
                                    <div className="content-section" key={idx}>
                                        <div className="date-and-pick">
                                            <div className="date-section">📆 { date }</div>
                                            <div className="pick-section">
                                                <span
                                                    className="pick-title"
                                                    style={{ backgroundColor:
                                                        e.donateStatus === 'COMPLETE' ? '#5EB88A' : e.donateStatus === 'WAIT' ? '#F1D15F' : '#F94949'
                                                    }}
                                                >{ setStatus(e.donateStatus) }
                                                    <span style={{ display: (e.donateStatus === 'COMPLETE' || e.donateStatus === 'WAIT') && 'none' }} className='cancel-reason'>
                                                         ({ setCancelReason(e.donateStatus) })
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                        <div>Donate Type: <span>{ method(e.donateType) }</span></div>
                                        <div>Quantity: <span>{ e.amount } g</span></div>
                                        <div>Time: <span>{ time }</span></div>
                                    </div>
                                );
                            }) :
                            <div className="empty-title">
                                <div>Any Donations yet.</div>
                                <div>Go Start to Save the Earth!</div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default RegularDonations;