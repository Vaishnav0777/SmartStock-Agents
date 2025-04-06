
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Product } from '@/data/inventoryData';

interface StockChartProps {
  stockHistory: Array<{
    date: Date;
    storeStock: number;
    warehouseStock: number;
    productId: number;
  }>;
  selectedProduct: Product | null;
}

const StockChart: React.FC<StockChartProps> = ({ stockHistory, selectedProduct }) => {
  const filteredData = useMemo(() => {
    if (!selectedProduct) return [];
    
    return stockHistory
      .filter(entry => entry.productId === selectedProduct.id)
      .map(entry => ({
        time: entry.date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }),
        storeStock: entry.storeStock,
        warehouseStock: entry.warehouseStock
      }));
  }, [stockHistory, selectedProduct]);

  return (
    <Card className="h-[400px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          Stock History {selectedProduct ? `- ${selectedProduct.name}` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[85%]">
        {!selectedProduct || filteredData.length < 2 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            {!selectedProduct 
              ? 'Select a product to view stock history'
              : 'Trigger inventory changes to generate chart data'}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                minTickGap={30}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="storeStock" 
                stroke="#10b981" 
                name="Store Stock"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="warehouseStock" 
                stroke="#8b5cf6" 
                name="Warehouse Stock"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default StockChart;
