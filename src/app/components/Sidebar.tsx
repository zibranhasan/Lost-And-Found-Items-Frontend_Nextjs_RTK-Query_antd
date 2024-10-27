import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TUser } from "@/redux/features/authSlice";
import {
  UserOutlined,
  FileOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const userMenuItems = [
  {
    key: "lost-item-reports",

    label: (
      <Link href="/dashboard/user/allLostAndItemReports">
        Lost Item Reports
      </Link>
    ),
    icon: <FileOutlined />,
  },
  {
    key: "found-item-reports",
    icon: <FileOutlined />,
    label: (
      <Link href="/dashboard/user/allFoundItemReports">Found Item Reports</Link>
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
    key: "Dashboard",
    icon: <UserOutlined />,
    label: "Dashboard",
    children: [
      {
        key: "my-dashboard",
        label: <Link href="/dashboard/user/myDashboard">My Dashboard</Link>,
      },
      {
        key: "my-claims",
        label: <Link href="/dashboard/user/myClaims">My Claim Requests</Link>,
      },
      {
        key: "my-lost-items",
        label: <Link href="/dashboard/user/myLostItems">My Lost Items</Link>,
      },
      {
        key: "my-found-items",
        label: <Link href="/dashboard/user/myFoundItems">My Found Items</Link>,
      },
      {
        key: "my-profile",
        label: <Link href="/dashboard/user/updateProfile">My Profile</Link>,
      },
      {
        key: "change-password",
        label: (
          <Link href="/dashboard/user/changePassword">Change Password</Link>
        ),
      },
    ],
  },
];

const adminMenuItems = [
  {
    key: "Dashboard",
    icon: <SettingOutlined />,
    label: <Link href="/dashboard/admin/manageUserAccounts">Dashboard</Link>,
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
    label: <Link href="/dashboard/admin/changePassword">Change Password</Link>,
  },
];

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = (user as TUser)?.role || "";

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>

      {/* Add Menu Items */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        items={role === "USER" ? userMenuItems : adminMenuItems}
      />
    </Sider>
  );
};

export default Sidebar;
