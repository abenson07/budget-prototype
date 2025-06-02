import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  bucketName: string;
  isConfirmed: boolean;
}

interface Essential {
  id: string;
  label: string;
  amount: number;
  bucketBalance: number;
  dueDate: string;
}

function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', merchant: 'Walmart', amount: 45.99, bucketName: 'Groceries', isConfirmed: false },
    { id: '2', merchant: 'Amazon', amount: 29.99, bucketName: 'Shopping', isConfirmed: false },
    { id: '3', merchant: 'Target', amount: 89.99, bucketName: 'Household', isConfirmed: false },
  ]);

  const essentials: Essential[] = [
    { id: '1', label: 'Phone Bill', amount: 80, bucketBalance: 60, dueDate: '2024-04-15' },
    { id: '2', label: 'Electric Bill', amount: 150, bucketBalance: 150, dueDate: '2024-04-20' },
  ];

  const handleConfirmTransaction = (transactionId: string) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(t => t.id !== transactionId)
    );
  };

  const getFundingStatus = (essential: Essential) => {
    const percentage = (essential.bucketBalance / essential.amount) * 100;
    if (percentage >= 100) return { status: 'Covered', color: 'bg-green-500', textColor: 'text-green-600' };
    if (percentage > 0) return { status: 'Partially Funded', color: 'bg-orange-500', textColor: 'text-orange-600' };
    return { status: 'Unfunded', color: 'bg-red-500', textColor: 'text-red-600' };
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Balance Cards */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Budget Flow</h1>
        <div className="p-6 bg-green-500 rounded-2xl text-white">
          <div className="text-sm">Available to Spend</div>
          <div className="text-3xl font-bold mb-1">$225.00</div>
          <div className="text-sm opacity-90">Total Balance: $1,025.00</div>
        </div>
      </div>

      {/* Upcoming Essentials */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Upcoming Essentials</h2>
        <div className="space-y-3">
          {essentials.map(essential => {
            const { status, color, textColor } = getFundingStatus(essential);
            const progressWidth = Math.min((essential.bucketBalance / essential.amount) * 100, 100);
            
            return (
              <div key={essential.id} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{essential.label}</div>
                    <div className="text-sm text-gray-500">Due {new Date(essential.dueDate).toLocaleDateString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${essential.amount}</div>
                    <div className={`text-sm ${textColor}`}>{status}</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color}`} style={{ width: `${progressWidth}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-1">
                  <div className="font-medium">{transaction.merchant}</div>
                  <div className="text-sm text-gray-500">{transaction.bucketName}</div>
                </div>
                <div className="text-right mr-4">
                  <div className="font-medium">${transaction.amount}</div>
                </div>
                <button
                  onClick={() => handleConfirmTransaction(transaction.id)}
                  className="p-2 text-gray-400 hover:text-green-500"
                >
                  <CheckCircle2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <Link to="/transactions" className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm text-gray-600 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>All caught up. View full transaction history →</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home; 