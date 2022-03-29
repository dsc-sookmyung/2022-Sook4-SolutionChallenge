import { Map } from 'google-maps-react';

const MapComponent = (fetchPlaces, lat, lng) => {
    return (
        <Map
            google={window.google}
            zoom={12}
            onReady={fetchPlaces}
            initialCenter={{ lat: lat, lng: lng}}
            center={{lat: lat, lng: lng}}
        >
        </Map>
    )
};

export default MapComponent;