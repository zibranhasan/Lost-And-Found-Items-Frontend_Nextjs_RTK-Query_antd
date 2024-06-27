"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css"; // Ensure this path is correct
import logo from "@/assets/images/cover.png";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Decode the token to get the role
      const decoded: { role: string } = jwtDecode(token);
      setRole(decoded.role);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirect to the login page
    router.push("/login");
  };

  const handleDashboardClick = () => {
    if (role === "ADMIN") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} width={150} height={50} alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>

          {isLoggedIn && (
            <li>
              <a onClick={handleDashboardClick} style={{ cursor: "pointer" }}>
                My Dashboard
              </a>
            </li>
          )}
          <li>
            <Link href="/components/aboutUsPage">About Us</Link>
          </li>
          <li>
            <Link href="/components/HelpAndSupport">Help & Support</Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/login">Sign In</Link>
              </li>
              <li>
                <Link href="/register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
