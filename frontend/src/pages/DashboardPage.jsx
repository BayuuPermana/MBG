import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, TrendingUp, AlertTriangle, Map } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalKitchens: 0,
    mealsServed: 450000, // Placeholder for now
    inflationAlerts: 3
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/kitchens');
        setStats(prev => ({ ...prev, totalKitchens: res.data.length }));
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    // TODO: Clear auth token
    navigate('/login');
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Government Dashboard</h2>
          <p className="text-slate-500">Welcome back, Admin. Here's the national nutrition overview.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium text-slate-900">Badan Gizi Nasional</p>
            <p className="text-xs text-slate-500">Central Admin</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
            BG
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Kitchens</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.totalKitchens}</div>
            <p className="text-xs text-slate-500">Registered units</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Meals Served Today</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stats.mealsServed.toLocaleString()}</div>
            <p className="text-xs text-slate-500">+5% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Inflation Alert</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inflationAlerts} Regions</div>
            <p className="text-xs text-slate-500">High price anomalies detected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-slate-500" />
              Inflation Map
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full bg-slate-50/50 m-2 rounded-lg border border-dashed border-slate-200">
            <div className="text-center">
              <Map className="h-12 w-12 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-400">Interactive Map Component</p>
            </div>
          </CardContent>
        </Card>
        <Card className="h-96 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-slate-500" />
              Price Trends (Rice & Eggs)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full bg-slate-50/50 m-2 rounded-lg border border-dashed border-slate-200">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-400">Chart Component</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
