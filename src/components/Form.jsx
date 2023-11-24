import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import { useEffect, useState } from 'react';
import { useUrlPosition } from '../hooks/useURLPosition';
import { useCities } from '../contexts/CitiesContext';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState('');
  const [countryName, setCountry] = useState('');
  const [dateVisited, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [countryCode, setcountryCode] = useState('');

  useEffect(
    function () {
      if (!lat || !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCityName(data.countryName ? data.city || data.locality || '' : '');
          setCountry(data.countryName ? data.countryName : '');
          setcountryCode(
            data.countryName ? data.countryCode.toLowerCase() : ''
          );
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !dateVisited) return;

    const newCity = {
      cityName,
      countryName,
      countryCode,
      dateVisited,
      notes,
      lat: Number(lat),
      lng: Number(lng),
    };

    await createCity(newCity);
    navigate('/App/Cities');
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!countryName)
    return (
      <Message message={"That does't seem to be a city. Click on a city 😉!"} />
    );

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <img src={`/flags/${countryCode}.svg`} className={styles.logo} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={dateVisited}
          dateFormat={'dd/MM/yyyy'}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
