import { MoreVertical } from 'lucide-react';

interface BucketCardProps {
  name: string;
  amount: number;
  spent: number;
  color?: string;
  onPress?: () => void;
}

function BucketCard({ name, amount, spent, color = '#4F46E5', onPress }: BucketCardProps) {
  const percentage = Math.min((spent / amount) * 100, 100);
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
  
  const formattedSpent = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(spent);

  return (
    <div 
      onClick={onPress}
      className="bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Spent: {formattedSpent}</span>
          <span>Budget: {formattedAmount}</span>
        </div>

        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>

        <div className="text-right text-sm text-gray-600">
          {percentage.toFixed(0)}% used
        </div>
      </div>
    </div>
  );
}

export default BucketCard; 