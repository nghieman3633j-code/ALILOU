export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dir-rtl" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              ⚡
            </div>
            <h1 className="text-2xl font-bold text-slate-900">TransformHub</h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-slate-600 hover:text-sky-500 transition">الميزات</a>
            <a href="#" className="text-slate-600 hover:text-sky-500 transition">المنصات</a>
            <a href="#" className="text-slate-600 hover:text-sky-500 transition">الأمثلة</a>
            <button className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition font-medium">
              ابدأ الآن
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              حوّل بياناتك بسهولة وسرعة
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              منصة تحويل بيانات متقدمة تدعم عشرات الصيغ والمنصات. انقل بياناتك بأمان وكفاءة عالية.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition font-semibold shadow-lg hover:shadow-xl">
                جرب مجاناً
              </button>
              <button className="px-8 py-3 border-2 border-sky-500 text-sky-500 rounded-lg hover:bg-sky-50 transition font-semibold">
                اعرف أكثر
              </button>
            </div>
          </div>
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 space-y-4">
              <div className="h-3 bg-white/20 rounded-full w-3/4"></div>
              <div className="h-3 bg-white/20 rounded-full w-full"></div>
              <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
              <div className="pt-4 space-y-2">
                <div className="h-2 bg-emerald-400/30 rounded-full w-1/2"></div>
                <div className="h-2 bg-orange-400/30 rounded-full w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'عمليات تحويل', value: '2.5M+', icon: '📊' },
              { label: 'منصات مدعومة', value: '48+', icon: '🌐' },
              { label: 'معدل النجاح', value: '99.8%', icon: '✅' },
              { label: 'المستخدمون النشطون', value: '125K+', icon: '👥' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-3xl font-bold text-sky-500 mb-2">{stat.value}</p>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-center text-slate-900 mb-16">الميزات الرئيسية</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'تحويل فوري', desc: 'حول بياناتك في أقل من ثانية', icon: '⚡', color: 'from-sky-500/10 to-blue-500/10' },
            { title: 'أمان عالي', desc: 'تشفير من الدرجة العسكرية لجميع البيانات', icon: '🔒', color: 'from-emerald-500/10 to-green-500/10' },
            { title: 'دعم شامل', desc: 'أكثر من 48 صيغة ومنصة مختلفة', icon: '🔄', color: 'from-orange-500/10 to-amber-500/10' },
            { title: 'واجهة سهلة', desc: 'تصميم بديهي لا يتطلب خبرة تقنية', icon: '✨', color: 'from-purple-500/10 to-pink-500/10' },
            { title: 'API قوي', desc: 'دمج سلس مع تطبيقاتك الموجودة', icon: '🔌', color: 'from-indigo-500/10 to-blue-500/10' },
            { title: 'دعم RTL', desc: 'دعم كامل للعربية والنصوص من اليمين لليسار', icon: '🌍', color: 'from-cyan-500/10 to-sky-500/10' }
          ].map((feature, i) => (
            <div key={i} className={`bg-gradient-to-br ${feature.color} rounded-xl p-8 border border-slate-200 hover:shadow-xl hover:border-sky-300 transition`}>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center mb-16">المنصات المدعومة</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {['AWS', 'Google Cloud', 'Azure', 'Salesforce', 'HubSpot', 'Shopify', 'WordPress', 'Stripe'].map((platform, i) => (
              <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-center hover:bg-white/20 transition cursor-pointer">
                <p className="font-semibold text-lg">{platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Examples */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-4xl font-bold text-center text-slate-900 mb-16">أمثلة تحويلات ناجحة</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { from: 'CSV', to: 'JSON', time: '0.23s', size: '2.4MB' },
            { from: 'XML', to: 'Database', time: '1.15s', size: '5.8MB' },
            { from: 'Excel', to: 'API', time: '0.67s', size: '1.2MB' },
            { from: 'PDF', to: 'Structured Data', time: '2.43s', size: '8.5MB' }
          ].map((example, i) => (
            <div key={i} className="border-2 border-slate-200 rounded-xl p-8 hover:border-sky-500 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 font-bold">
                    {example.from.substring(0, 2)}
                  </div>
                  <div className="text-2xl text-slate-400">←</div>
                  <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">
                    {example.to.substring(0, 2)}
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">نجح ✓</span>
              </div>
              <p className="text-slate-900 font-semibold mb-2">{example.from} → {example.to}</p>
              <div className="flex justify-between text-slate-600 text-sm">
                <span>الوقت: {example.time}</span>
                <span>الحجم: {example.size}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-6">ابدأ تحويل بياناتك اليوم</h3>
          <p className="text-xl mb-8 opacity-90">
            انضم إلى آلاف المستخدمين الذين يثقون بنا لتحويل بياناتهم بأمان وكفاءة
          </p>
          <button className="px-10 py-4 bg-white text-sky-600 rounded-lg font-bold text-lg hover:shadow-2xl transition transform hover:scale-105">
            جرب مجاناً - بدون بطاقة ائتمان
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">المنتج</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">الميزات</a></li>
                <li><a href="#" className="hover:text-white transition">التسعير</a></li>
                <li><a href="#" className="hover:text-white transition">الأمان</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">الموارد</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">التوثيق</a></li>
                <li><a href="#" className="hover:text-white transition">API</a></li>
                <li><a href="#" className="hover:text-white transition">المدونة</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">عن الشركة</a></li>
                <li><a href="#" className="hover:text-white transition">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition">الوظائف</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">قانوني</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">الخصوصية</a></li>
                <li><a href="#" className="hover:text-white transition">الشروط</a></li>
                <li><a href="#" className="hover:text-white transition">الملفات</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex md:flex-row flex-col justify-between items-center text-sm">
            <p>&copy; 2024 TransformHub. جميع الحقوق محفوظة.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">تويتر</a>
              <a href="#" className="hover:text-white transition">لينكدإن</a>
              <a href="#" className="hover:text-white transition">جيتهاب</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}