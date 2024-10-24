import React from "react";
import { useGetAllLostItemsQuery } from "@/redux/api/Api";
import LostItemCard from "./LostItemCard";
import { Spin } from "antd";

const AllLostItem = () => {
  const { data, isLoading, error } = useGetAllLostItemsQuery({});

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }
  if (error) return <div>Error loading items</div>;

  const lostItems = data?.response || [];

  console.log("recent lostItems", lostItems);

  return (
    <div>
      {lostItems.map((item: any) => (
        <LostItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AllLostItem;
