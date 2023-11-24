import styles from './CountryList.module.css';
import CountryItem from './CountryItem';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/CitiesContext';

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  const countries = [];

  cities.map((city) => {
    const countryInArray = countries.some(
      (currentCity) =>
        currentCity !== city && currentCity.countryName === city.countryName
    );
    if (!countryInArray) {
      countries.push({
        countryName: city.countryName,
        countryCode: city.countryCode,
      });
    }
  });

  if (cities.length == 0)
    return (
      <Message
        message={'Add you first city by clicking on a city on the map'}
      />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem country={country} key={country.countryName} />;
      })}
    </ul>
  );
}
