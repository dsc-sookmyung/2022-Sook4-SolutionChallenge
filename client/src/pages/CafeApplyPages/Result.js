import React from "react";
import dayjs from "dayjs";

const Result = ({ form, initPage }) => {
    const method = (now) => {
        if(now === 'DIRECT') return 'pick up';
        else return 'delivery';
    };

    return (
        <div className="cafe-apply">
            <div className="logo-title">
                <div>Thank you</div>
                <div>for your donation!</div>
            </div>
            <div className="form">
                <div
                    className="method-form-section"
                    style={{ borderTop: '2px solid #443826', borderBottom: '2px solid #443826' }}
                >
                    <div className="left-side">
                        <div className="left-side-name">{form.cafeName}</div>
                        <div className="left-side-time">{form.time ? dayjs(form.time).format('YYYY/M/D ddd h:mm A') : 'abc'}</div>
                        <div className="left-side-location">{form.locateName}</div>
                    </div>
                    <div className="right-side">
                        <div className="right-side-pickup">{method(form.donateType)}</div>
                        <div className="right-side-amount">{form.amount} g</div>
                    </div>
                    {/* <div>name: { form.cafeName }</div>
                    <div>location: { form.locateName }</div>
                    <div>time: { form.time }</div>
                    <div>coffeeSize: { form.amount }</div>
                    <div>how do you collect coffee grounds : { form.donateType }</div> */}
                </div>
                <button
                        className="submit-btn"
                        style={{ width: '90%', margin: '30px 5%' }}
                        onClick={initPage}
                >GO TO HOME</button>
                <div style={{ width: '90%', margin: '0 5%' }}>
                    <div>Please put the coffee grounds in a paper bag or plastic bag, and send it to us.</div>
                    <div>If you want to check the delivery address, Please refer to the footer at the bottom of the web service.</div>
                    <div>The delivery fee should be paid in advance.</div>
                </div>
            </div>
        </div>
    );
};

export default Result;