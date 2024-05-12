import Hero from "./container/hero/hero";
import Image from "next/image";
import Navbar from "./components/navbar/navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar></Navbar>
      <Hero></Hero>
      {/* <Footer></Footer> */}
    </main>
  );
}
