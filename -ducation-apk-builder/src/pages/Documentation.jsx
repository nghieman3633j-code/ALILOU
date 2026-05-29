import React, { useState } from 'react';
import { ChevronDown, FileDownload, AlertCircle, CheckCircle, Search, BookOpen, Code, Zap, HelpCircle } from 'lucide-react';

export default function DocumentationPage() {
  const [expandedSection, setExpandedSection] = useState('guides');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = {
    guides: {
      title: 'أدلة المنصات',
      icon: BookOpen,
      content: [
        { name: 'دليل iOS', platform: 'iOS 14+', status: 'مستقر' },
        { name: 'دليل Android', platform: 'Android 8+', status: 'مستقر' },
        { name: 'دليل Web', platform: 'جميع المتصفحات', status: 'مستقر' },
        { name: 'دليل Windows', platform: 'Windows 10+', status: 'تجريبي' },
      ]
    },
    examples: {
      title: 'أمثلة قابلة للتحميل',
      icon: Code,
      content: [
        { name: 'مثال تطبيق أساسي', size: '2.4 MB', format: 'ZIP' },
        { name: 'مثال متقدم مع API', size: '5.1 MB', format: 'ZIP' },
        { name: 'قوالب واجهة مستخدم', size: '1.8 MB', format: 'ZIP' },
        { name: 'نماذج التكامل', size: '3.2 MB', format: 'ZIP' },
      ]
    },
    troubleshooting: {
      title: 'استكشاف الأخطاء',
      icon: AlertCircle,
      content: [
        { issue: 'مشكلة الاتصال', solution: 'تحقق من الشبكة والجدار الناري' },
        { issue: 'خطأ المصادقة', solution: 'تأكد من صحة مفاتيح API' },
        { issue: 'بطء الأداء', solution: 'قلل عدد الطلبات المتزامنة' },
        { issue: 'عدم توافق الإصدار', solution: 'قم بالترقية إلى أحدث إصدار' },
      ]
    },
    faq: {
      title: 'الأسئلة الشائعة',
      icon: HelpCircle,
      content: [
        { q: 'هل المنصة آمنة؟', a: 'نعم، نستخدم تشفير من الدرجة العسكرية' },
        { q: 'ما هي نسبة وقت التشغيل؟', a: '99.99% مع ضمانات SLA' },
        { q: 'هل يوجد نسخة تجريبية مجانية؟', a: 'نعم، 30 يوماً مجاناً بدون بطاقة ائتمان' },
        { q: 'كيف أتواصل مع الدعم؟', a: 'عبر البريد الإلكتروني أو الدردشة المباشرة 24/7' },
      ]
    }
  };

  const filteredSections = Object.entries(sections).filter(([_, section]) =>
    section.title.includes(searchQuery) || 
    section.content.some(item => JSON.stringify(item).includes(searchQuery))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">التوثيق الشامل</h1>
          <p className="text-sky-100 text-lg">كل ما تحتاجه لإتقان المنصة</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 text-sky-400" size={20} />
            <input
              type="text"
              placeholder="ابحث في التوثيق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-4">الأقسام</h3>
              <div className="space-y-2">
                {Object.entries(sections).map(([key, section]) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setExpandedSection(expandedSection === key ? null : key)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                        expandedSection === key
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-sky-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={18} />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transition ${expandedSection === key ? 'rotate-180' : ''}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {filteredSections.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <Search size={48} className="mx-auto text-sky-300 mb-4" />
                <p className="text-slate-600 text-lg">لم يتم العثور على نتائج</p>
              </div>
            ) : (
              filteredSections.map(([key, section]) => {
                const Icon = section.icon;
                return (
                  <div key={key} className="bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Section Header */}
                    <div className="bg-gradient-to-r from-sky-50 to-sky-100 px-6 py-4 border-r-4 border-sky-500 flex items-center gap-3">
                      <Icon size={24} className="text-sky-600" />
                      <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                    </div>

                    {/* Section Content */}
                    <div className="p-6 space-y-4">
                      {key === 'guides' && (
                        <div className="space-y-3">
                          {section.content.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-sky-50 transition">
                              <div>
                                <p className="font-semibold text-slate-900">{item.name}</p>
                                <p className="text-sm text-slate-600">{item.platform}</p>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                item.status === 'مستقر'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {key === 'examples' && (
                        <div className="space-y-3">
                          {section.content.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-sky-50 transition">
                              <div className="flex items-center gap-3">
                                <FileDownload size={20} className="text-sky-500" />
                                <div>
                                  <p className="font-semibold text-slate-900">{item.name}</p>
                                  <p className="text-sm text-slate-600">{item.size} • {item.format}</p>
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition font-medium">
                                تحميل
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {key === 'troubleshooting' && (
                        <div className="space-y-3">
                          {section.content.map((item, idx) => (
                            <div key={idx} className="p-4 border-r-4 border-orange-400 bg-orange-50 rounded-lg">
                              <div className="flex gap-3">
                                <AlertCircle size={20} className="text-orange-600 flex-shrink-0 mt-1" />
                                <div>
                                  <p className="font-semibold text-slate-900">{item.issue}</p>
                                  <p className="text-sm text-slate-700 mt-1">{item.solution}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {key === 'faq' && (
                        <div className="space-y-3">
                          {section.content.map((item, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-lg hover:shadow-md transition">
                              <div className="flex gap-3">
                                <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="font-semibold text-slate-900 mb-1">{item.q}</p>
                                  <p className="text-sm text-slate-700">{item.a}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Links Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <Zap size={28} className="mb-3" />
            <h3 className="font-bold text-lg mb-2">ابدأ بسرعة</h3>
            <p className="text-sky-100 text-sm">اتبع خطواتنا السهلة للبدء في دقائق</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <Code size={28} className="mb-3" />
            <h3 className="font-bold text-lg mb-2">أمثلة الكود</h3>
            <p className="text-orange-100 text-sm">استكشف أمثلة عملية وقوالب جاهزة</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <HelpCircle size={28} className="mb-3" />
            <h3 className="font-bold text-lg mb-2">احصل على الدعم</h3>
            <p className="text-green-100 text-sm">تواصل مع فريقنا للمساعدة الفورية</p>
          </div>
        </div>
      </div>
    </div>
  );
}