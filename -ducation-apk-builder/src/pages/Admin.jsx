import React, { useState } from 'react';
import { BarChart3, Users, AlertCircle, CheckCircle, Settings, LogOut, Menu, X, TrendingUp, Activity, Database, Shield } from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'إجمالي المستخدمين', value: '12,584', icon: Users, color: '#0EA5E9', trend: '+12%' },
    { label: 'النشاط اليومي', value: '3,247', icon: Activity, color: '#10B981', trend: '+8%' },
    { label: 'التنبيهات النشطة', value: '24', icon: AlertCircle, color: '#F97316', trend: '-3%' },
    { label: 'معدل الأداء', value: '98.5%', icon: TrendingUp, color: '#0EA5E9', trend: '+2%' },
  ];

  const recentUsers = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', status: 'نشط', joinDate: '2024-01-15' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', status: 'نشط', joinDate: '2024-01-14' },
    { id: 3, name: 'محمود سالم', email: 'mahmoud@example.com', status: 'معطل', joinDate: '2024-01-13' },
    { id: 4, name: 'ليلى حسن', email: 'layla@example.com', status: 'نشط', joinDate: '2024-01-12' },
  ];

  const activityLogs = [
    { id: 1, action: 'تسجيل دخول مستخدم جديد', user: 'سارة أحمد', time: 'منذ 5 دقائق', type: 'success' },
    { id: 2, action: 'تحديث إعدادات النظام', user: 'المسؤول', time: 'منذ 15 دقيقة', type: 'info' },
    { id: 3, action: 'محاولة دخول فاشلة', user: 'مستخدم غير معروف', time: 'منذ 32 دقيقة', type: 'warning' },
    { id: 4, action: 'حذف حساب مستخدم', user: 'علي محمد', time: 'منذ ساعة', type: 'danger' },
  ];

  return (
    <div className="flex h-screen bg-slate-50" dir="rtl">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 ease-out shadow-lg`}>
        <div className="flex items-center justify-between p-6">
          <h1 className={`font-bold text-xl transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Admin</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-700 rounded-lg transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8 space-y-2 px-3">
          {[
            { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
            { id: 'users', label: 'المستخدمون', icon: Users },
            { id: 'monitoring', label: 'المراقبة', icon: Shield },
            { id: 'logs', label: 'السجلات', icon: Database },
            { id: 'settings', label: 'الإعدادات', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <item.icon size={20} />
              <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-3 right-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
            <LogOut size={20} />
            <span className={`${sidebarOpen ? 'block' : 'hidden'}`}>تسجيل خروج</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">لوحة التحكم</h2>
              <p className="text-slate-500 mt-1">مرحباً بك في لوحة الإدارة، هنا يمكنك إدارة جميع جوانب النظام</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-sky-50 px-4 py-2 rounded-lg border border-sky-200">
                <p className="text-sm text-slate-600">آخر تحديث: <span className="font-semibold text-sky-600">الآن</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-orange-600'}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Users Management */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">إدارة المستخدمين</h3>
                <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                  + مستخدم جديد
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">الاسم</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">البريد الإلكتروني</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">الحالة</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">تاريخ الانضمام</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4 text-sm text-slate-900">{user.name}</td>
                        <td className="py-4 px-4 text-sm text-slate-600">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'نشط' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${user.status === 'نشط' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600">{user.joinDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* System Monitoring */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">مراقبة النظام</h3>
              <div className="space-y-4">
                {[
                  { label: 'استخدام الذاكرة', value: 72, color: 'bg-sky-500' },
                  { label: 'استخدام المعالج', value: 45, color: 'bg-emerald-500' },
                  { label: 'استخدام التخزين', value: 68, color: 'bg-orange-500' },
                  { label: 'النطاق الترددي', value: 38, color: 'bg-purple-500' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">السجلات الحديثة</h3>
            <div className="space-y-4">
              {activityLogs.map(log => (
                <div key={log.id} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    log.type === 'success' ? 'bg-green-100' :
                    log.type === 'warning' ? 'bg-orange-100' :
                    log.type === 'danger' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    {log.type === 'success' ? <CheckCircle size={20} className="text-green-600" /> :
                     log.type === 'warning' ? <AlertCircle size={20} className="text-orange-600" /> :
                     log.type === 'danger' ? <AlertCircle size={20} className="text-red-600" /> :
                     <Activity size={20} className="text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{log.action}</p>
                    <p className="text-sm text-slate-600 mt-1">بواسطة: <span className="font-medium">{log.user}</span></p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}