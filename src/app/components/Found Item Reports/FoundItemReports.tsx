import Link from "next/link";
import styles from "./FoundItemReports.module.css"; // Import the CSS module
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type TItem = {
  id: string;
  foundItemName: string;
  location?: string;
  photo: string;
};

const FoundItemReports = ({ foundItems }: { foundItems: TItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(foundItems.length / itemsPerPage);

  const nextPage = () => {
    if (totalPages > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }
  };

  // Auto-advance the carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextPage, 2000);
    return () => clearInterval(interval);
  }, [totalPages]);

  // Safeguard for when totalPages is 0 or foundItems are empty
  if (!foundItems.length) {
    return (
      <section className={styles.foundItemReports}>
        <h2>No Found Items to Display</h2>
      </section>
    );
  }

  const currentItems = foundItems.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className={styles.foundItemReports}>
      <h2>Recent Found Item Reports</h2>
      <div className={styles.sliderContainer}>
        <motion.div
          className={styles.cardsContainer}
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {currentItems.map((item) => (
            <motion.div
              key={item.id}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.photo}>
                <Image
                  src={item.photo}
                  alt={`${item.foundItemName} photo`}
                  height={150}
                  width={150}
                  className={styles.image}
                />
              </div>
              <div className={styles.details}>
                <h3>{item.foundItemName}</h3>
                {item.location && <p>Found at: {item.location}</p>}
                <Link
                  href={`/dashboard/user/components/FoundItemsDetails/${item.id}`}
                  passHref
                >
                  View Full Report
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// <section className={styles.foundItemReports}>
//   <h2>Recent Found Item Reports</h2>
//   <div className={styles.sliderContainer}>
//     <motion.div
//       className={styles.cardsContainer}
//       key={currentIndex}
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -100 }}
//       transition={{ duration: 0.5 }}
//     >
//       {currentItems.map((item: TItem) => (
//         <motion.div
//           key={item.id}
//           className={styles.card}
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 0.3 }}
//         >
//           <div className={styles.cardContent}>
//             <div className={styles.photo}>
//               <Image
//                 src={item.photo}
//                 alt="photo"
//                 height={150}
//                 width={150}
//                 className={styles.image}
//               />
//             </div>
//             <div className={styles.details}>
//               <h3>{item.foundItemName}</h3>
//               {item.location && <p>Found at {item.location}</p>}
//               <Link
//                 href={`/dashboard/user/components/FoundItemsDetails/${item.id}`}
//                 passHref
//               >
//                 View Full Report
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   </div>
// </section>

export default FoundItemReports;
