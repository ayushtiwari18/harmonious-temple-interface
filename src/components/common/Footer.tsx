
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-temple-primary text-temple-text-dark pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Temple Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('templeTitle')}</h3>
            <p className="max-w-xs opacity-90 text-sm">
              The Dutt Mandir is a sacred temple dedicated to spiritual growth and community service. 
              We welcome devotees from all walks of life.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('contact')}</h3>
            <div className="space-y-3 opacity-90">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-temple-secondary" />
                <span className="text-sm">{t('footerAddress')}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-temple-secondary" />
                <span className="text-sm">{t('footerPhone')}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-temple-secondary" />
                <span className="text-sm">{t('footerEmail')}</span>
              </div>
            </div>
          </div>
          
          {/* Temple Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Temple Hours</h3>
            <div className="space-y-2 opacity-90 text-sm">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>6:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday - Sunday:</span>
                <span>5:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Festival Days:</span>
                <span>4:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm opacity-80">
          <p>{t('footerText')}</p>
        </div>
      </div>
    </footer>
  );
};
