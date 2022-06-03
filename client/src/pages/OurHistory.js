import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as AboutBGGreen } from '../assets/images/about_bg_green.svg';
import { ReactComponent as AboutBGBlue } from '../assets/images/about_bg_blue.svg';
import { ReactComponent as AboutAsset1 } from '../assets/images/about_asset1.svg';
import { ReactComponent as AboutAsset11 } from "../assets/images/about_asset_earth.svg";
import { ReactComponent as AboutAsset2 } from '../assets/images/about_asset2.svg';

const OurHistory = () => {
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
            <div style={{backgroundColor: '#6F95F6', height: '10vh', marginTop: '-6%'}}></div>
        </div>
    );
};

export default OurHistory;