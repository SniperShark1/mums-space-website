import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isPage) {
      setIsMenuOpen(false);
    } else {
      if (location !== '/') {
        // If not on home page, go to home page first
        window.location.href = `/#${item.id}`;
      } else {
        scrollToSection(item.id);
      }
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'download', label: 'Download' },
    { id: 'about', label: 'About' },
    { id: 'library', label: 'Explore MumSpace' },
    { id: 'reviews', label: 'Reviews', isPage: true },
    { id: 'policies', label: 'Policies' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md border-b border-mums-accent border-opacity-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Mum's Space Logo" 
              className="h-12 w-auto filter drop-shadow-sm"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isPage ? (
                <Link key={item.id} href={`/${item.id}`}>
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-mums-dark hover:bg-white hover:bg-opacity-30 transition-colors">
                    {item.label}
                  </button>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-mums-dark hover:bg-white hover:bg-opacity-30 transition-colors"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-mums-dark hover:bg-white hover:bg-opacity-30"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.isPage ? (
                <Link key={item.id} href={`/${item.id}`}>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-mums-dark hover:bg-white hover:bg-opacity-30"
                  >
                    {item.label}
                  </button>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-mums-dark hover:bg-white hover:bg-opacity-30"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
