
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { donors, paymentMethods, donationTypes, donationPurposes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DonationReceipt } from './DonationReceipt';

export const DonationForm = () => {
  const { t } = useLanguage();
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    donorId: '',
    donorName: '',
    amount: '',
    date: new Date(),
    type: '',
    paymentMethod: '',
    purpose: '',
    notes: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // If donor is selected, populate name
    if (name === 'donorId') {
      const selectedDonor = donors.find(donor => donor.id === value);
      if (selectedDonor) {
        setFormData(prev => ({ ...prev, donorName: selectedDonor.name }));
      }
    }
  };
  
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, date }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    window.alert(`Donation of ₹${formData.amount} from ${formData.donorName || 'Anonymous'} has been recorded`);
    
    // Create receipt data
    const receipt = {
      receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
      donorName: formData.donorName || 'Anonymous',
      amount: parseFloat(formData.amount),
      date: formData.date,
      purpose: formData.purpose,
      paymentMethod: formData.paymentMethod,
      type: formData.type
    };
    
    setReceiptData(receipt);
    setShowReceipt(true);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-temple-primary mb-6">
        {t('donationForm')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Donor Selection */}
        <div className="space-y-2">
          <Label htmlFor="donorId">{t('donorName')}</Label>
          <Select 
            value={formData.donorId} 
            onValueChange={(value) => handleSelectChange('donorId', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a donor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Anonymous</SelectItem>
              {donors.map(donor => (
                <SelectItem key={donor.id} value={donor.id}>
                  {donor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Donation Type */}
        <div className="space-y-2">
          <Label htmlFor="type">{t('donationType')}</Label>
          <Select 
            value={formData.type} 
            onValueChange={(value) => handleSelectChange('type', value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select donation type" />
            </SelectTrigger>
            <SelectContent>
              {donationTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Purpose */}
        <div className="space-y-2">
          <Label htmlFor="purpose">{t('purpose')}</Label>
          <Select 
            value={formData.purpose} 
            onValueChange={(value) => handleSelectChange('purpose', value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select purpose" />
            </SelectTrigger>
            <SelectContent>
              {donationPurposes.map(purpose => (
                <SelectItem key={purpose.value} value={purpose.value}>
                  {purpose.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">{t('amount')}</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="pl-8"
              required
            />
          </div>
        </div>
        
        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">{t('date')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.date}
                onSelect={handleDateChange}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Payment Method */}
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">{t('paymentMethod')}</Label>
          <Select 
            value={formData.paymentMethod} 
            onValueChange={(value) => handleSelectChange('paymentMethod', value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map(method => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional information about the donation"
            className="resize-none"
            rows={3}
          />
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-temple-primary hover:bg-temple-primary/90 text-white btn-hover"
          >
            {t('submitDonation')}
          </Button>
        </div>
      </form>
      
      {/* Receipt Dialog */}
      {showReceipt && receiptData && (
        <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
          <DialogContent className="sm:max-w-[525px] glass-card">
            <DonationReceipt receiptData={receiptData} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
