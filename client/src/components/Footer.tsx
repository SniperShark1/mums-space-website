import NewsletterSignup from "./NewsletterSignup";

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
        {/* Newsletter Signup Section */}
        <div className="mb-12 p-8 bg-mums-primary bg-opacity-10 rounded-2xl">
          <h3 className="text-2xl font-semibold text-center mb-4 text-mums-dark">Get Notified About Mum's Space Updates</h3>
          <p className="text-center text-gray-700 mb-6 max-w-2xl mx-auto">
            Enter your email below to get notified when we launch new features or have exciting news. We'll keep you in the loop—no spam, ever.
          </p>
          <NewsletterSignup />
          <p className="text-center text-sm text-gray-600 mt-4">
            You can unsubscribe at any time. For urgent help, please contact your local support line.
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/logo.png" 
              alt="Mum's Space Logo" 
              className="h-16 w-auto filter drop-shadow-sm"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {['home', 'download', 'about', 'library', 'policies'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-mums-dark hover:text-mums-accent transition-colors capitalize"
              >
                {section === 'library' ? 'eBook Library' : section}
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
