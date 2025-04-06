
import React, { useState } from 'react';
import Header from '@/components/Header';
import InventoryTable from '@/components/InventoryTable';
import AgentActions from '@/components/AgentActions';
import LogPanel from '@/components/LogPanel';
import StockChart from '@/components/StockChart';
import { useInventorySystem } from '@/hooks/useInventorySystem';

const Index = () => {
  const {
    products,
    logs,
    stockHistory,
    triggerPurchase,
    triggerStoreRestock,
    triggerWarehouseReorder,
    triggerForecast,
    triggerPriceAdjustment
  } = useInventorySystem();

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  
  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) || null 
    : null;

  const handleSelectProduct = (productId: number) => {
    setSelectedProductId(productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <div className="grid grid-cols-1 gap-6">
        <InventoryTable 
          products={products} 
          onSelectProduct={handleSelectProduct}
          selectedProductId={selectedProductId}
        />
        
        <AgentActions 
          selectedProduct={selectedProduct}
          onPurchase={triggerPurchase}
          onRestock={triggerStoreRestock}
          onReorder={triggerWarehouseReorder}
          onForecast={triggerForecast}
          onPriceAdjust={triggerPriceAdjustment}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LogPanel logs={logs} />
          <StockChart 
            stockHistory={stockHistory} 
            selectedProduct={selectedProduct} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
