import React, { useMemo, useState } from "react";

export default function History() {
  // بيانات افتراضية للصفحة
  const initialData = [
    {
      id: "TX-1001",
      date: "2026-05-01",
      from: "البنك الأهلي",
      to: "التاجر العربي - الحساب ****1234",
      amount: 240.5,
      currency: "USD",
      status: "Completed",
      method: "Wire",
    },
    {
      id: "TX-1002",
      date: "2026-05-02",
      from: "بنك الشام",
      to: "المؤسسة الخليجية - الحساب ****5678",
      amount: 980,
      currency: "USD",
      status: "Pending",
      method: "Card",
    },
    {
      id: "TX-1003",
      date: "2026-05-03",
      from: "بنك اليمن",
      to: "موردين مبدعين - الحساب ****9876",
      amount: 1200,
      currency: "USD",
      status: "Failed",
      method: "Bank Transfer",
    },
    {
      id: "TX-1004",
      date: "2026-04-28",
      from: "البنك العربي",
      to: "المتجر الإلكتروني - الحساب ****3456",
      amount: 75,
      currency: "USD",
      status: "Completed",
      method: "Card",
    },
    {
      id: "TX-1005",
      date: "2026-04-25",
      from: "البنك التجاري",
      to: "عميل محلي - الحساب ****1122",
      amount: 320,
      currency: "USD",
      status: "Completed",
      method: "Wire",
    },
    {
      id: "TX-1006",
      date: "2026-04-20",
      from: "بنك التنمية",
      to: "شركة مبتكرات - الحساب ****7788",
      amount: 450.75,
      currency: "USD",
      status: "Pending",
      method: "Card",
    },
  ];

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [data, setData] = useState(initialData);
  const [modal, setModal] = useState(null); // { type: 'redeem'|'delete', id: string }

  // منحى عرض البيانات مع البحث/التصفية
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesQuery =
        `${row.id} ${row.from} ${row.to} ${row.date}`.toLowerCase().includes(
          query.toLowerCase()
        );
      const matchesStatus =
        statusFilter === "All" ? true : row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [data, query, statusFilter]);

  const total = data.length;
  const completed = data.filter((d) => d.status === "Completed").length;
  const pending = data.filter((d) => d.status === "Pending").length;
  const failed = data.filter((d) => d.status === "Failed").length;
  const average =
    data.length > 0
      ? data.reduce((acc, cur) => acc + cur.amount, 0) / data.length
      : 0;

  // إجراءات إعادة التحويل/حذف
  const handleRedeem = (row) => {
    setModal({ type: "redeem", id: row.id });
  };

  const handleDelete = (row) => {
    setModal({ type: "delete", id: row.id });
  };

  const confirmRedeem = () => {
    const orig = data.find((d) => d.id === modal.id);
    if (!orig) return;
    const nextId = `TX-${Math.floor(Math.random() * 9000) + 1000}`;
    const newItem = {
      id: nextId,
      date: new Date().toISOString().slice(0, 10),
      from: orig.from,
      to: orig.to,
      amount: orig.amount,
      currency: orig.currency,
      status: "Pending",
      method: orig.method,
    };
    // إضافة التحويل السريع إلى الأعلى
    setData((prev) => [newItem, ...prev]);
    setModal(null);
  };

  const confirmDelete = () => {
    setData((prev) => prev.filter((d) => d.id !== modal.id));
    setModal(null);
  };

  // مكوّن بطاقة إحصائية صغيرة
  const StatCard = ({ label, value, color }) => (
    <div className="flex items-center justify-between p-3 border rounded-lg shadow-sm">
      <span className="text-[14px] text-gray-700">{label}</span>
      <span className={`text-[18px] font-semibold text-${color}-700`}>
        {typeof value === "number" ? value : String(value)}
      </span>
    </div>
  );

  // اشتقاق فوارق ألوان الحالة
  const badgeFor = (status) => {
    if (status === "Completed")
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
    if (status === "Pending")
      return "bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs";
    if (status === "Failed")
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
    return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-white to-slate-50 font-[Inter]">
      {/* رأس الصفحة */}
      <header className="py-6 px-4">
        <h1 className="text-[32px] font-semibold text-[#0EA5E9] leading-tight">
          سجل التحويلات
        </h1>
        <p className="mt-1 text-[16px] text-gray-600">
          سجل التحويلات السابقة مع البحث والتصفية، إعادة تحويل سريعة، حذف آمن، وإحصاءات الاستخدام.
        </p>
      </header>

      {/* التخطيط الثنائي الأعمدة */}
      <main className="container mx-auto px-4 grid md:grid-cols-2 gap-6 items-start">
        {/* العمود الأول: السجل */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 overflow-hidden">
          <div className="flex flex-col gap-3">
            {/* شريط البحث والتصفية */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              {/* البحث */}
              <div className="flex items-center gap-2 w-full md:w-1/2">
                <span className="p-2 rounded-md bg-gray-50 text-sky-500" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث عن معرف، من، إلى..."
                  className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                />
              </div>

              {/* خيارات التصفية */}
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm text-gray-600 ml-1">التصفية:</span>
                <button
                  onClick={() => setStatusFilter("All")}
                  className={`px-3 py-1 rounded-md text-xs border ${
                    statusFilter === "All"
                      ? "border-[#0EA5E9] text-[#0EA5E9]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  الكل
                </button>
                {["Completed", "Pending", "Failed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1 rounded-md text-xs border ${
                      statusFilter === s
                        ? "border-[#0EA5E9] text-[#0EA5E9]"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* الجدول/القائمة */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-right text-[14px] text-gray-600">التاريخ</th>
                    <th className="px-3 py-3 text-right text-[14px] text-gray-600">المرسل</th>
                    <th className="px-3 py-3 text-right text-[14px] text-gray-600">الوجهة</th>
                    <th className="px-3 py-3 text-right text-[14px] text-gray-600">المبلغ</th>
                    <th className="px-3 py-3 text-right text-[14px] text-gray-600">الحالة</th>
                    <th className="px-3 py-3 text-right text-[14px] text-gray-600">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-3 py-3 text-right text-[14px]">
                        {row.date}
                      </td>
                      <td className="px-3 py-3 text-right text-[14px]">{row.from}</td>
                      <td className="px-3 py-3 text-right text-[14px]">{row.to}</td>
                      <td className="px-3 py-3 text-right text-[14px]">
                        {row.amount} {row.currency}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <span className={badgeFor(row.status)}>{row.status}</span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button
                          onClick={() => handleRedeem(row)}
                          className="text-[#0EA5E9] hover:underline ml-2"
                          aria-label="إعادة تحويل سريعة"
                        >
                          إعادة التحويل
                        </button>
                        <button
                          onClick={() => handleDelete(row)}
                          className="text-[#F97316] hover:underline"
                          aria-label="حذف"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td className="px-3 py-6 text-center text-[14px" colSpan={6}>
                        لا توجد نتائج مطابقة للمعايير المختارة.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* العمود الثاني: الإحصاءات */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-[24px] font-semibold text-[#0EA5E9] mb-3">إحصائيات الاستخدام</h2>
          <div className="grid grid-cols-1 gap-3">
            <StatCard label="إجمالي التحويلات" value={total} color="blue" />
            <StatCard label="المكتملة" value={completed} color="green" />
            <StatCard label="قيد الانتظار" value={pending} color="orange" />
            <StatCard label="الفشل" value={failed} color="red" />
          </div>

          <div className="mt-4 p-3 bg-[#EAF7FF] rounded-md">
            <p className="text-[14px] text-gray-700">
              متوسط المبلغ:{" "}
              {Number.isFinite(average) ? average.toFixed(2) : "لا يوجد بيانات"}
            </p>
          </div>

          <div className="mt-4 w-full">
            <div className="text-right text-[14px] text-gray-600 mb-1">نسبة الإتمام (مختصر)</div>
            <div className="space-y-2">
              {[
                { label: "المكتملة مقابل الإجمالي", value: total ? Math.round((completed / total) * 100) : 0 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-[#0EA5E9]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-[12px] text-gray-600">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* نافذة التأكيد/الحظر */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold">
                {modal.type === "redeem" ? "إعادة التحويل السريع" : "حذف التحويل"}
              </h3>
              <button
                onClick={() => setModal(null)}
                className="text-xl leading-none text-gray-600 hover:text-gray-800"
                aria-label="إغلاق"
              >
                ×
              </button>
            </div>
            <div className="mt-4 text-[14px] text-gray-700">
              {modal.type === "redeem"
                ? "سيتم إنشاء تحويل جديد بمواصفات مشابهة. هل تريد المتابعة؟"
                : "هذه العملية ستقوم بحذف السجل نهائياً ولا يمكن التراجع عنها. هل تريد المتابعة؟"}
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-md border border-gray-300 text-sm"
              >
                إلغاء
              </button>
              <button
                onClick={
                  modal.type === "redeem" ? confirmRedeem : confirmDelete
                }
                className={`px-4 py-2 rounded-md text-sm text-white ${
                  modal.type === "redeem" ? "bg-[#10B981]" : "bg-[#F97316]"
                }`}
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}