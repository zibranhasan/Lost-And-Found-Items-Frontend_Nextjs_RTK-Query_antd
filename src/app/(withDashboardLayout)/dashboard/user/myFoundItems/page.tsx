"use client";

import { useGetMyFoundItemsQuery } from "@/redux/api/userApi";
import React from "react";

const FoundItemsPage = () => {
  const { data, isLoading, isError, error } = useGetMyFoundItemsQuery({});

  if (isLoading) return <div>Loading Found Items...</div>;
  if (error) return <div>Error fetching found items</div>;

  const foundItems = data?.response || [];

  return (
    <div>
      <h1>My Found Items</h1>
      {foundItems.length === 0 ? (
        <p>No found items found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {foundItems.map((item: any) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h2>{item.foundItemName}</h2>
              <p>Description: {item.description}</p>
              <p>Location: {item.location}</p>
              <p>Category: {item.category.name}</p>
              <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsPage;
