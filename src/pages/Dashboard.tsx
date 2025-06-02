import React from 'react';
import BucketCard from '../components/BucketCard';

function Dashboard() {
  // Example data - replace with your actual data source
  const buckets = [
    { name: 'Groceries', amount: 500, spent: 350, color: '#4F46E5' },
    { name: 'Entertainment', amount: 200, spent: 150, color: '#7C3AED' },
    { name: 'Transportation', amount: 300, spent: 200, color: '#EC4899' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="space-y-4">
        {buckets.map((bucket) => (
          <BucketCard
            key={bucket.name}
            name={bucket.name}
            amount={bucket.amount}
            spent={bucket.spent}
            color={bucket.color}
            onPress={() => console.log(`Clicked ${bucket.name}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard; 