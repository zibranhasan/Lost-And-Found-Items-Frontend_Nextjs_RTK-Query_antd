import Link from "next/link";
import styles from "./FoundItemReports.module.css"; // Import the CSS module
import Image from "next/image";
import { useState } from "react";

const FoundItemReports = ({ foundItems }: any) => {
  const [visibleItems, setVisibleItems] = useState(5);
  console.log("foundItems", foundItems);

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  };

  return (
    <section className={styles.foundItemReports}>
      <h2>Recent Found Item Reports</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.cardsContainer}>
          {foundItems?.slice(0, visibleItems).map((item: any) => (
            <div key={item?.id} className={styles.card}>
              <div className={styles.details}>
                <h3>Name: {item?.foundItemName}</h3>
                {item?.location && <p>Found at {item?.location}</p>}
                <Link
                  href={`/dashboard/user/components/FoundItemsDetails/${item.id}`}
                  passHref
                >
                  <Link
                    href={`/dashboard/user/components/FoundItemsDetails/${item.id}`}
                  >
                    View Full Report
                  </Link>
                </Link>
              </div>
              <div className={styles.photo}>
                <div className={styles.imagePlaceholder}>
                  <Image
                    src={item?.photo}
                    alt="photo"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {visibleItems < foundItems.length && (
        )} */}
      </div>
    </section>
  );
};

export default FoundItemReports;
