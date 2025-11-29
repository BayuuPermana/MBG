import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Filter, Calendar } from 'lucide-react';

const ReportsPage = () => {
  const reports = [
    { id: 'RPT-001', date: '2025-11-29', kitchen: 'Jakarta Selatan 01', total: 1500000, status: 'Verified' },
    { id: 'RPT-002', date: '2025-11-28', kitchen: 'Jakarta Selatan 01', total: 1450000, status: 'Verified' },
    { id: 'RPT-003', date: '2025-11-27', kitchen: 'Jakarta Selatan 01', total: 1600000, status: 'Pending' },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Laporan & SPJ</h1>
            <p className="text-slate-500">Riwayat laporan belanja dan status verifikasi.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white">
              <Calendar className="mr-2 h-4 w-4" /> Filter Tanggal
            </Button>
            <Button variant="outline" className="bg-white">
              <Filter className="mr-2 h-4 w-4" /> Status
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Download className="mr-2 h-4 w-4" /> Export Excel
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border-0">
          <CardHeader className="bg-white border-b border-slate-100">
            <CardTitle>Riwayat Transaksi</CardTitle>
            <CardDescription>Daftar laporan harian yang telah disubmit.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm text-left">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                    <th className="h-12 px-4 align-middle font-medium text-slate-500">ID Laporan</th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Tanggal</th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Dapur</th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Total Belanja</th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Status</th>
                    <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                      <td className="p-4 align-middle font-medium">{report.id}</td>
                      <td className="p-4 align-middle">{report.date}</td>
                      <td className="p-4 align-middle">{report.kitchen}</td>
                      <td className="p-4 align-middle">Rp {report.total.toLocaleString('id-ID')}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          report.status === 'Verified' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Detail</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
