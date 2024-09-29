"use client";

import { useGetLostItemsByIdQuery } from "@/redux/api/Api";
import React from "react";
import Image from "next/image";

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
    <div style={pageStyle as React.CSSProperties}>
      {lostItem?.photo && (
        <div style={imageContainerStyle as React.CSSProperties}>
          <Image
            src={lostItem.photo}
            alt="Lost Item Photo"
            width={150}
            height={150}
            style={imageStyle as React.CSSProperties}
          />
        </div>
      )}
      <div style={infoContainerStyle as React.CSSProperties}>
        <h1>
          <strong>Lost Item Name:</strong> {lostItem?.name}
        </h1>
        <p>
          <strong>Lost Item Description:</strong> {lostItem?.description}
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
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  maxWidth: "800px",
  margin: "20px auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageContainerStyle: React.CSSProperties = {
  width: "150px",
  height: "150px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
};

const imageStyle: React.CSSProperties = {
  borderRadius: "8px",
};

const infoContainerStyle: React.CSSProperties = {
  width: "100%",
};

export default LostItemPage;
