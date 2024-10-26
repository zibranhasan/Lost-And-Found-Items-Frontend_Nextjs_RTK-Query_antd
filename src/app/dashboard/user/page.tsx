"use client";

import FoundItemReports from "@/app/components/Found Item Reports/FoundItemReports";
import RecentLostItems from "@/app/components/Lost Item Reports/LostItemReports";
import {
  useGetAllLostItemsQuery,
  useGetFoundItemsWithFilteringQuery,
} from "@/redux/api/Api";
import React from "react";
import styles from "./page.module.css"; // Import the CSS module
import HeroSection from "@/app/components/Hero/Hero";
import BlogPage from "@/app/components/BlogSection/blog";
import ReviewSection from "@/app/components/ReviewSection/ReviewSection";
import AboutUs from "@/app/components/AboutUs/AboutUs";
import Contact from "@/app/components/ContactSection/Contact";

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
    <div style={{ margin: 0, padding: 0 }}>
      <HeroSection />
      <RecentLostItems items={lostItems} />
      <FoundItemReports foundItems={foundItems} />
      <BlogPage />
      <ReviewSection />
      <AboutUs />
      <Contact />
    </div>
  );
};

export default Page;
