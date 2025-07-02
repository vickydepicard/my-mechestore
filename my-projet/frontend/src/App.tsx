import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";

import ProductDetail from "./components/ProductDetail";
import CategoryView from './components/CategoryView';
import CategoryPage from './components/CategoryPage';
import HeroSlider from './components/HeroSlider';
import BestSellerSlider from './components/BestSellerSlider';
import NewArrivalsSlider from "./components/NewArrivalsSlider";
import USPs from "./components/USPs";
import BlogPreview from "./components/BlogPreview";
import InstagramCTA from "./components/InstagramCTA";
import SubcategoryPage from './components/SubcategoryPage';
import SubcategoryProductsPage from './components/SubcategoryProductsPage'

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

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />

        <Routes>
          {/* Accueil */}
          <Route path="/" element={<Home />} />

          {/* Détail produit */}
          <Route path="/produit/:id" element={<ProductDetail />} />

          {/* Page des sous-catégories pour une catégorie donnée */}
          <Route path="/category/:categorySlug" element={<CategoryPage />} />

          {/* Page listant les produits d’une sous-catégorie */}
          <Route
            path="/category/:categorySlug/:itemSlug"
            element={<SubcategoryProductsPage />}
          />

          {/* Page 404 si besoin */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>

        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
