import React, { useCallback, useEffect, useState, useRef, useContext } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { AuthContext } from "../../App";
import '../styles/MainFarmer.css';
import axios from "axios";
import { Link } from "react-router-dom";

const MainFarmer = () => {
    const authContext = useContext(AuthContext);

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
              }
            )
        };

        setInfo([]);
        const getMyDonations = async () => {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                },
            };
            // const token = authContext.state.token;
            // if (token) {
            //     config.headers["Authorization"] = `Bearer ${token}`;
            // }
            await axios.get(`https://27.96.134.100:8080/api/cafe`, config)
            .then(({ status, data }) => {
                // console.log(status, data);
                if(data.content) setInfo(data.content);
            })
            .catch((e) => {
                console.log(e);
            });
        };
        getMyDonations();
    }, [lat, lng, authContext.state.userSeq]);

    const fetchPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
    };

    return (
        <div className="main-farmer">
            <Map
                google={window.google}
                zoom={10}
                onReady={fetchPlaces}
                initialCenter={{ lat: lat, lng: lng}}
                center={{lat: lat, lng: lng}}
                style={{ width: 'calc(100% - 45vw)' }}
            >
                <Marker position={{ lat: lat, lng: lng}} />
                {
                    info.map((e) => {
                        return (
                            <Marker position={{ lat: e.lat, lng: e.lon}} />
                        )
                    })
                }
            </Map>
            <div className="farmer-cafe-list">
                {
                    info.length ?
                    info.map((e, idx) => {
                        return (
                            <Link to={`/cafedetail/${e.cafeSeq}`} className="card-content" key={idx}>
                                <div className="farmer-apply-card">
                                    <p className="card-content">카페이름: {e.name}</p>
                                    <p className="card-content">전화번호: {e.number}</p>
                                    <p className="card-content">주소: {e.location}</p>
                                    <p className="card-content">신청한 커피박 양: {e.coffee}</p>
                                    <p className="card-content">커피박 수거 가능 시간: {e.time}</p>
                                </div>
                            </Link>
                        )
                    }) :
                    <div>아직 저장된 카페가 없습니다</div>
                }
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyBkgjzWkzu_PSikUrYktcYp6c29ZMYl0k0",
})(MainFarmer);