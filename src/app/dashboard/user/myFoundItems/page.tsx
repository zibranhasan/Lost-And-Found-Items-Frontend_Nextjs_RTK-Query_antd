"use client";

import { useGetMyFoundItemsQuery } from "@/redux/api/Api";
import React, { useState } from "react";
import Image from "next/image"; // Import the Image component
import {
  useGetAllClaimQuery,
  useUpdateClaimsMutation,
} from "@/redux/api/ClaimApi";
import { Button, Modal, Select, Spin } from "antd";

const FoundItemsPage = () => {
  const { data, isLoading, isError } = useGetMyFoundItemsQuery({});
  const { data: claimsResponse } = useGetAllClaimQuery({});
  const [updateClaimStatus] = useUpdateClaimsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }
  if (isError) return <div>Error fetching found items</div>;

  const foundItems = data?.response || [];
  const claims = claimsResponse?.response || [];
  const claimsLength = (itemId: string) => {
    return claims.filter((claim: any) => claim.foundItemId === itemId).length;
  };

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = async (claimId: string, status: string) => {
    console.log("claimId: string, status: string", { id: claimId, status });
    try {
      await updateClaimStatus({ id: claimId, status }).unwrap();
      alert("Claim status updated successfully");
    } catch (Error) {
      alert("Error updating claim status: " + Error);
    }
  };

  return (
    <div>
      {foundItems.length === 0 ? (
        <p>No found items found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            padding: "10px",
          }}
        >
          {foundItems.map((item: any) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
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
                    marginBottom: "5px",
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
              <Button style={{marginTop:"5px"}} type="primary" onClick={() => handleOpenModal(item)}>View Claims for This Item<span style={{ marginLeft: "0px" }}>{claimsLength(item.id)}</span>
              </Button>

            </div>
          ))}
        </div>
      )}

      <Modal
        title={`Claims for ${selectedItem?.foundItemName}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {claims
          .filter((claim: any) => claim.foundItemId === selectedItem?.id)
          .map((claim: any) => (
            <div
              key={claim.id}
              style={{
                marginBottom: "16px",
                padding: "16px",
                borderRadius: "8px",
                background: "#f9f9f9",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                Claim by: {claim?.foundItem?.user?.name}
              </h3>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      claim.status === "APPROVED"
                        ? "#52c41a"
                        : claim.status === "REJECTED"
                        ? "#ff4d4f"
                        : "#faad14",
                    fontWeight: "bold",
                  }}
                >
                  {claim.status}
                </span>
              </p>
              <p>
                <strong>Distinguishing Features:</strong>{" "}
                {claim.distinguishingFeatures}
              </p>
              <p>
                <strong>Lost Date:</strong>{" "}
                {new Date(claim.lostDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Verification Method:</strong>{" "}
                {claim.verificationMethod.includes("http") ? (
                  <Image
                    src={claim.verificationMethod}
                    alt="Verification Photo"
                    width={150}
                    height={150}
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  claim.verificationMethod
                )}
              </p>
              <p>
                <strong>Verification Details:</strong>{" "}
                {claim.verificationDetails}
              </p>
              <p>
                <strong>Contact Information:</strong> {claim.contactInformation}
              </p>

              <Select
                defaultValue={claim.status}
                style={{ width: 150 }}
                onChange={(value) => handleUpdateStatus(claim.id, value)}
              >
                <Select.Option value="PENDING">Pending</Select.Option>
                <Select.Option value="APPROVED">Approved</Select.Option>
                <Select.Option value="REJECTED">Rejected</Select.Option>
              </Select>
            </div>
          ))}
      </Modal>
    </div>
  );
};

export default FoundItemsPage;
