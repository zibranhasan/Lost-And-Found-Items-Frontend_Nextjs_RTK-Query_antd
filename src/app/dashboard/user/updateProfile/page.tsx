"use client";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/Api";
import { Modal, Spin } from "antd";
import React, { useState, useEffect } from "react";

interface ProfileData {
  name: string;
  bio: string;
  age: number;
}

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMyProfileQuery({});
  const [updateMyProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    bio: "",
    age: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    if (data?.response) {
      setProfileData({
        name: data.response.user.name,
        bio: data.response.bio,
        age: data.response.age,
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateMyProfile(profileData).unwrap();
      alert("Profile updated successfully!");
      setIsModalOpen(false); // Close the modal after successful update
    } catch (err) {
      console.error("Failed to update profile: ", err);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: "10px" }}>
        <Spin size="large" />
      </div>
    );
  }
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-red-500">
          Error fetching profile
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-10">
      <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          My Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Name</h2>
            <p className="text-xl text-gray-900">{profileData.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Bio</h2>
            <p className="text-xl text-gray-900">{profileData.bio}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Age</h2>
            <p className="text-xl text-gray-900">{profileData.age}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 text-lg font-medium text-white bg-indigo-500 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal for Update Form */}
      <Modal
        title="Update Profile"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="rounded-lg"
      >
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={profileData.age}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              style={{
                background: "linear-gradient(90deg, #001529 0%, #004d80 100%)",
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
