
import React from 'react';
import { Product } from '@/data/inventoryData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

interface InventoryTableProps {
  products: Product[];
  onSelectProduct: (productId: number) => void;
  selectedProductId: number | null;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ 
  products, 
  onSelectProduct,
  selectedProductId 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-center">Store Stock</TableHead>
            <TableHead className="text-center">Warehouse Stock</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow 
              key={product.id}
              className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selectedProductId === product.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
              }`}
              onClick={() => onSelectProduct(product.id)}
            >
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="text-center">
                {product.storeStock < product.threshold ? (
                  <Badge variant="destructive" className="w-16">{product.storeStock}</Badge>
                ) : (
                  <Badge variant="outline" className="w-16">{product.storeStock}</Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                {product.warehouseStock < product.threshold ? (
                  <Badge variant="destructive" className="w-16">{product.warehouseStock}</Badge>
                ) : (
                  <Badge variant="outline" className="w-16">{product.warehouseStock}</Badge>
                )}
              </TableCell>
              <TableCell className="text-right font-mono">${product.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
