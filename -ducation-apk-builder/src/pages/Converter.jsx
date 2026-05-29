import React, { useState } from 'react';
import { Upload, Download, AlertCircle, CheckCircle, ArrowRightLeft, File, Loader } from 'lucide-react';

export default function ConverterPage() {
  const [sourceFormat, setSourceFormat] = useState('pdf');
  const [targetFormat, setTargetFormat] = useState('docx');
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const formats = [
    { id: 'pdf', label: 'PDF' },
    { id: 'docx', label: 'Word' },
    { id: 'xlsx', label: 'Excel' },
    { id: 'pptx', label: 'PowerPoint' },
    { id: 'jpg', label: 'JPG' },
    { id: 'png', label: 'PNG' },
    { id: 'txt', label: 'Text' },
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('يرجى تحميل ملف أولاً');
      return;
    }

    setConverting(true);
    setError(null);

    // محاكاة عملية التحويل
    setTimeout(() => {
      setConverting(false);
      setResult({
        name: `${file.name.split('.')[0]}.${targetFormat}`,
        size: Math.round(file.size * 0.85),
        status: 'success',
      });
    }, 2000);
  };

  const handleDownload = () => {
    if (result) {
      // محاكاة التحميل
      const link = document.createElement('a');
      link.href = '#';
      link.download = result.name;
      link.click();
    }
  };

  const handleSwapFormats = () => {
    const temp = sourceFormat;
    setSourceFormat(targetFormat);
    setTargetFormat(temp);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8" dir="rtl">
      {/* الرأس */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
          محرك التحويل
        </h1>
        <p className="text-lg text-slate-600">
          حوّل ملفاتك بين صيغ متعددة بسهولة وسرعة
        </p>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* قسم الإدخال */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">إعدادات التحويل</h2>

          {/* اختيار الصيغة المصدر */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              صيغة المصدر
            </label>
            <select
              value={sourceFormat}
              onChange={(e) => setSourceFormat(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-sky-500 focus:outline-none text-slate-900 font-medium transition-colors"
            >
              {formats.map((fmt) => (
                <option key={fmt.id} value={fmt.id}>
                  {fmt.label}
                </option>
              ))}
            </select>
          </div>

          {/* زر التبديل */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSwapFormats}
              className="p-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              title="تبديل الصيغ"
            >
              <ArrowRightLeft size={20} />
            </button>
          </div>

          {/* اختيار الصيغة الهدف */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              صيغة الهدف
            </label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-sky-500 focus:outline-none text-slate-900 font-medium transition-colors"
            >
              {formats.map((fmt) => (
                <option key={fmt.id} value={fmt.id}>
                  {fmt.label}
                </option>
              ))}
            </select>
          </div>

          {/* رفع الملف */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              رفع الملف
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-input"
                accept="*"
              />
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-sky-300 rounded-xl cursor-pointer hover:bg-sky-50 transition-colors bg-sky-50/30"
              >
                <Upload className="text-sky-500 mb-2" size={32} />
                <span className="text-sm font-semibold text-slate-900">
                  انقر لتحميل أو اسحب الملف
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  الحد الأقصى 100 ميجابايت
                </span>
              </label>
            </div>

            {/* عرض الملف المحمل */}
            {file && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-emerald-600" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-emerald-900">{file.name}</p>
                  <p className="text-xs text-emerald-700">
                    {(file.size / 1024).toFixed(2)} كيلوبايت
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* رسائل الخطأ */}
          {error && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-orange-900 font-medium">{error}</p>
            </div>
          )}

          {/* أزرار الإجراء */}
          <div className="flex gap-3">
            <button
              onClick={handleConvert}
              disabled={!file || converting}
              className={`flex-1 py-3 px-6 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                converting || !file
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-sky-500 to-sky-600 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
            >
              {converting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  جاري التحويل...
                </>
              ) : (
                'تحويل الآن'
              )}
            </button>
            {file && (
              <button
                onClick={handleReset}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-colors"
              >
                مسح
              </button>
            )}
          </div>
        </div>

        {/* قسم المعاينة والنتائج */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">النتائج</h2>

          {!result && !converting && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <File className="text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">
                لم يتم تحويل أي ملف بعد
              </p>
              <p className="text-slate-400 text-sm mt-2">
                حمّل ملفاً واختر الصيغة المطلوبة لبدء التحويل
              </p>
            </div>
          )}

          {converting && (
            <div className="h-full flex flex-col items-center justify-center py-12">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                  <Loader className="text-sky-500 animate-spin" size={24} />
                </div>
              </div>
              <p className="text-slate-900 font-bold text-lg">جاري تحويل الملف...</p>
              <p className="text-slate-500 text-sm mt-2">يرجى الانتظار قليلاً</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* بطاقة النتيجة */}
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-200 rounded-lg">
                    <CheckCircle className="text-emerald-700" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-emerald-700 font-semibold mb-1">
                      تم التحويل بنجاح!
                    </p>
                    <p className="text-2xl font-bold text-emerald-900">
                      {result.name}
                    </p>
                    <p className="text-sm text-emerald-700 mt-2">
                      الحجم: {(result.size / 1024).toFixed(2)} كيلوبايت
                    </p>
                  </div>
                </div>
              </div>

              {/* زر التحميل */}
              <button
                onClick={handleDownload}
                className="w-full py-4 px-6 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
              >
                <Download size={20} />
                تحميل الملف المحول
              </button>

              {/* زر تحويل آخر */}
              <button
                onClick={handleReset}
                className="w-full py-3 px-6 border-2 border-sky-500 text-sky-600 rounded-lg font-bold hover:bg-sky-50 transition-colors"
              >
                تحويل ملف آخر
              </button>
            </div>
          )}
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: '⚡', title: 'سريع جداً', desc: 'تحويل فوري في ثوانٍ معدودة' },
          { icon: '🔒', title: 'آمن تماماً', desc: 'ملفاتك محمية وآمنة تماماً' },
          { icon: '✨', title: 'جودة عالية', desc: 'الحفاظ على جودة الملف الأصلي' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 border border-slate-200 text-center hover:shadow-lg transition-shadow"
          >
            <p className="text-4xl mb-3">{item.icon}</p>
            <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}