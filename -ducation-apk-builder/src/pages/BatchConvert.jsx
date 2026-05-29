import React, { useState } from 'react';
import { Upload, FileText, Settings, Download, Zap, CheckCircle, AlertCircle, X, Play, Pause } from 'lucide-react';

export default function BatchConverter() {
  const [files, setFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState({});
  const [format, setFormat] = useState('pdf');
  const [quality, setQuality] = useState('high');
  const [completed, setCompleted] = useState(false);

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      id: Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      status: 'pending',
      progress: 0
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const simulateConversion = async () => {
    setConverting(true);
    setCompleted(false);
    for (let file of files) {
      for (let i = 0; i <= 100; i += 10) {
        setProgress(prev => ({ ...prev, [file.id]: i }));
        await new Promise(r => setTimeout(r, 200));
      }
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'completed' } : f ));
    }
    setConverting(false);
    setCompleted(true);
  };

  const totalFiles = files.length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const totalSize = files.reduce((sum, f) => sum + parseFloat(f.size), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8" dir="rtl">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-8 h-8" style={{ color: '#0EA5E9' }} />
          <h1 className="text-4xl font-bold">محول الملفات الدفعي</h1>
        </div>
        <p className="text-slate-400 text-lg">تحويل عدة ملفات في وقت واحد بسهولة واحترافية</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Upload & Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div
            className="border-2 border-dashed rounded-xl p-8 text-center transition-all hover:border-opacity-100 cursor-pointer"
            style={{ borderColor: '#0EA5E9', borderOpacity: 0.5 }}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: '#0EA5E9' }} />
            <h3 className="text-xl font-semibold mb-2">اسحب الملفات هنا</h3>
            <p className="text-slate-400 mb-4">أو انقر لاختيار ملفات من جهازك</p>
            <p className="text-sm text-slate-500">يدعم: PDF, DOCX, XLSX, PNG, JPG والمزيد</p>
            <input id="fileInput" type="file" multiple className="hidden" onChange={handleFileUpload} />
          </div>

          {/* Settings Panel */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5" style={{ color: '#0EA5E9' }} />
              <h3 className="text-lg font-semibold">إعدادات التحويل</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">صيغة الإخراج</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition"
                >
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                  <option>PNG</option>
                  <option>JPG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">جودة الإخراج</label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map(q => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                        quality === q ? 'text-white border-2' : 'bg-slate-700 border border-slate-600 text-slate-400'
                      }`}
                      style={quality === q ? { borderColor: '#0EA5E9', backgroundColor: 'rgba(14, 165, 233, 0.1)' } : {}}
                    >
                      {q === 'low' ? 'منخفضة' : q === 'medium' ? 'متوسطة' : 'عالية'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Files List */}
          <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: '#0EA5E9' }} />
                الملفات ({totalFiles})
              </h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {files.length === 0 ? (
                <div className="p-6 text-center text-slate-500">لم يتم تحميل أي ملفات بعد</div>
              ) : (
                files.map(file => (
                  <div key={file.id} className="p-4 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-slate-400">{file.size} MB</p>
                      </div>
                      {file.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                      ) : file.status === 'converting' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-cyan-500 animate-spin flex-shrink-0" />
                      ) : (
                        <button
                          onClick={() => removeFile(file.id)}
                          disabled={converting}
                          className="text-slate-500 hover:text-red-500 transition disabled:opacity-50"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    {(progress[file.id] !== undefined || file.status === 'converting') && (
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{ width: `${progress[file.id] || 0}%`, backgroundColor: '#0EA5E9' }}
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Summary & Actions */}
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" style={{ color: '#0EA5E9' }} />
              ملخص المهمة
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">إجمالي الملفات</span>
                <span className="font-bold text-lg">{totalFiles}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">المكتملة</span>
                <span className="font-bold text-lg" style={{ color: '#10B981' }}>{completedFiles}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">الحجم الإجمالي</span>
                <span className="font-bold">{totalSize} MB</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-cyan-500/20">
                <span className="text-slate-400">الصيغة</span>
                <span className="font-bold uppercase">{format}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={simulateConversion}
              disabled={files.length === 0 || converting}
              className="w-full py-3 px-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-white"
              style={{ backgroundColor: '#0EA5E9', opacity: files.length === 0 || converting ? 0.5 : 1 }}
            >
              {converting ? (
                <>
                  <Pause className="w-5 h-5" />
                  جاري التحويل...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  بدء التحويل
                </>
              )}
            </button>
            {completed && (
              <button
                className="w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-white"
                style={{ backgroundColor: '#10B981' }}
              >
                <Download className="w-5 h-5" />
                تحميل ملف ZIP
              </button>
            )}
          </div>

          {/* Status Card */}
          {completed && (
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
              <div>
                <p className="font-semibold">اكتمل التحويل بنجاح!</p>
                <p className="text-sm text-slate-400 mt-1">تم تحويل جميع الملفات بنجاح</p>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-start gap-2 mb-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#F97316' }} />
              <h4 className="font-semibold">نصيحة</h4>
            </div>
            <p className="text-sm text-slate-400">يمكنك تحميل حتى 50 ملف في المرة الواحدة. الملفات الكبيرة قد تستغرق وقتاً أطول.</p>
          </div>
        </div>
      </div>
    </div>
  );
}