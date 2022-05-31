import React, { useCallback, useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import DateTimePicker from 'react-datetime-picker';

const CafeApply = ({ defaultCoffeeSize, mapIf, setMapInformation }) => {
    const donateForm = useRef(null);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [mapInfo, setMapInfo] = useState(undefined);
    const [markers, setMarkers] = useState([]);
    let [searchBox, setSearchBox] = useState(undefined);
    const [coffeeSize, setCoffeeSize] = useState(0);
    const [week, setWeek] = useState([false, false, false, false, false, false, false]);

    const [value, onChange] = useState(new Date());

    const setWeeks = (idx) => {
        let tmp = [...week];
        if(tmp[idx]) tmp[idx] = false;
        else tmp[idx] = true;
        setWeek(tmp);
    }

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
    
        setMarkers([]);
    
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
        if(mapIf.lat && mapIf.lon) {
            let m = [];
            m.push({
                name: mapIf.locateName,
                loc: {
                    lat: () => {
                        return mapIf.lat;
                    },
                    lng: () => {
                        return mapIf.lon;
                    },
                }
            });
            setMarkers(m);
            setLat(mapIf.lat); setLng(mapIf.lon);
        }
        createSearchBox();
        if(defaultCoffeeSize) setCoffeeSize(defaultCoffeeSize);
    }, [createSearchBox, mapIf, defaultCoffeeSize]);

    const fetchPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        setMapInfo(map);
    };

    const setting = (page) =>{
        let nowInfo = donateForm.current;

        let weeks = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
        let week_res = [];
        for(let i=0;i<7;i++) {
            if(week[i]) week_res.push(weeks[i]);
        }

        setMapInformation(nowInfo, markers, coffeeSize, week_res, page);
    };

    return (
        <div className="cafe-apply">
            <div className="logo-title">
                Donate Your Coffee Grounds
            </div>
            <div className="form">
                <form ref={donateForm}>
                    <div style={{ width: '80%', margin: '0 10%' }}>
                        <div className="cafe-apply-form-section">
                            <div className="cafe-apply-input">CAFE NAME</div>
                            <input
                                name="cafeName"
                                defaultValue={mapIf.cafeName}
                                placeholder=""
                            />
                        </div>

                        <div className="cafe-apply-form-section">
                            <div className="cafe-apply-input">LOCATION</div>
                            <input
                                id="pac-input"
                                type="text"
                                placeholder=""
                                onKeyPress={getInfo}
                                onClick={getInfo}
                                name="locationName"
                                defaultValue={mapIf.locateName}
                            />
                            <div className="map-box">
                                <Map
                                    google={window.google}
                                    zoom={12}
                                    onReady={fetchPlaces}
                                    initialCenter={{ lat: lat, lng: lng}}
                                    center={{lat: lat, lng: lng}}
                                >
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
                        </div>
                        <div className="cafe-apply-form-section" style={{ display: mapIf.donateType === 'POST' ? 'none' : 'block' }}>
                            <div className="cafe-apply-input">WHEN</div>
                            <DateTimePicker
                                onChange={onChange}
                                value={value}
                                calendarIcon={null}
                                clearIcon={null}
                                name="dateTime"
                            />
                        </div>

                        <div className="cafe-apply-form-section">
                            <input
                                type="text"
                                value={coffeeSize}
                                onChange={(e) => setCoffeeSize(e.target.value)}
                                className="cafe-apply-input"
                            />
                            <span className="cafe-apply-input-unit">g</span>
                        </div>

                        <div style={{ display: mapIf.donateCycle === 'LONG' ? 'block' : 'none' }}>
                            <div
                                className="cafe-apply-weeks"
                                onClick={() => setWeeks(0)}
                                style={{
                                    color: week[0] ? '#F2F2F2' : '#443826',
                                    backgroundColor: week[0] ? '#443826' : '#F2F2F2',
                                }}
                            ><div>MON</div></div>
                            
                            <div
                                className="cafe-apply-weeks"
                                onClick={() => setWeeks(1)}
                                style={{
                                    color: week[1] ? '#F2F2F2' : '#443826',
                                    backgroundColor: week[1] ? '#443826' : '#F2F2F2',
                                }}
                            ><div>TUE</div></div>
                            
                            <div
                                className="cafe-apply-weeks"
                                onClick={() => setWeeks(2)}
                                style={{
                                    color: week[2] ? '#F2F2F2' : '#443826',
                                    backgroundColor: week[2] ? '#443826' : '#F2F2F2',
                                }}
                            ><div>WED</div></div>

                            <div
                                className="cafe-apply-weeks"
                                onClick={() => setWeeks(3)}
                                style={{
                                    color: week[3] ? '#F2F2F2' : '#443826',
                                    backgroundColor: week[3] ? '#443826' : '#F2F2F2',
                                }}
                            ><div>THU</div></div>
                            
                            <div
                                className="cafe-apply-weeks"
                                onClick={() => setWeeks(4)}
                                style={{
                                    color: week[4] ? '#F2F2F2' : '#443826',
                                    backgroundColor: week[4] ? '#443826' : '#F2F2F2',
                                }}
                            ><div>FRI</div></div>
                            
                            <div
                                className="cafe-apply-weeks"
                                onClick={() => setWeeks(5)}
                                style={{
                                    color: week[5] ? '#F2F2F2' : '#443826',
                                    backgroundColor: week[5] ? '#443826' : '#F2F2F2',
                                }}
                            ><div>SAT {week[5]}</div></div>
                            
                            <div
                                className="cafe-apply-weeks"
                                onClick={() => setWeeks(6)}
                                style={{
                                    color: week[6] ? '#F2F2F2' : '#443826',
                                    backgroundColor: week[6] ? '#443826' : '#F2F2F2',
                                }}
                            ><div>SUN</div></div>
                        </div>
                    </div>
                </form>
                <div style={{ clear: 'both' }}></div>
                <button
                        className="submit-btn"
                        onClick={()=>setting('back')}
                >BACK</button>
                <button
                        className="submit-btn"
                        onClick={()=>setting('next')}
                >SUBMIT</button>
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyBkgjzWkzu_PSikUrYktcYp6c29ZMYl0k0",
})(CafeApply);