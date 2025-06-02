// Format currency with $ sign and 2 decimal places
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Calculate percentage with limit to 100%
export const calculatePercentage = (current: number, target: number): number => {
  if (target === 0) return 0;
  const percentage = (current / target) * 100;
  return Math.min(percentage, 100);
};

// Format date in readable format
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format time in readable format
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format date and time
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Get color based on percentage
export const getColorByPercentage = (percentage: number): string => {
  if (percentage < 25) return '#FF5252'; // Red
  if (percentage < 50) return '#FFC107'; // Yellow
  if (percentage < 75) return '#4CAF50'; // Green
  return '#38B764'; // Dark Green
};

// Get color based on budget type
export const getBucketTypeColor = (type: 'safe' | 'discretionary'): string => {
  return type === 'safe' ? '#4A6FA5' : '#6A7FDB';
};