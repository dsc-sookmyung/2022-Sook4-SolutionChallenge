import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { AuthContext } from "../App";
import { getApi, putApi } from "../api";
import '../styles/MyPageCafe.css';
// import {ReactComponent as Rewards1} from '../assets/rewards/reward1.svg';
// import {ReactComponent as Rewards2} from '../assets/rewards/reward2.svg';
// import {ReactComponent as Rewards3} from '../assets/rewards/reward3.svg';
// import {ReactComponent as Rewards4} from '../assets/rewards/reward4.svg';
// import {ReactComponent as Rewards5} from '../assets/rewards/reward5.svg';
// import {ReactComponent as Rewards6} from '../assets/rewards/reward6.svg';
// import {ReactComponent as Basket} from '../assets/baguni.svg';
import {ReactComponent as RewardsNew1} from '../assets/rewards/reward_new1.svg';
import {ReactComponent as RewardsNew2} from '../assets/rewards/reward_new2.svg';
import {ReactComponent as RewardsNew3} from '../assets/rewards/reward_new3.svg';
import {ReactComponent as RewardsNew4} from '../assets/rewards/reward_new4.svg';
import {ReactComponent as RewardsNew5} from '../assets/rewards/reward_new5.svg';

const MyPageCafe = () => {
    const authContext = useContext(AuthContext);
    // const [cafeName, setCafeName] = useState("CAFE");
    const accountForm = useRef(null);
    const [totalCoffee, setTotalCoffee] = useState(0);

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [userInfo, setUserInfo] = useState({});
    const [mapInfo, setMapInfo] = useState(undefined);
    const [markers, setMarkers] = useState([]);
    let [searchBox, setSearchBox] = useState({});

    useEffect(() => {
        const getCafeProfile = async () => {
                // { userName: 'test@test.com' },
            await getApi(
                { userName: authContext.state.email },
                '/api/user',
                authContext.state.token
            )
            .then(({ status, data }) => {
                // console.log(data)
                if (status === 200) {
                    setUserInfo(data);
                };
            })
            .catch((e) => {
                console.log(e);
            });
        };

        const getCoffeeAmount = async () => {
            await getApi(
                {},
                `/api/donate/${authContext.state.userSeq}`,
                authContext.state.token
            )
            .then(({ data }) => {
                setTotalCoffee((data/1000).toFixed(1));
            })
            .catch((e) => {
                console.log(e);
            });
        };
        getCafeProfile();
        getCoffeeAmount();
    }, [authContext]);

    const putCafeProfile = async () => {
        let tmp = userInfo;
        if(markers.length) {
            tmp.lat = markers[0].loc.lat();
            tmp.lon = markers[0].loc.lng();
            tmp.locateName = markers[0].name;
        }
        setUserInfo(tmp);
        console.log(userInfo)

        await putApi(
            userInfo,
            '/api/user',
            authContext.state.token
        )
        .then(({ status }) => {
            if(status === 200) {
                alert('Edit Completed.');
                window.location.reload();
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };

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
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        setMapInfo(map);
    };

    const showRewards = () => {
        if(totalCoffee > 0 && totalCoffee < 10) return <RewardsNew1 width={'40vw'} height={'70vh'}/>;
        else if(totalCoffee >= 10 && totalCoffee < 30) return <RewardsNew2 width={'40vw'} height={'70vh'} />;
        else if(totalCoffee >= 30 && totalCoffee < 50) return <RewardsNew3 width={'40vw'} height={'70vh'} />;
        else if(totalCoffee >= 50 && totalCoffee < 100) return <RewardsNew4 width={'40vw'} height={'70vh'} />;
        else if(totalCoffee >= 100) return <RewardsNew5 width={'40vw'} height={'70vh'} />;
        else return <RewardsNew1 width={'40vw'} height={'70vh'} style={{ marginTop: '10vh' }}/>;
    };

    const setRewardsStyle = () => {
        if(totalCoffee === 0) return {top: '35vh'};
        else if(totalCoffee > 0 && totalCoffee < 10) return {top: '32vh'};
        else if(totalCoffee > 10 && totalCoffee < 20) return {top: '30vh'};
    };

    return (
        <div className="my-page-cafe">
            <div className="page-title">
                Profile
            </div>
            <div className="reward-notice">
                <div>For those who collect all the vegetable characters in the basket,</div>
                <div>we will send you Home Gardening kit as a reward!</div>
            </div>
            <div>
                <div className="coffee-grounds-info-section">
                    <div>Total Donated</div>
                    <div>Coffee Grounds</div>
                    <br></br>
                    <div className="coffee-kg">
                        <span style={{ fontWeight: '700' }} className="total-coffee-style">{totalCoffee}</span>
                        <span style={{ fontWeight: '600', fontSize: '160%' }}> kg</span>
                    </div>
                </div>
                <div className="coffee-grounds-char" style={setRewardsStyle()}>
                    {
                        showRewards()
                    }
                </div>                
            </div>
            <div style={{ position: 'relative' }} className="green-ground">
                <div className="whole-form-section">
                    <div className="account-title-section">
                        <span>Account</span>
                    </div>
                    <div className="form-section">
                        <form ref={accountForm} className="edit-form">
                            <input
                                name="email"
                                defaultValue={userInfo.email}
                                className="edit-form-input"
                                placeholder="EMAIL"
                                readOnly
                            />

                            <input
                                name="userName"
                                defaultValue={userInfo.userName}
                                onKeyUp={async (e) => {
                                    let tmp = userInfo;
                                    tmp.userName = e.target.value;
                                    setUserInfo(tmp);
                                }}
                                className="edit-form-input"
                                placeholder="USER NAME"
                            />

                            <input
                                name="cafeName"
                                defaultValue={userInfo.cafeName}
                                onKeyUp={async (e) => {
                                    let tmp = userInfo;
                                    tmp.cafeName = e.target.value;
                                    setUserInfo(tmp);
                                }}
                                className="edit-form-input"
                                placeholder="CAFE NAME"
                            />
                            <input
                                id="pac-input"
                                defaultValue={userInfo.locateName}
                                className="controls edit-form-input"
                                type="text"
                                onClick={getInfo}
                                name="locationName"
                                placeholder="LOCATION"
                                onKeyUp={async () => {
                                    await getInfo();
                                    setMarkers([]);
                                }}
                            />
                            <div className="map-box">
                                <Map
                                    google={window.google}
                                    zoom={12}
                                    onReady={fetchPlaces}
                                    initialCenter={{ lat: lat, lng: lng}}
                                    center={{lat: lat, lng: lng}}
                                    style={{ width: '0', height: '0' }}
                                >
                                    <Marker position={{ lat: lat, lng: lng}} />
                                    {
                                        markers.map((e) => {
                                            return (
                                                <Marker
                                                    position={{ lat: e.loc.lat(), lng: e.loc.lng()}} key={{ e }}
                                                    name={e.name}
                                                />
                                            )
                                        })
                                    }
                                </Map>
                            </div>
                            <button
                                type="button"
                                className="edit-btn"
                                onClick={putCafeProfile}
                            >EDIT</button>
                        </form>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyBkgjzWkzu_PSikUrYktcYp6c29ZMYl0k0",
})(MyPageCafe);
