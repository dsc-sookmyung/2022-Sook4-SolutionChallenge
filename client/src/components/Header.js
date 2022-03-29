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
                        <div className="App-header-Login">
                            <Link to="/aboutus">ABOUT US</Link>
                        </div>
                        <Link to="/">
                            <Logo width={60} height={60} />
                        </Link>
                        <div>
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
                            <div className="App-header-Login">
                                <Link to="/aboutus">ABOUT US</Link>
                                <Link to="/donations/waiting">DONATIONS</Link>
                            </div>
                            <Link to="/">
                                <Logo width={60} height={60} />
                            </Link>
                            <div className="App-header-right">
                                <Link to="/mypagecafe" className='my-page-plain'>
                                    <ProfileIcon width={20} height={20} />
                                </Link>
                                <Link to="/logout" className='my-page-plain'>Logout</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="App-header-Login">
                                <Link to="/aboutus">ABOUT US</Link>
                                <Link to="/maincafe">MY DONATIONS</Link>
                            </div>
                            <Link to="/">
                                <Logo width={60} height={60} />
                            </Link>
                            <div className="App-header-right">
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