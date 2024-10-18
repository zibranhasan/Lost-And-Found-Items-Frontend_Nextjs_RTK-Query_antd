"use client";

import FoundItemReports from "@/app/components/Found Item Reports/FoundItemReports";
import RecentLostItems from "@/app/components/Lost Item Reports/LostItemReports";
import {
  useGetAllLostItemsQuery,
  useGetFoundItemsWithFilteringQuery,
} from "@/redux/api/Api";
import React from "react";
import styles from "./page.module.css"; // Import the CSS module

const Page = () => {
  const {
    data: lostItemsData,
    isLoading: isLoadingLostItems,
    error: lostItemsError,
  } = useGetAllLostItemsQuery({});
  const {
    data: foundItemsData,
    isLoading: isLoadingFoundItems,
    error: foundItemsError,
  } = useGetFoundItemsWithFilteringQuery({});

  if (isLoadingLostItems || isLoadingFoundItems) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (lostItemsError || foundItemsError) {
    return <div className={styles.error}>Error loading items</div>;
  }

  const lostItems = lostItemsData?.response || [];
  const foundItems = foundItemsData?.response || [];

  return (
    <div className={styles.pageContainer}>
      {/* <h1 className={styles.heading}>Lost & Found Items</h1> */}
      <div className={styles.section}>
        {/* <h2 className={styles.subHeading}>Recent Lost Items</h2> */}
        <RecentLostItems items={lostItems} />
      </div>
      <div className={styles.section}>
        {/* <h2 className={styles.subHeading}>Found Items</h2> */}
        <FoundItemReports foundItems={foundItems} />
      </div>
    </div>
  );
};

export default Page;
