"use client";



import HeroSection from "./components/Hero/Hero";

import RecentLostItems from "./components/Lost Item Reports/LostItemReports";

import {
  useGetAllLostItemsQuery,
  useGetFoundItemsWithFilteringQuery,
} from "@/redux/api/Api";
import AboutUs from "./components/AboutUs/AboutUs";
import FoundItemReports from "./components/Found Item Reports/FoundItemReports";
import BlogPage from "./components/BlogSection/blog";
import ReviewSection from "./components/ReviewSection/ReviewSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ContactPage from "./components/ContactSection/contact";

export default function Home() {
  const { data, isLoading, error } = useGetAllLostItemsQuery({});
  const { data: FoundItemData } = useGetFoundItemsWithFilteringQuery({});
  const currentUser = useSelector((state: RootState) => state.auth.user);
  // console.log("currentUser", currentUser);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  const lostItems = data?.response || [];

  const foundItems = FoundItemData?.response || [];

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <HeroSection />
      <RecentLostItems items={lostItems} />
      <FoundItemReports foundItems={foundItems} />
      <BlogPage />
      <ReviewSection />
      <AboutUs />
      <ContactPage />
    </div>
  );
}
