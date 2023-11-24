import PageNav from '../components/PageNav';
import styles from './Product.module.css';

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About City Stamp.</h2>
          <p>
            Discover the World at Your Fingertips: Our innovative travel app
            seamlessly captures and organizes your globetrotting experiences.
            Effortlessly save the cities you explore, creating a digital
            passport of your adventures.
          </p>
          <p>
            From bustling metropolises to serene getaways, our app ensures that
            every destination becomes a cherished memory. Explore, save, and
            relive the magic of your travels with our user-friendly application,
            transforming your smartphone into a gateway to a world of
            unforgettable experiences.
          </p>
        </div>
      </section>
    </main>
  );
}
