"use client";

import { useState } from "react";
import Head from "next/head";
import styles from "./login.module.scss";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^09\d{9}$/.test(phone);
    if (!isValid) {
      setError("شماره موبایل معتبر نیست");
      return;
    }
    setError("");

    setIsSubmitting(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.results[0]));
      Cookies.set("user", JSON.stringify(data.results[0].cell), { expires: 1 });
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError("خطا در ورود. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>ورود | احراز هویت</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome back</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="Example: 09123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              maxLength={11}
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
