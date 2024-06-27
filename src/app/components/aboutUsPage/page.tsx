import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>About Us</h1>
        </div>
        <p>
          Welcome to Lost & Found, your trusted partner in reuniting lost items
          with their rightful owners. Established with the core mission of
          providing a seamless and efficient platform, we aim to bring peace of
          mind to those who have lost their valuables and to those who have
          found items they wish to return.
        </p>
        <p>
          At Lost & Found, we understand the anxiety and stress that comes with
          losing a cherished item. Whether its a wallet, a piece of jewelry, a
          phone, or any other personal belonging, our goal is to help you
          recover it with minimal hassle. Our user-friendly interface allows
          individuals to report lost items quickly and easily, increasing the
          chances of a successful reunion.
        </p>
        <div className={styles.heading}>
          <h2>Our Mission</h2>
        </div>
        <p>
          Our mission is to foster a community of trust and cooperation, where
          individuals can assist one another in times of need. We believe in the
          inherent goodness of people and their willingness to help others.
          Through our platform, we aim to create a bridge between those who have
          lost items and those who have found them, ensuring that no lost item
          remains unclaimed.
        </p>
        <div className={styles.heading}>
          <h2>How It Works</h2>
        </div>
        <p>Using Lost & Found is simple and straightforward:</p>
        <ol>
          <li>
            <strong>Report a Lost Item:</strong> If you&apos;ve lost something,
            you can quickly create a report with details about the item, where
            it was last seen, and any other pertinent information.
          </li>
          <li>
            <strong>Report a Found Item:</strong> If you&apos;ve found
            something, you can easily report it on our platform, providing
            details to help the owner identify it.
          </li>
          <li>
            <strong>Search Listings:</strong> Browse through our database of
            lost and found items to see if your item has been reported by
            someone else.
          </li>
          <li>
            <strong>Contact Owners/Finders:</strong> Our secure messaging system
            allows you to connect with the person who has found your item or the
            person who is looking for it.
          </li>
        </ol>
        <div className={styles.heading}>
          <h2>Why Choose Us?</h2>
        </div>
        <p>
          We are dedicated to providing a reliable and efficient service that
          prioritizes the needs of our users. Our platform is designed to be
          intuitive and accessible, ensuring that anyone can use it with ease.
          We value your privacy and security, and we take all necessary measures
          to protect your personal information.
        </p>
        <p>
          At Lost & Found, we are more than just a service; we are a community
          committed to helping one another. Join us today and become a part of
          this compassionate network. Together, we can make a difference, one
          found item at a time.
        </p>
        <p>
          Thank you for choosing Lost & Found. We are here to assist you in your
          search and to support you every step of the way.
        </p>
        <p>
          Sincerely, <br /> The Lost & Found Team
        </p>
      </div>
      <div className={styles.footer}>{/* <Footer /> */}</div>
    </div>
  );
};

export default AboutUs;
