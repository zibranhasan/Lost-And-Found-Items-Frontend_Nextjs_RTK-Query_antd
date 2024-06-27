// RecentLostItems.tsx

import Link from "next/link";
import styles from "./LostItemReports.module.css"; // Import the CSS module
import Image from "next/image";
import { useState } from "react";

type TItem = {
  id: string;
  name: string;
  description: string;
  date?: string;
  photo: string; // Date and location can be optional
  location?: string;
};

type RecentLostItemsProps = {
  items: TItem[];
};

const RecentLostItems = ({ items }: RecentLostItemsProps) => {
  const [visibleItems, setVisibleItems] = useState(5);

  const showMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  };

  return (
    <section className={styles.foundItemReports}>
      <h2>Recent Lost Item Reports</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.cardsContainer}>
          {items?.slice(0, visibleItems).map((item: any) => (
            <div key={item?.id} className={styles.card}>
              <div className={styles.details}>
                <h3>Name: {item?.name}</h3>
                {item?.location && <p>Lost at {item?.location}</p>}
                <Link
                  href={`/dashboard/user/components/edit/${item.id}`}
                  passHref
                >
                  <Link href={`/dashboard/user/components/edit/${item.id}`}>
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

export default RecentLostItems;

// import Link from "next/link";
// import styles from "./FoundItemReports.module.css"; // Import the CSS module
// import Image from "next/image";
// import { useState } from "react";

// const FoundItemReports = ({ foundItems }: any) => {
//   const [visibleItems, setVisibleItems] = useState(5);

//   const showMoreItems = () => {
//     setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
//   };

//   return (
//     <section className={styles.foundItemReports}>
//       <h2>Recent Found Item Reports</h2>
//       <div className={styles.sliderContainer}>
//         <div className={styles.cardsContainer}>
//           {foundItems?.slice(0, visibleItems).map((item: any) => (
//             <div key={item?.id} className={styles.card}>
//               <div className={styles.details}>
//                 <h3>Name: {item?.foundItemName}</h3>
//                 {item?.location && <p>Found at {item?.location}</p>}
//                 <Link
//                   href={`/dashboard/user/components/edit/${item.id}`}
//                   passHref
//                 >
//                   <Link href="/">View Full Report</Link>
//                 </Link>
//               </div>
//               <div className={styles.photo}>
//                 <div className={styles.imagePlaceholder}>
//                   <Image
//                     src={item?.photo}
//                     alt="photo"
//                     height={100}
//                     width={100}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* {visibleItems < foundItems.length && (
//         )} */}
//       </div>
//     </section>
//   );
// };

// export default FoundItemReports;
