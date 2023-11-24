import styles from './CityList.module.css';
import CityItem from './CityItem';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

export default function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (cities.length == 0)
    return (
      <Message
        message={'Add you first city by clicking on a city on the map'}
      />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}