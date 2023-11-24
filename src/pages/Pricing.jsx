// Uses the same styles as Product
import PageNav from '../components/PageNav';
import styles from './Product.module.css';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Unlock Your Travel Memories with Ease: Simple Pricing at Just
            $9/Month! Explore the world and effortlessly save your cherished
            cities with our user-friendly app. For the cost of a coffee, relive
            your journeys and build a personalized map of your travel
            adventures. Start your subscription today and turn every city into a
            lasting memory.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
