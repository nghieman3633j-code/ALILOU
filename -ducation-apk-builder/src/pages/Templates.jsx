import React, { useState } from 'react';

const templatesData = [
  { id: 1, name: 'قالب Moodle تعليمي', platform: 'Moodle', color: '#0EA5E9', description: 'قالب تعليمي متجاوب يسهّل إدارة المقررات والتقييمات', badge: 'Moodle' },
  { id: 2, name: 'قالب edX التفاعلي', platform: 'edX', color: '#F97316', description: 'قالب تفاعلي متعدد الأساليب مع مسار تعلم واضح', badge: 'edX' },
  { id: 3, name: 'قالب SCORM جاهز', platform: 'SCORM', color: '#10B981', description: 'قالب SCORM بنمط حديث وسهل التصدير', badge: 'SCORM' },
  { id: 4, name: 'قالب Opale متعدد المنصات', platform: 'Opale', color: '#0EA5E9', description: 'قالب جاهز لاستيراد أمثلة وتكامل سلس', badge: 'Opale' },
  { id: 5, name: 'قالب Moodle متقدم', platform: 'Moodle', color: '#0EA5E9', description: 'قالب متقدم للإدارة والتقييم مع تجربة مستخدم مميزة', badge: 'Moodle' },
  { id: 6, name: 'قالب edX بسيط', platform: 'edX', color: '#F97316', description: 'تصميم بسيط ونقي يركز على المحتوى', badge: 'edX' },
];

// Simple inline icons (بدائل عن lucide-react بسبب القيود)
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconSpark = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
    <path d="M12 3l2.4 6.5L21 12l-6.6 2.5L12 21l-2.4-6.5L3 12l6.6-2.5L12 3z" />
  </svg>
);

