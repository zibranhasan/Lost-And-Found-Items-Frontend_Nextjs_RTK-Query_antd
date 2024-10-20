"use client";

import { useGetMyLostItemsQuery } from "@/redux/api/Api";
import React from "react";
import Image from "next/image"; // Import Image component
import "./MyLostItemsPage.css"; // Import the custom CSS file

const MyLostItemsPage = () => {
  const { data, isLoading, isError, error } = useGetMyLostItemsQuery({});

  if (isLoading) return <div>Loading Lost Items...</div>;
  if (isError) return <div>Error fetching claims</div>;

  const myLostItems = data?.response || [];

  // console.log("myLostItems", myLostItems);

  return (
    <div className="lost-items-container">
   
      {myLostItems.length === 0 ? (
        <p>No lost items found.</p>
      ) : (
        <div className="lost-items-grid">
          {myLostItems.map((item: any) => (
            <div className="card" key={item.id}>
              {item.photo && (
                <div className="card-image">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={150}
                    height={150}
                  />
                </div>
              )}
              <div className="card-body">
                <h2 className="card-title">{item.name}</h2>
                <p className="card-text">Description: {item.description}</p>
                <p className="card-text">Location: {item.location}</p>
                <p className="card-text">Category: {item.category.name}</p>
                <p className="card-text">
                  Reported At: {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="card-text">
                  Updated At: {new Date(item.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLostItemsPage;
