
import React from 'react';
import { Calendar, Mail, Phone, MapPin, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { donors, donations } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface DonorDetailsProps {
  donorId: string;
}

export const DonorDetails: React.FC<DonorDetailsProps> = ({ donorId }) => {
  const { t } = useLanguage();
  
  // Find the donor
  const donor = donors.find(d => d.id === donorId);
  
  // Get donations for this donor
  const donorDonations = donations.filter(donation => donation.donorId === donorId);
  
  if (!donor) {
    return <div>Donor not found</div>;
  }
  
  const handleDownloadDetails = () => {
    window.alert(`Donor details for ${donor.name} downloaded as PDF`);
  };
  
  return (
    <div className="p-1">
      <h2 className="text-2xl font-semibold text-temple-primary mb-4">
        {t('donorDetails')}
      </h2>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{donor.name}</h3>
          
          <div className="grid gap-3">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{donor.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{donor.phone}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
              <span className="text-sm">{donor.address}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">Last donation: {new Date(donor.lastDonation).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Donation Summary */}
        <div>
          <h3 className="text-md font-medium mb-3">Donation Summary</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-temple-primary/10 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-600">Total Amount</div>
              <div className="text-xl font-semibold text-temple-primary">₹{donor.totalDonations.toLocaleString()}</div>
            </div>
            <div className="bg-temple-secondary/10 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-600">Donations</div>
              <div className="text-xl font-semibold text-temple-secondary">{donorDonations.length}</div>
            </div>
          </div>
        </div>
        
        {/* Recent Donations */}
        {donorDonations.length > 0 && (
          <div>
            <h3 className="text-md font-medium mb-3">Recent Donations</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {donorDonations.map(donation => (
                <div key={donation.id} className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{donation.purpose}</span>
                    <span className="text-sm font-semibold text-temple-primary">₹{donation.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{donation.type}</span>
                    <span className="text-xs text-gray-500">{new Date(donation.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleDownloadDetails}
            className="bg-temple-primary hover:bg-temple-primary/90 text-white btn-hover"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('exportPdf')}
          </Button>
        </div>
      </div>
    </div>
  );
};
