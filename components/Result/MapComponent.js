import { MapContainer, TileLayer, Marker, Popup, useMap  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '../../styles/Result.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const MapComponent = () => {

  const user = useSelector((state) => state.user.value);

  let search
  const router = useRouter()
  const {searchid} = router.query

  const allSearches = useSelector((state)=>state.search.value)

  if (searchid !== "companies"){
  search = allSearches.filter(e=>e._id== searchid)
  }
  else {
  search = allSearches
  }
  const i = search.length-1

  const companiesToDisplay = user.token ? search[i].current_companies : search[i].current_companies.slice(0, 4);

  const SetBounds = () => {
    const map = useMap();

    useEffect(() => {
      if (companiesToDisplay.length > 0) {
        const bounds = companiesToDisplay
          .map(company => company.coordinates)
          .filter(coords => coords && coords.latitude && coords.longitude)
          .map(coords => [coords.latitude, coords.longitude]);
          
        if (bounds.length > 0) {
          map.fitBounds(bounds);
        }
      }
    }, [map, companiesToDisplay]);

    return null;
  };
  
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} className={styles.map}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetBounds />
      {companiesToDisplay.map((search, index) => {
        // Vérification des coordonnées
        const { latitude, longitude } = search.coordinates || {};
        if (latitude && longitude) {
          return (
            <Marker 
              key={index} 
              position={[latitude, longitude]}
            >
              <Popup>
                {search.name} <br /> 
                {search.status} <br /> 
                Création : {search.creation_date}
              </Popup>
            </Marker>
          );
        }
        return null; // Ignore l'entreprise si les coordonnées sont absentes
      })}
    </MapContainer>
  );
}

export default MapComponent;
