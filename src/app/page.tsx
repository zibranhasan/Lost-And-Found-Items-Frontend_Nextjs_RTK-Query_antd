"use client";

import React from "react";

import HeroSection from "./components/Hero/Hero";

import RecentLostItems from "./components/Lost Item Reports/LostItemReports";
import Footer from "./components/Footer/Footer";
import {
  useGetAllLostItemsQuery,
  useGetFoundItemsWithFilteringQuery,
} from "@/redux/api/Api";
import AboutUs from "./components/AboutUs/AboutUs";
import FoundItemReports from "./components/Found Item Reports/FoundItemReports";

export default function Home() {
  const { data, isLoading, error } = useGetAllLostItemsQuery({});
  const { data: FoundItemData } = useGetFoundItemsWithFilteringQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  const lostItems = data?.response || [];

  const foundItems = FoundItemData?.response || [];

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <HeroSection />
      <RecentLostItems items={lostItems} />
      <FoundItemReports foundItems={foundItems} />
      <AboutUs />
    </div>
  );
}
