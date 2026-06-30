"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function Home() {
  // State
  const [error, setError] = useState<string>();
  const [alert, setAlert] = useState<React.ReactElement>();
  const [user, setUser] = useState();

  // Router
  const router = useRouter();

  /**
   * On login
   * @param data Form data
   */
  const onLogin = async (data: FormData) => {
    const username = data.get("username");
    const password = data.get("password");

    // API call for login route
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    // Check body
    const body = await res.json();
    if (body.ok === true) {
      // Login ok -> go to logged page
      setError(undefined);
      setAlert(undefined);
      router.push("/logged");
    } else {
      setError("Login failed");
      setAlert(
        <>
          Correct login values:
          <br />
          username: demo
          <br />
          password: 1234
        </>,
      );
    }
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
      <div className={styles.alert}>{alert}</div>
      <header className={styles.header}>NextJS-app-passport demo</header>
      <main className={styles.main}>
        {user ? (
          <span>
            You are already logged... Go to <a href="/logged">Logged page</a>
          </span>
        ) : (
          <form action={onLogin}>
            <span>Login page</span>
            <input placeholder="Username" name="username" type="text" />
            <input placeholder="Password" name="password" type="password" />
            <button type="submit">Login</button>
            <span className={styles.error}>{error}</span>
          </form>
        )}
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
