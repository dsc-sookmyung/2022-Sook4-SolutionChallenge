import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapDialog = ({ isVisible, closeDialog, curInfo, putDonation }) => {
    const [ lat, lng ] = [ isNaN(curInfo.lat) ? 0.0 : parseFloat(curInfo.lat), isNaN(curInfo.lon) ? 0.0 : parseFloat(curInfo.lon)];
    const fetchPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
    };

    return (
        <div id="dialog-inside" style={{ display: isVisible ? 'block' : 'none' }}>
            <div onClick={(e) => closeDialog(e, 'inside', 'anything')} className='close-btn'>X</div>
            <Map
                google={window.google}
                zoom={18}
                onReady={fetchPlaces}
                initialCenter={{ lat: lat, lng: lng}}
                center={{lat: lat, lng: lng}}
                style={{ width: '80%', height: '70%', left: '6vw' }}
            >
                <Marker position={{ lat: lat, lng: lng}} />
            </Map>
            <div className='dialog-btn-section'>
                <div
                    className='table-check-btn dialog-btn map-dialog'
                    style={{ color: '#443826', backgroundColor: '#F2F2F2' }}
                    onClick={() => putDonation(curInfo, "COMPLETE")}
                >ACCEPT</div>
                <div
                    className='table-check-btn dialog-btn check-btn map-dialog'
                    style={{ border: '1px solid #F2F2F2' }}
                    onClick={(e)=> closeDialog(e, 'inside', 'decline')}
                >DECLINE</div>
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyBkgjzWkzu_PSikUrYktcYp6c29ZMYl0k0",
})(MapDialog);