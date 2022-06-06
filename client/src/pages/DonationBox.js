import React, { useState, useEffect, useContext } from 'react';
import { getApi } from "../api";
import { AuthContext } from '../App';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import mapCurIcon from '../assets/images/mapCurIcon.svg';
import mapBoxIcon from '../assets/images/mapBoxIcon.svg';


const dumpdata = [
    {
        "basketSeq": 1,
        "lat": 1.0,
        "lon": 1.0,
        "locateName": "위치"
    },
    {
        "basketSeq": 2,
        "lat": 2.0,
        "lon": 0.0,
        "locateName": "위치2"
    }
];

const DonationBox = () => {
    const authContext = useContext(AuthContext);
    // const [boxList, setBoxList] = useState([]);
    const [boxList, setBoxList] = useState(dumpdata);
    const [curLocation, setCurLoation] = useState({
        lat: 0.0, lng: 0.0
    });

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            setCurLoation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        } else {
          window.alert("Cannot find current location.");
        }
      }, []);

    const fetchPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
    };

    useEffect(() => {
        const getBox = async () => {
            await getApi(
                {},
                `/api/basket`,
                authContext.state.token
            )
            .then(({ data }) => {
                setBoxList(data);
            })
            .catch((e) => {
                console.log(e);
            });
        }
        // getBox();
    }, [])

    return (
        <div>
            <div style={{fontSize: '40px', fontFamily: 'ruddy', margin: '30px 0', color: '#443826' }}>
                DONATION BOX
            </div>
            <div style={{height: '100vh'}}>
            <Map
                google={window.google}
                zoom={16}
                onReady={fetchPlaces}
                initialCenter={{ lat: curLocation.lat, lng: curLocation.lng}}
                center={{lat: curLocation.lat, lng: curLocation.lng}}
                style={{ width: '80%', height: '80%', margin: '0 auto'}}
            >
                <Marker
                    position={{ lat: curLocation.lat, lng: curLocation.lng }}
                    icon={ mapCurIcon }
                />
                {
                    boxList &&
                    boxList.map((box) => {
                        return (
                            <Marker
                                position={{ lat: box.lat, lng: box.lon }}
                                key={ box.basketSeq }
                                icon={ mapBoxIcon }
                            />
                        )
                    })
                }
            </Map>
            
            </div>
        </div>
    )
}

// export default DonationBox;
export default GoogleApiWrapper({
    apiKey: "AIzaSyBkgjzWkzu_PSikUrYktcYp6c29ZMYl0k0",
})(DonationBox);