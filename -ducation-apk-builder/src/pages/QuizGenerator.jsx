import React, { useState } from 'react';
import { Upload, FileText, Settings, Download, Plus, Trash2, Eye, Zap } from 'lucide-react';

export default function QuizGenerator() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [quizType, setQuizType] = useState('multiple-choice');
  const [questionCount, setQuestionCount] = useState(10);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        type: file.type
      });
    }
  };

  const handleGenerateQuiz = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const mockQuestions = [
        {
          id: 1,
          text: 'ما هو الفرق الرئيسي بين الذكاء الاصطناعي والتعلم الآلي؟',
          type: 'multiple-choice',
          options: ['الذكاء الاصطناعي أوسع نطاقاً', 'لا يوجد فرق', 'التعلم الآلي أقدم', 'الذكاء الاصطناعي للأرقام فقط'],
          correct: 0
        },
        {
          id: 2,
          text: 'هل يمكن للشبكات العصبية التنبؤ بالمستقبل بدقة 100%؟',
          type: 'true-false',
          correct: false
        },
        {
          id: 3,
          text: 'اشرح دور البيانات الضخمة في تطوير نماذج التعلم الآلي.',
          type: 'short-answer'
        }
      ];
      setGeneratedQuestions(mockQuestions);
      setIsGenerating(false);
    }, 1500);
  };

  const handleExport = () => {
    console.log(`تصدير بصيغة ${exportFormat}`);
  };

  const handleDeleteQuestion = (id) => {
    setGeneratedQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">مولد الاختبارات الذكي</h1>
              <p className="text-slate-600 text-sm mt-1">أنشئ اختبارات احترافية من مستنداتك بلحظات</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Upload & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all duration-300">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-sky-500" />
                رفع المستند
              </h2>
              
              <label className="block">
                <div className="border-2 border-dashed border-sky-200 rounded-xl p-8 text-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all duration-300 bg-gradient-to-b from-sky-50 to-transparent">
                  <FileText className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-700">اسحب الملف أو انقر للرفع</p>
                  <p className="text-xs text-slate-500 mt-1">PDF أو نصوص حتى 10 MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.txt,.doc,.docx"
                />
              </label>

              {uploadedFile && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900 truncate">{uploadedFile.name}</p>
                    <p className="text-xs text-green-700">{uploadedFile.size} KB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-sky-500" />
                إعدادات الاختبار
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">نوع الأسئلة</label>
                  <select
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white text-slate-900 transition-all"
                  >
                    <option value="multiple-choice">اختيار متعدد</option>
                    <option value="true-false">صواب/خطأ</option>
                    <option value="short-answer">إجابة قصيرة</option>
                    <option value="mixed">مختلط</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    عدد الأسئلة: <span className="text-sky-600 font-semibold">{questionCount}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">صيغة التصدير</label>
                  <div className="space-y-2">
                    {['pdf', 'docx', 'json', 'csv'].map(format => (
                      <label key={format} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                        <input
                          type="radio"
                          name="export"
                          value={format}
                          checked={exportFormat === format}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="w-4 h-4 text-sky-500 cursor-pointer"
                        />
                        <span className="text-sm font-medium text-slate-700 uppercase">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={handleGenerateQuiz}
              disabled={!uploadedFile || isGenerating}
              className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              {isGenerating ? 'جاري الإنشاء...' : 'إنشاء الاختبار'}
            </button>

            {generatedQuestions.length > 0 && (
              <button
                onClick={handleExport}
                className="w-full py-3 px-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                تصدير ({generatedQuestions.length} سؤال)
              </button>
            )}
          </div>

          {/* Right Panel - Questions Preview */}
          <div className="lg:col-span-2">
            {generatedQuestions.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-200 text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">لا توجد أسئلة بعد</h3>
                <p className="text-slate-600">قم برفع مستند واختر الإعدادات، ثم انقر على "إنشاء الاختبار" لبدء الإنشاء</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">الأسئلة المُنشأة</h2>
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
                    {generatedQuestions.length} سؤال
                  </span>
                </div>

                {generatedQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="bg-white rounded-xl p-6 border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="flex items-center justify-center w-8 h-8 bg-sky-100 text-sky-600 rounded-lg font-semibold text-sm">
                          {index + 1}
                        </span>
                        <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium">
                          {question.type === 'multiple-choice' && 'اختيار متعدد'}
                          {question.type === 'true-false' && 'صواب/خطأ'}
                          {question.type === 'short-answer' && 'إجابة قصيرة'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-slate-900 font-medium mb-4">{question.text}</p>

                    {question.type === 'multiple-choice' && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-lg border-2 transition-colors ${
                              optIndex === question.correct
                                ? 'bg-green-50 border-green-300'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <p className="text-sm text-slate-700">
                              <span className="font-semibold">
                                {String.fromCharCode(97 + optIndex)}.
                              </span>{' '}
                              {option}
                              {optIndex === question.correct && (
                                <span className="mr-2 text-green-600 font-semibold">✓</span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === 'true-false' && (
                      <div className="flex gap-3">
                        <div
                          className={`flex-1 p-3 rounded-lg border-2 text-center font-medium transition-colors ${
                            question.correct === true
                              ? 'bg-green-50 border-green-300 text-green-700'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          صواب
                        </div>
                        <div
                          className={`flex-1 p-3 rounded-lg border-2 text-center font-medium transition-colors ${
                            question.correct === false
                              ? 'bg-green-50 border-green-300 text-green-700'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          خطأ
                        </div>
                      </div>
                    )}

                    {question.type === 'short-answer' && (
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <p className="text-sm text-slate-600 italic">انتظر إجابة المستخدم...</p>
                      </div>
                    )}
                  </div>
                ))}

                <button className="w-full py-3 px-4 border-2 border-dashed border-sky-300 text-sky-600 font-semibold rounded-xl hover:bg-sky-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  إضافة سؤال يدويًا
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}