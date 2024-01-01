
import React, { useEffect, useRef } from 'react';

const LocationMap = ({ location }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (location && window.google) {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 49.2827, lng: -123.1207 }, // Default to Vancouver, BC
                zoom: 10,
            });

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    new window.google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                    });
                } else {
                    console.error('Geocode was not successful for the following reason:', status);
                }
            });
        }
    }, [location]);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    );
};

export default LocationMap;
