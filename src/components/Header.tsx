
import React from 'react';
import { MoveRight, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center space-x-2">
        <div className="bg-primary p-2 rounded-md">
          <BarChart3 className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">SmartStock Agents</h1>
      </div>
      <p className="mt-2 text-muted-foreground max-w-3xl">
        Multi-agent AI system for retail inventory optimization. Watch agents collaborate in real-time as they manage inventory levels and pricing.
      </p>
      <div className="flex flex-wrap gap-4 mt-4">
        {['Customer', 'Store', 'Warehouse', 'Supplier', 'Forecasting', 'Pricing'].map((agent, i) => (
          <div key={i} className="flex items-center text-sm text-muted-foreground">
            <span>{agent}</span>
            {i < 5 && <MoveRight className="h-3 w-3 mx-1" />}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
