"use client";

import { useRouter } from "next/navigation";

import styles from "../page.module.css";
import { useEffect, useState } from "react";

export default function Logged() {
  // State
  const [user, setUser] = useState({});

  // Router
  const router = useRouter();

  /**
   * On logout
   */
  const onLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    // Return to home page
    router.push("/");
  };

  // Get session
  useEffect(() => {
    fetch("/api/getSession", { method: "POST" })
      .then((res) => {
        res
          .json()
          .then((body) => setUser(body.data))
          .catch(console.error);
      })
      .catch(console.error);
  }, []);

  /**
   * Render
   */
  return (
    <div className={styles.page}>
      <header className={styles.header}>NextJS-app-passport demo</header>
      <main className={styles.main}>
        <span>You are now logged!</span>
        <br />
        <br />
        <span>
          You can now <button onClick={onLogout}>Logout</button>
        </span>

        <div className={styles.userData}>
          User data:
          {Object.keys(user ?? {}).map((key) => (
            <span key={key}>
              {key}: {user[key as keyof typeof user]}
            </span>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://www.2ltech.fr/" target="_blank">
          2LTech
        </a>
        {/**/}
        &copy; - All rights reserved
      </footer>
    </div>
  );
}
