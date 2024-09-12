"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import styles from "./DashboardLayout.module.css"; // Corrected path
import Header from "../components/Header/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      const decoded: { role: string } = jwtDecode(token);
      setRole(decoded.role);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <div className={styles.main}>
        {/* Navigation Links */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {role === "USER" && (
              <>
                <li className={styles.navItem}>
                  <Link
                    href="/dashboard/user/allLostAndItemReports"
                    className={styles.navLink}
                  >
                    Lost Item Reports
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/dashboard/user/allFoundItemReports"
                    className={styles.navLink}
                  >
                    Found Item Reports
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/dashboard/user/reportALostItemReports"
                    className={styles.navLink}
                  >
                    Report A Lost Item
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/dashboard/user/CreateAFoundItem"
                    className={styles.navLink}
                  >
                    Report A Found Item
                  </Link>
                </li>
                <li className={`${styles.navItem} ${styles.hasSubNav}`}>
                  <Link
                    href="/dashboard/user/myProfile"
                    className={styles.navLink}
                  >
                    My Profile
                  </Link>
                  <ul className={styles.subNavList}>
                    <li className={styles.subNavItem}>
                      <Link
                        href="/dashboard/user/updateProfile"
                        className={styles.subNavLink}
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li className={styles.subNavItem}>
                      <Link
                        href="/dashboard/user/changePassword"
                        className={styles.subNavLink}
                      >
                        Change Password
                      </Link>
                    </li>
                    <li className={styles.subNavItem}>
                      <Link
                        href="/dashboard/user/myClaims"
                        className={styles.subNavLink}
                      >
                        My Claim Requests
                      </Link>
                    </li>
                    <li className={styles.subNavItem}>
                      <Link
                        href="/dashboard/user/myLostItems"
                        className={styles.subNavLink}
                      >
                        My Lost Requests
                      </Link>
                    </li>
                    <li className={styles.subNavItem}>
                      <Link
                        href="/dashboard/user/myFoundItems"
                        className={styles.subNavLink}
                      >
                        My Found Items
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {role === "ADMIN" && (
              <>
                <li className={styles.navItem}>
                  <Link
                    href="/dashboard/admin/manageUserAccounts"
                    className={styles.navLink}
                  >
                    Manage User Accounts
                  </Link>
                </li>
                <li className={`${styles.navItem} ${styles.hasSubNav}`}>
                  <div className={styles.navLink}>View Recent Posts</div>
                  <ul className={styles.subNavList}>
                    <li className={styles.subNavItem}>
                      <Link
                        href="/dashboard/admin/viewRecentLostItemReports"
                        className={styles.subNavLink}
                      >
                        View Recent Lost Item Reports
                      </Link>
                    </li>
                    <li className={styles.subNavItem}>
                      <Link
                        href="/dashboard/admin/viewRecentFoundItemReports"
                        className={styles.subNavLink}
                      >
                        View Recent Found Item Reports
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={styles.navItem}>
                  <Link
                    href="/dashboard/admin/changePassword"
                    className={styles.navLink}
                  >
                    Change Password
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Page Content */}
        <main className={styles.content}>{children}</main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} My Application. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
