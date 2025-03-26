
// Mock data for temple management system

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalDonations: number;
  lastDonation: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  amount: number;
  date: string;
  type: string;
  paymentMethod: string;
  purpose: string;
  receiptNumber: string;
}

// Mock donors data
export const donors: Donor[] = [
  {
    id: "d1",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@example.com",
    phone: "+91 9876543210",
    address: "123 Krishna Lane, Mumbai, MH 400001",
    totalDonations: 25000,
    lastDonation: "2023-05-15"
  },
  {
    id: "d2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 8765432109",
    address: "456 Ganesh Road, Delhi, DL 110001",
    totalDonations: 15000,
    lastDonation: "2023-06-22"
  },
  {
    id: "d3",
    name: "Amit Singh",
    email: "amit.singh@example.com",
    phone: "+91 7654321098",
    address: "789 Shiva Street, Bangalore, KA 560001",
    totalDonations: 50000,
    lastDonation: "2023-04-10"
  },
  {
    id: "d4",
    name: "Sunita Desai",
    email: "sunita.desai@example.com",
    phone: "+91 6543210987",
    address: "101 Lakshmi Avenue, Chennai, TN 600001",
    totalDonations: 30000,
    lastDonation: "2023-07-05"
  },
  {
    id: "d5",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 5432109876",
    address: "202 Durga Lane, Kolkata, WB 700001",
    totalDonations: 45000,
    lastDonation: "2023-08-18"
  }
];

// Mock donations data
export const donations: DonationRecord[] = [
  {
    id: "don1",
    donorId: "d1",
    donorName: "Rajesh Sharma",
    amount: 5000,
    date: "2023-05-15",
    type: "Temple Maintenance",
    paymentMethod: "UPI",
    purpose: "General Donation",
    receiptNumber: "REC-2023-001"
  },
  {
    id: "don2",
    donorId: "d2",
    donorName: "Priya Patel",
    amount: 3000,
    date: "2023-06-22",
    type: "Pooja",
    paymentMethod: "Cash",
    purpose: "Festival Celebration",
    receiptNumber: "REC-2023-002"
  },
  {
    id: "don3",
    donorId: "d3",
    donorName: "Amit Singh",
    amount: 10000,
    date: "2023-04-10",
    type: "Construction",
    paymentMethod: "Credit Card",
    purpose: "Temple Expansion",
    receiptNumber: "REC-2023-003"
  },
  {
    id: "don4",
    donorId: "d4",
    donorName: "Sunita Desai",
    amount: 7500,
    date: "2023-07-05",
    type: "Charity",
    paymentMethod: "Net Banking",
    purpose: "Food Distribution",
    receiptNumber: "REC-2023-004"
  },
  {
    id: "don5",
    donorId: "d5",
    donorName: "Vikram Mehta",
    amount: 15000,
    date: "2023-08-18",
    type: "Religious Event",
    paymentMethod: "UPI",
    purpose: "Diwali Celebration",
    receiptNumber: "REC-2023-005"
  },
  {
    id: "don6",
    donorId: "d1",
    donorName: "Rajesh Sharma",
    amount: 8000,
    date: "2023-03-30",
    type: "Education",
    paymentMethod: "Cash",
    purpose: "School Support",
    receiptNumber: "REC-2023-006"
  },
  {
    id: "don7",
    donorId: "d3",
    donorName: "Amit Singh",
    amount: 20000,
    date: "2023-02-15",
    type: "Healthcare",
    paymentMethod: "Credit Card",
    purpose: "Medical Camp",
    receiptNumber: "REC-2023-007"
  }
];

// Payment methods
export const paymentMethods = [
  { value: "cash", label: "Cash" },
  { value: "creditCard", label: "Credit Card" },
  { value: "upi", label: "UPI" },
  { value: "netBanking", label: "Net Banking" }
];

// Donation types
export const donationTypes = [
  { value: "templeMaintenance", label: "Temple Maintenance" },
  { value: "pooja", label: "Pooja" },
  { value: "construction", label: "Construction" },
  { value: "charity", label: "Charity" },
  { value: "religiousEvent", label: "Religious Event" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" }
];

// Donation purposes
export const donationPurposes = [
  { value: "generalDonation", label: "General Donation" },
  { value: "festivalCelebration", label: "Festival Celebration" },
  { value: "templeExpansion", label: "Temple Expansion" },
  { value: "foodDistribution", label: "Food Distribution" },
  { value: "diwaliFestival", label: "Diwali Celebration" },
  { value: "schoolSupport", label: "School Support" },
  { value: "medicalCamp", label: "Medical Camp" }
];

// Get total donations by month for reports
export const getDonationsByMonth = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const donationsByMonth = Array(12).fill(0);
  
  donations.forEach(donation => {
    const month = new Date(donation.date).getMonth();
    donationsByMonth[month] += donation.amount;
  });
  
  return months.map((month, index) => ({
    name: month,
    amount: donationsByMonth[index]
  }));
};

// Get donation type distribution for reports
export const getDonationTypeDistribution = () => {
  const typeMap = new Map();
  
  donations.forEach(donation => {
    if (typeMap.has(donation.type)) {
      typeMap.set(donation.type, typeMap.get(donation.type) + donation.amount);
    } else {
      typeMap.set(donation.type, donation.amount);
    }
  });
  
  return Array.from(typeMap).map(([name, value]) => ({ name, value }));
};

// Get summary stats
export const getSummaryStats = () => {
  const totalDonors = donors.length;
  const totalDonationAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const averageDonation = totalDonationAmount / donations.length;
  
  return {
    totalDonors,
    totalDonationAmount,
    averageDonation
  };
};
