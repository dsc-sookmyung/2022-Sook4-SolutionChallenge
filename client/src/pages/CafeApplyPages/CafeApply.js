import React, { useCallback, useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import DateTimePicker from 'react-datetime-picker';

const CafeApply = ({ mapIf, setMapInformation }) => {
    const donateForm = useRef(null);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [mapInfo, setMapInfo] = useState(undefined);
    const [markers, setMarkers] = useState([]);
    let [searchBox, setSearchBox] = useState(undefined);

    const [value, onChange] = useState(new Date());

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
    }, [lat, lng, createSearchBox, mapIf]);

    const fetchPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        setMapInfo(map);
    };

    const setting = (page) =>{
        let nowInfo = donateForm.current;
        setMapInformation(nowInfo, markers, page);
    };

    return (
        <div className="cafe-apply">
            <div className="logo-title">
                <div>Donate</div>
                <div>Your Coffee Grounds</div>
            </div>
            <div className="form">
                <form ref={donateForm}>
                    <div>Cafe Name</div>
                    <input name="cafeName" defaultValue={mapIf.cafeName}/>

                    <div>Location</div>
                    <input
                        id="pac-input"
                        className="controls"
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
                    <div>When</div>
                    <DateTimePicker
                        onChange={onChange}
                        value={value}
                        calendarIcon={null}
                        clearIcon={null}
                        name="dateTime"
                    />
                </form>
                <div style={{ clear: 'both' }}></div>
                <button
                        className="submit-btn"
                        onClick={()=>setting('back')}
                >BACK</button>
                <button
                        className="submit-btn"
                        onClick={()=>setting('next')}
                >NEXT</button>
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyBkgjzWkzu_PSikUrYktcYp6c29ZMYl0k0",
})(CafeApply);