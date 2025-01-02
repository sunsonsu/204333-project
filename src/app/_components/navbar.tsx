import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-dark-blue text-yellow-500 shadow-md py-3 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Brand */}
        <div className="text-2xl font-bold ml-2">
          Currency Exchange
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li className="nav-item">
            <a 
              href="#home" 
              className="hover:text-yellow-300 transition duration-300"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#about" 
              className="hover:text-yellow-300 transition duration-300"
            >
              Favorite
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#services" 
              className="hover:text-yellow-300 transition duration-300"
            >
              Services
            </a>
          </li>
          <li className="nav-item">
            <a 
              href="#contact" 
              className="hover:text-yellow-300 transition duration-300"
            >
              Log Out
            </a>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-yellow-500 text-3xl cursor-pointer">
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
