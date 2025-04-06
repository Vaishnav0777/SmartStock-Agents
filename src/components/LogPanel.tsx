
import React from 'react';
import { LogEntry } from '@/data/inventoryData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LogPanelProps {
  logs: LogEntry[];
}

// Define colors for different agents
const agentColors: Record<string, string> = {
  'Customer Agent': 'text-blue-600 dark:text-blue-400',
  'Store Agent': 'text-emerald-600 dark:text-emerald-400',
  'Warehouse Agent': 'text-amber-600 dark:text-amber-400',
  'Supplier Agent': 'text-purple-600 dark:text-purple-400',
  'Forecasting Agent': 'text-cyan-600 dark:text-cyan-400',
  'Pricing Agent': 'text-rose-600 dark:text-rose-400',
};

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Agent Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full px-4 pb-4">
          {logs.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No agent activity yet. Trigger an action to see logs.
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="text-sm border-l-2 pl-3 py-1" style={{ 
                  borderLeftColor: getAgentBorderColor(log.agent)
                }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${agentColors[log.agent] || 'text-gray-700'}`}>
                      {log.agent}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(log.timestamp)}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {log.action}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {log.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Helper functions
const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
};

const getAgentBorderColor = (agent: string): string => {
  switch (agent) {
    case 'Customer Agent': return '#3b82f6'; // blue
    case 'Store Agent': return '#10b981'; // emerald
    case 'Warehouse Agent': return '#f59e0b'; // amber
    case 'Supplier Agent': return '#8b5cf6'; // purple
    case 'Forecasting Agent': return '#06b6d4'; // cyan
    case 'Pricing Agent': return '#f43f5e'; // rose
    default: return '#64748b'; // slate
  }
};

export default LogPanel;
