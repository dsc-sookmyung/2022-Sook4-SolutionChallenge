import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { Completed, Waiting } from './ManagePages';
import '../styles/ManageComponent.css';

const Manage = () => {
    const currentPath = useLocation().pathname.split('/')[2];

    const Header = () => {
        return (
            <div className='manage-header'>
                <Link to="waiting" style={{ borderBottom: currentPath === 'waiting' ? '2px solid #483826' : 'none' }}>
                    WAITING LIST
                </Link>
                <Link to="completed" style={{ borderBottom: currentPath === 'completed' ? '2px solid #483826' : 'none' }}>
                    COMPLETED LIST
                </Link>
            </div>
        );
    };

    return (
        <>
            <div className="page-title" style={{ marginBottom: '7.5vh' }}>Donations</div>
            <Header />
            <div className='component-section'>
                <Routes>
                    <Route path="" element={<Navigate to='waiting'/>} />
                    <Route path="waiting" element={<Waiting />} />
                    <Route path="completed" element={<Completed />} />
                </Routes>
            </div>
        </>
    );
};

export default Manage;