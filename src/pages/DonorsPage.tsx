
import React from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { DonorList } from '@/components/donors/DonorList';

const DonorsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 bg-temple-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonorList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonorsPage;
