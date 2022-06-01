import React from "react";
import {ReactComponent as BGGreen} from '../assets/images/landing_background_g.svg';
import {ReactComponent as Part11} from '../assets/images/part1_1.svg';
import {ReactComponent as Part12} from '../assets/images/part1_2.svg';
import {ReactComponent as Part13} from '../assets/images/part1_3.svg';
import {ReactComponent as Part14} from '../assets/images/part1_4.svg';
import {ReactComponent as Part21} from '../assets/images/part2_1.svg';
import {ReactComponent as Part22} from '../assets/images/part2_2.svg';
import {ReactComponent as Part23} from '../assets/images/part2_3.svg';
import {ReactComponent as Part24} from '../assets/images/part2_4.svg';
import kitImage from '../assets/images/kitimage.png';
import aboutAsset44 from '../assets/images/about-asset44.png';
import aboutAsset41 from '../assets/images/about_asset_41.png';

import '../styles/Aboutus.css';
import ReactPlayer from "react-player";

const Aboutus = () => {

    return (
        <div className="about">
            <div className="landing-part1">
                <div style={{ height: '35vh', margin: '20vh 0 15vh' }}>
                    <h2 className="landing-part1-title">
                        We make a better Earth by making <br />
                        discarded coffee grounds with<br />
                        eco-friendly fertilizers.
                    </h2>
                </div>
                <BGGreen className="landing-bg-green" />
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

            <div className="about-process">
                <p className="about-pc-title">
                    The process of making coffee fertilizer kits
                </p>
            </div>
            <div className="about-pc-contents">
                <div className="about-pc-row">
                    <img className="about-pc-asset44" src={aboutAsset41} alt="" />
                    <p className="about-pc-ment">
                        1. Collect coffee balls directly from the cafe. If you <br />
                        want, you can also receive collection by courier.
                    </p>
                </div>
                <div className="about-pc-row">
                    <ReactPlayer
                        className="about-pc-asset4"
                        url={process.env.PUBLIC_URL + '/videos/about-video1.mp4'}
                        width='400px'
                        height='300px'
                        playing={true}
                        muted={true}
                        controls={true}
                        loop={true}
                        />
                    <p className="about-pc-ment">
                        2. After drying the coffee residue, mix the EM solution <br />
                        and the composting microorganism in an appropriate <br />
                        ratio.
                    </p>
                </div>
                <div className="about-pc-row">
                    <ReactPlayer
                        className="about-pc-asset4"
                        url={process.env.PUBLIC_URL + '/videos/about-video2.mp4'}
                        width='400px'
                        height='300px'
                        playing={true}
                        muted={true}
                        controls={true}
                        loop={true}
                        />

                    <p className="about-pc-ment">
                        3. Remove the gas every 3-4 days for 1 month and <br />ferment it.
                    </p>
                </div>
                <div className="about-pc-row">
                    <img className="about-pc-asset44" src={aboutAsset44} alt="" />
                    <p className="about-pc-ment">
                        4. If it smells like soil and white mold blooms, it's <br />fermented well!
                    </p>
                </div>
                <div className="about-pc-row">
                    <img className="about-pc-asset44" src={kitImage} alt="" />
                    <p className="about-pc-ment">
                        5. This well-made fertilizer is made into a kit with soil, pots and seeds. And then provided to you through funding.
                        <a href={"https://www.ycrowdy.com/r/gdscbeanyard"} target="_blank" rel="noopener noreferrer">
                            <p>Go to funding page and get BeanYard Kit!</p>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;