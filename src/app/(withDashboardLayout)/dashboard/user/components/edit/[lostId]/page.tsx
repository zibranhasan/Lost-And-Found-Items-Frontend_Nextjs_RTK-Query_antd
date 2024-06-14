"use client";

import { useGetLostItemsByIdQuery } from "@/redux/api/userApi";
import React from "react";

type TParams = {
  params: {
    lostId: string;
  };
};

const LostItemPage = ({ params }: TParams) => {
  const id = params?.lostId;
  const { data, isLoading, isError, error } = useGetLostItemsByIdQuery(id);

  // Destructure the lostItem object from the response
  const lostItem = data?.response?.lostItem;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div style={pageStyle}>
      <h1>
        <strong>Lost Item Name:</strong> {lostItem?.name}
      </h1>
      <p>
        <strong>Lost Item Desciption:</strong> {lostItem?.description}
      </p>
      <p>
        <strong>Location:</strong> {lostItem?.location}
      </p>
      <p>
        <strong>Category:</strong> {lostItem?.category?.name}
      </p>
      <p>
        <strong>Reported by:</strong> {lostItem?.user?.name}
      </p>
      <p>
        <strong>Contact Email:</strong> {lostItem?.user?.email}
      </p>
      <p>
        <strong>Reported on:</strong>{" "}
        {new Date(lostItem?.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

const pageStyle = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "20px auto",
};

export default LostItemPage;
