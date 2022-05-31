import React, { useEffect, useState } from "react";

const DonateMethod = ({ dMethod, setDonateMethodInformation }) => {
    const [donateMethod, setDonateMethod] = useState('');

    const setting = (next) =>{
        setDonateMethodInformation(donateMethod, next);
    };

    useEffect(() => {
        if(dMethod) setDonateMethod(dMethod);
    }, [dMethod]);
    

    return (
        <div className="cafe-apply">
            <div className="logo-title">
                I want to donate...
            </div>
            <div className="form">
                <div className="method-form-section">
                    <button
                        onClick={() => setDonateMethod('SHORT')}
                        style={{
                            backgroundColor: donateMethod === 'SHORT' ? '#443826' : 'transparent',
                            color: donateMethod === 'SHORT' ? '#F2F2F2' : '#443826',
                        }}
                    >FOR ONCE</button>
                    <button
                        onClick={() => setDonateMethod('DEFAULT')}
                        style={{
                            backgroundColor: donateMethod === 'DEFAULT' ? '#443826' : 'transparent',
                            color: donateMethod === 'DEFAULT' ? '#F2F2F2' : '#443826',
                        }}
                    >REGULARLY</button>
                </div>
                <button
                        className="submit-btn"
                        onClick={()=>setting('back')}
                >BACK</button>
                <button
                        className="submit-btn"
                        onClick={()=>setting('next')}
                >NEXT</button>
            </div>
        </div>
    );
};

export default DonateMethod;