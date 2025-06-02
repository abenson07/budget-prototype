import React, { useState } from 'react';
import { DollarSign, CreditCard } from 'lucide-react';
import NewTransactionModal from '../components/NewTransactionModal';
import NewBucketModal from '../components/NewBucketModal';

function AddNewButton({ icon: Icon, title, description, onClick }: {
  icon: typeof DollarSign;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="text-left">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="text-2xl text-gray-400">+</div>
    </button>
  );
}

function AddNew() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isBucketModalOpen, setIsBucketModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Add New</h1>
        
        <div className="space-y-4">
          <AddNewButton
            icon={DollarSign}
            title="New Transaction"
            description="Record income or expenses for a budget bucket"
            onClick={() => setIsTransactionModalOpen(true)}
          />
          
          <AddNewButton
            icon={CreditCard}
            title="New Budget Bucket"
            description="Create a new category for your budget"
            onClick={() => setIsBucketModalOpen(true)}
          />
        </div>
      </div>

      <NewTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      />

      <NewBucketModal
        isOpen={isBucketModalOpen}
        onClose={() => setIsBucketModalOpen(false)}
      />
    </>
  );
}

export default AddNew; 