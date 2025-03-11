import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main footer grid with sections */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Product Section */}
          <div>
            <h3 className="text-white font-medium text-base mb-4">Game</h3>
            <ul className="space-y-2">
              <li><Link to="/home" className="text-gray-400 hover:text-white text-sm">Dashboard</Link></li>
              <li><Link to="/inventory" className="text-gray-400 hover:text-white text-sm">Inventory</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white text-sm">Shop</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white text-sm">How It Works</Link></li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="text-white font-medium text-base mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/community-guidelines" className="text-gray-400 hover:text-white text-sm">Guidelines</Link></li>
              <li><Link to="/hall-of-fame" className="text-gray-400 hover:text-white text-sm">Hall of Heroes</Link></li>
              <li><Link to="/contribute" className="text-gray-400 hover:text-white text-sm">Contribute</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-medium text-base mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white text-sm">Help Center</Link></li>
              <li><Link to="/bug-report" className="text-gray-400 hover:text-white text-sm">Report a Bug</Link></li>
              <li><Link to="/feature-request" className="text-gray-400 hover:text-white text-sm">Request a Feature</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white font-medium text-base mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link></li>
              <li><Link to="/press" className="text-gray-400 hover:text-white text-sm">Press Kit</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Social & Donate Section */}
          <div>
            <h3 className="text-white font-medium text-base mb-4">Connect</h3>
            
            {/* Social Media Icons */}
            <div className="flex gap-3 mb-5">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
                </svg>
              </a>
            </div>
            
            {/* Donate Button */}
            <a 
              href="#" 
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm font-medium transition-colors"
            >
              <span role="img" aria-label="Heart">💜</span>
              Support the Game
            </a>
          </div>
        </div>
        
        {/* Description and mission */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <p className="text-gray-400 text-sm max-w-3xl">
            PlayerOne is an open source project that depends on our users for support. The gems and coins you purchase help us keep
            the servers running, maintain a small staff, develop new features, and provide incentives for our volunteers.
          </p>
        </div>
        
        {/* Bottom footer with copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="h-8 w-8 bg-gray-700 flex items-center justify-center text-white font-semibold text-sm rounded-sm mr-3">
              P1
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PlayerOne. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;