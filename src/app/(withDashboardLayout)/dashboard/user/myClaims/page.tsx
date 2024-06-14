"use client"; // This directive marks the file as a Client Component

import { useGetMyClaimsQuery } from "@/redux/api/userApi";
import React from "react";

const ClaimsPage = () => {
  const { data: claimsResponse, isLoading, error } = useGetMyClaimsQuery({});

  if (isLoading) return <div>Loading claims...</div>;
  if (error) return <div>Error fetching claims</div>;

  const claims = claimsResponse?.response || [];

  console.log("claims", claimsResponse);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">My Claims</h1>
      {claims.length === 0 ? (
        <div>No claims found.</div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim: any) => (
            <div
              key={claim.id}
              className="p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-2">
                {claim.foundItem.foundItemName}
              </h2>
              <p>
                <strong>Description:</strong> {claim.foundItem.description}
              </p>
              <p>
                <strong>Location:</strong> {claim.foundItem.location}
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
                <strong>Status:</strong> {claim.status}
              </p>
              <p>
                <strong>Category:</strong> {claim.foundItem.category.name}
              </p>
              <p>
                <strong>Reported by:</strong> {claim.foundItem.user.name} (
                {claim.foundItem.user.email})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimsPage;
