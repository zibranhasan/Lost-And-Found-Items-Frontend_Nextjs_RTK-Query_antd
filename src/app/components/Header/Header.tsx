"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css"; // Create and import your CSS module
import logo from "@/assets/images/cover.png";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirect to the home page or login page
    // router.push("/login");
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

          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login">Login/Register</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
