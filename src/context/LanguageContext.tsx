
import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    donations: 'Donations',
    donors: 'Donors',
    reports: 'Reports',
    contact: 'Contact',
    // Header
    templeTitle: 'Dutt Mandir',
    // Footer
    footerText: '© 2023 Dutt Mandir. All rights reserved.',
    footerAddress: '123 Temple Street, Spiritual City, India',
    footerPhone: '+91 1234567890',
    footerEmail: 'info@duttmandir.com',
    // Donor section
    donorList: 'Donor List',
    addDonor: 'Add Donor',
    search: 'Search',
    exportPdf: 'Export PDF',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    donationAmount: 'Donation Amount',
    donationDate: 'Donation Date',
    actions: 'Actions',
    edit: 'Edit',
    view: 'View',
    delete: 'Delete',
    donorDetails: 'Donor Details',
    donorForm: 'Donor Form',
    submit: 'Submit',
    cancel: 'Cancel',
    // Donation section
    makeDonation: 'Make a Donation',
    donationForm: 'Donation Form',
    donorName: 'Donor Name',
    donationType: 'Donation Type',
    amount: 'Amount',
    paymentMethod: 'Payment Method',
    cash: 'Cash',
    creditCard: 'Credit Card',
    upi: 'UPI',
    netBanking: 'Net Banking',
    purpose: 'Purpose',
    date: 'Date',
    submitDonation: 'Submit Donation',
    donationReceipt: 'Donation Receipt',
    receiptNumber: 'Receipt Number',
    downloadReceipt: 'Download Receipt',
    printReceipt: 'Print Receipt',
    thankYou: 'Thank you for your donation',
    // Reports section
    donorReports: 'Donor Reports',
    paymentReports: 'Payment Reports',
    filter: 'Filter',
    startDate: 'Start Date',
    endDate: 'End Date',
    apply: 'Apply',
    reset: 'Reset',
    summary: 'Summary',
    totalDonors: 'Total Donors',
    totalDonations: 'Total Donations',
    averageDonation: 'Average Donation',
    // Contact section
    contactUs: 'Contact Us',
    fullName: 'Full Name',
    message: 'Message',
    send: 'Send',
  },
  hi: {
    home: 'होम',
    donations: 'दान',
    donors: 'दाता',
    reports: 'रिपोर्ट',
    contact: 'संपर्क',
    // Header
    templeTitle: 'दत्त मंदिर',
    // Footer
    footerText: '© 2023 दत्त मंदिर. सर्वाधिकार सुरक्षित.',
    footerAddress: '123 मंदिर स्ट्रीट, स्पिरिचुअल सिटी, भारत',
    footerPhone: '+91 1234567890',
    footerEmail: 'info@duttmandir.com',
    // Donor section
    donorList: 'दाता सूची',
    addDonor: 'दाता जोड़ें',
    search: 'खोज',
    exportPdf: 'पीडीएफ निर्यात करें',
    name: 'नाम',
    email: 'ईमेल',
    phone: 'फोन',
    address: 'पता',
    donationAmount: 'दान राशि',
    donationDate: 'दान तिथि',
    actions: 'क्रियाएँ',
    edit: 'संपादित करें',
    view: 'देखें',
    delete: 'हटाएं',
    donorDetails: 'दाता विवरण',
    donorForm: 'दाता फॉर्म',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    // Donation section
    makeDonation: 'दान करें',
    donationForm: 'दान फॉर्म',
    donorName: 'दाता का नाम',
    donationType: 'दान प्रकार',
    amount: 'राशि',
    paymentMethod: 'भुगतान विधि',
    cash: 'नकद',
    creditCard: 'क्रेडिट कार्ड',
    upi: 'यूपीआई',
    netBanking: 'नेट बैंकिंग',
    purpose: 'उद्देश्य',
    date: 'तारीख',
    submitDonation: 'दान जमा करें',
    donationReceipt: 'दान रसीद',
    receiptNumber: 'रसीद नंबर',
    downloadReceipt: 'रसीद डाउनलोड करें',
    printReceipt: 'रसीद प्रिंट करें',
    thankYou: 'आपके दान के लिए धन्यवाद',
    // Reports section
    donorReports: 'दाता रिपोर्ट',
    paymentReports: 'भुगतान रिपोर्ट',
    filter: 'फिल्टर',
    startDate: 'प्रारंभ तिथि',
    endDate: 'समाप्ति तिथि',
    apply: 'लागू करें',
    reset: 'रीसेट',
    summary: 'सारांश',
    totalDonors: 'कुल दाता',
    totalDonations: 'कुल दान',
    averageDonation: 'औसत दान',
    // Contact section
    contactUs: 'संपर्क करें',
    fullName: 'पूरा नाम',
    message: 'संदेश',
    send: 'भेजें',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
