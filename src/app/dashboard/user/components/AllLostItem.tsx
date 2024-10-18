import React from "react";
import { useGetAllLostItemsQuery } from "@/redux/api/Api";
import LostItemCard from "./LostItemCard";

const AllLostItem = () => {
  const { data, isLoading, error } = useGetAllLostItemsQuery({});

  if (isLoading) return <div>Loading...</div>;
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
