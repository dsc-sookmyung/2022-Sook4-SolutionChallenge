import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/MainCafe.css';
import { AuthContext } from "../App";
import { getApi } from "../api";
import dayjs from 'dayjs';
// import {ReactComponent as d} from '../assets/dontaion_thumbnail.svg';
import {ReactComponent as Boxthumb} from '../assets/donationbox_thumbnail.svg';
import {ReactComponent as Donatethumb} from '../assets/donation_thumbnail.svg';
const MainCafe = () => {
    const authContext = useContext(AuthContext);
    const date = dayjs(new Date()).format('YYYY. MM. DD');

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
                    if(data) setInfo(data.content);
                })
                .catch((e) => {
                    console.log(e);
                });
            }
        };
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
                <div style={{ display: 'block', marginTop: '5%' }}>
                    <div className="donate-title-section">
                        <Link to={`/donationbox`}>
                            <div className="donation-title">FIND</div>
                            <div className="donation-title">DONATION BOX</div>
                            <div className="logo-img">
                                <Boxthumb />
                            </div>
                        </Link>
                    </div>

                    <div className="donate-title-section">
                        <Link to={`apply`}>
                            <div className="donation-title">GO TO</div>
                            <div className="donation-title">DONATIONS</div>
                            <div className="logo-img">
                                <Donatethumb />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="donation-list-contents">
                    {
                        info.length ?
                            info.map((e, idx) => {
                                return (
                                    <div className="content-section" key={idx}>
                                        <div className="date-and-pick">
                                            <div className="date-section">{ e.date }</div>
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
                                        <div>Time: <span>{ e.time }</span></div>
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

export default MainCafe;