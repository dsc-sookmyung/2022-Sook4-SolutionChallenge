import React, { useState, useContext, useEffect } from "react";
import '../../styles/MainCafe.css';
import { AuthContext } from "../../App";
import { getApi, deleteApi } from "../../api";
import dayjs from 'dayjs';
import {ReactComponent as EditBtn} from '../../assets/EditBtn.svg';
import {ReactComponent as DelBtn} from '../../assets/DelBtn.svg';
import { DonationEditDialog } from "../../components/dialog";
import axios from 'axios';

const RegularDonations = (type) => {
    const authContext = useContext(AuthContext);
    const [info, setInfo] = useState([]);
    const [editVisible, setEditVisible] = useState(false);
    const [curInfo, setCurInfo] = useState({});

    const getDonationsList = async () => {
        if(authContext.state.userSeq) {
            await getApi(
                {
                    userSeq: authContext.state.userSeq,
                    donateCycleList: "LONG,DEFAULT",
                },
                "/api/donate",
                authContext.state.token
            )
            .then(({ data }) => {
                console.log(data)
                if(data) {
                    if(data.content.length) {
                        setInfo(data.content);
                    }
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
    };

    const putMyDonation = async (data) => {
        console.log(data)
        await axios.put('https://beanyard.app:8080/api/donate',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                }
            })
            .then(({ status }) => {
                if(status === 200) {
                    alert('Edit completed.');
                    getDonationsList();
                } else {
                    alert('Edit failed. Try again.');
                }
                setEditVisible(false);
                document.body.style.overflow = 'auto';
            })
            .catch((e) => {
                console.log(e);
            });
    };

        const DeleteDonation = async (seq) => {
        if(authContext.state.userSeq) {
            let answer = window.confirm('Are you sure?');
            if(answer) {
                await deleteApi(
                    {},
                    `/api/donate/${seq}`,
                    authContext.state.token
                )
                .then(({ status }) => {
                    if(status === 200) {
                        alert('Delete completed.');
                        getDonationsList();
                    } else {
                        alert('Delete failed. Try again.');
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
            }

        }
    };

    useEffect(() => {
        getDonationsList();
        // getDonationsList("LONG");
    }, [authContext.state.token, authContext.state.userSeq]);

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

    const SetDonationInfo = (index) => {
        setCurInfo(info[index]);
        setEditVisible(true);
    };

    const setDate = (date) => {
        return dayjs(date).format('YYYY. MM. DD');

    };

    const setTime = (time) => {
        return dayjs(time).format('HH:MM');
    };

        const closeMapDialog = (e, click, now) => {
        if(click === 'inside' || (e.target.id === 'dialog-outside' && editVisible)) {
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
                                            <div className="date-section">📆 { setDate(e.time) }</div>
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
                                                <div>Time: <span>{ setTime(e.time) }</span></div>
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
                                            </div>
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

export default RegularDonations;