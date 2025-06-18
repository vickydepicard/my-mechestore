import React from "react";
import HeroSlider from './components/HeroSlider';
import Header from './components/Header';
import BestSellerSlider from './components/BestSellerSlider'
import NewArrivalsSlider from "./components/NewArrivalsSlider";
import USPs from "./components/USPs";
import BlogPreview from "./components/BlogPreview";
import InstagramCTA from "./components/InstagramCTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header/>
      <HeroSlider />
      <BestSellerSlider/>
      <NewArrivalsSlider />
      <USPs />
      <BlogPreview />
      <InstagramCTA />
      <Footer />
    </div>
  );
}

export default App;
