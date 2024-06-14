"use client";

import Link from "next/link";
import styles from "./Hero.module.css"; // Create and import your CSS module

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.headline}>
          Find what you lost, reunite what you found!
        </h1>
        <div className={styles.buttonGroup}>
          <Link href="/dashboard/user/reportALostItemReports">
            <button className={styles.button}>Report a Lost Item</button>
          </Link>
          <Link href="/dashboard/user/CreateAFoundItem">
            <button className={styles.button}>Report a Found Item</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
