import React, { useState } from 'react';
import Modal from './Modal';

interface NewBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function NewBucketModal({ isOpen, onClose }: NewBucketModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'safe' | 'discretionary'>('safe');
  const [targetAmount, setTargetAmount] = useState('0.00');
  const [initialBalance, setInitialBalance] = useState('0.00');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Budget Bucket">
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 text-xl bg-white rounded-2xl border border-gray-200"
            placeholder="Bucket name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setType('safe')}
              className={`px-6 py-2 rounded-full text-sm ${
                type === 'safe'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Safe
            </button>
            <button
              onClick={() => setType('discretionary')}
              className={`px-6 py-2 rounded-full text-sm ${
                type === 'discretionary'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Discretionary
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Target Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">$</span>
            <input
              type="text"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-4 pl-10 text-2xl bg-white rounded-2xl border border-gray-200"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Initial Balance (Optional)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">$</span>
            <input
              type="text"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              className="w-full p-4 pl-10 text-2xl bg-white rounded-2xl border border-gray-200"
              placeholder="0.00"
            />
          </div>
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

export default NewBucketModal; 