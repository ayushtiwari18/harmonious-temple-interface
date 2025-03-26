
import React, { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { DonorReports } from '@/components/reports/DonorReports';
import { PaymentReports } from '@/components/reports/PaymentReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/context/LanguageContext';

const ReportsPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('donors');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 bg-temple-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="donors">{t('donorReports')}</TabsTrigger>
                <TabsTrigger value="payments">{t('paymentReports')}</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="donors" className="animate-fade-in">
              <DonorReports />
            </TabsContent>
            
            <TabsContent value="payments" className="animate-fade-in">
              <PaymentReports />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
