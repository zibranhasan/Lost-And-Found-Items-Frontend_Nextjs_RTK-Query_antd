import React from "react";
import styles from "./AboutUs.module.css"; // Import the CSS module
import Image from "next/image";
import about1 from "@/assets/images/about1.png";
import about2 from "@/assets/images/about2.png";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h1>About Us</h1>
        <p>
          Welcome to Lost And Found Item System, the premier platform dedicated
          to reuniting lost items with their rightful owners. We understand the
          frustration and anxiety that comes with losing something valuable, and
          we&apos;re here to help you find it. Our mission is to create a
          community where honesty and kindness prevail, ensuring that lost
          belongings find their way back home.
        </p>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.imageContainer}>
          <Image
            src={about1}
            alt="Image 1"
            layout="responsive"
            width={300}
            height={300}
            className={styles.image}
          />
          <div className={styles.overlayImageContainer}>
            <Image
              src={about2}
              alt="Image 2"
              layout="intrinsic"
              width={300}
              height={300}
              className={styles.overlayImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
