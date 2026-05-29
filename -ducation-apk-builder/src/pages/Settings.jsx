import React, { useState } from 'react';
import { Settings, Globe, Clock, Key, Shield, Bell, Save, Copy, Eye, EyeOff, Trash2, Plus } from 'lucide-react';

export default function SettingsPage() {
  const [language, setLanguage] = useState('ar');
  const [timezone, setTimezone] = useState('Asia/Riyadh');
  const [defaultCurrency, setDefaultCurrency] = useState('SAR');
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API Key', created: '2024-01-15', lastUsed: '2024-01-18', masked: 'sk_live_****...8f9a' }
  ]);
  const [showNewApiKey, setShowNewApiKey] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    analytics: true,
    marketing: false,
    thirdParty: false
  });
  const [visibleKeys, setVisibleKeys] = useState({});
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleApiKeyVisibility = (id) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const togglePrivacySetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 md:px-8 rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-sky-500 rounded-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">الإعدادات</h1>
        </div>
        <p className="text-slate-600 mr-12">إدارة إعدادات حسابك والتفضيلات الشخصية</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-700">تم حفظ التغييرات بنجاح</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Language & Region Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-transparent">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-sky-500" />
                <h2 className="text-lg font-semibold text-slate-900">اللغة والمنطقة</h2>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">اللغة</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900">
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">المنطقة الزمنية</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900">
                  <option value="Asia/Riyadh">آسيا/الرياض (GMT+3)</option>
                  <option value="Asia/Dubai">آسيا/دبي (GMT+4)</option>
                  <option value="Europe/London">أوروبا/لندن (GMT)</option>
                  <option value="America/New_York">أمريكا/نيويورك (GMT-5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Currency Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-transparent">
              <h2 className="text-lg font-semibold text-slate-900">خيارات التحويل الافتراضية</h2>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">العملة الافتراضية</label>
              <select value={defaultCurrency} onChange={(e) => setDefaultCurrency(e.target.value)} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900">
                <option value="SAR">الريال السعودي (SAR)</option>
                <option value="AED">الدرهم الإماراتي (AED)</option>
                <option value="USD">الدولار الأمريكي (USD)</option>
                <option value="EUR">اليورو (EUR)</option>
                <option value="GBP">الجنيه الإسترليني (GBP)</option>
              </select>
            </div>
          </div>

          {/* API Keys Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-sky-500" />
                  <h2 className="text-lg font-semibold text-slate-900">مفاتيح API</h2>
                </div>
                <button onClick={() => setShowNewApiKey(!showNewApiKey)} className="flex items-center gap-2 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors">
                  <Plus className="w-4 h-4" />
                  جديد
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {showNewApiKey && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800 mb-3">مفتاح API جديد:</p>
                  <div className="p-3 bg-white border border-orange-300 rounded font-mono text-xs break-all mb-3">sk_live_7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p</div>
                  <button className="flex items-center gap-2 px-3 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded text-sm font-medium transition-colors">
                    <Copy className="w-4 h-4" />
                    نسخ
                  </button>
                </div>
              )}
              {apiKeys.map(key => (
                <div key={key.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-slate-900">{key.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">تم الإنشاء: {key.created}</p>
                    </div>
                    <button onClick={() => toggleApiKeyVisibility(key.id)} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                      {visibleKeys[key.id] ? <Eye className="w-4 h-4 text-slate-600" /> : <EyeOff className="w-4 h-4 text-slate-600" />}
                    </button>
                  </div>
                  <div className="p-2 bg-white border border-slate-300 rounded font-mono text-xs text-slate-600 mb-3 flex items-center justify-between">
                    <span>{visibleKeys[key.id] ? 'sk_live_7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p' : key.masked}</span>
                    <Copy className="w-4 h-4 cursor-pointer hover:text-sky-500" />
                  </div>
                  <p className="text-xs text-slate-500 mb-3">آخر استخدام: {key.lastUsed}</p>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors">
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-sky-50 to-transparent">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-sky-500" />
                <h2 className="text-lg font-semibold text-slate-900">تفضيلات الخصوصية</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: 'dataCollection', label: 'جمع البيانات الأساسية', desc: 'السماح بجمع البيانات الضرورية لتحسين الخدمة' },
                { key: 'analytics', label: 'تحليلات الاستخدام', desc: 'تتبع كيفية استخدامك للخدمة لتحسينها' },
                { key: 'marketing', label: 'رسائل التسويق', desc: 'تلقي عروض خاصة وأخبار عن الخدمات الجديدة' },
                { key: 'thirdParty', label: 'مشاركة مع أطراف ثالثة', desc: 'السماح بمشاركة البيانات مع شركائنا' }
              ].map(item => (
                <div key={item.key} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <input type="checkbox" checked={privacySettings[item.key]} onChange={() => togglePrivacySetting(item.key)} className="mt-1 w-5 h-5 rounded border-slate-300 text-sky-500 focus:ring-sky-500 cursor-pointer" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-900 cursor-pointer">{item.label}</label>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Save Button */}
            <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              <Save className="w-5 h-5" />
              حفظ التغييرات
            </button>

            {/* Quick Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-sky-500" />
                معلومات مهمة
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>التغييرات تُحفظ تلقائياً عند تعديلك</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>مفاتيح API حساسة - احفظها بأمان</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  <span>يمكنك تغيير تفضيلات الخصوصية في أي وقت</span>
                </li>
              </ul>
            </div>

            {/* Account Status */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm border border-green-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-semibold text-green-900">حالة الحساب</h3>
              </div>
              <p className="text-sm text-green-800">حسابك نشط وآمن</p>
              <p className="text-xs text-green-700 mt-2">آخر فحص أمان: اليوم الساعة 14:32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}