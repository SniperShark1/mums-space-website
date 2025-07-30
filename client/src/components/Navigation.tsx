import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'download', label: 'Download' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'policies', label: 'Policies' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md border-b border-mums-accent border-opacity-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/attached_assets/72b98ebe-ea7e-40bf-bb1e-212267c702b1_1753867544695.png" 
              alt="Mum's Space Logo" 
              className="h-12 w-auto filter drop-shadow-sm"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 rounded-md text-sm font-medium text-mums-dark hover:bg-white hover:bg-opacity-30 transition-colors"
              >
                {item.label}
              </button>
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
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-mums-dark hover:bg-white hover:bg-opacity-30"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
