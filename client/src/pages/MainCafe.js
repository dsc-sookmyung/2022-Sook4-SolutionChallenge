import React from "react";
import { Link } from "react-router-dom";
import '../styles/MainCafe.css';
import {ReactComponent as Boxthumb} from '../assets/donationbox_thumbnail.svg';
import {ReactComponent as Donatethumb} from '../assets/donation_thumbnail.svg';

const MainCafe = () => {

    return (
        <div className="main-cafe">
            <div className="donation-list">
                <div style={{ display: 'flex', margin: '8% 0', justifyContent: 'space-evenly' }}>
                    <div className="donate-title-section">
                        <Link to={`/donationbox`}>
                            <div className="donation-title">
                                <div>FIND</div>
                                <div>DONATION BOX</div>
                            </div>
                            <div className="logo-img">
                                <Boxthumb />
                            </div>
                        </Link>
                    </div>

                    <div className="donate-title-section">
                        <Link to={`apply`}>
                            <div className="donation-title">
                                <div>GO TO</div>
                                <div>DONATIONS</div>
                            </div>
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