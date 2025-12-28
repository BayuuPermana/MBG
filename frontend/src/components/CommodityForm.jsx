import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { COMMODITY_CATEGORIES } from '../lib/constants';

const CommodityForm = ({ isOpen, onClose, onSave, commodity }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    unit: '',
    region: '',
  });

  useEffect(() => {
    if (commodity) {
      setFormData({
        name: commodity.name || '',
        category: commodity.category || '',
        price: commodity.price || '',
        unit: commodity.unit || '',
        region: commodity.region || '',
      });
    } else {
      setFormData({
        name: '',
        category: COMMODITY_CATEGORIES[0], // Default to first category
        price: '',
        unit: '',
        region: 'Nasional', // Default region
      });
    }
  }, [commodity, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {commodity ? 'Ubah Komoditas' : 'Tambah Komoditas Baru'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-extrabold text-black text-base">
              Nama
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3 border-slate-300 focus:border-indigo-500"
              placeholder="Contoh: Beras SPHP"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right font-extrabold text-black text-base">
              Kategori
            </Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="col-span-3 flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              {COMMODITY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region" className="text-right font-extrabold text-black text-base">
              Wilayah
            </Label>
            <Input
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="col-span-3 border-slate-300 focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit" className="text-right font-extrabold text-black text-base">
              Satuan
            </Label>
            <Input
              id="unit"
              name="unit"
              placeholder="kg, liter, dll"
              value={formData.unit}
              onChange={handleChange}
              className="col-span-3 border-slate-300 focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right font-extrabold text-black text-base">
              Harga
            </Label>
            <div className="col-span-3 relative">
                <span className="absolute left-3 top-2 text-slate-400 text-sm">Rp</span>
                <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="pl-10 border-slate-300 focus:border-indigo-500"
                placeholder="0"
                required
                />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-300">
              Batal
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {commodity ? 'Simpan Perubahan' : 'Tambah Komoditas'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommodityForm;
