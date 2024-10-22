"use client";

import { useGetMyProfileQuery } from "@/redux/api/Api";
import { Spin } from "antd";
import React from "react";

const ProfilePage = () => {
  const { data, isLoading, isError, error } = useGetMyProfileQuery({});

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <Spin size="large" />
      </div>
    );
  }
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">
          Error fetching profile
        </div>
      </div>
    );

  const profile = data?.response || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        {profile ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{profile.user.name}</h2>
            <p className="text-lg">
              <span className="font-medium">Email:</span> {profile.user.email}
            </p>
            <p className="text-lg">
              <span className="font-medium">Bio:</span> {profile.bio}
            </p>
            <p className="text-lg">
              <span className="font-medium">Age:</span> {profile.age}
            </p>
          </div>
        ) : (
          <p className="text-lg text-gray-600">No profile found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
