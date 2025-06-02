import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Bucket {
  id: string;
  name: string;
  type: 'safe' | 'discretionary';
  balance: number;
  targetAmount: number;
  order?: number;
}

const initialBuckets: Bucket[] = [
  // Essentials
  { id: '1', name: 'Rent', type: 'safe', balance: 1200, targetAmount: 1200 },
  { id: '2', name: 'Utilities', type: 'safe', balance: 180, targetAmount: 250 },
  { id: '3', name: 'Groceries', type: 'safe', balance: 300, targetAmount: 500 },
  { id: '4', name: 'Phone', type: 'safe', balance: 60, targetAmount: 80 },
  
  // Discretionary
  { id: '5', name: 'Entertainment', type: 'discretionary', balance: 75, targetAmount: 200, order: 1 },
  { id: '6', name: 'Shopping', type: 'discretionary', balance: 150, targetAmount: 150, order: 2 },
  { id: '7', name: 'Dining Out', type: 'discretionary', balance: 0, targetAmount: 300, order: 3 },
  { id: '8', name: 'Travel', type: 'discretionary', balance: 500, targetAmount: 1000, order: 4 },
];

interface BucketCardProps {
  bucket: Bucket;
  onClick: (bucket: Bucket) => void;
  showDragHandle?: boolean;
  isDragging?: boolean;
}

function BucketCard({ bucket, onClick, showDragHandle = false, isDragging = false }: BucketCardProps) {
  const percentage = (bucket.balance / bucket.targetAmount) * 100;
  
  const getStatus = () => {
    if (bucket.balance >= bucket.targetAmount) return { label: 'Covered', color: 'bg-green-500', textColor: 'text-green-600' };
    if (bucket.balance > 0) return { label: 'Partially Funded', color: 'bg-orange-500', textColor: 'text-orange-600' };
    return { label: 'Unfunded', color: 'bg-red-500', textColor: 'text-red-600' };
  };

  const { label, color, textColor } = getStatus();

  return (
    <div
      onClick={() => onClick(bucket)}
      className={`
        bg-white rounded-xl p-4 shadow-sm cursor-pointer
        hover:bg-gray-50 transition-colors
        ${bucket.type === 'discretionary' ? 'border border-gray-100' : ''}
        ${isDragging ? 'shadow-md' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {showDragHandle && (
          <div className="mt-1.5 cursor-grab">
            <GripVertical className="w-4 h-4 text-gray-400" />
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium">{bucket.name}</h3>
              <div className="text-sm text-gray-500">
                Target: ${bucket.targetAmount.toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="font-medium">${bucket.balance.toLocaleString()}</div>
                <div className={`text-sm ${textColor}`}>
                  {label}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className={textColor}>{Math.round(percentage)}% funded</div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${color}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Buckets() {
  const navigate = useNavigate();
  const [buckets, setBuckets] = useState(initialBuckets);
  
  const essentialBuckets = buckets.filter(b => b.type === 'safe');
  const discretionaryBuckets = buckets
    .filter(b => b.type === 'discretionary')
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleBucketClick = (bucket: Bucket) => {
    navigate(`/buckets/${bucket.name.toLowerCase()}`);
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // If dropped outside the list or no movement
    if (!destination || destination.index === source.index) {
      return;
    }

    const reorderedBuckets = Array.from(discretionaryBuckets);
    const [removed] = reorderedBuckets.splice(source.index, 1);
    reorderedBuckets.splice(destination.index, 0, removed);

    // Update orders
    const updatedDiscretionary = reorderedBuckets.map((bucket, index) => ({
      ...bucket,
      order: index + 1,
    }));

    // Merge with essential buckets
    setBuckets([
      ...essentialBuckets,
      ...updatedDiscretionary,
    ]);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Buckets</h1>
        <p className="text-gray-500">Manage your savings goals and spending categories</p>
      </div>

      {/* Essentials Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">Essentials</h2>
          <div className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-sm">
            {essentialBuckets.length}
          </div>
        </div>
        <div className="space-y-3">
          {essentialBuckets.map(bucket => (
            <BucketCard
              key={bucket.id}
              bucket={bucket}
              onClick={handleBucketClick}
            />
          ))}
        </div>
      </section>

      {/* Discretionary Section */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-semibold">Discretionary</h2>
          <div className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-sm">
            {discretionaryBuckets.length}
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="discretionary">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {discretionaryBuckets.map((bucket, index) => (
                  <Draggable key={bucket.id} draggableId={bucket.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BucketCard
                          bucket={bucket}
                          onClick={handleBucketClick}
                          showDragHandle={true}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
}

export default Buckets; 