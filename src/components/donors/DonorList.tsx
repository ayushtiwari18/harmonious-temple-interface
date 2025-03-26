
import React, { useState } from 'react';
import { Search, Download, Edit, Eye, Trash, Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { donors } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DonorForm } from './DonorForm';
import { DonorDetails } from './DonorDetails';

export const DonorList = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDonor, setSelectedDonor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit' | null>(null);

  // Filter donors based on search term
  const filteredDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.phone.includes(searchTerm)
  );

  const handleExportPDF = () => {
    window.alert('Donor list exported to PDF');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      window.alert(`Donor with ID ${id} has been deleted`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with title and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-temple-primary">{t('donorList')}</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-temple-primary hover:bg-temple-primary/90 text-white btn-hover">
              <Plus className="h-4 w-4 mr-2" />
              {t('addDonor')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] glass-card">
            <DonorForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and export controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant="outline" 
          className="border-temple-primary text-temple-primary hover:bg-temple-primary hover:text-white btn-hover"
          onClick={handleExportPDF}
        >
          <Download className="h-4 w-4 mr-2" />
          {t('exportPdf')}
        </Button>
      </div>

      {/* Donors table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-temple-primary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('name')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('email')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('phone')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('donationAmount')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonors.map((donor) => (
              <tr key={donor.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{donor.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{donor.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">₹{donor.totalDonations.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          onClick={() => {
                            setSelectedDonor(donor.id);
                            setViewMode('view');
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px] glass-card">
                        <DonorDetails donorId={donor.id} />
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                          onClick={() => {
                            setSelectedDonor(donor.id);
                            setViewMode('edit');
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px] glass-card">
                        <DonorForm donorId={donor.id} />
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={() => handleDelete(donor.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
