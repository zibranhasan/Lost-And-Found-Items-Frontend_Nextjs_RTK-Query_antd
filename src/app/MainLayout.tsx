"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Layout, Menu, Row, Col, Typography, Button, Drawer } from "antd";
import Sidebar from "./components/Sidebar";
import Link from "next/link";
import Footer from "./components/Footer/Footer";
import { logout } from "@/redux/features/authSlice";
import Router from "next/router";

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
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout()); // Clear Redux state and token

    Router.push("/"); // Redirect to login page
  };

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
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header style={{ backgroundColor: "#001529" }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ width: "100%", height: "63px" }}
        >
          <Col lg={8}>
            <Title
              level={3}
              style={{ color: "white", margin: 0, fontSize: "25px" }}
            >
              <Link href="/" style={{ color: "white" }}>
                F&L items
              </Link>
            </Title>
          </Col>
          <Col xs={1} sm={1} md={16} lg={8}>
            <Menu
              theme="dark"
              mode="horizontal"
              items={menuItems}
              style={{ lineHeight: "56px", borderBottom: "none" }}
            />
          </Col>
          <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
          >
            <Menu theme="light" mode="vertical" items={menuItems} />
          </Drawer>
        </Row>
      </Header>
      <Layout style={{ flex: 1, display: "flex" }}>
        {user && <Sidebar />}
        <Content style={{ flex: 1, margin: 0, background: "#f0f2f5" }}>
          {children}
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}
