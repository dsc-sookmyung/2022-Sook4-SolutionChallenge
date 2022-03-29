import React from 'react';

const DeclineDialog = ({ isVisible, closeDialog, onChange, inputs, putDonation, curInfo }) => {
    const { distance, times, amount } = inputs;
    const sendCancelReason = () => {
        if(!distance && !times && !amount) {
            alert('Select decline reason.');
            return;
        } else if(distance) {
            putDonation(curInfo, 'REJ_DISTANCE');
        } else if(times) {
            putDonation(curInfo, 'REJ_TIME');
        } else if(amount) {
            putDonation(curInfo, 'REJ_AMOUNT');
        }
    };
    
    return (
        <div id="dialog-inside" style={{ display: isVisible ? 'block' : 'none' }}>
            <div onClick={(e) => closeDialog(e, 'inside')} className='close-btn'>X</div>
            <div className="page-title" style={{ color: 'white', textAlign: 'center', marginBottom: '10vh' }}>Reason for refusal</div>
            <div className='dialog-input-section'>
                <div className='cancel-input'>
                    <label><input
                        name="distance"
                        type="checkbox"
                        onChange={onChange}
                        checked={distance}
                    />
                        <div>Impossible distance</div>
                    </label>
                </div>
                <div className='cancel-input'>
                    <label><input
                        name="times"
                        type="checkbox"
                        onChange={onChange}
                        checked={times}
                    />
                        <div>Impossible time</div>
                    </label>
                </div>
                <div className='cancel-input'>
                    <label><input
                        name="amount"
                        type="checkbox"
                        onChange={onChange}
                        checked={amount}
                    />
                        <div>Too small amount</div>
                    </label>
                </div>
            </div>
            <div className='dialog-btn-section'>
                <div
                    className='table-check-btn dialog-btn'
                    style={{ color: '#443826', backgroundColor: '#F2F2F2', margin: '0 38px' }}
                    onClick={()=>sendCancelReason()}
                >OK</div>
                <div
                    className='table-check-btn dialog-btn check-btn'
                    style={{ border: '2px solid #F2F2F2', margin: '0 38px' }}
                    onClick={(e)=>closeDialog(e, 'inside')}
                >CANCEL</div>
            </div>
        </div>
    );
};

export default DeclineDialog;