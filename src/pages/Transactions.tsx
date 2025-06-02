import React from 'react';
import { CreditCard, Filter } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  bucket: string;
  amount: number;
  paymentMethod: 'Credit Card' | 'Cash/Debit';
  timestamp: string;
}

function TransactionItem({ date, bucket, amount, paymentMethod, timestamp }: Transaction) {
  return (
    <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{bucket}</h3>
          <p className="text-sm text-gray-500">{timestamp}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-green-600">${amount.toFixed(2)}</div>
        <div className="text-sm text-blue-600">{paymentMethod}</div>
      </div>
    </div>
  );
}

function TransactionGroup({ date, transactions }: { date: string; transactions: Transaction[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700 px-1">{date}</h2>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
}

function Transactions() {
  const transactions = [
    {
      id: '1',
      date: 'Friday, May 30, 2025',
      bucket: 'Dining Out',
      amount: 75.00,
      paymentMethod: 'Credit Card' as const,
      timestamp: 'May 31, 2025 at 08:00 PM',
    },
    {
      id: '2',
      date: 'Thursday, May 29, 2025',
      bucket: 'Utilities',
      amount: 50.00,
      paymentMethod: 'Cash/Debit' as const,
      timestamp: 'May 30, 2025 at 08:00 PM',
    },
    {
      id: '3',
      date: 'Monday, May 26, 2025',
      bucket: 'Groceries',
      amount: 100.00,
      paymentMethod: 'Credit Card' as const,
      timestamp: 'May 27, 2025 at 08:00 PM',
    },
    {
      id: '4',
      date: 'Saturday, May 24, 2025',
      bucket: 'Rent',
      amount: 600.00,
      paymentMethod: 'Cash/Debit' as const,
      timestamp: 'May 25, 2025 at 08:00 PM',
    },
  ];

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
        <button className="p-2 rounded-full bg-gray-100">
          <Filter className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      
      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
          <TransactionGroup key={date} date={date} transactions={transactions} />
        ))}
      </div>
    </div>
  );
}

export default Transactions; 