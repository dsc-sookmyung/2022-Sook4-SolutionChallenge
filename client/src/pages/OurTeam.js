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


const OurTeam = () => {
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

export default OurTeam;