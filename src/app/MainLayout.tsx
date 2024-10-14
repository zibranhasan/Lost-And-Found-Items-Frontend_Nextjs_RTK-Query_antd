"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Layout, Menu, Row, Col, Typography, Button, Drawer } from "antd";
import Sidebar from "./components/Sidebar";
import Link from "next/link";
import Footer from "./components/Footer/Footer";
import { logout } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Clear Redux state and token
  };
  useEffect(() => {
    // Ensure redirection happens only on the client side
    if (!user?.token) {
      router.replace("/"); // Use `router.replace` to redirect
    }
  }, [user?.token, router]);
  const menuItems = [
    { label: <Link href="/">Home</Link>, key: "home" },
    {
      label: <Link href="/components/aboutUsPage">About Us</Link>,
      key: "about",
    },
    {
      label: <Link href="/components/HelpAndSupport">Help & Support</Link>,
      key: "help",
    },
    !user?.token
      ? {
          label: (
            <Link href="/login">
              <Button type="link" style={{ padding: 0, color: "inherit" }}>
                Sign In
              </Button>
            </Link>
          ),
          key: "login",
        }
      : null,
    !user?.token
      ? {
          label: (
            <Link href="/register">
              <Button type="link" style={{ padding: 0, color: "inherit" }}>
                Sign Up
              </Button>
            </Link>
          ),
          key: "register",
        }
      : null,
    user?.token
      ? {
          label: (
            <Button
              type="link"
              onClick={() => handleLogout()}
              style={{ cursor: "pointer", color: "inherit" }}
            >
              Logout
            </Button>
          ),
          key: "logout",
        }
      : null,
  ].filter(Boolean); // Remove null items

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        style={{
          background: "linear-gradient(90deg, #001529 0%, #004d80 100%)", // Gradient background
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ width: "100%", height: "63px" }}
        >
          {/* Logo Section */}
          <Col lg={8}>
            <Title
              level={3}
              style={{
                color: "white",
                margin: 0,
                fontSize: "25px",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)", // Text shadow for logo
              }}
            >
              <Link href="/" style={{ color: "white", textDecoration: "none" }}>
                F&L Items
              </Link>
            </Title>
          </Col>

          {/* Menu Section */}
          <Col xs={1} sm={1} md={16} lg={8}>
            <Menu
              theme="dark"
              mode="horizontal"
              items={menuItems}
              style={{
                lineHeight: "56px",
                borderBottom: "none",
                background: "transparent", // Remove default background
              }}
            />
          </Col>

          {/* Mobile Drawer for Menu */}
          <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <Menu
              theme="light"
              mode="vertical"
              items={menuItems}
              style={{
                background: "transparent",
                border: "none",
              }}
            />
          </Drawer>
        </Row>
      </Header>

      <Layout style={{ flex: 1, display: "flex" }}>
        {user && <Sidebar />}
        <Content style={{ flex: 1, margin: 0 }}>{children}</Content>
      </Layout>
      <Footer />
    </Layout>
  );
}
