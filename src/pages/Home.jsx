import React from "react";
import NavbarProfile from "../components/NavbarProfile"; // Ubah import
import Hero from "../components/Hero";
import About from "../components/About";
import MostViewed from "../components/MostViewed";
import WhyChooseUs from "../components/WhyChooseUs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <NavbarProfile /> {/* Ubah penggunaan */}
      <Hero />
      <About />
      <MostViewed />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </>
  );
}
