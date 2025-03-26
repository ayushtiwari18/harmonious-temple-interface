
import React from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { DonationForm } from '@/components/donations/DonationForm';

const DonationsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 bg-temple-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationsPage;
