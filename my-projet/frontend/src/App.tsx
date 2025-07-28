// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/pages/connect/authContext";

import ProductDetail from "./components/ProductDetail";
import CategoryView from './components/CategoryView';
import CategoryPage from './components/CategoryPage';
import HeroSlider from './components/HeroSlider';
import BestSellerSlider from './components/BestSellerSlider';
import NewArrivalsSlider from "./components/NewArrivalsSlider";
import USPs from "./components/USPs";
import BlogPreview from "./components/BlogPreview";
import InstagramCTA from "./components/InstagramCTA";
import SubcategoryProductsPage from './components/SubcategoryProductsPage'
import categories from '../../backend/data/categories.json';
import TopCategoriesSection from './components/TopCategoriesSection';
import PromotionalBanner from './components/PromotionalBanner';
import TopSelectionFilter from './components/TopSelectionFilter';
import Checkout from './components/Checkout';
import PaymentPage from './components/PaymentPage';
import InvoicePage from './components/InvoicePage';
import Register from './components/pages/connect/Register';
import Login from './components/pages/connect/Login';
import Dashboard from './components/pages/connect/Dashboard';

function Home() {
  const filters = ['Nouveautés', 'Meilleures ventes', 'Tendance', 'Promotions'];

  const handleFilterChange = (filter: string) => {
    console.log("Filtre sélectionné :", filter);
  };

  return (
    <>
      <PromotionalBanner />
      <HeroSlider />
      <TopCategoriesSection categories={categories} />
      <TopSelectionFilter filters={filters} onFilterChange={handleFilterChange} />
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
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/category/:categorySlug" element={<CategoryPage />} />
            <Route path="/category/:categorySlug/:itemSlug" element={<SubcategoryProductsPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
            <Route path="/invoice/:orderId" element={<InvoicePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Dashboard />} />

          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
