"use client"; // This directive marks the file as a Client Component

import {
  useDeleteClaimsMutation,
  useGetMyClaimsQuery,
} from "@/redux/api/ClaimApi";
import React from "react";
import { Button, Spin, Alert, Card, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

const ClaimsPage = () => {
  const { data: claimsResponse, isLoading, error } = useGetMyClaimsQuery({});
  const [deleteClaim] = useDeleteClaimsMutation();

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }
  
  if (error) return <Alert message="Error fetching claims" type="error" />;

  const claims = claimsResponse?.response || [];

  const handleDelete = async (claimId: string) => {
    try {
      await deleteClaim(claimId).unwrap();
      alert("Claim deleted successfully");
    } catch (Error) {
      alert("Error deleting claim: " + Error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Claims</h1>
      {claims?.length === 0 ? (
        <div>No claims found.</div>
      ) : (
        <Row gutter={[16, 16]}>
        {claims?.map((claim: any) => (
          <Col xs={24} key={claim?.id}> {/* Full width on all screen sizes */}
            <Card
              className="p-4 border border-gray-300 rounded-md shadow-sm"
              hoverable
              style={{
                width: "100%", // Full width in column
                maxWidth: "100%", // Ensure full width
                margin: "auto", // Center the card
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Row>
                <Col>
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <Image
                      alt={claim.foundItem.foundItemName}
                      src={claim?.foundItem?.photo}
                      width={200} // Adjust width for the image
                      height={200} // Adjust height for the image
                      style={{
                        objectFit: "cover",
                        
                      }}
                    />
                  </div>
                </Col>
                <Col span={16} style={{ paddingLeft: "16px" }}>
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
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(claim?.id)}
                  >
                    Delete Claim
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      
      )}
    </div>
  );
};

export default ClaimsPage;
