"use client";

import { useGetFoundItemsByIdQuery } from "@/redux/api/userApi";
import React from "react";
import Image from "next/image";

type TParams = {
  params: {
    FoundId: string;
  };
};

const FoundItemDetailsPage = ({ params }: TParams) => {
  const id = params?.FoundId;
  const { data, isLoading, isError } = useGetFoundItemsByIdQuery(id);

  // Destructure the foundItem object from the response
  const foundItem = data?.response;

  console.log("foundItem", foundItem);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div style={pageStyle as React.CSSProperties}>
      {foundItem?.photo && (
        <div style={imageContainerStyle as React.CSSProperties}>
          <Image
            src={foundItem.photo}
            alt="Found Item Photo"
            width={150}
            height={150}
            style={imageStyle as React.CSSProperties}
          />
        </div>
      )}
      <div style={infoContainerStyle as React.CSSProperties}>
        <h1>
          <strong>Found Item Name:</strong> {foundItem?.foundItemName}
        </h1>
        <p>
          <strong>Found Item Description:</strong> {foundItem?.description}
        </p>
        <p>
          <strong>Location:</strong> {foundItem?.location}
        </p>
        <p>
          <strong>Category:</strong> {foundItem?.category?.name}
        </p>
        <p>
          <strong>Reported by:</strong> {foundItem?.user?.name}
        </p>
        <p>
          <strong>Contact Email:</strong> {foundItem?.user?.email}
        </p>
        <p>
          <strong>Reported on:</strong>{" "}
          {new Date(foundItem?.createdAt).toLocaleDateString()}
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

export default FoundItemDetailsPage;
