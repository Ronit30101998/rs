import { Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Luxe Properties</span>
            </div>
            <p className="text-sm">Your trusted partner in finding luxury real estate properties.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#properties" className="hover:text-blue-400 transition">Properties</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition">Services</a></li>
              <li><a href="#testimonials" className="hover:text-blue-400 transition">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400 transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 Luxe Properties. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
