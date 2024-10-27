"use client";
import React from "react";
import { Table, Button, Tag, Card, Spin } from "antd";
import {
  useGetAllLostItemsQuery,
  useGetAllUsersDataQuery,
  useGetFoundItemsWithFilteringQuery,
  useUpdateUserStatusMutation,
} from "@/redux/api/Api";
import { useGetAllClaimQuery } from "@/redux/api/ClaimApi";
import { styled } from "@mui/material/styles";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const StyledCard = styled(Card)(({ theme }) => ({
  width: 220,
  height: 120,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "12px",
  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.2)`,
  background: "linear-gradient(135deg, #f0f4ff, #d9e8ff)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: `0 8px 30px rgba(0, 0, 0, 0.3)`,
  },
  "& h4": {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },
  "& p": {
    fontSize: "26px",
    fontWeight: "700",
    color: theme.palette.primary.main,
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  margin: "10px",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: `0 2px 15px rgba(0, 0, 0, 0.2)`,
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
  },
}));

const UserList = () => {
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = useGetAllUsersDataQuery({});
  const { data: claimData } = useGetAllClaimQuery(undefined);
  const { data: lostItem } = useGetAllLostItemsQuery({});
  const { data: foundItem } = useGetFoundItemsWithFilteringQuery({});

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      await updateUserStatus({ userId, status: { status: newStatus } });
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getUserClaims = (userId: string) => {
    return (
      claimData?.response?.filter((claim: any) => claim.userId === userId)
        .length || 0
    );
  };

  const getUserLostItems = (userId: string) => {
    return (
      lostItem?.response?.filter((item: any) => item.userId === userId)
        .length || 0
    );
  };

  const getUserFoundItems = (userId: string) => {
    return (
      foundItem?.response?.filter((item: any) => item.userId === userId)
        .length || 0
    );
  };

  if (isLoading) {
    return (
      <div style={{ padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-center">Error fetching users</div>;
  }

  // Calculate totals for the cards
  const totalClaims = claimData?.response?.length || 0;
  const totalLostItems = lostItem?.response?.length || 0;
  const totalFoundItems = foundItem?.response?.length || 0;

  // Data for the pie chart
  const chartData = [
    { name: "Lost Items", value: totalLostItems },
    { name: "Found Items", value: totalFoundItems },
    { name: "Claims", value: totalClaims },
  ];

  // Calculate additional statistics
  const totalUsers = usersData?.response?.length || 0;
  const activeUsers =
    usersData?.response?.filter((user: any) => user.status === "ACTIVE")
      .length || 0;
  const activeUserPercentage = ((activeUsers / totalUsers) * 100).toFixed(2);
  const averageClaimsPerUser = (totalClaims / totalUsers).toFixed(2);
  const itemsRatio =
    totalLostItems > 0
      ? ((totalFoundItems / totalLostItems) * 100).toFixed(2)
      : 0;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Claims",
      key: "claims",
      render: (_: any, user: any) => getUserClaims(user.id),
    },
    {
      title: "Lost Items",
      key: "lostItems",
      render: (_: any, user: any) => getUserLostItems(user.id),
    },
    {
      title: "Found Items",
      key: "foundItems",
      render: (_: any, user: any) => getUserFoundItems(user.id),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, user: any) => (
        <Button
          type="primary"
          danger={user.status === "ACTIVE"}
          onClick={() =>
            handleUpdateStatus(
              user.id,
              user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
            )
          }
        >
          {user.status === "ACTIVE" ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-around mb-6">
        <StyledCard title="Net Lost Items" bordered={false}>
          <p>{totalLostItems}</p>
        </StyledCard>
        <StyledCard title="Net Found Items" bordered={false}>
          <p>{totalFoundItems}</p>
        </StyledCard>
        <StyledCard title="Net Claims" bordered={false}>
          <p>{totalClaims}</p>
        </StyledCard>
      </div>

      {/* Additional Information Section */}
      <div className="flex justify-between mx-19 p-16">
        <InfoCard title="User Statistics">
          <p>
            <strong>Total Users:</strong> {totalUsers}
          </p>
          <p>
            <strong>Active Users:</strong> {activeUsers} ({activeUserPercentage}
            %)
          </p>
          <p>
            <strong>Average Claims/User:</strong> {averageClaimsPerUser}
          </p>
          <p>
            <strong>Found vs Lost Ratio:</strong> {itemsRatio}%
          </p>
        </InfoCard>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? "#ff7300"
                        : index === 1
                        ? "#387908"
                        : "#a3c2c2"
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={usersData?.response}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UserList;
