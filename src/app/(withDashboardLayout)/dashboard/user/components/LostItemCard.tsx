import React from "react";
import Link from "next/link";

const handleDetails = (id: any) => {
  // Handle the details button click (e.g., navigate to a detailed page or show a modal)
  console.log(`Details for item ID: ${id}`);
};

const LostItemCard = ({ item }: any) => {
  return (
    <div style={cardStyle}>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Location: {item.location}</p>
      <Link href={`/dashboard/user/components/edit/${item.id}`}>
        View Details
      </Link>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
};

const buttonStyle = {
  padding: "8px 16px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const linkStyle = {
  display: "inline-block",
  margin: "10px 0",
  color: "#007bff",
  textDecoration: "none",
};

export default LostItemCard;
