import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Upload, 
  CheckCircle, 
  FileText, 
  X, 
  Search,
  Filter,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Eye,
  Printer,
  Sparkles,
  Trash2,
  Link as LinkIcon
} from 'lucide-react';

// Data Extracted from the provided PDF
const pdfData = [
  {
    id: '3-1-2-1',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'توفر المدرسة مناخاً آمناً للتعلم والنمو نفسياً واجتماعياً',
    progress: 96,
    programs: [
      'برنامج التهيئة النفسية',
      'برنامج خفض العنف "رفق"',
      'برنامج الإرشاد وقت الأزمات',
      'برنامج الوقاية النفسية الأولية في البيئة المدرسية'
    ]
  },
  {
    id: '1-2-1-4',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'تنشر المدرسة قواعد السلوك والمواظبة وتتابع تطبيقها',
    progress: 99,
    programs: [
      'أداة قواعد السلوك والمواظبة',
      'خدمة رعاية الطلبة متكرري الغياب والتأخر الصباحي',
      'مجالس أولياء الأمور'
    ]
  },
  {
    id: '3-2-1-5',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يلتزم المتعلمون بقواعد السلوك والانضباط المدرسي',
    progress: 95,
    programs: [
      'تعزيز قيمة الانضباط المدرسي والتميز السلوكي'
    ]
  },
  {
    id: '1-2-1-5',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'توفر المدرسة برامج وأنشطة تربوية داعمه للسلوك الإيجابي',
    progress: 99,
    programs: [
      'برنامج تعزيز السلوك الإيجابي'
    ]
  },
  {
    id: '1-2-1-6',
    domain: 'الإدارة المدرسية',
    standard: 'قيادة العملية التعليمية',
    indicator: 'توفر المدرسة برامج وأنشطة إثرائية غير صفية لتطوير مواهب المتعلمين وتهيئتهم للمستقبل',
    progress: 91,
    programs: [
      'خدمة رعاية ودعم الحالات الخاصة (فئة الموهوبين)',
      'برنامج التوجيه المهني'
    ]
  },
  {
    id: '2-1-3-1',
    domain: 'الإدارة المدرسية',
    standard: 'المجتمع المدرسي',
    indicator: 'تعزز المدرسة مشاركة الأسرة في تعلم ابنائها والتحضير لمستقبلهم',
    progress: 97.5,
    programs: [
      'برنامج توثيق علاقة الأسرة مع المدرسة',
      'برنامج التوجيه المهني',
      'الاحتفاء بالطلبة الخريجين'
    ]
  },
  {
    id: '2-1-1-8',
    domain: 'التعليم والتعلم',
    standard: 'بناء خبرات العلم',
    indicator: 'تنمي المدرسة المهارات العاطفية والاجتماعية لدى المتعلمين',
    progress: 98.25,
    programs: [
      'برنامج تعزيز المهارات النفسية للطلبة (الوعي الذاتي، الإدارة الذاتية، اتخاذ القرار..)',
      'المجلس الطلابي'
    ]
  },
  {
    id: '2-1-1-9',
    domain: 'التعليم والتعلم',
    standard: 'بناء خبرات العلم',
    indicator: 'تنمي المدرسة المهارات الرقمية لدى المتعلمين',
    progress: 93.25,
    programs: [
      'برنامج الاستخدام الآمن للإنترنت والألعاب الإلكترونية',
      'قواعد السلوك (آداب السلوك الرقمي)'
    ]
  },
  {
    id: '2-1-1-10',
    domain: 'التعليم والتعلم',
    standard: 'بناء خبرات العلم',
    indicator: 'تعزز المدرسة دافعية المتعلمين للتعلم والاستمتاع به',
    progress: 94.25,
    programs: [
      'برنامج تنمية الدافعية لرفع مستوى التحصيل الدراسي',
      'رعاية الطلبة المتأخرين دراسياً',
      'برنامج تكريم الطلبة المتفوقين'
    ]
  },
  {
    id: '3-2-1-1',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يظهر المتعلمون الاعتزاز بالقيم والهوية الوطنية',
    progress: 100,
    programs: [
      'تعزيز السلوك الإيجابي ( قيمة الانتماء للوطن )',
      'قواعد السلوك (المحافظة على ارتداء الزي الوطني)'
    ]
  },
  {
    id: '3-2-1-2',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يُظهر المتعلمون اتجاهات ايجابية نحو ذواتهم',
    progress: 97.25,
    programs: [
      'برنامج تعزيز المهارات النفسية للطلبة',
      'ملف دراسة الحالة',
      'جلسات الإرشاد الفردية والجماعية'
    ]
  },
  {
    id: '3-2-1-7',
    domain: 'نواتج التعلم',
    standard: 'التطور الشخصي والصحي والاجتماعي',
    indicator: 'يظهر المتعلمون اعتزازاً بثقافتهم واحتراماً للتنوع الثقافي في المجتمع',
    progress: 99.25,
    programs: [
      'تعزيز السلوك الإيجابي (قيمة التسامح)'
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('الكل');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  
  // Modals state
  const [uploadModal, setUploadModal] = useState({ isOpen: false, programName: '', indicatorId: '' });
  
  const [uploadedReports, setUploadedReports] = useState({}); // { 'IndicatorId-ProgramName': 'https://onedrive.link/...' }
  const [isUploading, setIsUploading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reportLink, setReportLink] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Trigger animations on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Extract unique domains for tabs
  const domains = ['الكل', ...new Set(pdfData.map(item => item.domain))];

  // Filter Data
  const filteredData = useMemo(() => {
    return pdfData.filter(item => {
      const matchesTab = activeTab === 'الكل' || item.domain === activeTab;
      const matchesSearch = item.indicator.includes(searchTerm) || item.id.includes(searchTerm);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    const totalIndicators = pdfData.length;
    const totalPrograms = pdfData.reduce((acc, curr) => acc + curr.programs.length, 0);
    const avgProgress = (pdfData.reduce((acc, curr) => acc + curr.progress, 0) / totalIndicators).toFixed(1);
    const completedUploads = Object.keys(uploadedReports).length;
    
    return { totalIndicators, totalPrograms, avgProgress, completedUploads };
  }, [uploadedReports]);

  // Handle Link Submission
  const handleLinkSubmit = (e) => {
    e.preventDefault();
    if (!reportLink || !reportLink.startsWith('http')) {
      showToast('يرجى إدخال رابط صحيح يبدأ بـ http أو https', 'error');
      return;
    }
    
    setIsUploading(true);
    // Simulate API Call delay
    setTimeout(() => {
      setUploadedReports(prev => ({
        ...prev,
        [`${uploadModal.indicatorId}-${uploadModal.programName}`]: reportLink
      }));
      setIsUploading(false);
      setUploadModal({ isOpen: false, programName: '', indicatorId: '' });
      setReportLink('');
      showToast('تم اعتماد رابط التقرير بنجاح!');
    }, 800);
  };

  // Handle Delete Report
  const handleDeleteReport = (indicatorId, programName) => {
    setUploadedReports(prev => {
      const newState = { ...prev };
      delete newState[`${indicatorId}-${programName}`];
      return newState;
    });
    showToast('تم حذف التقرير، يمكنك إعادة إرفاق رابط جديد', 'error');
  };

  // Get Progress Color based on percentage
  const getProgressColor = (progress) => {
    if (progress >= 95) return 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-emerald-200/50';
    if (progress >= 90) return 'bg-gradient-to-r from-teal-400 to-teal-600 shadow-teal-200/50';
    if (progress >= 75) return 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-blue-200/50';
    return 'bg-gradient-to-r from-amber-400 to-amber-600 shadow-amber-200/50';
  };

  return (
    <div dir="rtl" className="min-h-screen font-sans text-slate-800 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white selection:bg-indigo-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
        * {
          font-family: 'Tajawal', sans-serif !important;
        }
      `}</style>
      
      {/* Top Navbar - Glassmorphism */}
      <nav className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-3 rounded-xl text-white shadow-lg shadow-indigo-200 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                <Sparkles size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-violet-700 tracking-tight">نظام التقويم المدرسي</h1>
                <p className="text-sm font-medium text-slate-500">مدرسة الجشة المتوسطة - التوجيه الطلابي</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="ابحث برقم أو اسم المؤشر..." 
                  className="pl-4 pr-12 py-2.5 border-2 border-slate-100 rounded-xl bg-white/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-0 focus:border-indigo-400 w-72 text-sm transition-all duration-300 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 bg-white/80 p-1.5 pr-4 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <span className="text-sm font-bold text-slate-700 hidden sm:block">عبدالهادي المحسن</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-indigo-700 font-black text-sm border-2 border-white shadow-sm">
                  ع.م
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Statistics Cards - Animated Entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<BarChart3 />} title="إجمالي المؤشرات" value={stats.totalIndicators} color="indigo" delay="0ms" />
          <StatCard icon={<TrendingUp />} title="متوسط الإنجاز" value={`${stats.avgProgress}%`} color="blue" delay="100ms" />
          <StatCard icon={<BookOpen />} title="البرامج الإرشادية" value={stats.totalPrograms} color="amber" delay="200ms" />
          <StatCard icon={<CheckCircle2 />} title="التقارير المرفوعة" value={`${stats.completedUploads} / ${stats.totalPrograms}`} color="emerald" delay="300ms" />
        </div>

        {/* Tabs - Interactive */}
        <div className="flex flex-wrap items-center gap-3 mb-8 bg-white/60 p-2 rounded-2xl backdrop-blur-sm border border-slate-200/60 shadow-sm inline-flex">
          <div className="flex items-center gap-2 text-slate-500 mx-3 font-semibold">
            <Filter size={18} />
            <span>تصنيف:</span>
          </div>
          {domains.map(domain => (
            <button
              key={domain}
              onClick={() => setActiveTab(domain)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden ${
                activeTab === domain 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105' 
                  : 'bg-transparent text-slate-600 hover:bg-slate-100/80'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredData.map((item, idx) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 hover:border-indigo-100 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        مؤشر {item.id}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-violet-50 text-violet-700 text-xs font-bold rounded-lg">
                        {item.domain}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover:text-indigo-900 transition-colors">{item.indicator}</h3>
                    <div className="text-sm font-medium text-slate-400 mt-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      المعيار: {item.standard}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl p-4 min-w-[90px] border border-slate-100 shadow-inner">
                    <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-800 to-slate-600">{item.progress}%</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">إنجاز</span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-slate-100/80 rounded-full h-3 mb-6 overflow-hidden p-0.5 border border-slate-200/50">
                  <div 
                    className={`${getProgressColor(item.progress)} h-full rounded-full transition-all duration-1500 ease-out shadow-lg relative overflow-hidden`} 
                    style={{ width: isLoaded ? `${item.progress}%` : '0%' }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100/80">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-slate-500">
                    <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg group-hover:bg-indigo-100 transition-colors">
                      <BookOpen size={18} />
                    </div>
                    <span>{item.programs.length} برامج مطلوبة</span>
                  </div>
                  <button 
                    onClick={() => setSelectedIndicator(item)}
                    className="text-sm font-bold text-indigo-600 bg-indigo-50/50 border border-indigo-100 hover:bg-indigo-600 hover:text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-200 active:scale-95"
                  >
                    استعراض البرامج
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-32 animate-in fade-in zoom-in duration-500">
            <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">لا توجد نتائج مطابقة</h3>
            <p className="text-slate-500 font-medium">جرب البحث بكلمات أخرى أو قم بتغيير تصنيف المجال.</p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm font-bold text-slate-400 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm mt-auto">
        نظام التقويم المدرسي | الموجه الطلابي: عبدالهادي بن محمد المحسن | &copy; 2026
      </footer>

      {/* Details Modal (Programs List) - Enhanced */}
      {selectedIndicator && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-40 transition-all duration-300 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white">
            
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
              <div className="pr-2 border-r-4 border-indigo-500">
                <h2 className="text-2xl font-black text-slate-800 mb-1">برامج المؤشر ({selectedIndicator.id})</h2>
                <p className="text-sm font-medium text-slate-500 line-clamp-1">{selectedIndicator.indicator}</p>
              </div>
              <button 
                onClick={() => setSelectedIndicator(null)}
                className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all duration-200 active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto bg-slate-50/50">
              <div className="space-y-5">
                {selectedIndicator.programs.map((prog, idx) => {
                  const savedLink = uploadedReports[`${selectedIndicator.id}-${prog}`];
                  
                  return (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col xl:flex-row xl:items-center justify-between gap-4 animate-in slide-in-from-bottom-4 fill-mode-both ${
                        savedLink 
                          ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300 shadow-sm' 
                          : 'border-white bg-white hover:border-indigo-100 hover:shadow-md'
                      }`}
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${savedLink ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                          {savedLink ? <LinkIcon size={24} /> : <FileText size={24} />}
                        </div>
                        <div>
                          <h4 className={`text-lg font-bold ${savedLink ? 'text-emerald-900' : 'text-slate-800'}`}>{prog}</h4>
                          <p className="text-sm font-medium text-slate-400 mt-1">
                            {savedLink ? 'تم إرفاق رابط التقرير بنجاح' : 'التقرير لم يرفع بعد'}
                          </p>
                        </div>
                      </div>
                      
                      {savedLink ? (
                        <div className="flex items-center flex-wrap gap-3">
                          {/* Action Buttons for Completed Tasks */}
                          <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
                            
                            {/* View Button - Opens Link */}
                            <a 
                              href={savedLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 group/btn relative"
                              title="عرض التقرير عبر الرابط"
                            >
                              <Eye size={18} />
                              <span className="text-xs font-bold absolute -top-8 bg-slate-800 text-white px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">عرض الملف</span>
                            </a>
                            
                            <div className="w-px h-5 bg-slate-200 mx-1"></div>
                            
                            {/* Print Button */}
                            <button 
                              onClick={() => { window.print(); showToast('جاري التجهيز للطباعة...'); }}
                              className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-2 group/btn relative"
                              title="طباعة التقرير"
                            >
                              <Printer size={18} />
                              <span className="text-xs font-bold absolute -top-8 bg-slate-800 text-white px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">طباعة للصفحة</span>
                            </button>
                            
                            <div className="w-px h-5 bg-slate-200 mx-1"></div>
                            
                            {/* Delete/Re-upload Button */}
                            <button 
                              onClick={() => handleDeleteReport(selectedIndicator.id, prog)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 group/btn relative"
                              title="حذف لإعادة الرفع"
                            >
                              <Trash2 size={18} />
                              <span className="text-xs font-bold absolute -top-8 bg-red-600 text-white px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-10">حذف وتغيير الرابط</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm px-4 py-2.5 bg-emerald-100/80 rounded-xl border border-emerald-200">
                            <CheckCircle size={20} />
                            <span>مكتمل</span>
                          </div>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setUploadModal({ isOpen: true, programName: prog, indicatorId: selectedIndicator.id })}
                          className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 w-full xl:w-auto"
                        >
                          <LinkIcon size={18} />
                          <span>إرفاق الرابط</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end">
              <button 
                onClick={() => setSelectedIndicator(null)}
                className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-bold active:scale-95"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Link Input Modal */}
      {uploadModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200 relative">
            
            {/* Close Button (Top Left) */}
            <button 
              onClick={() => { setUploadModal({ isOpen: false, programName: '', indicatorId: '' }); setReportLink(''); }} 
              className="absolute top-6 left-6 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Link Icon (Top Right) */}
            <div className="flex justify-end mb-2">
               <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-500">
                  <LinkIcon size={28} />
               </div>
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 text-center mb-6">إرفاق رابط التقرير</h3>
            
            <div className="text-sm font-medium text-slate-500 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="block text-sm text-slate-400 mb-2">البرنامج المستهدف:</span>
              <span className="text-indigo-700 font-bold text-base">{uploadModal.programName}</span>
            </div>

            <form onSubmit={handleLinkSubmit}>
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">الصق رابط الملف (OneDrive أو Google Drive)</label>
                <div className="relative">
                   <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                     <LinkIcon className="h-5 w-5 text-slate-400" />
                   </div>
                   <input
                     type="url"
                     required
                     dir="ltr"
                     value={reportLink}
                     onChange={(e) => setReportLink(e.target.value)}
                     placeholder="https://onedrive.live.com/..."
                     className="block w-full pr-12 pl-4 py-4 border-2 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-left transition-colors hover:border-indigo-300 font-sans"
                   />
                </div>
              </div>

              <div className="flex gap-4 flex-row-reverse">
                <button 
                  type="button"
                  onClick={() => { setUploadModal({ isOpen: false, programName: '', indicatorId: '' }); setReportLink(''); }}
                  className="flex-1 px-4 py-3.5 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-50 font-bold transition-colors active:scale-95 text-lg"
                >
                  إلغاء
                </button>
                <button 
                  type="submit"
                  disabled={isUploading || !reportLink}
                  className="flex-[2] px-4 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-indigo-200 active:scale-95 relative overflow-hidden text-lg"
                >
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>جاري الحفظ...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={22} />
                      <span>اعتماد الرابط</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] animate-in slide-in-from-bottom-8 fade-in duration-300 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800/95 backdrop-blur-sm text-white'}`}>
          <CheckCircle size={20} className={toast.type === 'error' ? 'text-white' : 'text-emerald-400'} />
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

    </div>
  );
}

// Reusable Stat Card Component
function StatCard({ icon, title, value, color, delay }) {
  const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    amber: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
    emerald: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
  };

  return (
    <div 
      className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
      style={{ animationDelay: delay }}
    >
      <div className={`p-4 rounded-2xl transition-colors duration-300 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-400 mb-1">{title}</p>
        <h4 className="text-3xl font-black text-slate-800">{value}</h4>
      </div>
    </div>
  );
}