export default function TemplatesPage() {
  // حالت الاختيار
  const [selectedTemplateId, setSelectedTemplateId] = useState(templatesData[0].id);
  const [platform, setPlatform] = useState('Moodle');
  const [title, setTitle] = useState('مكتبة القوالب الجاهزة');
  const [desc, setDesc] = useState('استكشف قوالب جاهزة مع معاينة حية وخيارات تخصيص سريعة.');
  const [themeColor, setThemeColor] = useState('#0EA5E9');
  const [loading, setLoading] = useState(false);

  const selectedTemplate = templatesData.find(t => t.id === selectedTemplateId);

  const handleDownload = () => {
    setLoading(true);
    // محاكاة تحميل
    setTimeout(() => setLoading(false), 1200);
  };

  // ألوان تخصيص سريعة
  const colorOptions = ['#0EA5E9', '#F97316', '#10B981', '#8B5CF6', '#64748B'];

  return (
    <div dir="rtl" className="min-h-screen bg-white text-gray-800 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* العنوان الرئيسي */}
        <header className="mb-6">
          <h1 className="text-[32px] font-semibold text-[#0EA5E9] mb-1 tracking-tight">
            مكتبة قوالب جاهزة
          </h1>
          <p className="text-sm text-gray-600">
            قوالب جاهزة لمنصات Moodle و edX و SCORM و Opale مع معاينة حية وإمكانيات تخصيص وتحميل.
          </p>
        </header>

        {/* التخطيط ثنائي الأعمدة */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* عمود المعاينة والمختارات */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-4 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full" style={{ background: '#E6F2FF' }}>
                  <IconEye />
                </span>
                <span className="text-lg font-semibold" style={{ color: '#0F172A' }}>
                  المعاينة الحية
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs" style={{ background: '#EAFBF9', color: '#10B981' }}>
                مباشر
              </span>
            </div>

            {/* أداة الاختيار: مجموعة بطاقات القوالب */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {templatesData.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setSelectedTemplateId(tpl.id);
                    setPlatform(tpl.platform);
                    setTitle(`قالب: ${tpl.name}`);
                    setDesc(tpl.description);
                  }}
                  className={`w-full text-right rounded-xl border border-gray-200 p-3.5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                    tpl.id === selectedTemplateId ? 'ring-2 ring-[#0EA5E9]/60' : ''
                  }`}
                  style={{ background: '#fff' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 truncate" style={{ maxWidth: '70%' }}>
                      <span className="h-6 w-6 rounded full" style={{ background: tpl.color, display: 'inline-block' }} />
                      <span className="text-sm font-medium" style={{ color: '#0F172A' }}>
                        {tpl.name}
                      </span>
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{ background: '#F3F4F6', color: '#374151' }}>
                      {tpl.platform}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 text-right" style={{ minHeight: 40 }}>
                    {tpl.description}
                  </div>
                </button>
              ))}
            </div>

            {/* معاينة حيّة مميزة للمخطط المختار */}
            <div className="mt-2 p-4 h-64 rounded-lg border border-gray-200 bg-gradient-to-br from-white to-white/90 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-6 w-6 rounded" style={{ background: selectedTemplate?.color }} />
                  <span className="text-sm font-medium" style={{ color: '#0F172A' }}>
                    معاينة: {selectedTemplate?.name}
                  </span>
                </div>
                <span className="text-xs px-2 py-1 rounded" style={{ background: '#ECFEFF', color: '#0EA5E9' }}>
                  {selectedTemplate?.platform}
                </span>
              </div>

              {/* نموذج تجريبي لواجهة القالب */}
              <div className="w-full h-44 rounded-lg overflow-hidden border border-gray-200" style={{ background: '#f8fbff' }}>
                <div className="h-10" style={{ background: selectedTemplate?.color }} />
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2" style={{ width: '60%' }} />
                  <div className="h-3 bg-gray-200 rounded mb-1" style={{ width: '80%' }} />
                  <div className="h-3 bg-gray-200 rounded" style={{ width: '40%' }} />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">تجربة سريعة للمحتوى داخل القالب</span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs" style={{ background: '#E6F7EF', color: '#10B981' }}>
                  جاهز للتخصيص
                </span>
              </div>
            </div>
          </div>

          {/* عمود التخصيص والتحميل */}
          <div className="rounded-xl border border-gray-200 shadow-sm bg-white p-4 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-full" style={{ background: '#FFF7ED' }}>
                  <IconSpark />
                </span>
                <span className="text-lg font-semibold" style={{ color: '#0F172A' }}>
                  تخصيص وتحميل
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs" style={{ background: '#FFF3E0', color: '#F97316' }}>
                ملاحظات
              </span>
            </div>

            {/* أداة اختيار المنصة */}
            <div className="mb-4">
              <div className="text-xs uppercase mb-1" style={{ color: '#6B7280' }}>
                المنصة
              </div>
              <div className="flex flex-wrap gap-2">
                {['Moodle', 'edX', 'SCORM', 'Opale'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`px-3 py-2 rounded-full border ${
                      platform === p
                        ? 'bg-[#0EA5E9] text-white border-[#0EA5E9]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    } transition-colors duration-200`}
                    aria-label={`اختر المنصة ${p}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* عنوان القالب والوصف */}
            <div className="mb-3">
              <label className="block text-xs mb-1" style={{ color: '#6B7280' }}>
                العنوان
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-xs mb-1" style={{ color: '#6B7280' }}>
                الوصف
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            {/* لوحة الألوان */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs" style={{ color: '#6B7280' }}>
                  اللون الرئيس
                </span>
                <span className="text-xs" style={{ color: '#6B7280' }}>
                  اختَر لوناً ينسجم مع علامتك
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {colorOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setThemeColor(c)}
                    aria-label={`اختيار اللون ${c}`}
                    className={`h-8 w-8 rounded-full border-2 ${themeColor === c ? 'border-[#0EA5E9]' : 'border-gray-200'} focus:outline-none`}
                    style={{ background: c }}
                    title={c}
                  />
                ))}
                <span className="ml-auto text-xs text-gray-500">مختار: {themeColor}</span>
              </div>
            </div>

            {/* معاينة موجزة للعلامة اللونية وتحديث العرض */}
            <div className="mb-3 p-3 rounded-md border border-gray-200" style={{ background: '#fff' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: '#0F172A' }}>
                  المعاينة السريعة
                </span>
                <span className="text-xs rounded px-2 py-1" style={{ background: '#ECFDF5', color: '#10B981' }}>
                  جاهز
                </span>
              </div>
              <div
                className="h-28 rounded-md"
                style={{
                  background: themeColor,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
                }}
              >
                <div className="p-3 text-white" style={{ textShadow: '0 1px 0 rgba(0,0,0,0.15)' }}>
                  {title}
                </div>
              </div>
            </div>

            {/* أزرار التحميل والتحديث */}
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-[#0EA5E9] text-[#0EA5E9] hover:bg-[#f0fbff] transition"
                disabled={loading}
              >
                <IconDownload />
                {loading ? 'جارٍ التحميل...' : 'تحميل القالب'}
              </button>
              <span className="text-xs text-gray-500">
                سيُنشئ ملفاً يتوافق مع المنصة المختارة
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* أسلوب نهائي: تذييل بسيط لدعم RTL وخيارات الشفرة */}
      <footer className="mt-8 py-6 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
          تجربة المستخدم سريعة وفعالة. جميع القوالب قابلة للتخصيص والتصدير بتنسيقات متوافقة مع الأنظمة الشائعة.
        </div>
      </footer>
    </div>
  );
}