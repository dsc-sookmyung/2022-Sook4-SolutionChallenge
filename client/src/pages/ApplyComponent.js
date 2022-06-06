import React, { useContext, useState, useEffect } from "react";
import { 
    CafeApply,
    CollectMethod,
    DonateMethod,
    Result,
  } from "./CafeApplyPages";
import { Routes, Route } from "react-router-dom";
import '../styles/ApplyComponent.css';
import { getApi, postApi } from "../api";
import dayjs from "dayjs";
import { AuthContext } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import {ReactComponent as DonateBack3} from '../assets/donateBackgrounds/DonateBack3.svg';
import {ReactComponent as DonateBack4} from '../assets/donateBackgrounds/DonateBack4.svg';

const ApplyComponent = () => {
    const authContext = useContext(AuthContext);
    let init = {
        cafeName: '',
        locateName: '',
        lon: null,
        lat: null,
        time: '',
        amount: null,
        userSeq: authContext.state.userSeq,
        donateType: '',
        donateCycle: '',
        message: '',
        donateStatus: 'WAIT',
        createdAt: '',
        weekTypes: [],
    };

    const [donateForm, setDonateForm] = useState(init);
    const navigate = useNavigate();
    const currentPath = useLocation().pathname.split('/')[3];

    useEffect(() => {
        const getCafeProfile = async () => {
            await getApi(
                { userName: authContext.state.email },
                '/api/user',
                authContext.state.token
            )
            .then(({ status, data }) => {
                if (status === 200) {
                    let tmp = donateForm;
                    tmp.cafeName = data.cafeName;
                    tmp.locateName = data.locateName;
                    tmp.lon = data.lon;
                    tmp.lat = data.lat;
                    tmp.time = data.time;
                    setDonateForm(tmp);
                };
            })
            .catch((e) => {
                console.log(e);
            });
        };

        getCafeProfile();
    }, [authContext, donateForm]);

    const postCafeApply = async () => {
        let tmp = donateForm;
        tmp.createdAt = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        setDonateForm(tmp);
        console.log(donateForm)

        await postApi(
            donateForm,
            "/api/donate",
            authContext.state.token
        )
        .then(({ status }) => {
            if(status === 200 || status === 201 || status === 204) {
                navigate('result');
            }
        })
        .catch((e) => {
            alert('An unknown error occurred. Please try again.');
            navigate('/maincafe');
            console.log(e);
        });
    };

    const setMapInfo = (df, mk, cs, days, page) => {
        const cafeName = df.cafeName.value;
        const locationName = df.locationName.value;
        const time = dayjs(df.dateTime.value).format('YYYY-MM-DD HH:MM:ss');

        let tmp = donateForm;
        tmp.cafeName = cafeName;
        tmp.locateName = locationName;
        if(mk.length) {
            tmp.lon = mk[0].loc.lat();
            tmp.lat = mk[0].loc.lng();
        }
        tmp.time = time;
        tmp.weekTypes = days;

        if(page === 'next') {
            if(!mk.length && !donateForm.lon && !donateForm.lat) {
                alert('Input the correct information.');
                return;
            };
    
            if(!donateForm.cafeName || !donateForm.locateName || !donateForm.time) {
                alert('Input the correct information.');
                return;
            }
            setDonateForm(tmp);
            setCoffeeSizeInfo(cs, page);
        } else {
            navigate('method');
        }
    };

    const setCoffeeSizeInfo = (cs, page) => {
        let coffeeSize = parseInt(cs);
        let tmp = donateForm;
        tmp.amount = coffeeSize;
        setDonateForm(tmp);

        if(page === 'next') {
            if(isNaN(donateForm.amount)) {
                alert('Input the correct size.');
                return;
            }
            postCafeApply();
        }
        else navigate('method')
    };

    const setDonateMethodInfo = (method, page) => {
        if(page === 'next') {
            if(method === '') {
                alert('Choose your donate cycle.');
                return;
            }
    
            let tmp = donateForm;
            tmp.donateCycle = method;
            setDonateForm(tmp);
            console.log(donateForm)
            navigate('method');
        } else navigate('/maincafe');
    };

    const setMethodInfo = (method, page) => {
        if(page === 'next') {
            if(method === '') {
                alert('Choose your collecting method.');
                return;
            }
    
            let tmp = donateForm;
            tmp.donateType = method;
            setDonateForm(tmp);
            navigate('info');
        } else navigate('/maincafe/apply');
    };

    const initPage = () => {
        setDonateForm(init);
        navigate('/maincafe');
    };

    return (
        <div>
            {
                currentPath === 'result' &&
                <>
                    <DonateBack3 className="donate-back3" />
                    <DonateBack4 className="donate-back4" />
                </>
            }
            <Routes>
                <Route path='/' exact={true} element={<DonateMethod dMethod={donateForm.donateCycle} setDonateMethodInformation={setDonateMethodInfo} />} />
                <Route path='/method' exact={true} element={<CollectMethod method={donateForm.donateType} setMethodInformation={setMethodInfo} />} />
                <Route path="/info" element={<CafeApply mapIf={donateForm} setMapInformation={setMapInfo} defaultCoffeeSize={donateForm.amount} />} />
                <Route path='/result' element={<Result form={donateForm} initPage={initPage} />} />
            </Routes>
        </div>
    );
};

export default ApplyComponent;