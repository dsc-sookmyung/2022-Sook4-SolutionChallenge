import React, { useEffect, useState } from 'react';
import '../../styles/DonationEditDialog.css';
import DateTimePicker from 'react-datetime-picker';
import dayjs from 'dayjs';

const DonationEditDialog = ({ isVisible, closeDialog, curInfo, putDonation }) => {
    const [collectMethod, setCollectMethod] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [week, setWeek] = useState([false, false, false, false, false, false, false]);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        if(curInfo.donateType === 'POST' && curInfo.donateCycle === 'SHORT') {
            setCollectMethod('DELIVERY');
        } else if(curInfo.donateType === 'DIRECT' && curInfo.donateCycle === 'SHORT') {
            setCollectMethod('PICK UP');
        } else if(curInfo.donateCycle === 'LONG' || curInfo.donateCycle === 'DEFAULT') {
            setCollectMethod('REGULAR DONATION');
        }

        if(curInfo.weeks) {
            for(let i=0;i<curInfo.weeks.length;i++) {
                let day = curInfo.weeks[i];
                if(day === 'MONDAY') week[0] = true;
                else if(day === 'TUESDAY') week[1] = true;
                else if(day === 'WEDNESDAY') week[2] = true;
                else if(day === 'THURSDAY') week[3] = true;
                else if(day === 'FRIDAY') week[4] = true;
                else if(day === 'SATURDAY') week[5] = true;
                else if(day === 'SUNDAY') week[6] = true;
            }
        }

        setQuantity(curInfo.amount);
    }, [curInfo]);

    const setWeeks = (idx) => {
        let tmp = [...week];
        if(tmp[idx]) tmp[idx] = false;
        else tmp[idx] = true;
        setWeek(tmp);
    }

    return (
        <div id="dialog-inside" style={{ display: isVisible ? 'block' : 'none' }}>
            <div onClick={(e) => closeDialog(e, 'inside', 'anything')} className='close-btn'>X</div>
            <div style={{ margin: '4% 10%' }}>
                <div className="edit-form-section">
                    <div className="edit-input" style={{ width: '60%' }}>COLLECT METHOD</div>
                    <input
                        name="collectmethod"
                        defaultValue={collectMethod}
                        className="edit-input"
                        style={{ textAlign: 'right', width: '40%' }}
                        readOnly
                    />
                </div>

                <div className="edit-form-section">
                    <div className="edit-input" style={{ width: '60%' }}>QUANTITY</div>
                    <input
                        type="text"
                        value={quantity}
                        onChange={(e) =>setQuantity(e.target.value)}
                        className="edit-input"
                        style={{ textAlign: 'right', width: '35%' }}
                    />
                    <span className="edit-input-unit">G</span>
                </div>

                <div className="edit-form-section" style={{ display: collectMethod === 'DELIVERY' ? 'none' : 'block', padding: '4vh 3vw' }}>
                    <div className="edit-input" style={{ width: '47%' }}>WHEN</div>
                    <DateTimePicker
                        onChange={onChange}
                        value={value}
                        calendarIcon={null}
                        clearIcon={null}
                        name="dateTime"
                    />
                </div>

                <div style={{ display: (curInfo.donateCycle === 'LONG' || curInfo.donateCycle === 'DEFAULT') ? 'block' : 'none' }}>
                    <div
                        className="cafe-apply-weeks"
                        onClick={() => setWeeks(0)}
                        style={{
                            color: week[0] ? '#F2F2F2' : '#443826',
                            backgroundColor: week[0] ? '#443826' : '#F2F2F2',
                        }}
                    ><div>MON</div></div>
                    
                    <div
                        className="cafe-apply-weeks"
                        onClick={() => setWeeks(1)}
                        style={{
                            color: week[1] ? '#F2F2F2' : '#443826',
                            backgroundColor: week[1] ? '#443826' : '#F2F2F2',
                        }}
                    ><div>TUE</div></div>
                    
                    <div
                        className="cafe-apply-weeks"
                        onClick={() => setWeeks(2)}
                        style={{
                            color: week[2] ? '#F2F2F2' : '#443826',
                            backgroundColor: week[2] ? '#443826' : '#F2F2F2',
                        }}
                    ><div>WED</div></div>

                    <div
                        className="cafe-apply-weeks"
                        onClick={() => setWeeks(3)}
                        style={{
                            color: week[3] ? '#F2F2F2' : '#443826',
                            backgroundColor: week[3] ? '#443826' : '#F2F2F2',
                        }}
                    ><div>THU</div></div>
                    
                    <div
                        className="cafe-apply-weeks"
                        onClick={() => setWeeks(4)}
                        style={{
                            color: week[4] ? '#F2F2F2' : '#443826',
                            backgroundColor: week[4] ? '#443826' : '#F2F2F2',
                        }}
                    ><div>FRI</div></div>
                    
                    <div
                        className="cafe-apply-weeks"
                        onClick={() => setWeeks(5)}
                        style={{
                            color: week[5] ? '#F2F2F2' : '#443826',
                            backgroundColor: week[5] ? '#443826' : '#F2F2F2',
                        }}
                    ><div>SAT {week[5]}</div></div>
                    
                    <div
                        className="cafe-apply-weeks"
                        onClick={() => setWeeks(6)}
                        style={{
                            color: week[6] ? '#F2F2F2' : '#443826',
                            backgroundColor: week[6] ? '#443826' : '#F2F2F2',
                        }}
                    ><div>SUN</div></div>
                </div>
            </div>
            <div className='dialog-btn-section'>
                <div
                    className='table-check-btn dialog-btn check-btn map-dialog'
                    style={{ border: '1px solid #F2F2F2' }}
                    onClick={(e)=> closeDialog(e, 'inside', 'decline')}
                >CANCEL</div>
                <div
                    className='table-check-btn dialog-btn map-dialog'
                    style={{ color: '#443826', backgroundColor: '#F2F2F2' }}
                    onClick={() => 
                        putDonation({
                            donateSeq: curInfo.donateSeq,
                            amount: quantity,
                            time: dayjs(value).format("YYYY-MM-DD HH:MM:ss"),
                            weeks: week,
                        })
                    }
                >SUBMIT</div>
            </div>
        </div>
    );
};

export default DonationEditDialog;