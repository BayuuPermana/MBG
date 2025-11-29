import React from 'react';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UtensilsCrossed, FileText, Settings, LogOut, ShoppingBasket, Users } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Clear auth token
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:block fixed h-full z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span className="font-bold text-lg">G</span>
          </div>
          GiziSync
        </h1>
      </div>
      <nav className="mt-6 px-4 space-y-2">
        <Link to="/dashboard">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive('/dashboard') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
        </Link>
        <Link to="/kitchens">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive('/kitchens') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            <UtensilsCrossed className="mr-2 h-4 w-4" /> Kitchens
          </Button>
        </Link>
        <Link to="/commodities">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive('/commodities') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            <ShoppingBasket className="mr-2 h-4 w-4" /> Commodities
          </Button>
        </Link>
        <Link to="/users">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive('/users') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            <Users className="mr-2 h-4 w-4" /> Users
          </Button>
        </Link>
        <Link to="/reports">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive('/reports') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            <FileText className="mr-2 h-4 w-4" /> Reports
          </Button>
        </Link>
        <Link to="/settings">
          <Button 
            variant="ghost" 
            className={`w-full justify-start ${isActive('/settings') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </Link>
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t border-slate-800">
        <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-slate-800" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
