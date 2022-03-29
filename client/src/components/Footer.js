import React from "react";
import { Link } from "react-router-dom";
// import { ReactComponent as LogoFooter } from '../assets/logo-footer.svg';
import '../styles/App.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-contents">
                <div className="footer-left">
                    <div className="footer-logo">
                        <img 
                            src={process.env.PUBLIC_URL+'/BeanYard_Logo2.png'} 
                            width={'50px'} height={'40px'}
                            alt=""
                        ></img>
                        {/* <LogoFooter width={'40px'} height={'40px'} /> */}
                        <p>BeanYard</p>
                    </div>
                    <p className="footer-left-ment">
                        BeanYard makes a better Earth<br />
                        by making discarded coffee grounds <br />
                        with eco-friendly fertilizers.
                    </p>
                    <p>
                        gdsc.beanyard@gmail.com
                    </p>
                    <p>
                        100, Cheongpa-ro 47-gil, Yongsan-gu, Seoul, Republic of Korea 
                    </p>
                </div>

                <div className="footer-right-group">
                    {/* <div className="footer-right">
                            <p className="footer-right-title">BeanYard</p>
                            <p>Suggest/Inquire</p>
                        </div> */}

                    <div className="footer-right">
                        <p className="footer-right-title">Community</p>
                        <a href={"https://dsc-sookmyung.tistory.com/category/Team%20Project%20%282021-2022%29/%EC%91%A5%EC%91%A5%EC%9D%B4"} target="_blank" rel="noopener noreferrer">
                            <p className="footer-right-ment">Study Blog</p>
                        </a>
                    </div>

                    <div className="footer-right">
                        <p className="footer-right-title">Legal Notice</p>
                        <Link to='/terms'><p className="footer-right-ment">Terms of Use</p></Link>
                        <Link to='/privacy'><p className="footer-right-ment">Privacy Policy</p></Link>
                    </div>
                </div>
                <p className="footer-copyright">2022 BeanYard. All rights reserved.</p>
            </div>
        </footer>

    )
}

export default Footer;