import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Ensure Footer Content is Visible */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          
          {/* Navigation Links */}
          <nav className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm md:text-base">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            <Link to="/register" className="hover:text-blue-400 transition-colors">Register</Link>
            <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link to="/termandconditions" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link>
          </nav>

          {/* Social Media Icons (Ensure Visibility) */}
          <div className="flex gap-5 justify-center">
            {/* Twitter */}
            <a href="#" className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045C7.384 8.46 3.756 6.5 1.327 3.521c-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="text-gray-400 hover:text-red-500 transition transform hover:scale-110">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="text-gray-400 hover:text-blue-600 transition transform hover:scale-110">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
          
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright Section */}
        <aside className="text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} ACME Industries Ltd. All rights reserved.</p>
        </aside>

      </div>
    </footer>
  );
};

export default Footer;
