import styles from "./Footer.module.css"; // Create and import your CSS module
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <h3>Contact Us</h3>
        <p>
          Email: <p>support@lostandfound.com</p>
        </p>
        <div className={styles.socialLinks}>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2024 Lost & Found. All rights reserved.</p>
      </div>
      <div className={styles.additionalLinks}>
        <Link href="/terms-of-use">
          <p>Terms of Use</p>
        </Link>
        <Link href="/privacy-policy">
          <p>Privacy Policy</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
