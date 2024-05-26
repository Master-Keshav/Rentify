'use client'

import Hero from "./container/hero/hero";
import Navbar from "./components/navbar/navbar";
import styles from "./page.module.css";
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar></Navbar>
      <Hero></Hero>
    </main>
  );
}
