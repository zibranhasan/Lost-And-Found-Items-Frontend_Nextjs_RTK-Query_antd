import React from "react";
import { motion } from "framer-motion";
import styles from "./AboutUs.module.css"; // Import the CSS module
import Image from "next/image";
import about2 from "@/assets/images/about2.png";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome to Lost And Found Item System, the premier platform dedicated
          to reuniting lost items with their rightful owners. We understand the
          frustration and anxiety that comes with losing something valuable, and
          we&apos;re here to help you find it. Our mission is to create a
          community where honesty and kindness prevail, ensuring that lost
          belongings find their way back home.
        </motion.p>
      </div>
      <div className={styles.imageSection}>
        <motion.div
          className={styles.imageContainer}
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className={styles.overlayImageContainer}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src={about2}
              alt="About Us Image"
              layout="responsive"
              width={300}
              height={300}
              className={styles.overlayImage}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
