
import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { donors } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export const DonorReports = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState('name');
  
  // Filter donors based on search and date
  const filteredDonors = donors.filter(donor => {
    // Search filter
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donor.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date filter
    const lastDonationDate = new Date(donor.lastDonation);
    const isAfterStart = startDate ? lastDonationDate >= startDate : true;
    const isBeforeEnd = endDate ? lastDonationDate <= endDate : true;
    
    return matchesSearch && isAfterStart && isBeforeEnd;
  });
  
  // Sort donors
  const sortedDonors = [...filteredDonors].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'amount') {
      return b.totalDonations - a.totalDonations;
    } else if (sortBy === 'recent') {
      return new Date(b.lastDonation).getTime() - new Date(a.lastDonation).getTime();
    }
    return 0;
  });
  
  const handleExportPDF = () => {
    window.alert('Donor reports exported to PDF');
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setStartDate(undefined);
    setEndDate(undefined);
    setSortBy('name');
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-temple-primary">{t('donorReports')}</h2>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 mr-2 text-temple-primary" />
          <h3 className="text-lg font-medium">{t('filter')}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">{t('search')}</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email"
            />
          </div>
          
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">{t('startDate')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="startDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="endDate">{t('endDate')}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="endDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Sort By */}
          <div className="space-y-2">
            <Label htmlFor="sortBy">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="amount">Donation Amount</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-4">
          <Button variant="outline" onClick={handleReset}>
            {t('reset')}
          </Button>
          <Button 
            className="bg-temple-primary hover:bg-temple-primary/90 text-white"
            onClick={handleExportPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            {t('exportPdf')}
          </Button>
        </div>
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
                {t('donationDate')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDonors.map((donor) => (
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
                  <div className="text-sm text-gray-900 font-medium">₹{donor.totalDonations.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{format(new Date(donor.lastDonation), 'PP')}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">{t('summary')}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-temple-primary/10 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">{t('totalDonors')}</div>
            <div className="text-2xl font-semibold text-temple-primary">{filteredDonors.length}</div>
          </div>
          
          <div className="bg-temple-secondary/10 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">{t('totalDonations')}</div>
            <div className="text-2xl font-semibold text-temple-secondary">
              ₹{filteredDonors.reduce((sum, donor) => sum + donor.totalDonations, 0).toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">{t('averageDonation')}</div>
            <div className="text-2xl font-semibold text-gray-700">
              ₹{filteredDonors.length 
                  ? Math.round(filteredDonors.reduce((sum, donor) => sum + donor.totalDonations, 0) / filteredDonors.length).toLocaleString() 
                  : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
