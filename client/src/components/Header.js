import React, { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as ProfileIcon } from '../assets/profileIcon.svg';
import '../styles/App.css';

const Header = () => {
    const authContext = useContext(AuthContext);

    return (
        <header className="App-header">
            <div className="header-links">
                {!authContext.state.token ? (
                    <>
                        <div className="App-header-section" style={{ textAlign: 'left' }}>
                            <Link to="/aboutus">ABOUT BEANYARD</Link>
                            <Link to="/ourteam">OUR TEAM</Link>
                            <Link to="/history">OUR HISTORY</Link>
                        </div>
                        <div className="App-header-section">
                            <Link to="/">
                                <Logo width={60} height={60} />
                            </Link>
                        </div>
                        <div className="App-header-section" style={{ textAlign: 'right' }}>
                            <Link to="/login" className="my-page-plain">
                                Login
                            </Link>
                            <Link to="/signup/cafe" className="my-page-full">
                                Join Us
                            </Link>
                        </div>
                    </>
                ) : (
                    authContext.state.userSeq === 3 ? (
                        <>
                            <div className="App-header-section" style={{ textAlign: 'left' }}>
                                <Link to="/aboutus">ABOUT BEANYARD</Link>
                                <Link to="/ourteam">OUR TEAM</Link>
                                <Link to="/history">OUR HISTORY</Link>
                            </div>
                            <div className="App-header-section">
                                <Link to="/">
                                    <Logo width={60} height={60} />
                                </Link>
                            </div>
                            <div className="App-header-section" style={{ textAlign: 'right' }}>
                                <Link to="/donations/waiting">DONATIONS</Link>
                                <Link to="/mypagecafe" className='my-page-plain'>
                                    <ProfileIcon width={20} height={20} />
                                </Link>
                                <Link to="/logout" className='my-page-plain'>Logout</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="App-header-section" style={{ textAlign: 'left' }}>
                                <Link to="/aboutus">ABOUT BEANYARD</Link>
                                <Link to="/ourteam">OUR TEAM</Link>
                                <Link to="/history">OUR HISTORY</Link>
                            </div>
                            <div className="App-header-section">
                                <Link to="/">
                                    <Logo width={60} height={60} />
                                </Link>
                            </div>
                            <div className="App-header-section" style={{ textAlign: 'right' }}>
                                <Link to="/maincafe">DONATE</Link>
                                <Link to="/mydonation">MY DONATIONS</Link>
                                <Link to="/mypagecafe" className='my-page-plain'>
                                    <ProfileIcon width={20} height={20} />
                                </Link>
                                <Link to="/logout" className='my-page-plain'>Logout</Link>
                            </div>
                        </>
                    )
                )}
            </div>
        </header>
    );
};

export default Header;