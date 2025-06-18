import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import ProductDetail from "./components/ProductDetail";

// 👇 Composants de la page d'accueil
import HeroSlider from './components/HeroSlider';
import BestSellerSlider from './components/BestSellerSlider';
import NewArrivalsSlider from "./components/NewArrivalsSlider";
import USPs from "./components/USPs";
import BlogPreview from "./components/BlogPreview";
import InstagramCTA from "./components/InstagramCTA";

// ✅ Composant Home encapsulant la page d'accueil
function Home() {
  return (
    <>
      <HeroSlider />
      <BestSellerSlider />
      <NewArrivalsSlider />
      <USPs />
      <BlogPreview />
      <InstagramCTA />
    </>
  );
}

// ✅ Application principale avec routage
function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
