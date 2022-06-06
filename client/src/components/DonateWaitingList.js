import React, { useState } from 'react';
import '../styles/DonateWaitingList.css';
import { DeclineDialog, MapDialog } from './dialog';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const DonateWaitingList = ({ list, now }) => {
    const [mapVisible, setMapVisible] = useState(false);
    const [declineVisible, setDeclineVisible] = useState(false);
    const [inputs, setInputs] = useState({
        distance: false,
        times: false,
        amount: false,
    });
    const [curInfo, setCurInfo] = useState({});
    const navigate = useNavigate();

    const putDonation = async (data, status) => {
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
                // console.log(data);
                if(status === 'COMPLETE') {
                    setMapVisible(false);
                }
                else {
                    setDeclineVisible(false);
                }
                navigate('/donations/completed');
                document.body.style.overflow = 'auto';
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const date = (t) => {
        return dayjs(t).format('YYYY/M/D');
    };

    const time = (t) => {
        return dayjs(t).format('HH:mm');
    };

    const setInfo = (data) => {
        setMapVisible(true);
        document.body.style.overflow = 'hidden';

        setCurInfo(data);
    };

    const closeMapDialog = (e, click, now) => {
        if(click === 'inside' || (e.target.id === 'dialog-outside' && mapVisible)) {
            if(now === 'anything') {
                // setLat(0); setLng(0);
            } else if(now === 'decline') {
                setDeclineVisible(true);
            }
            setMapVisible(false);
            document.body.style.overflow = 'auto';
        }
    };

    const closeDeclineDialog = (e, click) => {
        if(click === 'inside' || (e.target.id === 'dialog-outside' && declineVisible)) {
            setDeclineVisible(false);
            document.body.style.overflow = 'auto';
        }

        setInputs({
            distance: false,
            times: false,
            amount: false,
        });
    };
    
    const onChange = (e) => { 
        const { name }  = e.target;
        let now = !inputs[name];
        const reset = {
            distance: false,
            times: false,
            amount: false,
        };

        setInputs({
            ...reset,
            [name]: now,
        });
    };

    const setType = (now) => {
        if(now === 'POST') return 'DELIVERY';
        else return 'PICK UP';
    };

    const setReason = (now) => {
        if(now === 'REJ_DISTANCE') return 'Impossible Distance';
        else if(now === 'REJ_TIME') return 'Impossible Time';
        else return 'Too Small Amount';
    };

    const isWaiting = () => {
        if(now === 'delivery' || now === 'pickup') return true;
        else return false;
    }

    return (
        <div style={{ marginTop: '5vh' }} onClick={(e)=>closeMapDialog(e, 'outside')}>
            <div className='component-content-section'>
                <div className='table-section'>
                    <div style={{ margin: '0 2.5vw', width: '9%' }} className="table-title"><span>DATE</span></div>
                    <div style={{ margin: '0 4vw', width: '5%' }} className="table-title"><span>CAFE NAME</span></div>
                    <div style={{ margin: '0 2vw', width: '16%' }} className="table-title"><span>ADDRESS</span></div>
                    <div style={{ margin: '0 3vw', width: '2%' }} className="table-title"><span>QUANTITY</span></div>
                    { now === 'accepted' && <div style={{ margin: '0 7vw' }} className="table-title"><span>DELIVERY/PICK UP</span></div> }
                    { now === 'declined' && <div style={{ margin: '0 8vw' }} className="table-title"><span>REASON FOR REFUSAL</span></div> }
                    { now === 'pickup' && <div style={{ margin: '0 8vw' }} className="table-title"><span>PICK UP TIME</span></div> }
                    <hr style={{ border: '1px solid #443826', margin: '1% 0' }}/>
                </div>
                {
                    list.length > 0 ?
                    list.map((e, idx) => {
                        return (
                            <div className='table-section' key={idx}>
                                { e.donateCycle && <div style={{ margin: '0', width: '1px'}} className="table-content">{ e.donateCycle === 'SHORT' ? '' : '📆'}</div> }
                                <div style={{ margin: '0 2.5vw', width: '9%' }} className="table-content"><span>{ e.time ? date(e.time) : '-' }</span></div>
                                <div style={{ margin: '0 4vw', width: '5%' }} className="table-content"><span>{ e.cafeName ? e.cafeName : '-' }</span></div>
                                <div style={{ margin: '0 2vw', width: '16%' }} className="table-content"><span>{ e.locateName ? e.locateName : '-' }</span></div>
                                <div style={{ margin: '0 3vw', width: '2%' }} className="table-content"><span>{ e.amount }kg</span></div>
                                { now === 'accepted' && <div style={{ margin: '0 7vw' }} className="table-content"><span>{ setType(e.donateType) }</span></div> }
                                { now === 'declined' && <div style={{ margin: '0 8vw' }} className="table-content"><span>{ setReason(e.donateStatus) }</span></div> }
                                { now === 'pickup' && <div style={{ margin: '0 8vw' }} className="table-content"><span>{ time(e.time) }</span></div> }
                                { (now === 'delivery' || now === 'pickup') && <div style={{ margin: now === 'pickup' ? '0 0vw' : '0 10vw', padding: '6px 1vw' }}
                                    className="table-check-btn check-btn table-content"
                                    onClick={()=>setInfo(e)}
                                >CHECK</div> }
                                <hr style={{ border: '1px solid #443826', margin: '1% 0' }} />
                            </div>
                        )
                    }) :
                    <div>No Data Yet.</div>
                }
            </div>
            {
                isWaiting() &&
                <>
                    <div id="dialog-outside" style={{ display: mapVisible || declineVisible ? 'block' : 'none' }}></div>
                    <MapDialog
                        isVisible={mapVisible}
                        curInfo={curInfo}
                        putDonation={putDonation}
                        closeDialog={closeMapDialog}
                    />
                    <DeclineDialog
                        isVisible={declineVisible}
                        curInfo={curInfo}
                        putDonation={putDonation}
                        closeDialog={closeDeclineDialog}
                        onChange={onChange}
                        inputs={inputs}
                    />
                </>
            }
        </div>
    );
};

export default DonateWaitingList;