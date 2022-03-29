import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as AboutBGGreen } from '../assets/images/about_bg_green.svg';
import { ReactComponent as AboutBGBlue } from '../assets/images/about_bg_blue.svg';
import { ReactComponent as AboutBGYellow } from '../assets/images/about_bg_yellow.svg';
import { ReactComponent as AboutAsset1 } from '../assets/images/about_asset1.svg';
import { ReactComponent as AboutAsset11 } from "../assets/images/about_asset_earth.svg";
import { ReactComponent as AboutAsset2 } from '../assets/images/about_asset2.svg';
import { ReactComponent as AboutAsset31 } from '../assets/images/about_asset3_1.svg';
import { ReactComponent as AboutAsset32 } from '../assets/images/about_asset3_2.svg';
import { ReactComponent as AboutAsset33 } from '../assets/images/about_asset3_3.svg';
import kitImage from '../assets/images/kitimage.png';
import aboutAsset44 from '../assets/images/about-asset44.png';
import aboutAsset41 from '../assets/images/about_asset_41.png';
import { ReactComponent as GDSCLogo } from '../assets/images/gdsc_logo.svg';
import imgJihye from '../assets/images/jihye.png';
import imgMinsun from '../assets/images/minsun.png';
import imgWoojung from '../assets/images/woojung.png';
import imgJaein from '../assets/images/jaein.png';

import '../styles/Aboutus.css';
import ReactPlayer from "react-player";


const Aboutus = () => {
    const [info, setInfo] = useState({
        coffee: 0,
        people: 0,
    });
    let kit = 10;

    const calcTotalCoffee = (coffee) => {
        return (coffee/1000).toFixed(1);
    };

    useEffect(() => {
        const getPeople = async () => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            };
            await axios.get(`https://beanyard.app:8080/api/user/count`, config)
                .then(({ status, data }) => {
                    setInfo({ ...info, people: data });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getPeople();
    }, [info.people, info]);

    useEffect(() => {
        const getCoffee = async () => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            };
            await axios.get('https://beanyard.app:8080/api/donate/all', config)
                .then(({ status, data }) => {
                    setInfo({ ...info, coffee: data });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        getCoffee();
    }, [info.coffee, info]);

    return (
        <div className="about">
            <div className="about-part1">
                <AboutBGGreen className="about-bg-green" />
                <div className="about-people">
                    <p className="about-people-count">{info.people}</p>
                    <p className="about-people-ment">people are with us</p>
                </div>
                <AboutAsset11 className="about-people-img"/>
            </div>

            <div className="about-coffee">
                <AboutAsset1 className="about-coffee-asset" />
                <div className="about-coffee-right">
                    <p className="about-coffee-ment">
                        The amount of coffee<br />we collected
                    </p>
                    <div className="about-coffee-count-kg">
                        <p className="about-coffee-count">{calcTotalCoffee(info.coffee)}</p>
                        <p className="about-coffee-kg">kg</p>
                    </div>
                </div>
            </div>

            <div className="about-kit">
                <AboutBGBlue className="about-bg-blue" />
                <p className="about-kit-ment">The number of kits we made</p>
                <p className="about-kit-count">{kit}</p>
                <AboutAsset2 className="about-kit-asset" />
            </div>

            <div className="about-process">
                <p className="about-pc-title">
                    The process of making coffee fertilizer kits
                </p>
                <AboutAsset31 className="about-pc-asset1" />
                <AboutAsset32 className="about-pc-asset2" />
                <AboutAsset33 className="about-pc-asset3" />
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

            <div className="about-we">
                <AboutBGYellow className="about-bg-yellow" />
                <p className="about-we-title">
                    The people who made the BEANYARD
                </p>
                <div className="about-we-content" id="about-we-jh">
                    <img className="about-we-photo" src={imgJihye} alt="" />
                    <p className="about-we-name">Jihye Kim</p>
                    <p className="about-we-job">Leader <br />BackEnd &amp; Server Developer </p>
                </div>
                <div className="about-we-content" id="about-we-ms">
                    <img className="about-we-photo" src={imgMinsun} alt="" />
                    <p className="about-we-name">Minsun Kim</p>
                    <p className="about-we-job">Frontend Developer </p>
                </div>
                <div className="about-we-content" id="about-we-ji">
                    <img className="about-we-photo" src={imgJaein} alt="" />
                    <p className="about-we-name">Jaein Lee</p>
                    <p className="about-we-job">Designer</p>
                </div>
                <div className="about-we-content" id="about-we-wj">
                    <img className="about-we-photo" src={imgWoojung} alt="" />
                    <p className="about-we-name">Woojung Jeon</p>
                    <p className="about-we-job">Frontend Developer </p>
                </div>
            </div>

            <div>
                <p className="about-gdsc-with">with</p>
                <GDSCLogo className="about-gdsc-logo" />
            </div>
        </div>
    );
};

export default Aboutus;