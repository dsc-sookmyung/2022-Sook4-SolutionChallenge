import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios';


const SignupFormCafe = () => {
    const [details, setDetails] = useState({
        email: "",
        password: "",
        userName: "",
        cafeName: "",
        locationName: "",
    });
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [mapInfo, setMapInfo] = useState(undefined);
    const [markers, setMarkers] = useState([]);
    let [searchBox, setSearchBox] = useState(undefined);


    const [emailValid, setEmailValid] = useState();  // email 형식 확인
    const [vcode, setVcode] = useState("");  // 발급받은 vcode
    const [inputVcode, setInputVcode] = useState("");  // 사용자가 입력한 vcode
    const [vcodePass, setVcodePass] = useState(null);
    const [emailCheckMsg, setEmailCheckMsg] = useState("");
    const [lastMsg, setLastMsg] = useState("");

    const navigate = useNavigate();


    useEffect(() => {  // email 형식 체크
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        setEmailValid(regExp.test(details.email));
    }, [details.email])

    const checkHandler = async (e) => {  // email 인증코드 전송
        e.preventDefault();
        setLastMsg("");
        const temp = JSON.stringify(details, ['email'])

        if (emailValid) {
            setEmailCheckMsg("Please wait a second!");

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            };
            await axios.post(
                "https://beanyard.app:8080/api/auth/email",
                JSON.parse(temp),
                config
            )
                .then(({ status, data }) => {
                    // console.log('data:', data);
                    if (status === 201) { // 인증번호 받아옴
                        setVcode(data);
                        setEmailCheckMsg("Check the verification code sent to your email.");
                    }
                })
                .catch((e) => {
                    if (e.response.status === 400) {
                        setEmailCheckMsg("Duplicated EMAIL. Try another or Go Login.");
                    } else {
                        setEmailCheckMsg("Signup failed.");
                    }
                });
        } else {
            setEmailCheckMsg("Check your Email Format.");
        }
    }

    const okHandler = async (e) => {  // 인증코드 확인
        e.preventDefault();
        setLastMsg("");
        if ((vcode !== "") && (vcode === inputVcode)) {
            setVcodePass(true);
        } else {
            setVcodePass(false);
        }
    }

    const submitHandler = async (e) => { // submit 버튼 클릭 시
        e.preventDefault();
        // locateName 처리
        let lat = 0;
        let lon = 0;
        let locateName = null;
        if(markers.length) {
            lat = markers[0].loc.lat();
            lon = markers[0].loc.lng();
            locateName = markers[0].name;
        }
        const config = {
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        };
        if (!(vcodePass === true)) {  // email, code 확인
            setLastMsg("Please check email & verification code.");
        } else if (!details.email || !details.password) {  // username, password 기입 확인
            setLastMsg("Please fill in USER NAME and PASSWORD.");
        } else {
            // console.log(details.locationName);
            await axios.post(
                "https://beanyard.app:8080/api/auth/register",
                {
                    email: details.email,
                    password: details.password,
                    userName: details.userName,
                    lat: lat,
                    lon: lon,
                    cafeName: details.cafeName,
                    locateName: locateName,
                },
                config
            )
                .then(({ status, data }) => {
                    if (status === 201) {
                        navigate("/login"); // 회원가입 성공 시 로그인창으로 이동
                    } else {
                        setLastMsg('Signup failed.');
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
    
    // Location 처리
    const getInfo = async () => {
        let sb = searchBox, mi = mapInfo;
        await mi.addListener("bounds_changed", async () => {
            await sb.setBounds(mi.getBounds());
        });

        await sb.addListener("places_changed", async () => {
        const places = sb.getPlaces();
        if (places.length === 0) {
            return;
        }
        
        const bounds = new window.google.maps.LatLngBounds();
    
        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
            return;
            }

            let m = [];
            m.push({
                name: place.name,
                loc: place.geometry.location
            });
            setMarkers(m);

            if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
            } else {
            bounds.extend(place.geometry.location);
            }
        });
        mi.fitBounds(bounds);
        });
        setSearchBox(sb); setMapInfo(mi);
    };

    const createSearchBox = useCallback(() => {
        const input = document.getElementById("pac-input");
        setSearchBox(new window.google.maps.places.SearchBox(input));
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                }
            )
        };
        createSearchBox();
    }, [lat, lng, createSearchBox]);

    const fetchPlaces = (mapProps, map) => {
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
        setMapInfo(map);
    };

    return (
        <form className="Signup-outer-form" onSubmit={submitHandler}>
            <div className="form-group">
                <div className="form-group-with-btn">
                    <div className="form-item-with-btn">
                        <input
                            type="text"
                            name="email"
                            placeholder="*EMAIL"
                            onChange={(e) =>
                                setDetails({ ...details, email: e.target.value })
                            }
                        />
                        <button
                            className="form-check-button"
                            onClick={checkHandler}
                        >Check</button>
                    </div>
                    <p className={
                        emailCheckMsg === "Check the verification code sent to your email." ?
                            "email-check-text-true" :
                            "email-check-text-false"
                    }>{emailCheckMsg}</p>
                </div>
            </div>

            <div className="form-group">
                <div className="form-group-with-btn">
                    <div className="form-item-with-btn">
                        <input
                            name="vCode"
                            placeholder="*VERIFICATION CODE"
                            onChange={(e) =>
                                setInputVcode(e.target.value)
                            }
                        />
                        <button
                            className="form-check-button"
                            onClick={okHandler}
                        >OK</button>
                    </div>
                    {
                        vcodePass !== null ? (
                            vcodePass === true ?
                                (<p className="email-check-text-true">The verification code matches. Go to the next step.</p>)
                                : (<p className="email-check-text-false">The verification code does not match. Please check again.</p>)
                        ) : (<></>)
                    }
                </div>
            </div>

            <div className="form-group">
                <div className="form-item">
                    <input
                        type="text"
                        name="userName"
                        placeholder="*USER NAME"
                        onChange={(e) =>
                            setDetails({ ...details, userName: e.target.value })
                        }
                    />
                </div>
            </div>

            <div className="form-group">
                <div className="form-item">
                    <input
                        type="password"
                        name="password"
                        placeholder="*PASSWORD"
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                    />
                </div>
            </div>

            <div className="form-group">
                <div className="form-item">
                    <input
                        name="cafeName"
                        placeholder="CAFE NAME"
                        onChange={(e) =>
                            setDetails({ ...details, cafeName: e.target.value })
                        }
                    />
                </div>
            </div>

            <div className="form-group">
                <div className="form-item">
                    <input
                        id="pac-input"
                        className="controls"
                        type="text"
                        onClick={getInfo}
                        name="locationName"
                        placeholder="LOCATION"
                        onChange={async (e) =>
                            setDetails({ ...details, locationName: e.target.value })
                        }
                        onKeyUp={async () => {
                            await getInfo();
                            setMarkers([]);
                        }}
                    />
                </div>
            </div>
            <div className="map-box">
                <Map
                    google={window.google}
                    zoom={12}
                    onReady={fetchPlaces}
                    initialCenter={{ lat: lat, lng: lng }}
                    center={{ lat: lat, lng: lng }}
                    style={{ width: '0', height: '0' }}
                >
                    <Marker position={{ lat: lat, lng: lng }} />
                    {
                        markers.map((e) => {
                            return (
                                <Marker
                                    position={{ lat: e.loc.lat(), lng: e.loc.lng() }} key={{ e }}
                                    name={e.name}
                                />
                            )
                        })
                    }
                </Map>
            </div>

            <br></br>
            <button
                className="Signup-submit-button"
                type="submit"
                // disabled={!vcodePass}
            >SUBMIT</button>
            <p className="email-check-text-false">{lastMsg}</p>
        </form>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyBkgjzWkzu_PSikUrYktcYp6c29ZMYl0k0",
})(SignupFormCafe);