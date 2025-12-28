import React from 'react';
import { Card, CardContent } from './ui/card';
import { ShoppingBasket, Tags, Calendar } from 'lucide-react';

const StatCards = ({ totalItems, totalCategories, lastUpdated }) => {
  const stats = [
    {
      label: 'Total Komoditas',
      value: totalItems,
      icon: ShoppingBasket,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Jumlah Kategori',
      value: totalCategories,
      icon: Tags,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      label: 'Update Terakhir',
      value: lastUpdated ? new Date(lastUpdated).toLocaleDateString('id-ID') : '-',
      icon: Calendar,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
