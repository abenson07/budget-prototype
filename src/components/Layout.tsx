import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wallet, PlusCircle, Settings, CreditCard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/buckets', icon: Wallet, label: 'Buckets' },
    { path: '/simulate', icon: PlusCircle, label: 'Simulate' },
    { path: '/add', icon: PlusCircle, label: 'add' },
    { path: '/settings', icon: Settings, label: 'settings' },
    { path: '/transactions', icon: CreditCard, label: 'transac' }
  ];

  return (
    <div className="relative h-full pb-[80px]">
      <main className="h-full overflow-auto">
        {children}
      </main>
      
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center px-4">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 ${
                location.pathname === path
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Layout; 