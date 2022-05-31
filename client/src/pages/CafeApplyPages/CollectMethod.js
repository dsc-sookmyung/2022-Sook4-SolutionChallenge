import React, { useEffect, useState } from "react";

const CollectMethod = ({ method, setMethodInformation }) => {
    const [pickupMethod, setPickupMethod] = useState('');

    const setting = (next) =>{
        setMethodInformation(pickupMethod, next);
    };

    useEffect(() => {
        if(method) setPickupMethod(method);
    }, [method]);
    

    return (
        <div className="cafe-apply">
            <div className="logo-title">
                I'll donate my coffee grounds by...
            </div>
            <div className="form">
                <div className="method-form-section">
                    <button
                        onClick={() => setPickupMethod('POST')}
                        style={{
                            backgroundColor: pickupMethod === 'POST' ? '#443826' : 'transparent',
                            color: pickupMethod === 'POST' ? '#F2F2F2' : '#443826',
                        }}
                    >DELIVERY</button>
                    <button
                        onClick={() => setPickupMethod('DIRECT')}
                        style={{
                            backgroundColor: pickupMethod === 'DIRECT' ? '#443826' : 'transparent',
                            color: pickupMethod === 'DIRECT' ? '#F2F2F2' : '#443826',
                        }}
                    >PICK UP</button>
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

export default CollectMethod;