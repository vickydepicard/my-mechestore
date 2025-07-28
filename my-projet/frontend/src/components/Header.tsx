import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
} from 'react-icons/fi';
import { CartContext } from './CartContext';
import CartModal from './CartModal';
import { useAuth } from './pages/connect/authContext';
import axios from 'axios';

interface Category {
  name: string;
  slug: string;
}

interface Subcategory {
  name: string;
  slug: string;
  parentSlug: string;
}

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subcatRes] = await Promise.all([
          axios.get('/api/categories'),
          axios.get('/api/subcategories'),
        ]);
        setCategories(catRes.data);
        setSubcategories(subcatRes.data);
      } catch (error) {
        console.error('Erreur chargement catégories :', error);
      }
    };
    fetchData();
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleCart = () => setCartOpen(!isCartOpen);
  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold">
          MECHES STORE
        </Link>

        {/* Menu principal */}
        <nav className="hidden md:flex gap-6 items-center">
          {categories.map((cat) => (
            <div key={cat.slug} className="relative group">
              <Link
                to={`/category/${cat.slug}`}
                className="hover:text-pink-500 font-semibold flex items-center gap-1 text-sm"
              >
                {cat.name}
                <FiChevronDown />
              </Link>
              <div className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white shadow-lg rounded-md p-2 z-50 min-w-[180px]">
                {subcategories
                  .filter((s) => s.parentSlug === cat.slug)
                  .map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/category/${cat.slug}/${sub.slug}`}
                      className="block px-3 py-2 text-sm hover:bg-pink-100 rounded"
                    >
                      {sub.name}
                    </Link>
                  ))}
              </div>
            </div>
          ))}

          {/* Utilisateur */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-1 hover:text-pink-500"
            >
              <FiUser />
              <FiChevronDown />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 z-50 min-w-[160px]">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm hover:bg-pink-100"
                    >
                      Connexion
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm hover:bg-pink-100"
                    >
                      Inscription
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm hover:bg-pink-100"
                    >
                      Tableau de bord
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                    >
                      Déconnexion
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Icônes actions */}
        <div className="flex items-center gap-4">
          {/* Panier */}
          <button onClick={toggleCart} className="relative">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Menu mobile */}
          <button onClick={toggleMobileMenu} className="md:hidden">
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-2">
          {categories.map((cat) => (
            <div key={cat.slug}>
              <Link
                to={`/category/${cat.slug}`}
                className="block font-semibold mb-1"
              >
                {cat.name}
              </Link>
              {subcategories
                .filter((s) => s.parentSlug === cat.slug)
                .map((sub) => (
                  <Link
                    key={sub.slug}
                    to={`/category/${cat.slug}/${sub.slug}`}
                    className="block text-sm ml-4 mb-1"
                  >
                    {sub.name}
                  </Link>
                ))}
            </div>
          ))}
          {!user ? (
            <>
              <Link to="/login" className="block mt-2 text-pink-600">
                Connexion
              </Link>
              <Link to="/register" className="block text-pink-600">
                Inscription
              </Link>
            </>
          ) : (
            <>
              <Link to="/account" className="block mt-2">
                Tableau de bord
              </Link>
              <button onClick={handleLogout} className="block text-red-600">
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}

      {/* Modal panier */}
      <CartModal isOpen={isCartOpen} onClose={toggleCart} />
    </header>
  );
};

export default Header;
