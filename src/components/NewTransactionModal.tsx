import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import Modal from './Modal';

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const [amount, setAmount] = useState('0.00');
  const [selectedBucket, setSelectedBucket] = useState('');
  const [useCredit, setUseCredit] = useState(false);

  const buckets = [
    'Rent',
    'Groceries',
    'Utilities',
    'Dining Out',
    'Shopping',
    'Subscriptions'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Transaction">
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">$</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 pl-10 text-2xl bg-white rounded-2xl border border-gray-200"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Bucket</label>
          <div className="flex flex-wrap gap-2">
            {buckets.map((bucket) => (
              <button
                key={bucket}
                onClick={() => setSelectedBucket(bucket)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedBucket === bucket
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {bucket}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <CreditCard className="w-5 h-5" />
            <span>Credit Card</span>
          </div>
          <button
            onClick={() => setUseCredit(!useCredit)}
            className={`w-14 h-8 rounded-full transition-colors duration-200 ${
              useCredit ? 'bg-blue-600' : 'bg-gray-200'
            } relative`}
          >
            <span className={`absolute top-1 w-6 h-6 rounded-full transition-transform duration-200 bg-white ${
              useCredit ? 'left-7' : 'left-1'
            }`} />
          </button>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 p-4 text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle save logic here
              onClose();
            }}
            className="flex-1 p-4 text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default NewTransactionModal; 