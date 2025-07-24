// Header.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiSearch, FiChevronDown } from 'react-icons/fi';
import { CartContext } from './CartContext';
import CartModal from './CartModal';
import logo from '../assets/images/logo.png';

interface Category { name: string; slug: string; }
interface Subcat { parent: string; parentSlug: string; name: string; slug: string; }

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const [showCart, setShowCart] = useState(false);
  const { getCartCount } = useContext(CartContext);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcatsByParent, setSubcatsByParent] = useState<Record<string, Subcat[]>>({});

  const toSlug = (s: string) => s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
    .replace(/-+/g, '-');

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);

    fetch('/api/subcategories')
      .then(res => res.json())
      .then((data: Subcat[]) => {
        const grouped: Record<string, Subcat[]> = {};
        data.forEach(sc => {
          const key = toSlug(sc.parentSlug);
          grouped[key] = grouped[key] || [];
          grouped[key].push(sc);
        });
        setSubcatsByParent(grouped);
      })
      .catch(console.error);
  }, []);

  const toggleSubMenu = (slug: string) => {
    setOpenSubMenus(prev => {
      const isOpen = !!prev[slug];
      return isOpen ? {} : { [slug]: true };
    });
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <div className="hidden md:flex bg-pink-100 text-black text-sm justify-center space-x-8 py-2">
          <span>Livraison offerte dès 50 000 FCFA</span>
          <span>Service client : 00237 69 17 06</span>
          <span>Satisfait ou remboursé</span>
          <span>Avis moyenne 4.7/5</span>
        </div>

        <nav className="bg-pink-500 text-white flex items-center justify-between px-4 md:px-12 py-3">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-12 object-contain mx-auto md:mx-0" />
          </Link>

          <ul className="hidden md:flex space-x-6 text-base font-medium">
            {categories.map(cat => {
              const catKey = toSlug(cat.slug);
              const subs = subcatsByParent[catKey] || [];
              const isOpen = !!openSubMenus[catKey];

              return (
                <li key={cat.slug} className="relative">
                  <div className="flex items-center space-x-1">
                    <Link
                      to={`/category/${cat.slug}`}
                      className="hover:text-pink-300 transition-colors"
                    >
                      {cat.name}
                    </Link>

                    {subs.length > 0 && (
                      <button
                        onClick={e => { e.preventDefault(); toggleSubMenu(catKey); }}
                        aria-expanded={isOpen}
                        aria-controls={`submenu-${catKey}`}
                        className="text-white hover:text-pink-300 focus:outline-none"
                        aria-label={`Ouvrir le sous-menu de ${cat.name}`}
                      >
                        <FiChevronDown
                          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                          size={18}
                        />
                      </button>
                    )}
                  </div>

                  {isOpen && subs.length > 0 && (
                    <ul
                      id={`submenu-${catKey}`}
                      className="absolute left-0 top-full mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-50"
                      onMouseLeave={() => setOpenSubMenus({})}
                    >
                      {subs.map(s => (
                        <li key={s.slug}>
                          <Link
                            to={`/category/${cat.slug}/${s.slug}`}
                            className="block px-4 py-2 hover:bg-pink-100 hover:text-pink-700 transition-colors rounded"
                            onClick={() => setOpenSubMenus({})}
                          >
                            {s.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center space-x-4">
            <button aria-label="Rechercher" className="text-white hover:text-pink-300">
              <FiSearch size={20} />
            </button>

            <div
              onClick={() => setShowCart(true)}
              className="relative cursor-pointer hover:text-pink-300"
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') setShowCart(true); }}
            >
              <FiShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-pink-600 text-xs text-white rounded-full">
                  {getCartCount()}
                </span>
              )}
            </div>

            <button
              className="md:hidden text-white hover:text-pink-300"
              onClick={() => setOpenMobile(prev => !prev)}
              aria-label="Menu mobile"
              aria-expanded={openMobile}
            >
              {openMobile ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </nav>

        {openMobile && (
          <div className="md:hidden bg-pink-500 text-white shadow-md">
            <ul className="py-4 px-6 space-y-4 font-medium">
              {categories.map(cat => {
                const catKey = toSlug(cat.slug);
                const subs = subcatsByParent[catKey] || [];
                const isExpanded = !!openSubMenus[catKey];

                return (
                  <li key={cat.slug}>
                    <div
                      className="flex items-center justify-between cursor-pointer select-none"
                      onClick={() => (subs.length ? toggleSubMenu(catKey) : setOpenMobile(false))}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          if (subs.length) toggleSubMenu(catKey);
                          else setOpenMobile(false);
                        }
                      }}
                    >
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={() => setOpenMobile(false)}
                        className="font-semibold"
                      >
                        {cat.name}
                      </Link>
                      {subs.length > 0 && (
                        <FiChevronDown className={`transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
                      )}
                    </div>

                    {isExpanded && subs.length > 0 && (
                      <ul className="pl-4 mt-2 space-y-2 bg-white rounded-md shadow-inner">
                        {subs.map(s => (
                          <li key={s.slug}>
                            <Link
                              to={`/category/${cat.slug}/${s.slug}`}
                              onClick={() => setOpenMobile(false)}
                              className="block px-4 py-2 text-black"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>

      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />
      <div className="h-[calc(32px+48px+32px)] md:h-[calc(32px+64px+32px)]" />
    </>
  );
}
