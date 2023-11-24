import styles from './CountryItem.module.css';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <img src={`/flags/${country.countryCode}.svg`} />
      </span>
      <span>{country.countryName}</span>
    </li>
  );
}

export default CountryItem;
