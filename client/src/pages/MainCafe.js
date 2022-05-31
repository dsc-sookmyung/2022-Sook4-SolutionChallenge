import React from "react";
import { Link } from "react-router-dom";
import '../styles/MainCafe.css';
import {ReactComponent as Boxthumb} from '../assets/donationbox_thumbnail.svg';
import {ReactComponent as Donatethumb} from '../assets/donation_thumbnail.svg';

const MainCafe = () => {

    return (
        <div className="main-cafe">
            <div className="donation-list">
                <div style={{ display: 'block', margin: '10% 0' }}>
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
            </div>
        </div>
    );
};

export default MainCafe;