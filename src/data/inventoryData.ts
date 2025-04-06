
export interface Product {
  id: number;
  name: string;
  storeStock: number;
  warehouseStock: number;
  price: number;
  threshold: number;
  supplierQuantity: number;
}

export interface LogEntry {
  id: number;
  timestamp: Date;
  agent: string;
  action: string;
  message: string;
}

// Initial product data
export const initialProducts: Product[] = [
  {
    id: 1, 
    name: "Smartphone X", 
    storeStock: 15, 
    warehouseStock: 50, 
    price: 899.99,
    threshold: 10,
    supplierQuantity: 30
  },
  {
    id: 2, 
    name: "Wireless Headphones", 
    storeStock: 8, 
    warehouseStock: 25, 
    price: 149.99,
    threshold: 5,
    supplierQuantity: 20
  },
  {
    id: 3, 
    name: "Smart Watch", 
    storeStock: 12, 
    warehouseStock: 30, 
    price: 299.99,
    threshold: 8,
    supplierQuantity: 15
  },
  {
    id: 4, 
    name: "Laptop Pro", 
    storeStock: 6, 
    warehouseStock: 18, 
    price: 1299.99,
    threshold: 4,
    supplierQuantity: 10
  },
  {
    id: 5, 
    name: "Bluetooth Speaker", 
    storeStock: 20, 
    warehouseStock: 40, 
    price: 79.99,
    threshold: 15,
    supplierQuantity: 25
  },
];

// Initial empty log
export const initialLogs: LogEntry[] = [];
