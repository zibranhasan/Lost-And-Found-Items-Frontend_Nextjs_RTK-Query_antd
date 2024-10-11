"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, Button } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [role, setRole] = useState<string | null>(null);
  const userInfo = useSelector((state: RootState) => state.auth.user);

  // Monitor token and role from userInfo
  useEffect(() => {
    if (userInfo?.token) {
      try {
        const decoded: { role: string } = jwtDecode(userInfo.token);
        setRole(decoded.role); // Set role based on token
      } catch (error) {
        console.error("Invalid token:", error);
        setRole(null);
      }
    } else {
      setRole(null); // If no token, reset role
    }
  }, [userInfo]);

  // Handle logout and redirect to login page
  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state and token
    localStorage.removeItem("token");
    router.push("/login"); // Redirect to login page
  };

  // Redirect to the correct dashboard based on role
  const handleDashboardClick = () => {
    if (role === "ADMIN") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  };

  // Menu items for the navigation bar
  const menuItems: any[] = [
    { label: <Link href="/">Home</Link>, key: "home", icon: <HomeOutlined /> },
    {
      label: <Link href="/components/aboutUsPage">About Us</Link>,
      key: "about",
      icon: <InfoCircleOutlined />,
    },
    {
      label: <Link href="/components/HelpAndSupport">Help & Support</Link>,
      key: "help",
      icon: <PhoneOutlined />,
    },
    userInfo?.token
      ? {
          label: (
            <Button
              type="link"
              onClick={handleDashboardClick}
              style={{
                cursor: "pointer",
              }}
            >
              Dashboard
            </Button>
          ),
          key: "dashboard",
          icon: <DashboardOutlined />,
        }
      : null,
    !userInfo?.token
      ? {
          label: (
            <Link href="/login">
              <Button
                type="link"
                style={{
                  padding: "0",
                  color: "inherit",
                }}
              >
                Sign In
              </Button>
            </Link>
          ),
          key: "login",
        }
      : null,
    !userInfo?.token
      ? {
          label: (
            <Link href="/register">
              <Button
                type="link"
                style={{
                  padding: "0",
                  color: "inherit",
                }}
              >
                Sign Up
              </Button>
            </Link>
          ),
          key: "register",
        }
      : null,
    userInfo?.token
      ? {
          label: (
            <Button
              type="link"
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                color: "inherit",
              }}
            >
              Logout
            </Button>
          ),
          key: "logout",
          icon: <LogoutOutlined />,
        }
      : null,
  ].filter((item): item is Exclude<typeof item, null> => item !== null); // Explicitly filter out null values

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#001529",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        color: "#fff",
        margin: "0",
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: "bold",
          color: "#fff",
          flex: 1,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        <p style={{ margin: 0 }}>L&F Items</p>
      </div>

      {/* Navigation Links */}
      <nav
        style={{
          flex: 3,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={[pathname.split("/")[1]]}
          items={menuItems}
          theme="dark"
          style={{
            backgroundColor: "transparent",
            borderBottom: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
            fontFamily: "'Poppins', sans-serif",
            color: "white",
          }}
        />
      </nav>
    </header>
  );
};

export default Header;
