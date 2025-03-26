
import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { donations, getDonationsByMonth, getDonationTypeDistribution } from '@/lib/data';
import { Button } from '@/components/ui/button';
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const PaymentReports = () => {
  const { t } = useLanguage();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [paymentType, setPaymentType] = useState('all');
  
  // Get data for charts
  const monthlyData = getDonationsByMonth();
  const typeDistribution = getDonationTypeDistribution();
  
  // Filter donations based on filters
  const filteredDonations = donations.filter(donation => {
    const donationDate = new Date(donation.date);
    const isAfterStart = startDate ? donationDate >= startDate : true;
    const isBeforeEnd = endDate ? donationDate <= endDate : true;
    const matchesPaymentType = paymentType === 'all' || donation.paymentMethod === paymentType;
    
    return isAfterStart && isBeforeEnd && matchesPaymentType;
  });
  
  // Calculate totals
  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalDonations = filteredDonations.length;
  const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;
  
  const handleExportPDF = () => {
    window.alert('Payment reports exported to PDF');
  };
  
  const handleReset = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setPaymentType('all');
  };
  
  // Colors for pie chart
  const COLORS = ['#004D40', '#00796B', '#009688', '#4DB6AC', '#B2DFDB', '#FF9800', '#FFB74D'];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-temple-primary">{t('paymentReports')}</h2>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 mr-2 text-temple-primary" />
          <h3 className="text-lg font-medium">{t('filter')}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          
          {/* Payment Type */}
          <div className="space-y-2">
            <Label htmlFor="paymentType">{t('paymentMethod')}</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
              <SelectTrigger>
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="cash">{t('cash')}</SelectItem>
                <SelectItem value="creditCard">{t('creditCard')}</SelectItem>
                <SelectItem value="upi">{t('upi')}</SelectItem>
                <SelectItem value="netBanking">{t('netBanking')}</SelectItem>
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
      
      {/* Summary */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">{t('summary')}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-temple-primary/10 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">{t('totalDonations')}</div>
            <div className="text-2xl font-semibold text-temple-primary">{totalDonations}</div>
          </div>
          
          <div className="bg-temple-secondary/10 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">Total Amount</div>
            <div className="text-2xl font-semibold text-temple-secondary">
              ₹{totalAmount.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600">{t('averageDonation')}</div>
            <div className="text-2xl font-semibold text-gray-700">
              ₹{Math.round(averageDonation).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Donations Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium mb-4">Monthly Donations</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Legend />
                <Bar dataKey="amount" fill="#004D40" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Donation Type Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium mb-4">Donation Type Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Donations table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-temple-primary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('donorName')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('date')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('amount')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('paymentMethod')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-temple-text-dark uppercase tracking-wider">
                {t('purpose')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDonations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{donation.donorName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{format(new Date(donation.date), 'PP')}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">₹{donation.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{donation.paymentMethod}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{donation.purpose}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
