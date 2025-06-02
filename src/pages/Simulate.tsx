import React, { useState } from 'react';

function Simulate() {
  const [amount, setAmount] = useState('0.00');
  const [selectedBucket, setSelectedBucket] = useState('');
  const [useCredit, setUseCredit] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Simulate Transaction</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xl text-gray-700">Amount</label>
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

        <div className="space-y-2">
          <label className="block text-xl text-gray-700">Select Bucket</label>
          <select
            value={selectedBucket}
            onChange={(e) => setSelectedBucket(e.target.value)}
            className="w-full p-4 text-xl bg-white rounded-2xl border border-gray-200 appearance-none"
          >
            <option value="">Select a bucket</option>
            <option value="rent">Rent</option>
            <option value="groceries">Groceries</option>
            <option value="utilities">Utilities</option>
            <option value="dining">Dining Out</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-xl text-gray-700">Use Credit Card</span>
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

        <button className="w-full p-4 text-xl font-semibold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-colors">
          Create Transaction
        </button>
      </div>
    </div>
  );
}

export default Simulate; 