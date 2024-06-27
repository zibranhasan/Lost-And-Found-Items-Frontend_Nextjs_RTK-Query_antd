import styles from "./Footer.module.css"; // Create and import your CSS module
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import social media icons from react-icons

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <h3>Contact Us</h3>
        <p>
          Email: <span>support@lostandfound.com</span>
        </p>
        <div className={styles.socialLinks}>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className={styles.icon} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className={styles.icon} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={styles.icon} />
          </Link>
        </div>
      </div>
      <div className={styles.additionalLinks}>
        <Link href="/terms-of-use">
          <Link href="/h">Terms of Use</Link>
        </Link>
        <Link href="/privacy-policy">
          <Link href="/h">Privacy Policy</Link>
        </Link>
      </div>
      <div className={styles.copyright}>
        <p>&copy; 2024 Lost & Found. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
