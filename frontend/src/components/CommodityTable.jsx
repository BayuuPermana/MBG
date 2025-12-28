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
import { Pencil, History } from 'lucide-react';

const CommodityTable = ({ commodities, onEdit, onViewHistory }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Wilayah</TableHead>
            <TableHead>Satuan</TableHead>
            <TableHead className="text-right">Harga (Rp)</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {commodities.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.region}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('id-ID').format(item.price)}
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
