import React from "react";
import { Link } from 'react-router-dom';
import {ReactComponent as Apple} from '../assets/images/apple.svg';
import {ReactComponent as Radish} from '../assets/images/radish.svg';
import {ReactComponent as Tomato} from '../assets/images/tomato.svg';
import {ReactComponent as Pepper} from '../assets/images/pepper.svg';
import {ReactComponent as Watermelon} from '../assets/images/watermelon.svg';
import {ReactComponent as Paprika} from '../assets/images/paprika.svg';
import {ReactComponent as BGBlue} from '../assets/images/landing_background_b.svg';
import {ReactComponent as BGGreen} from '../assets/images/landing_background_g.svg';
import {ReactComponent as Part11} from '../assets/images/part1_1.svg';
import {ReactComponent as Part12} from '../assets/images/part1_2.svg';
import {ReactComponent as Part13} from '../assets/images/part1_3.svg';
import {ReactComponent as Part14} from '../assets/images/part1_4.svg';
import {ReactComponent as Part21} from '../assets/images/part2_1.svg';
import {ReactComponent as Part22} from '../assets/images/part2_2.svg';
import {ReactComponent as Part23} from '../assets/images/part2_3.svg';
import {ReactComponent as Part24} from '../assets/images/part2_4.svg';
import {ReactComponent as Part31} from '../assets/images/part3_1.svg';
import {ReactComponent as Part32} from '../assets/images/part3_2.svg';
import {ReactComponent as Part33} from '../assets/images/part3_3.svg';
import {ReactComponent as Part34} from '../assets/images/part3_4.svg';
import {ReactComponent as Part35} from '../assets/images/part3_5.svg';
import {ReactComponent as Part41} from '../assets/images/part4_1.svg';
import {ReactComponent as Part42} from '../assets/images/part4_2.svg';

import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="landing-banner">
                <h1 className="landing-title">
                    MAKE YOUR BEANYARD!
                </h1>
                <Apple className="landing-apple" />
                {/* <Corn className="landing-corn" /> */}
                <Tomato className="landing-tomato" />
                <Radish className="landing-radish" />
                <Pepper className="landing-pepper" />
                <Watermelon className="landing-watermelon" />
                <Paprika className="landing-paprika" />
            </div>

            <div className="landing-part1">
                <BGGreen className="landing-bg-green" />
                <h3 className="landing-part1-title">
                    We make a better Earth by making<br />
                    discarded coffee grounds with<br />
                    eco-friendly fertilizers.
                </h3>
                <div className="landing-part11">
                    <Part11 className="landing-part1-img"/>
                    <p className="landing-part1-ment">
                        150,000t amount of coffee grounds<br />
                        thrown away per day.
                    </p>
                </div>
                <div className="landing-part12">
                    <Part12 className="landing-part1-img" />
                    <p className="landing-part1-ment">
                        In a cup of coffee,<br />
                        only 0.2% coffee beans is used,<br />
                        the remaining 99.8% is discarded.
                    </p>
                </div>
                <div className="landing-part13">
                    <Part13 className="landing-part1-img" />
                    <p className="landing-part1-ment">
                        Average of Korean's<br />
                        annual coffee consumption<br />
                        is 328 cups.
                    </p>
                </div>
                <div className="landing-part14">
                    <Part14 className="landing-part1-img" />
                    <p className="landing-part1-ment">
                        Most of discarded coffee grounds<br />
                        are landfilled or incinerated
                    </p>
                </div>
            </div>

            <div className="landing-part2">
                <h2 className="landing-part2-title">
                    Why should we use<br />
                    coffee fertilizer?
                </h2>
                <div className="landing-part21">
                    <Part21 className="landing-part2-img" />
                    <p className="landing-part2-ment">
                    <p className="landing-part2-ment-title">1. Economic Value</p><br/>
                    Do you know that it costs about
                    12.8 billion won to dispose of
                    coffee beans per year?
                    Recycling coffee beans as 
                    fertilizer can reduce processing
                    costs.
                    </p>
                </div>
                <div className="landing-part22">
                    <Part22 className="landing-part2-img" />
                    <p className="landing-part2-ment">
                        <p className="landing-part2-ment-title">2. Environmental Value</p><br/>
                        Not only can it reduce the cost of disposing of coffee beans,
                        but it can also reduce the amount of CO2 generated from landfilling and incineration.
                    </p>
                </div>
                <div className="landing-part23">
                    <Part23 className="landing-part2-img" />
                    <p className="landing-part2-ment">
                        <p className="landing-part2-ment-title">3. Future Value</p><br/>
                        By recycling coffee beans, we create new uses of
                        coffee beans, and inform the world of the 
                        importance of the environment and the value of a virtuous cycle.
                    </p>
                </div>
                <div className="landing-part24">
                    <Part24 className="landing-part2-img" />
                    <p className="landing-part2-ment">
                    <p className="landing-part2-ment-title">4. Value as Fertilizer</p><br/>
                        Since it is an eco-friendly fertilizer not a chemical fertilizer,
                        we can use it with confidence.
                        It is rich in nutrients, so crops grow well.
                    </p>
                </div>
            </div>

            <div className="landing-part3">
                <h2 className="landing-part3-title">
                    Process
                </h2>
                <div className="landing-part3-flex">
                    <div className="landing-part31">
                        <Part31 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            1. Get coffee grounds <br />from the cafe.
                        </p>
                    </div>
                    <div className="landing-part32">
                        <Part32 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            2. Post a donation <br />on the website.
                        </p>
                    </div>
                    <div className="landing-part33">
                        <Part33 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            3. Beanyard will collect <br />them.
                        </p>
                    </div>
                    <div className="landing-part34">
                        <Part34 className="landing-part3-img"/>
                        <p className="landing-part3-ment">
                            4. Make the collected <br />coffee grounds <br />with fertilizer 
                            and <br />recreate them with a kit.
                        </p>
                    </div>
                    <div className="landing-part35">
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
