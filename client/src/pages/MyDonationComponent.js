import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { Donations, RegularDonations } from './MyDonationPages';

import '../styles/MyDonationComponent.css';

const MyDonation = () => {
    const currentPath = useLocation().pathname.split('/')[2];

    const Header = () => {
        return (
            <div className='manage-header'>
                <Link to="short" style={{ borderBottom: currentPath === 'short' ? '2px solid #483826' : 'none' }}>
                    DONATIONS
                </Link>
                <Link to="long" style={{ borderBottom: currentPath === 'long' ? '2px solid #483826' : 'none' }}>
                    REGULAR DONATION
                </Link>
            </div>
        );
    };

    return (
        <>
            <div className="page-title" style={{ marginBottom: '7.5vh' }}>My Donations</div>
            <Header />
            <div className='component-section'>
                <Routes>
                    <Route path="" element={<Navigate to='short'/>} />
                    <Route path="short" element={<Donations />} />
                    <Route path="long" element={<RegularDonations />} />
                </Routes>
            </div>
        </>
    ); 
};

export default MyDonation;