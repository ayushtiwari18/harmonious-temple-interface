
import React from 'react';
import { Download, Printer } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ReceiptData {
  receiptNumber: string;
  donorName: string;
  amount: number;
  date: Date;
  purpose: string;
  paymentMethod: string;
  type: string;
}

interface DonationReceiptProps {
  receiptData: ReceiptData;
}

export const DonationReceipt: React.FC<DonationReceiptProps> = ({ receiptData }) => {
  const { t } = useLanguage();
  
  const handleDownload = () => {
    window.alert(`Receipt ${receiptData.receiptNumber} downloaded as PDF`);
  };
  
  const handlePrint = () => {
    window.alert(`Receipt ${receiptData.receiptNumber} sent to printer`);
  };
  
  // Get label for payment method
  const getMethodLabel = (method: string) => {
    const methodMap: Record<string, string> = {
      'cash': t('cash'),
      'creditCard': t('creditCard'),
      'upi': t('upi'),
      'netBanking': t('netBanking')
    };
    return methodMap[method] || method;
  };
  
  // Get label for purpose
  const getPurposeLabel = (purpose: string) => {
    const purposeMap: Record<string, string> = {
      'generalDonation': 'General Donation',
      'festivalCelebration': 'Festival Celebration',
      'templeExpansion': 'Temple Expansion',
      'foodDistribution': 'Food Distribution',
      'diwaliFestival': 'Diwali Celebration',
      'schoolSupport': 'School Support',
      'medicalCamp': 'Medical Camp'
    };
    return purposeMap[purpose] || purpose;
  };
  
  return (
    <div className="p-1">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-temple-primary">
          {t('donationReceipt')}
        </h2>
        <p className="text-sm text-gray-500">{t('templeTitle')}</p>
      </div>
      
      <div className="border-t border-b border-gray-200 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{t('receiptNumber')}:</span>
          <span className="font-medium">{receiptData.receiptNumber}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{t('date')}:</span>
          <span>{format(receiptData.date, 'PPP')}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{t('donorName')}:</span>
          <span>{receiptData.donorName}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{t('purpose')}:</span>
          <span>{getPurposeLabel(receiptData.purpose)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{t('paymentMethod')}:</span>
          <span>{getMethodLabel(receiptData.paymentMethod)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{t('amount')}:</span>
          <span className="text-xl font-bold text-temple-primary">₹{receiptData.amount.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 italic">
          {t('thankYou')}
        </p>
      </div>
      
      <div className="mt-8 flex space-x-4 justify-center">
        <Button 
          onClick={handleDownload}
          className="bg-temple-primary hover:bg-temple-primary/90 text-white btn-hover"
        >
          <Download className="h-4 w-4 mr-2" />
          {t('downloadReceipt')}
        </Button>
        
        <Button 
          variant="outline"
          onClick={handlePrint}
          className="border-temple-primary text-temple-primary hover:bg-temple-primary hover:text-white btn-hover"
        >
          <Printer className="h-4 w-4 mr-2" />
          {t('printReceipt')}
        </Button>
      </div>
    </div>
  );
};
