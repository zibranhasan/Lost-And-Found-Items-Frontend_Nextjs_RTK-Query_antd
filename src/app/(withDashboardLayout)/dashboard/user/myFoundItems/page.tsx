"use client";

import { useGetMyFoundItemsQuery } from "@/redux/api/userApi";
import React from "react";
import Image from "next/image"; // Import the Image component

const FoundItemsPage = () => {
  const { data, isLoading, isError, error } = useGetMyFoundItemsQuery({});

  if (isLoading) return <div>Loading Found Items...</div>;
  if (isError) return <div>Error fetching found items</div>;

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
                overflow: "hidden",
              }}
            >
              {item.photo && (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    overflow: "hidden",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={item.photo}
                    alt={item.foundItemName}
                    width={150}
                    height={150}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              )}
              <h2>{item.foundItemName}</h2>
              <p>Description: {item.description}</p>
              <p>Location: {item.location}</p>
              <p>Category: {item.category.name}</p>
              <p>Reported At: {new Date(item.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItemsPage;
