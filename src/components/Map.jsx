import Button from './Button';
import styles from './Map.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useUrlPosition } from '../hooks/useURLPosition';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [mapLat, mapLng] = useUrlPosition();
  const {
    isLoading: isLoadingPosition,
    position: getlocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (getlocationPosition)
        setMapPosition([getlocationPosition.lat, getlocationPosition.lng]);
    },
    [getlocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your position'}
      </Button>
      <MapContainer className={styles.map} center={mapPosition} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.lat, city.lng]} key={city.id}>
            <Popup>
              <span className={styles.city}>
                <img
                  className={styles.emoji}
                  src={`/flags/${city.countryCode}.svg`}
                />
                {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick position={mapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`Form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
