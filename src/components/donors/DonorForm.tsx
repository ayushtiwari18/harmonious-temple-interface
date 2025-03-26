
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { donors } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface DonorFormProps {
  donorId?: string;
}

export const DonorForm: React.FC<DonorFormProps> = ({ donorId }) => {
  const { t } = useLanguage();
  const isEditMode = Boolean(donorId);
  
  // Find donor if in edit mode
  const existingDonor = donorId ? donors.find(d => d.id === donorId) : null;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // Initialize form with existing donor data if in edit mode
  useEffect(() => {
    if (existingDonor) {
      setFormData({
        name: existingDonor.name,
        email: existingDonor.email,
        phone: existingDonor.phone,
        address: existingDonor.address
      });
    }
  }, [existingDonor]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      window.alert(`Donor ${formData.name} has been updated`);
    } else {
      window.alert(`New donor ${formData.name} has been added`);
    }
  };
  
  return (
    <div className="p-1">
      <h2 className="text-2xl font-semibold text-temple-primary mb-6">
        {isEditMode ? t('edit') : t('addDonor')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">{t('phone')}</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">{t('address')}</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full resize-none"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline">
            {t('cancel')}
          </Button>
          <Button 
            type="submit" 
            className="bg-temple-primary hover:bg-temple-primary/90 text-white"
          >
            {t('submit')}
          </Button>
        </div>
      </form>
    </div>
  );
};
