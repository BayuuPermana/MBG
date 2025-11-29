import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Upload, Send, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InputPage = () => {
  const [items, setItems] = useState([{ commodity: '', quantity: '', price: '' }]);
  const navigate = useNavigate();

  const handleAddItem = () => {
    setItems([...items, { commodity: '', quantity: '', price: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Report Submitted:', items);
    alert('Laporan Harian Berhasil Dikirim!');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dapur Umum: Jakarta Selatan 01</h1>
            <p className="text-xs text-slate-500">Operator: Budi Santoso</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Jumat, 29 Nov 2025</p>
            <p className="text-xs text-slate-500">Laporan Harian</p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-6">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-indigo-900">Form Belanja Harian</CardTitle>
                <CardDescription className="text-indigo-700/80">
                  Input data belanja bahan baku untuk makan siang gratis hari ini.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group hover:border-indigo-200 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Komoditas</Label>
                        <Input placeholder="Contoh: Beras" className="bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Jumlah (kg/ltr)</Label>
                        <Input type="number" placeholder="0" className="bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Harga Total (Rp)</Label>
                        <Input type="number" placeholder="0" className="bg-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button type="button" variant="outline" onClick={handleAddItem} className="w-full border-dashed border-2 py-6 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-600 transition-all">
                <Plus className="mr-2 h-4 w-4" /> Tambah Item Belanja
              </Button>
              
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <Label className="text-base font-medium mb-2 block">Upload Foto Nota/Struk</Label>
                <div className="flex items-center gap-4">
                  <Input type="file" className="hidden" id="file-upload" />
                  <Label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg hover:bg-white hover:border-indigo-400 transition-all">
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-500">Klik untuk upload foto struk</span>
                    </div>
                  </Label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg shadow-lg hover:shadow-indigo-500/30 transition-all">
                  <Send className="mr-2 h-5 w-5" /> Kirim Laporan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default InputPage;
