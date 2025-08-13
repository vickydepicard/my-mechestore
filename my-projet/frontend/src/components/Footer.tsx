
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4 text-white">Contact</h4>
          <p>Marche Mboppi,<br />Douala , Cameroun</p>
          <p>Service client : +2376 91 70 60 06</p>
          <p>Email : contact@maison-des-meches.depicard.com</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Liens</h4>
          <ul className="space-y-2">
            <li><a href="/conditions" className="hover:text-white">CGV</a></li>
            <li><a href="/mentions-legales" className="hover:text-white">Mentions légales</a></li>
            <li><a href="/politique-cookies" className="hover:text-white">Cookies</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Mon compte</h4>
          <ul className="space-y-2">
            <li><a href="/login" className="hover:text-white">Connexion</a></li>
            <li><a href="/register" className="hover:text-white">Inscription</a></li>
            <li><a href="/orders" className="hover:text-white">Mes commandes</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Suivez-nous</h4>
          <div className="flex space-x-4">
            <a href="https://instagram.com/la_maison_des_meches" className="hover:text-white">IG</a>
            <a href="https://facebook.com" className="hover:text-white">FB</a>
            <a href="https://facebook.com" className="hover:text-white">TK</a>
            <a href="https://facebook.com" className="hover:text-white">MG</a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-center py-4">
        © {new Date().getFullYear()} Maison des Mèches – Tous droits réservés
      </div>
    </footer>
  );
}
