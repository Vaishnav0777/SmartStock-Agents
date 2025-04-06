
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className={cn(`p-1 rounded-full`, color)}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AgentCard;
