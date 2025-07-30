const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white bg-opacity-90 backdrop-blur-md py-12 mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-auto h-12 bg-mums-accent rounded-lg px-6 py-3 flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-semibold text-xl">Mum's Space</span>
            <span className="text-white ml-2">❤️</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {['home', 'download', 'about', 'contact', 'policies'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-mums-dark hover:text-mums-accent transition-colors capitalize"
              >
                {section}
              </button>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            A safe, supportive community for mothers and women worldwide.
          </p>
          
          <p className="text-xs text-gray-500">
            © 2024 Mum's Space. All rights reserved. | Made with ❤️ for mums everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
