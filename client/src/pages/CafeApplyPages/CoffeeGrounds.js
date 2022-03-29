import React, { useState, useEffect } from "react";

const CoffeeGrounds = ({ defaultCoffeeSize, setCoffeeSizeInformation }) => {
    const [coffeeSize, setCoffeeSize] = useState(0);

    const setting = (page) =>{
        setCoffeeSizeInformation(coffeeSize, page);
    };

    useEffect(() => {
        if(defaultCoffeeSize) setCoffeeSize(defaultCoffeeSize);
    }, [defaultCoffeeSize]);

    return (
        <div className="cafe-apply">
            <div className="logo-title" style={{ paddingTop: '5vh' }}>
                <div>How much coffee grounds</div>
                <div>will you donate?</div>
            </div>
            <div className="form">
                <div className="coffee-size-form-section">
                    <input
                        type="text"
                        value={coffeeSize}
                        onChange={(e) => setCoffeeSize(e.target.value)}
                        className="coffee-size-input"
                    />
                    <span className="coffee-size-input-unit">g</span>
                </div>
                <button
                        className="submit-btn"
                        onClick={()=>setting('back')}
                >BACK</button>
                <button
                        className="submit-btn"
                        onClick={()=>setting('next')}
                >SUBMIT</button>
            </div>
        </div>
    );
};

export default CoffeeGrounds;