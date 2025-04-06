
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/inventoryData';
import { 
  ShoppingCart, 
  Package, 
  Truck, 
  LineChart, 
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AgentActionsProps {
  selectedProduct: Product | null;
  onPurchase: (productId: number) => void;
  onRestock: (productId: number) => void;
  onReorder: (productId: number) => void;
  onForecast: (productId: number) => void;
  onPriceAdjust: (productId: number) => void;
}

const AgentActions: React.FC<AgentActionsProps> = ({
  selectedProduct,
  onPurchase,
  onRestock,
  onReorder,
  onForecast,
  onPriceAdjust
}) => {
  if (!selectedProduct) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Agent Actions</CardTitle>
          <CardDescription>Select a product to perform agent actions</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Actions</CardTitle>
        <CardDescription>For: {selectedProduct.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Button 
          onClick={() => onPurchase(selectedProduct.id)} 
          className="flex flex-col items-center gap-1 h-auto py-3"
          variant="outline"
          disabled={selectedProduct.storeStock <= 0}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-xs">Customer</span>
          <span className="text-xs font-semibold">Purchase</span>
        </Button>
        
        <Button 
          onClick={() => onRestock(selectedProduct.id)} 
          className="flex flex-col items-center gap-1 h-auto py-3"
          variant="outline"
          disabled={selectedProduct.warehouseStock <= 0}
        >
          <Package className="h-5 w-5" />
          <span className="text-xs">Store</span>
          <span className="text-xs font-semibold">Restock</span>
        </Button>
        
        <Button 
          onClick={() => onReorder(selectedProduct.id)} 
          className="flex flex-col items-center gap-1 h-auto py-3"
          variant="outline"
        >
          <Truck className="h-5 w-5" />
          <span className="text-xs">Warehouse</span>
          <span className="text-xs font-semibold">Reorder</span>
        </Button>
        
        <Button 
          onClick={() => onForecast(selectedProduct.id)} 
          className="flex flex-col items-center gap-1 h-auto py-3"
          variant="outline"
        >
          <LineChart className="h-5 w-5" />
          <span className="text-xs">Forecasting</span>
          <span className="text-xs font-semibold">Predict</span>
        </Button>
        
        <Button 
          onClick={() => onPriceAdjust(selectedProduct.id)} 
          className="flex flex-col items-center gap-1 h-auto py-3"
          variant="outline"
        >
          <DollarSign className="h-5 w-5" />
          <span className="text-xs">Pricing</span>
          <span className="text-xs font-semibold">Adjust</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AgentActions;
