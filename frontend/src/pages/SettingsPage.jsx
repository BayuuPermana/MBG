import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const SettingsPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    newPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, username: user.username }));
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/${user.id}`, {
        username: formData.username
      });
      alert('Profil berhasil diperbarui');
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui profil');
    }
  };

  const handleUpdatePassword = async () => {
    if (!formData.newPassword) return;
    try {
      await axios.put(`http://localhost:5000/api/auth/${user.id}`, {
        password: formData.newPassword
      });
      alert('Password berhasil diperbarui');
      setFormData(prev => ({ ...prev, password: '', newPassword: '' }));
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui password');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Pengaturan</h1>
        
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Profil Pengguna</CardTitle>
            <CardDescription>Atur informasi akun dan preferensi Anda.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input 
                  value={formData.username} 
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={user?.role || ''} disabled className="bg-slate-100" />
              </div>
            </div>
            <Button className="bg-indigo-600 text-white" onClick={handleUpdateProfile}>Simpan Perubahan</Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Keamanan</CardTitle>
            <CardDescription>Ubah kata sandi dan pengaturan keamanan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Kata Sandi Baru</Label>
              <Input 
                type="password" 
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              />
            </div>
            <Button variant="outline" onClick={handleUpdatePassword}>Update Password</Button>
          </CardContent>
        </Card>
      </div>
  );
};

export default SettingsPage;
