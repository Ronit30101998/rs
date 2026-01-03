import { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <Home className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Luxe Properties</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('properties')} className="text-gray-700 hover:text-blue-600 transition">
              Properties
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition">
              Services
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 hover:text-blue-600 transition">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Contact Us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <button onClick={() => scrollToSection('properties')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Properties
            </button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Services
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
              Contact Us
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
