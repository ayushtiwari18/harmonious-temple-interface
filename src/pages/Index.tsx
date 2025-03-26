
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Create parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = document.getElementById('hero-section');
      const parallaxElements = document.querySelectorAll('.parallax');
      
      if (heroSection) {
        // Adjust the background position based on scroll
        heroSection.style.backgroundPositionY = `${scrollY * 0.5}px`;
      }
      
      // Apply parallax effect to elements with parallax class
      parallaxElements.forEach((element, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = scrollY * speed;
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section 
        id="hero-section"
        className="pt-24 pb-16 md:pt-32 md:pb-24 bg-temple-primary bg-opacity-95 text-white relative transition-all duration-500"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 77, 64, 0.8), rgba(0, 77, 64, 0.9)), url("https://images.unsplash.com/photo-1542014740630-1d8c22c0e86b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Dutt Mandir
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 animate-slide-in">
              A sacred space for spiritual growth, community service, and devotion.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
              <Button 
                className="bg-temple-secondary hover:bg-temple-secondary/90 text-white btn-hover text-lg py-6 px-8"
                onClick={() => navigate('/donations')}
              >
                {t('makeDonation')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-temple-background to-transparent" />
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-temple-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-temple-primary mb-4">Temple Initiatives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our temple is dedicated to serving the community through various spiritual and charitable initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
              <div className="h-48 bg-temple-primary/20"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-temple-primary mb-2">Religious Services</h3>
                <p className="text-gray-600">
                  Daily poojas, aartis, and special ceremonies conducted by experienced priests.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
              <div className="h-48 bg-temple-secondary/20"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-temple-primary mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Food distribution, educational programs, and healthcare initiatives for the community.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-temple-primary mb-2">Cultural Events</h3>
                <p className="text-gray-600">
                  Celebrating festivals, organizing cultural programs, and preserving traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-temple-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Support Our Temple</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Your donations help us maintain the temple, conduct religious ceremonies, and support community welfare programs.
          </p>
          <Button 
            className="bg-temple-secondary hover:bg-temple-secondary/90 text-white btn-hover text-lg py-6 px-8"
            onClick={() => navigate('/donations')}
          >
            {t('makeDonation')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
