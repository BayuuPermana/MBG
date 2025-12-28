import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { Pencil, History, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const CommodityTable = ({ commodities, onEdit, onViewHistory, onSort, sortConfig }) => {
  const getSortIcon = (key) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const SortableHead = ({ label, sortKey, align = "text-left" }) => (
    <TableHead className={align}>
      <Button variant="ghost" onClick={() => onSort(sortKey)} className="-ml-4 h-8 data-[state=open]:bg-accent">
        {label}
        {getSortIcon(sortKey)}
      </Button>
    </TableHead>
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHead label="Nama" sortKey="name" />
            <SortableHead label="Kategori" sortKey="category" />
            <SortableHead label="Wilayah" sortKey="region" />
            <TableHead>Satuan</TableHead>
            <TableHead className="text-right">
                <Button variant="ghost" onClick={() => onSort('price')} className="-mr-4 h-8">
                    Harga (Rp)
                    {getSortIcon('price')}
                </Button>
            </TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commodities.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category || '-'}</TableCell>
              <TableCell>{item.region || '-'}</TableCell>
              <TableCell>{item.unit || '-'}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('id-ID').format(item.price || item.averagePrice || 0)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                    title="Ubah Harga"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewHistory(item)}
                    title="Riwayat Harga"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {commodities.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Tidak ada data komoditas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommodityTable;
