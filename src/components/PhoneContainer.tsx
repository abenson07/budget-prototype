import React from 'react';

interface PhoneContainerProps {
  children: React.ReactNode;
}

function PhoneContainer({ children }: PhoneContainerProps) {
  return (
    <div className="hidden md:flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[420px] h-[860px] bg-white rounded-[40px] shadow-xl overflow-hidden">
        {/* Screen content */}
        <div className="w-full h-full bg-white p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PhoneContainer; 