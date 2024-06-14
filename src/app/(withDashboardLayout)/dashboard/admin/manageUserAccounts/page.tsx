"use client";

import React from "react";
import {
  useGetAllUsersDataQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/userApi"; // Adjust import as per your actual hook location

const UserList = () => {
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersDataQuery({});
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      console.log("{ userId, status: newStatus }", {
        userId,
        status: newStatus,
      });
      await updateUserStatus({ userId, status: { status: newStatus } });
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
      // Handle error
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {usersData?.response.map((user: any) => (
        <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500 mb-2">{user.email}</p>
          <p>Status: {user.status}</p>
          <div className="flex mt-4 space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${
                user.status === "ACTIVE"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
              onClick={() =>
                handleUpdateStatus(
                  user.id,
                  user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                )
              }
            >
              {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
