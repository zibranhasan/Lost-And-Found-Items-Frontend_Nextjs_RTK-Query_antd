"use client";

import Link from "next/link";
import styles from "./LostItemReports.module.css"; // Create and import your CSS module

type TItem = {
  id: string;
  description: string;
  date?: string; // Date and location can be optional
  location?: string;
};

type RecentLostItemsProps = {
  items: TItem[];
};

const RecentLostItems = ({ items }: RecentLostItemsProps) => {
  return (
    <section className={styles.recentLostItems}>
      <h2>Recent Lost Item Reports</h2>
      <div className={styles.cardsContainer}>
        {items.slice(0, 5).map((item) => (
          <div key={item.id} className={styles.card}>
            <h3>{item.description}</h3>
            {item.date && item.location && (
              <p>
                Lost on {item.date} at {item.location}
              </p>
            )}
            <Link href={`/dashboard/user/components/edit/${item.id}`} passHref>
              <p className={styles.link}>View Full Report</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentLostItems;
