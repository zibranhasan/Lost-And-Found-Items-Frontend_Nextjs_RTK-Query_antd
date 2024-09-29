"use client"; // Add this line to mark the file as a Client Component

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { Layout, Menu } from "antd"; // Import Ant Design components
import {
  UserOutlined,
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons"; // Import AntD Icons

const { Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      try {
        const decoded: { role: string } = jwtDecode(token);
        setRole(decoded.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/login");
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner if desired
  }

  const userMenuItems = [
    {
      key: "lost-item-reports",
      icon: <FileOutlined />,
      label: (
        <Link href="/dashboard/user/allLostAndItemReports">
          Lost Item Reports
        </Link>
      ),
    },
    {
      key: "found-item-reports",
      icon: <FileOutlined />,
      label: (
        <Link href="/dashboard/user/allFoundItemReports">
          Found Item Reports
        </Link>
      ),
    },
    {
      key: "report-lost-item",
      icon: <FileOutlined />,
      label: (
        <Link href="/dashboard/user/reportALostItemReports">
          Report A Lost Item
        </Link>
      ),
    },
    {
      key: "report-found-item",
      icon: <FileOutlined />,
      label: (
        <Link href="/dashboard/user/CreateAFoundItem">Report A Found Item</Link>
      ),
    },
    {
      key: "my-profile",
      icon: <UserOutlined />,
      label: "My Profile",
      children: [
        {
          key: "edit-profile",
          label: <Link href="/dashboard/user/updateProfile">Edit Profile</Link>,
        },
        {
          key: "change-password",
          label: (
            <Link href="/dashboard/user/changePassword">Change Password</Link>
          ),
        },
        {
          key: "my-claims",
          label: <Link href="/dashboard/user/myClaims">My Claim Requests</Link>,
        },
        {
          key: "my-lost-items",
          label: (
            <Link href="/dashboard/user/myLostItems">My Lost Requests</Link>
          ),
        },
        {
          key: "my-found-items",
          label: (
            <Link href="/dashboard/user/myFoundItems">My Found Items</Link>
          ),
        },
      ],
    },
  ];

  const adminMenuItems = [
    {
      key: "manage-user-accounts",
      icon: <SettingOutlined />,
      label: (
        <Link href="/dashboard/admin/manageUserAccounts">
          Manage User Accounts
        </Link>
      ),
    },
    {
      key: "view-recent-posts",
      icon: <FileOutlined />,
      label: "View Recent Posts",
      children: [
        {
          key: "view-recent-lost-item",
          label: (
            <Link href="/dashboard/admin/viewRecentLostItemReports">
              View Recent Lost Item Reports
            </Link>
          ),
        },
        {
          key: "view-recent-found-item",
          label: (
            <Link href="/dashboard/admin/viewRecentFoundItemReports">
              View Recent Found Item Reports
            </Link>
          ),
        },
      ],
    },
    {
      key: "admin-change-password",
      icon: <LogoutOutlined />,
      label: (
        <Link href="/dashboard/admin/changePassword">Change Password</Link>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            padding: "20px",
            color: "#fff",
            fontSize: "20px",
            textAlign: "center",
            backgroundColor: "#001529",
          }}
        >
          Dashboard
        </div>

        {/* Ant Design Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={role === "USER" ? userMenuItems : adminMenuItems}
        />
      </Sider>

      <Layout>
        <Content style={{ background: "#f0f2f5" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
