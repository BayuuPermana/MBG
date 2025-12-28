import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, User, Shield, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import axios from '../lib/axios';
import SearchBar from '../components/SearchBar';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'kitchen',
    kitchenId: '' // Optional, for kitchen operators
  });

  const [kitchens, setKitchens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });

  useEffect(() => {
    fetchUsers();
    fetchKitchens();
  }, [searchQuery, sortConfig]);

  const fetchKitchens = async () => {
    try {
      const res = await axios.get('/kitchens');
      setKitchens(res.data);
    } catch (err) {
      console.error("Error fetching kitchens:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.q = searchQuery;
      if (sortConfig.key) {
        params.sortBy = sortConfig.key;
        params.order = sortConfig.direction;
      }
      const res = await axios.get('/auth', { params });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
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

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleEdit = (user) => {
    setNewUser({
      username: user.username,
      password: '', // Leave blank to keep current password
      role: user.role,
      kitchenId: user.kitchenId ? user.kitchenId._id : ''
    });
    setCurrentId(user._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/auth/${currentId}`, newUser);
      } else {
        await axios.post('/auth/register', newUser);
      }
      setShowForm(false);
      setIsEditing(false);
      setCurrentId(null);
      fetchUsers();
      setNewUser({ username: '', password: '', role: 'kitchen', kitchenId: '' });
    } catch (err) {
      console.error("Error saving user:", err);
      alert("Failed to save user");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/auth/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Pengguna</h1>
          <p className="text-slate-500">Kelola akun admin dan operator dapur.</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setIsEditing(false); setNewUser({ username: '', password: '', role: 'kitchen', kitchenId: '' }); }} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Plus className="mr-2 h-4 w-4" /> Tambah User
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full max-w-sm">
          <SearchBar onSearch={handleSearch} placeholder="Cari username..." />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSort('username')} className="h-10">
            Username {sortConfig.key === 'username' ? (sortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />) : <ArrowUpDown className="ml-2 h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={() => handleSort('role')} className="h-10">
            Role {sortConfig.key === 'role' ? (sortConfig.direction === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />) : <ArrowUpDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-8 border-indigo-100 shadow-md">
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit User' : 'Tambah User Baru'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input 
                  value={newUser.username} 
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})} 
                  placeholder="username" 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Password {isEditing && '(Kosongkan jika tidak ingin mengubah)'}</Label>
                <Input 
                  type="password"
                  value={newUser.password} 
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
                  placeholder="******" 
                  required={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="kitchen">Kitchen Operator</option>
                  <option value="admin">Admin Pusat</option>
                </select>
              </div>
              
              {newUser.role === 'kitchen' && (
                <div className="space-y-2">
                  <Label>Assign Kitchen</Label>
                  <select 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newUser.kitchenId}
                    onChange={(e) => setNewUser({...newUser, kitchenId: e.target.value})}
                    required
                  >
                    <option value="">Select a Kitchen</option>
                    {kitchens.map(k => (
                      <option key={k._id} value={k._id}>{k.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Batal</Button>
                <Button type="submit" className="bg-indigo-600 text-white">Simpan</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-500">Memuat pengguna...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user._id} className="hover:shadow-lg transition-shadow border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {user.role === 'admin' ? <Shield className="h-6 w-6" /> : <User className="h-6 w-6" />}
                  </div>
                  <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-indigo-500"
                        onClick={() => handleEdit(user)}
                        title="Ubah Pengguna"
                        aria-label="Ubah Pengguna"
                      >
                          <User className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-500"
                        onClick={() => handleDelete(user._id)}
                        title="Hapus Pengguna"
                        aria-label="Hapus Pengguna"
                      >
                          <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{user.username}</CardTitle>
                <CardDescription className="capitalize">
                  {user.role === 'admin' ? 'Administrator' : 'Operator Dapur'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-500">
                  {user.kitchenId ? `Kitchen: ${user.kitchenId.name || 'Assigned'}` : 'No Kitchen Assigned'}
                </div>
              </CardContent>
            </Card>
          ))}
          {users.length === 0 && (
            <div className="col-span-3 text-center py-12 text-slate-500">
              Tidak ada data pengguna yang ditemukan.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
