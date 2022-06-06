import React, { useEffect, useState } from 'react';
import '../../styles/DonationEditDialog.css';
import DateTimePicker from 'react-datetime-picker';
import dayjs from 'dayjs';

const DonationEditDialog = ({ isVisible, closeDialog, curInfo, putDonation }) => {
    const [collectMethod, setCollectMethod] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        if(curInfo.donateType === 'POST' && curInfo.donateCycle === 'SHORT') {
            setCollectMethod('DELIVERY');
        } else if(curInfo.donateType === 'DIRECT' && curInfo.donateCycle === 'SHORT') {
            setCollectMethod('PICK UP');
        } else if(curInfo.donateCycle === 'LONG' || curInfo.donateCycle === 'DEFAULT') {
            setCollectMethod('REGULAR DONATION');
        }

        setQuantity(curInfo.amount);
    }, [curInfo]);

    return (
        <div id="dialog-inside" style={{ display: isVisible ? 'block' : 'none' }}>
            <div onClick={(e) => closeDialog(e, 'inside', 'anything')} className='close-btn'>X</div>
            <div style={{ margin: '10%' }}>
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
                    onClick={() => {
                        putDonation({
                            donateSeq: curInfo.donateSeq,
                            amount: quantity,
                            time: dayjs(value).format("YYYY-MM-DD HH:MM:ss"),
                        })
                    }}
                >SUBMIT</div>
            </div>
        </div>
    );
};

export default DonationEditDialog;