
import { useState, useEffect, useCallback } from 'react';
import { Product, LogEntry, initialProducts, initialLogs } from '../data/inventoryData';

export function useInventorySystem() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [stockHistory, setStockHistory] = useState<{date: Date; storeStock: number; warehouseStock: number; productId: number}[]>([]);

  // Add a log entry
  const addLog = useCallback((agent: string, action: string, message: string) => {
    const newLog: LogEntry = {
      id: Date.now(),
      timestamp: new Date(),
      agent,
      action,
      message
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
  }, []);

  // Add to stock history for charts
  const updateStockHistory = useCallback((productId: number, storeStock: number, warehouseStock: number) => {
    setStockHistory(prev => [
      ...prev,
      { date: new Date(), storeStock, warehouseStock, productId }
    ]);
  }, []);

  // Customer Agent: Purchase a product
  const purchaseProduct = useCallback((productId: number, quantity: number = 1) => {
    setProducts(prev => {
      const updated = prev.map(product => {
        if (product.id === productId) {
          if (product.storeStock >= quantity) {
            const newStoreStock = product.storeStock - quantity;
            
            // Record the update for history
            updateStockHistory(productId, newStoreStock, product.warehouseStock);
            
            // Add log entry
            addLog('Customer Agent', 'Purchase', 
              `Purchased ${quantity} ${product.name}(s). Store stock now: ${newStoreStock}.`);
            
            // Automatic store agent check for restock
            if (newStoreStock < product.threshold) {
              setTimeout(() => storeAgentRestock(productId), 1000);
            }
            
            return { ...product, storeStock: newStoreStock };
          } else {
            addLog('Customer Agent', 'Purchase Failed', 
              `Not enough ${product.name} in store stock (requested: ${quantity}, available: ${product.storeStock}).`);
            return product;
          }
        }
        return product;
      });
      
      return updated;
    });
  }, [addLog, updateStockHistory]);

  // Store Agent: Restock from warehouse
  const storeAgentRestock = useCallback((productId: number) => {
    setProducts(prev => {
      const product = prev.find(p => p.id === productId);
      if (!product) return prev;
      
      const restockQuantity = Math.min(
        product.threshold * 2 - product.storeStock, // Amount needed to reach 2x threshold
        product.warehouseStock // Limited by warehouse stock
      );
      
      if (restockQuantity <= 0) {
        addLog('Store Agent', 'Restock Failed', 
          `Cannot restock ${product.name}. Warehouse stock too low: ${product.warehouseStock}.`);
        
        // Trigger warehouse agent
        setTimeout(() => warehouseAgentReorder(productId), 1000);
        
        return prev;
      }
      
      const newStoreStock = product.storeStock + restockQuantity;
      const newWarehouseStock = product.warehouseStock - restockQuantity;
      
      // Record the update for history
      updateStockHistory(productId, newStoreStock, newWarehouseStock);
      
      addLog('Store Agent', 'Restock', 
        `Restocked store with ${restockQuantity} ${product.name}(s) from warehouse. New store stock: ${newStoreStock}.`);
      
      // Check if warehouse needs to reorder
      if (newWarehouseStock < product.threshold) {
        setTimeout(() => warehouseAgentReorder(productId), 1000);
      }
      
      return prev.map(p => 
        p.id === productId 
          ? { ...p, storeStock: newStoreStock, warehouseStock: newWarehouseStock } 
          : p
      );
    });
  }, [addLog, updateStockHistory]);

  // Warehouse Agent: Reorder from supplier
  const warehouseAgentReorder = useCallback((productId: number) => {
    setProducts(prev => {
      const product = prev.find(p => p.id === productId);
      if (!product) return prev;
      
      addLog('Warehouse Agent', 'Reorder', 
        `Ordering ${product.supplierQuantity} ${product.name}(s) from supplier.`);
      
      // Simulate supplier processing time (3 seconds)
      setTimeout(() => supplierAgentDeliver(productId), 3000);
      
      return prev;
    });
  }, [addLog]);

  // Supplier Agent: Deliver to warehouse
  const supplierAgentDeliver = useCallback((productId: number) => {
    setProducts(prev => {
      const product = prev.find(p => p.id === productId);
      if (!product) return prev;
      
      const newWarehouseStock = product.warehouseStock + product.supplierQuantity;
      
      // Record the update for history
      updateStockHistory(productId, product.storeStock, newWarehouseStock);
      
      addLog('Supplier Agent', 'Delivery', 
        `Delivered ${product.supplierQuantity} ${product.name}(s) to warehouse. New warehouse stock: ${newWarehouseStock}.`);
      
      return prev.map(p => 
        p.id === productId 
          ? { ...p, warehouseStock: newWarehouseStock } 
          : p
      );
    });
  }, [addLog, updateStockHistory]);

  // Forecasting Agent: Predict demand
  const forecastDemand = useCallback((productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Generate simple forecast based on current levels
    const forecastValue = Math.round((product.storeStock + product.warehouseStock) * 0.7);
    const daysOfSupply = Math.round((product.storeStock + product.warehouseStock) / 3.5);
    
    addLog('Forecasting Agent', 'Prediction', 
      `${product.name} - Predicted weekly demand: ${forecastValue} units. Estimated days of supply: ${daysOfSupply} days.`);
  }, [products, addLog]);

  // Pricing Agent: Adjust prices
  const adjustPrice = useCallback((productId: number) => {
    setProducts(prev => {
      const product = prev.find(p => p.id === productId);
      if (!product) return prev;
      
      const totalStock = product.storeStock + product.warehouseStock;
      let priceAdjustment = 0;
      
      // Logic for price adjustment based on stock levels
      if (totalStock < product.threshold) {
        // Low stock, increase price by 5-10%
        priceAdjustment = product.price * (0.05 + Math.random() * 0.05);
      } else if (totalStock > product.threshold * 3) {
        // High stock, decrease price by 5-15%
        priceAdjustment = -product.price * (0.05 + Math.random() * 0.1);
      } else {
        // Normal stock, small random adjustment ±3%
        priceAdjustment = product.price * (Math.random() * 0.06 - 0.03);
      }
      
      const newPrice = Math.round((product.price + priceAdjustment) * 100) / 100;
      
      addLog('Pricing Agent', 'Price Adjustment', 
        `${product.name} - Price changed from $${product.price.toFixed(2)} to $${newPrice.toFixed(2)} based on inventory level.`);
      
      return prev.map(p => 
        p.id === productId 
          ? { ...p, price: newPrice } 
          : p
      );
    });
  }, [addLog]);

  // Manual agent action functions that will be exposed to components
  const triggerPurchase = (productId: number) => {
    purchaseProduct(productId);
  };
  
  const triggerStoreRestock = (productId: number) => {
    storeAgentRestock(productId);
  };
  
  const triggerWarehouseReorder = (productId: number) => {
    warehouseAgentReorder(productId);
  };
  
  const triggerForecast = (productId: number) => {
    forecastDemand(productId);
  };
  
  const triggerPriceAdjustment = (productId: number) => {
    adjustPrice(productId);
  };
  
  return {
    products,
    logs,
    stockHistory,
    triggerPurchase,
    triggerStoreRestock,
    triggerWarehouseReorder,
    triggerForecast,
    triggerPriceAdjustment
  };
}
