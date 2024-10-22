"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Input, Card, Row, Col, Spin, Alert } from "antd";
import axios from "axios";
import {
  useCreateClaimMutation,
  useGetAllClaimQuery,
} from "@/redux/api/ClaimApi";
import { useGetFoundItemsWithFilteringQuery } from "@/redux/api/Api";
import Meta from "antd/es/card/Meta";
import Image from "next/image";

const AllFoundItem = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    foundItemId: "",
    distinguishingFeatures: "",
    lostDate: "",
    verificationMethod: "",
    verificationDetails: "",
    contactInformation: "",
  });
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [image, setImage] = useState<File | null>(null); // State for image
  const [loading, setLoading] = useState(false); // Loading state for submission

  const { data, isLoading, error } = useGetFoundItemsWithFilteringQuery({});
  const { data: userClaims } = useGetAllClaimQuery(""); // Fetch the user's claims
  const [createClaim] = useCreateClaimMutation();


  useEffect(() => {
    if (data?.response) {
      const filtered = data.response.filter((item: any) => {
        const searchMatch = item.foundItemName
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const categoryMatch =
          filters.category === "" || item.category.name === filters.category;
        const locationMatch =
          filters.location === "" ||
          item.location.toLowerCase().includes(filters.location.toLowerCase());

        return searchMatch && categoryMatch && locationMatch;
      });
      setFilteredItems(filtered);
    }
  }, [filters, data]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted
    try {
      let imageUrl = "";
      if (image) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", image);

        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=963ca9297bc7cea248773301a33b8428",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageUrl = response.data.data.display_url;
      }

      const convertedLostDate = new Date(formData.lostDate);

      await createClaim({
        ...formData,
        lostDate: convertedLostDate, // Send as DateTime
        foundItemId: selectedItem?.id,
        verificationMethod: imageUrl, // Attach the image URL
      }).unwrap();

      alert("Claim created successfully");
      setIsModalOpen(false);

      setFormData({
        foundItemId: "",
        distinguishingFeatures: "",
        lostDate: "",
        verificationMethod: "",
        verificationDetails: "",
        contactInformation: "",
      });
      setImage(null);
    } catch (error: any) {
      alert("Error creating claim: " + error.message);
    } finally {
      setLoading(false); // Stop loading after the submission process
    }
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const hasClaimedItem = (foundItemId: string) => {
    return userClaims?.response?.some(
      (claim: any) => claim.foundItemId === foundItemId
    );
  };

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message="Error fetching items" type="error" />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Found Items</h1>
        <Input.Search
          placeholder="Search items..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          style={{ width: 200 }}
        />
      </div>

      <Row gutter={[16, 16]}>
        {filteredItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              hoverable
              style={{
                width: "220px",
                height: "300px", // Fixed card height for consistency
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden", // Prevent content overflow
              }}
              cover={
                <div style={{ height: "150px", overflow: "hidden" }}>
                  <Image
                    alt={item.foundItemName}
                    src={item.photo}
                    width={220}
                    height={150} // Consistent image size
                    style={{ objectFit: "cover" }}
                  />
                </div>
              }
            >
              <Meta
                title={item.foundItemName}
                description={item.location}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis", // Truncate long text
                }}
              />
            <Button
  style={{
    background: hasClaimedItem(item.id)
      ? "#d9d9d9"
      : "linear-gradient(90deg, #001529 0%, #004d80 100%)", // Use 'background' for gradient
    color: hasClaimedItem(item.id) ? "#000" : "#fff",
    borderRadius: "4px",
    border: "none",
    fontWeight: "bold",
    marginTop: "10px", // Margin for spacing
    alignSelf: "center", // Center the button
  }}
  onClick={() => openModal(item)}
  disabled={hasClaimedItem(item.id)}
>
  {hasClaimedItem(item.id) ? "Claimed" : "Claim"}
</Button>

            </Card>
          </Col>
        ))}
      </Row>

      {selectedItem && (
        <Modal
          title="Claim Found Item"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <InputField
              label="Distinguishing Features"
              name="distinguishingFeatures"
              value={formData.distinguishingFeatures}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  distinguishingFeatures: e.target.value,
                })
              }
              required
            />
            <InputField
              label="Lost Date"
              type="date"
              name="lostDate"
              value={formData.lostDate}
              onChange={(e) =>
                setFormData({ ...formData, lostDate: e.target.value })
              }
              required
            />
            <InputField
              label="Verification Details"
              name="verificationDetails"
              value={formData.verificationDetails}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  verificationDetails: e.target.value,
                })
              }
              required
            />
            <InputField
              label="Contact Information"
              name="contactInformation"
              value={formData.contactInformation}
              onChange={(e) =>
                setFormData({ ...formData, contactInformation: e.target.value })
              }
              required
            />
            <div>
              <label>Upload Verification Method (Photo):</label>
              <input type="file" onChange={handleImageChange} />
            </div>
            {loading ? (
              <div className="text-center font-medium">Creating claim...</div> // Display loading message
            ) : (
              <Button type="primary" htmlType="submit" className="w-full">
                Submit Claim
              </Button>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

// Reusable InputField Component
const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full"
    />
  </div>
);

export default AllFoundItem;
