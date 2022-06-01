import React from "react";
import { Link } from 'react-router-dom';
import {ReactComponent as BGBlue} from '../assets/images/landing_background_b.svg';
import {ReactComponent as Part31} from '../assets/images/part3_1.svg';
import {ReactComponent as Part32} from '../assets/images/part3_2.svg';
import {ReactComponent as Part33} from '../assets/images/part3_3.svg';
import {ReactComponent as Part34} from '../assets/images/part3_4.svg';
import {ReactComponent as Part35} from '../assets/images/part3_5.svg';
import {ReactComponent as Part41} from '../assets/images/part4_1.svg';
import {ReactComponent as Part42} from '../assets/images/part4_2.svg';
import {ReactComponent as ProcessTitle} from '../assets/images/process_title.svg';
import {ReactComponent as BeanLeft} from '../assets/images/bean_left.svg';
import {ReactComponent as BeanRight} from '../assets/images/bean_right.svg';

import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="landing-banner">
                <h1 className="landing-title">
                    MAKE YOUR BEANYARD!
                </h1>
                <h4 className="landing-part1-home-title">
                    We make a better Earth<br />
                    by making discarded coffee grounds with<br />
                    eco-friendly fertilizers.
                    <br></br><br />
                    How does it work?
                    <br></br>
                    <br></br>
                    <div style={{ lineHeight: '50%', fontSize: 'x-large' }}>
                        <div>∨</div>
                        <div>∨</div>
                    </div>
                </h4>
                <BeanLeft className="landing-left" />
                <BeanRight className="landing-right" />
            </div>

            <div className="landing-part3">
                <ProcessTitle width={"45vw"} />
                <div>
                    <div className="landing-part3-section">
                        <Part31 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            1. Get coffee grounds <br />from the cafe.
                        </p>
                    </div>
                    <div className="landing-part3-section">
                        <Part32 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            2. Post a donation <br />on the website.
                        </p>
                    </div>
                    <div className="landing-part3-section">
                        <Part33 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            3. Beanyard will collect <br />them.
                        </p>
                    </div>
                    <div className="landing-part3-section">
                        <Part34 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            4. Make the collected <br />coffee grounds <br />with fertilizer 
                            and <br />recreate them with a kit.
                        </p>
                    </div>
                    <div className="landing-part3-section">
                        <Part35 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            5. Spread the coffee<br />fertilizer that you<br />received onto the plants!
                        </p>
                    </div>
                </div>
            </div>

            <div className="landing-part41">
                <BGBlue className="landing-part41-bg-blue"/>
                <div className="landing-part41-contents">
                    <Part41 className="landing-part41-img"/>
                    <div className="landing-part41-subcontents">
                        <h2 className="landing-part41-title">
                            Participate in coffee grounds collection
                        </h2>
                        <Link to="/signup/cafe">
                        <button className="landing-part41-button">
                            JOIN BEANYARD
                        </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="landing-part42">
                <div className="landing-part42-contents">
                    <div className="landing-part42-subcontents">
                        <h2 className="landing-part42-title">
                            Grow your own garden <br />
                            with natural fertilizer made from coffee!                    
                        </h2>
                        <a href={"https://www.ycrowdy.com/r/gdscbeanyard"} target="_blank" rel="noopener noreferrer">
                        <button className="landing-part42-button">
                            GO TO FUNDING
                        </button>
                        </a>
                    </div>
                    <Part42 className="landing-part42-img"/>
                </div>
            </div>
            
            
        </div>
    );
};

export default Home;
