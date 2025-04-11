import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200 h-[70px]">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        <div className="text-2xl font-bold text-blue-800 tracking-tight">
          <Link to="/">Automobilių Nuoma</Link>
        </div>

        
        <div className="flex gap-6 text-sm text-blue-800 font-medium items-center">
          {user ? (
            <>
              <Link to="/mycars" className="hover:underline">Mano Automobiliai</Link>
              <Link to="/cars" className="hover:underline">Visi automobiliai</Link>
              <Link to="/rentals" className="hover:underline">Nuomos</Link>
              <button
                onClick={logout}
                className="hover:underline"
              >
                Atsijungti
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Prisijungti</Link>
              <Link to="/register" className="hover:underline">Registruotis</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
