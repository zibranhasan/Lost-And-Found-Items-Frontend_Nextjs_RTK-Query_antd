"use client"; // This directive marks the file as a Client Component

import {
  useDeleteClaimsMutation,
  useGetMyClaimsQuery,
} from "@/redux/api/ClaimApi";
import React from "react";
import { Button, Spin, Alert, Card, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";
import Error from "next/error";

const ClaimsPage = () => {
  const { data: claimsResponse, isLoading, error } = useGetMyClaimsQuery({});
  const [deleteClaim] = useDeleteClaimsMutation();

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Error fetching claims" type="error" />;

  const claims = claimsResponse?.response || [];

  const handleDelete = async (claimId: string) => {
    console.log(claimId);
    try {
      await deleteClaim(claimId).unwrap();
      alert("Claim deleted successfully");
    } catch (Error) {
      alert("Error deleting claim: " + Error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6  rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Claims</h1>
      {claims?.length === 0 ? (
        <div>No claims found.</div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {claims?.map((claim: any) => (
            <Col xs={24} sm={12} lg={12} key={claim?.id}>
              <Card
                className="p-4 border border-gray-300 rounded-md shadow-sm"
                hoverable
                style={{
                  width: "100%", // Full width in column
                  maxWidth: "500px", // Limit max width
                  margin: "auto", // Center the card
                  borderRadius: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
                cover={
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <Image
                      alt={claim.foundItem.foundItemName}
                      src={claim.foundItem.photo}
                      width={500}
                      height={250} // Adjust image size for consistency
                      style={{
                        objectFit: "cover",
                        borderRadius: "10px 10px 0 0",
                        overflow: "hidden",
                      }}
                    />
                  </div>
                }
                actions={[
                  // eslint-disable-next-line react/jsx-key
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(claim?.id)}
                  >
                    Delete Claim
                  </Button>,
                ]}
              >
                <h2 className="text-lg font-semibold mb-2">
                  {claim?.foundItem?.foundItemName}
                </h2>
                <p>
                  <strong>Description:</strong> {claim?.foundItem?.description}
                </p>
                <p>
                  <strong>Location:</strong> {claim?.foundItem?.location}
                </p>
                <p>
                  <strong>Distinguishing Features:</strong>{" "}
                  {claim?.distinguishingFeatures}
                </p>
                <p>
                  <strong>Lost Date:</strong>{" "}
                  {new Date(claim?.lostDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      color:
                        claim?.status === "APPROVED"
                          ? "#4CAF50" // Green for APPROVED
                          : claim?.status === "REJECTED"
                          ? "#F44336" // Red for REJECTED
                          : "#FFC107", // Yellow/Orange for PENDING
                      fontWeight: "bold",
                    }}
                  >
                    {claim?.status}
                  </span>
                </p>

                {/* <p>
                  <strong>Category:</strong> {claim?.foundItem?.category?.name}
                </p> */}
                {/* <p>
                  <strong>Reported by:</strong> {claim?.foundItem?.user?.name} (
                  {claim?.foundItem?.user?.email})
                </p> */}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ClaimsPage;
