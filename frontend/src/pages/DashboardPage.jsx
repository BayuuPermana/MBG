import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UtensilsCrossed, FileText, Settings, LogOut, TrendingUp, AlertTriangle, Map } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:block">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">G</span>
            </div>
            GiziSync
          </h1>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <UtensilsCrossed className="mr-2 h-4 w-4" /> Kitchens
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <FileText className="mr-2 h-4 w-4" /> Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Government Dashboard</h2>
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
              <div className="text-2xl font-bold text-slate-900">1,240</div>
              <p className="text-xs text-slate-500">+12 from last month</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Meals Served Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">450,000</div>
              <p className="text-xs text-slate-500">+5% from yesterday</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Inflation Alert</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3 Regions</div>
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
      </main>
    </div>
  );
};

export default DashboardPage;
