import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { fetchCommodities, createCommodity, updateCommodity } from '../lib/api/commodities';
import CommodityTable from '../components/CommodityTable';
import CommodityForm from '../components/CommodityForm';
import SearchBar from '../components/SearchBar';
import StatCards from '../components/StatCards';

const CommoditiesPage = () => {
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    loadCommodities();
  }, [searchQuery, sortConfig]);

  const loadCommodities = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.q = searchQuery;
      if (sortConfig.key) {
        params.sortBy = sortConfig.key;
        params.order = sortConfig.direction;
      }
      const data = await fetchCommodities(params);
      setCommodities(data);
    } catch (err) {
      console.error("Error fetching commodities:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAdd = () => {
    setSelectedCommodity(null);
    setIsFormOpen(true);
  };

  const handleEdit = (commodity) => {
    setSelectedCommodity(commodity);
    setIsFormOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedCommodity) {
        await updateCommodity(selectedCommodity._id, formData);
      } else {
        await createCommodity(formData);
      }
      setIsFormOpen(false);
      loadCommodities();
    } catch (err) {
      console.error("Error saving commodity:", err);
      const errorMessage = err.response?.data?.message || err.response?.data || "Gagal menyimpan komoditas";
      alert(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    }
  };

  const handleViewHistory = (commodity) => {
      alert(`Riwayat harga untuk ${commodity.name} belum tersedia.`);
  };

  // Calculate statistics
  const totalItems = commodities.length;
  const totalCategories = new Set(commodities.map(c => c.category)).size;
  const lastUpdated = commodities.length > 0 
    ? Math.max(...commodities.map(c => new Date(c.updatedAt).getTime())) 
    : null;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Manajemen Harga Komoditas</h1>
          <p className="text-slate-500 mt-1">Pantau dan kelola standar harga pangan nasional.</p>
        </div>
        <Button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95">
          <Plus className="mr-2 h-4 w-4" /> Tambah Komoditas
        </Button>
      </div>

      <StatCards 
        totalItems={totalItems} 
        totalCategories={totalCategories} 
        lastUpdated={lastUpdated} 
      />

      <div className="mb-6 w-full max-w-sm">
        <SearchBar onSearch={handleSearch} placeholder="Cari komoditas (nama)..." />
      </div>

      <Card className="border-slate-200 shadow-md overflow-hidden">
        <CardHeader className="bg-white border-b">
          <CardTitle className="text-xl font-bold">Daftar Komoditas Aktif</CardTitle>
          <CardDescription>Seluruh data harga acuan per wilayah yang terdaftar.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                Memuat data...
            </div>
          ) : (
            <CommodityTable 
              commodities={commodities} 
              onEdit={handleEdit} 
              onViewHistory={handleViewHistory} 
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          )}
        </CardContent>
      </Card>

      <CommodityForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSave} 
        commodity={selectedCommodity} 
      />
    </div>
  );
};

export default CommoditiesPage;