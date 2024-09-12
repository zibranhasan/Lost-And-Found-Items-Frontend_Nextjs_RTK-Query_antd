"use client";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/Api";
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
    } catch (err) {
      console.error("Failed to update profile: ", err);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold">Loading Profile...</div>
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-semibold text-red-500">
          Error fetching profile
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
