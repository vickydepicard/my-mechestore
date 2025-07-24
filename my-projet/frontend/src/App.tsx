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
import categories from '../../backend/data/categories.json';
import promoProd from '../../backend/data/promoProduct.json';
import TopCategoriesSection from './components/TopCategoriesSection';
import PromotionalBanner from './components/PromotionalBanner';
import TopSelectionFilter from './components/TopSelectionFilter'; // ✅ Import ajouté

function Home() {
  const filters = ['Nouveautés', 'Meilleures ventes', 'Tendance', 'Promotions']; // ✅ Liste des filtres

  const handleFilterChange = (filter: string) => {
    console.log("Filtre sélectionné :", filter); // ✅ Action au clic
  };

  return (
    <>
      <PromotionalBanner />
      <HeroSlider />
      <TopCategoriesSection categories={categories} />
      <TopSelectionFilter filters={filters} onFilterChange={handleFilterChange} /> {/* ✅ Ajout ici */}
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
          <Route path="/" element={<Home />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/category/:categorySlug/:itemSlug" element={<SubcategoryProductsPage />} />
        </Routes>

        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
