import React, { useState, useContext, useEffect } from "react";
import '../../styles/MainCafe.css';
import { AuthContext } from "../../App";
import { getApi, deleteApi } from "../../api";
import dayjs from 'dayjs';
import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg';
import {ReactComponent as DelBtn} from '../../assets/DelBtn.svg';
import { DonationEditDialog } from "../../components/dialog";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Donations = () => {
    const authContext = useContext(AuthContext);
    const [date, setDate] = useState(dayjs(new Date()).format('YYYY. MM. DD'));
    const [time, setTime] = useState(dayjs(new Date()).format('HH:MM'));
    const [info, setInfo] = useState([]);
    const [editVisible, setEditVisible] = useState(false);
    const [curInfo, setCurInfo] = useState({});
    const navigate = useNavigate();

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

    const putMyDonation = async (data, status) => {
        await axios.put('https://beanyard.app:8080/api/donate',
            {
                donateSeq: data.donateSeq,
                donateStatus: status,
            }
            , {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                }
            })
            .then(({ status, data }) => {
                navigate('/donations/completed');
                document.body.style.overflow = 'auto';
            })
            .catch((e) => {
                console.log(e);
            });
    };


    useEffect(() => {        
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
            donateCycle: "SHORT",
            userSeq:1,
            createdAt: "2022-05-29 01:41:35",
            weeks: ["SUNDAY", "FRIDAY"]
        }, {
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
            donateCycle: "SHORT",
            userSeq:1,
            createdAt: "2022-05-29 01:41:35",
            weeks: ["SUNDAY", "FRIDAY"]
        }, {
            donateSeq: 23,
            time: "2021. 02. 02 16:39:22",
            amount: 100,
            message: "메세지",
            lat: 12.0,
            lon: 12.0,
            locateName: "카페위치",
            cafeName: "지혜카페",
            donateStatus: "WAIT",
            donateType: "DIRECT",
            donateCycle: "SHORT",
            userSeq:1,
            createdAt: "2022-05-29 01:41:35",
            weeks: ["SUNDAY", "FRIDAY"]
        }, {
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
            donateCycle: "LONG",
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
        if(now === 'POST') return 'Delivery';
        else return 'Pick up';
    };

    const SetDonationInfo = (index) => {
        setCurInfo(info[index]);
        setEditVisible(true);
    };

    const DeleteDonation = async (seq) => {
        if(authContext.state.userSeq) {
            let answer = window.confirm('Are you sure?');
            if(answer) {
                await deleteApi(
                    {
                        userSeq: authContext.state.userSeq,
                    },
                    "/api/donate",
                    authContext.state.token
                )
                .then(({ status }) => {
                    console.log(status);
                    if(status === 200) {
                        alert('delete completed');
                        getDonationsList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            }

        }
    };

    const closeMapDialog = (e, click, now) => {
        if(click === 'inside' || (e.target.id === 'dialog-outside' && editVisible)) {
            if(now === 'anything') {
                // setLat(0); setLng(0);
            }
            setEditVisible(false);
            document.body.style.overflow = 'auto';
        }
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
                                            <div className="date-section">{ date }</div>
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
                                        <div>
                                        <div style={{display: 'inline-block', width: '70%'}}>
                                            <div>Donate Type: <span>{ method(e.donateType) }</span></div>
                                            <div>Quantity: <span>{ e.amount } g</span></div>
                                            <div>Time: <span>{ time }</span></div>
                                        </div>
                                        <div style={{display: 'inline-block', width: '30%', textAlign: 'right'}}>
                                            <EditBtn
                                                width={'17.5%'}
                                                height={'17.5%'}
                                                style={{margin: '0 1vw'}}
                                                onClick={()=>SetDonationInfo(idx)}
                                            />
                                            <DelBtn
                                                width={'17.5%'}
                                                height={'17.5%'}
                                                style={{margin: '0 1vw'}}
                                                onClick={()=>DeleteDonation(e.donateSeq)}
                                            />
                                        </div>`
                                        </div>
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
            <DonationEditDialog
                isVisible={editVisible}
                curInfo={curInfo}
                putDonation={putMyDonation}
                closeDialog={closeMapDialog}
            />
        </div>
    );
};

export default Donations;