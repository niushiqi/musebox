import React, { useState, useEffect } from 'react';
import { useStore, TemplateType } from '@/store';
import { Play, Square, Loader2, Image as ImageIcon, CheckCircle, RefreshCw, Zap, FileText, Tag, FileSignature, AlertTriangle, Settings, ChevronLeft, ChevronRight, Eye, Pencil, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { GoogleGenAI } from "@google/genai";

// Mock Data for Eagle Images
const MOCK_IMAGES = [
  { id: '1', name: 'landscape_mountain.jpg', url: 'https://picsum.photos/seed/mountain/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '2', name: 'cyberpunk_city.png', url: 'https://picsum.photos/seed/cyberpunk/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '3', name: 'portrait_woman.jpg', url: 'https://picsum.photos/seed/portrait/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '4', name: 'abstract_art.webp', url: 'https://picsum.photos/seed/abstract/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '5', name: 'coffee_shop.jpg', url: 'https://picsum.photos/seed/coffee/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '6', name: 'neon_sign.jpg', url: 'https://picsum.photos/seed/neon/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '7', name: 'vintage_car.jpg', url: 'https://picsum.photos/seed/car/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '8', name: 'forest_path.jpg', url: 'https://picsum.photos/seed/forest/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '9', name: 'minimalist_desk.jpg', url: 'https://picsum.photos/seed/desk/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '10', name: 'sunset_beach.jpg', url: 'https://picsum.photos/seed/beach/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '11', name: 'urban_street.jpg', url: 'https://picsum.photos/seed/street/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
  { id: '12', name: 'coding_screen.jpg', url: 'https://picsum.photos/seed/code/400/300', status: 'pending' as const, annotation: '', tags: [] as string[], newName: '' },
];

interface DashboardPageProps {
  onNavigateToSettings?: () => void;
  onNavigateToTemplates?: () => void;
}

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only peer" />
    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
  </label>
);

export function DashboardPage({ onNavigateToSettings, onNavigateToTemplates }: DashboardPageProps) {
  const { 
    templates, 
    activeAnnotationTemplateId, 
    activeTagTemplateId,
    activeRenameTemplateId,
    setActiveAnnotationTemplateId,
    setActiveTagTemplateId,
    setActiveRenameTemplateId,
    autoMode, 
    setAutoMode,
    aiConfig,
    incrementStats,
    setActiveTemplateTab
  } = useStore();

  const [images, setImages] = useState(MOCK_IMAGES);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  
  // Preview Pagination
  const [previewPage, setPreviewPage] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const currentPreviewImages = images.slice(previewPage * ITEMS_PER_PAGE, (previewPage + 1) * ITEMS_PER_PAGE);

  // Split options
  const [enableAnnotation, setEnableAnnotation] = useState(true);
  const [enableTags, setEnableTags] = useState(true);
  const [enableRename, setEnableRename] = useState(false);
  
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  // Template Preview Popover State
  const [previewTemplateId, setPreviewTemplateId] = useState<string | null>(null);

  const annotationTemplates = templates.filter(t => t.type === 'annotation');
  const tagTemplates = templates.filter(t => t.type === 'tag');
  const renameTemplates = templates.filter(t => t.type === 'rename');

  const activeAnnotationTemplate = templates.find(t => t.id === activeAnnotationTemplateId);
  const activeTagTemplate = templates.find(t => t.id === activeTagTemplateId);
  const activeRenameTemplate = templates.find(t => t.id === activeRenameTemplateId);

  // Check for API Key
  const hasApiKey = !!aiConfig.apiKey;

  const handleRefresh = () => {
    // Simulate refreshing from Eagle
    setImages(MOCK_IMAGES.map(img => ({ ...img, status: 'pending', annotation: '', tags: [], newName: '' })));
    setProgress(0);
    setCurrentImageIndex(-1);
  };

  const handleEditTemplate = (type: TemplateType) => {
    setActiveTemplateTab(type);
    onNavigateToTemplates?.();
  };

  const processImage = async (image: typeof MOCK_IMAGES[0], signal: AbortSignal) => {
    if (signal.aborted) return;

    let annotation = '';
    let tags: string[] = [];
    let newName = '';

    try {
      // Use Gemini if configured (or default)
      if (aiConfig.provider === 'gemini') {
        const apiKey = aiConfig.apiKey || process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("Missing API Key");
        
        const ai = new GoogleGenAI({ apiKey });
        const model = aiConfig.model || 'gemini-2.5-flash';
        
        if (enableAnnotation && activeAnnotationTemplate) {
            const result = await ai.models.generateContent({
                model,
                contents: [
                    { parts: [{ text: `${activeAnnotationTemplate.prompt}\n\nContext: Image filename is "${image.name}".` }] }
                ]
            });
            annotation = result.text || "";
        }

        if (enableTags && activeTagTemplate) {
             const result = await ai.models.generateContent({
                model,
                contents: [
                    { parts: [{ text: `${activeTagTemplate.prompt}\n\nContext: Image filename is "${image.name}".` }] }
                ]
            });
            tags = (result.text || "").split(',').map(t => t.trim());
        }

        if (enableRename && activeRenameTemplate) {
            const result = await ai.models.generateContent({
               model,
               contents: [
                   { parts: [{ text: `${activeRenameTemplate.prompt}\n\nContext: Image filename is "${image.name}".` }] }
               ]
           });
           newName = (result.text || "").trim();
       }

      } else {
        // Mock for other providers or if no key
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (enableAnnotation && activeAnnotationTemplate) annotation = `AI Generated annotation for ${image.name} using ${activeAnnotationTemplate.name}.`;
        if (enableTags && activeTagTemplate) tags = ['ai', 'generated', 'mock', 'tag'];
        if (enableRename && activeRenameTemplate) newName = `renamed_${image.name}`;
      }
    } catch (e) {
        console.error("AI Error", e);
        if (enableAnnotation) annotation = "Failed to generate annotation.";
        if (enableTags) tags = ["error"];
        if (enableRename) newName = "rename_failed";
    }

    return { annotation, tags, newName };
  };

  const handleStart = async () => {
    if (isProcessing) return;
    if (!enableAnnotation && !enableTags && !enableRename) return;
    
    setIsProcessing(true);
    setProgress(0);
    const controller = new AbortController();
    setAbortController(controller);

    const pendingImages = images.filter(img => img.status === 'pending');
    const total = pendingImages.length;
    let processed = 0;

    for (const img of pendingImages) {
      if (controller.signal.aborted) break;

      setCurrentImageIndex(images.findIndex(i => i.id === img.id));
      
      // Update status to processing
      setImages(prev => prev.map(i => i.id === img.id ? { ...i, status: 'processing' } : i));

      const result = await processImage(img, controller.signal);
      
      if (result) {
        setImages(prev => prev.map(i => i.id === img.id ? { 
            ...i, 
            status: 'done', 
            annotation: result.annotation || i.annotation, 
            tags: result.tags.length > 0 ? result.tags : i.tags,
            newName: result.newName || i.newName
        } : i));
        
        incrementStats(1, 1);
      }

      processed++;
      setProgress((processed / total) * 100);
    }

    setIsProcessing(false);
    setAbortController(null);
    setCurrentImageIndex(-1);
  };

  const handleStop = () => {
    if (abortController) {
      abortController.abort();
      setIsProcessing(false);
      setAbortController(null);
    }
  };

  // Mock Auto-Mode Effect
  useEffect(() => {
    if (autoMode && !isProcessing) {
        const pending = images.filter(i => i.status === 'pending');
        if (pending.length > 0) {
            const timer = setTimeout(() => {
                handleStart();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }
  }, [autoMode, images, isProcessing]);


  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* API Key Setup Prompt (Blocking/Prominent for new users) */}
      {!hasApiKey && (
        <div className="bg-indigo-600 rounded-xl p-6 text-white shadow-lg flex items-start gap-4">
          <div className="bg-white/20 p-3 rounded-xl shrink-0">
            <Zap size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">欢迎使用 Eagle AI Tagger!</h3>
            <p className="text-indigo-100 mb-4 leading-relaxed">
              检测到您尚未配置 API Key。为了开始使用 AI 自动打标功能，请先前往设置页面配置您的 Gemini API Key。
            </p>
            <button 
              onClick={onNavigateToSettings}
              className="bg-white text-indigo-600 px-5 py-2.5 rounded-lg font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Settings size={18} /> 去配置 API Key
            </button>
          </div>
        </div>
      )}

      {/* Status Card */}
      <div className={cn("bg-white rounded-xl border border-stone-200 shadow-sm p-6 flex flex-col gap-6", !hasApiKey && "opacity-50 pointer-events-none grayscale")}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
              <ImageIcon size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                已选中 {images.filter(i => i.status === 'pending').length} 张图片
              </h2>
              <p className="text-sm text-stone-500">准备在 Eagle 中处理</p>
            </div>
          </div>
          <button 
            onClick={handleRefresh}
            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
            title="刷新选中状态"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Vertical Controls */}
        <div className="flex flex-col gap-3">
            {/* Annotation Control */}
            <div className={cn("p-4 rounded-xl border transition-all flex items-center gap-4", enableAnnotation ? "bg-indigo-50/30 border-indigo-200" : "bg-stone-50 border-stone-200 opacity-70")}>
                <div className={cn("p-2 rounded-lg shrink-0", enableAnnotation ? "bg-indigo-100 text-indigo-600" : "bg-stone-200 text-stone-500")}>
                    <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-800 text-sm">生成注释</h3>
                    <p className="text-xs text-stone-500 truncate">使用 AI 描述图片内容</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <select 
                        value={activeAnnotationTemplateId}
                        onChange={(e) => setActiveAnnotationTemplateId(e.target.value)}
                        className="w-40 px-3 py-2 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        disabled={!enableAnnotation || isProcessing}
                    >
                        {annotationTemplates.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={() => setPreviewTemplateId(activeAnnotationTemplateId)}
                        className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="预览模板效果"
                        disabled={!enableAnnotation}
                    >
                        <Eye size={18} />
                    </button>
                    <button 
                        onClick={() => handleEditTemplate('annotation')}
                        className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="编辑/新增模板"
                    >
                        <Settings size={18} />
                    </button>
                </div>

                <Toggle checked={enableAnnotation} onChange={setEnableAnnotation} />
            </div>

            {/* Tag Control */}
            <div className={cn("p-4 rounded-xl border transition-all flex items-center gap-4", enableTags ? "bg-indigo-50/30 border-indigo-200" : "bg-stone-50 border-stone-200 opacity-70")}>
                <div className={cn("p-2 rounded-lg shrink-0", enableTags ? "bg-indigo-100 text-indigo-600" : "bg-stone-200 text-stone-500")}>
                    <Tag size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-800 text-sm">生成标签</h3>
                    <p className="text-xs text-stone-500 truncate">自动生成相关标签</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <select 
                        value={activeTagTemplateId}
                        onChange={(e) => setActiveTagTemplateId(e.target.value)}
                        className="w-40 px-3 py-2 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        disabled={!enableTags || isProcessing}
                    >
                        {tagTemplates.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={() => setPreviewTemplateId(activeTagTemplateId)}
                        className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="预览模板效果"
                        disabled={!enableTags}
                    >
                        <Eye size={18} />
                    </button>
                    <button 
                        onClick={() => handleEditTemplate('tag')}
                        className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="编辑/新增模板"
                    >
                        <Settings size={18} />
                    </button>
                </div>

                <Toggle checked={enableTags} onChange={setEnableTags} />
            </div>

            {/* Rename Control */}
            <div className={cn("p-4 rounded-xl border transition-all flex items-center gap-4", enableRename ? "bg-indigo-50/30 border-indigo-200" : "bg-stone-50 border-stone-200 opacity-70")}>
                <div className={cn("p-2 rounded-lg shrink-0", enableRename ? "bg-indigo-100 text-indigo-600" : "bg-stone-200 text-stone-500")}>
                    <FileSignature size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-800 text-sm">重命名</h3>
                    <p className="text-xs text-stone-500 truncate">根据内容重命名文件</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <select 
                        value={activeRenameTemplateId}
                        onChange={(e) => setActiveRenameTemplateId(e.target.value)}
                        className="w-40 px-3 py-2 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        disabled={!enableRename || isProcessing}
                    >
                        {renameTemplates.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={() => setPreviewTemplateId(activeRenameTemplateId)}
                        className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="预览模板效果"
                        disabled={!enableRename}
                    >
                        <Eye size={18} />
                    </button>
                    <button 
                        onClick={() => handleEditTemplate('rename')}
                        className="p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="编辑/新增模板"
                    >
                        <Settings size={18} />
                    </button>
                </div>

                <Toggle checked={enableRename} onChange={setEnableRename} />
            </div>
        </div>

        {/* Action Button & Progress */}
        <div className="pt-2">
            {isProcessing ? (
                <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium text-stone-600">
                        <span>正在处理 {currentImageIndex + 1} / {images.length}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-indigo-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <button 
                        onClick={handleStop}
                        className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                    >
                        <Square size={18} fill="currentColor" /> 停止处理
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={handleStart}
                        disabled={images.filter(i => i.status === 'pending').length === 0 || (!enableAnnotation && !enableTags && !enableRename)}
                        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-[0.99] transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Play size={20} fill="currentColor" /> 开始处理
                    </button>
                    
                    <button 
                        onClick={onNavigateToSettings}
                        className="text-xs text-stone-400 hover:text-indigo-600 flex items-center justify-center gap-1 transition-colors"
                    >
                        <Settings size={12} /> 高级设置 (处理偏好)
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Auto Mode Toggle */}
      <div className={cn("flex items-center justify-between px-4 py-3 bg-indigo-50/50 rounded-lg border border-indigo-100", !hasApiKey && "opacity-50 pointer-events-none")}>
        <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-md", autoMode ? "bg-indigo-600 text-white" : "bg-stone-200 text-stone-500")}>
                <Zap size={16} fill={autoMode ? "currentColor" : "none"} />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-stone-800">自动处理新图片</span>
                <span className="text-xs text-stone-500">当有新图片拖入 Eagle 时自动运行</span>
            </div>
        </div>
        <Toggle checked={autoMode} onChange={setAutoMode} />
      </div>

      {/* Preview List (Mocking Eagle Grid) */}
      <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold text-stone-500">预览队列 ({images.length})</h3>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setPreviewPage(p => Math.max(0, p - 1))}
                        disabled={previewPage === 0}
                        className="p-1 rounded-md hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs text-stone-400">{previewPage + 1} / {totalPages}</span>
                    <button 
                        onClick={() => setPreviewPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={previewPage === totalPages - 1}
                        className="p-1 rounded-md hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
                {currentPreviewImages.map((img) => (
                    <div key={img.id} className="bg-white p-2 rounded-lg border border-stone-200 flex flex-col gap-2 relative overflow-hidden h-48">
                        <div className="w-full aspect-square bg-stone-100 rounded-md overflow-hidden flex-shrink-0 relative h-24">
                            <img src={img.url} alt={img.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            {img.status === 'done' && (
                                <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                    <CheckCircle className="text-white drop-shadow-md" size={24} />
                                </div>
                            )}
                            {img.status === 'processing' && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <Loader2 className="text-white animate-spin" size={24} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-start overflow-hidden">
                            <div className="text-xs font-medium text-stone-800 truncate mb-1" title={img.name}>
                                {img.newName || img.name}
                            </div>
                            <div className="flex-1 overflow-y-auto scrollbar-none">
                                {img.status === 'done' ? (
                                    <div className="space-y-1">
                                        {enableAnnotation && <div className="text-[9px] text-stone-500 leading-tight">{img.annotation}</div>}
                                        {enableTags && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {img.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-[8px] px-1 py-0.5 bg-indigo-50 text-indigo-600 rounded">{tag}</span>
                                                ))}
                                                {img.tags.length > 3 && <span className="text-[8px] text-stone-400">+{img.tags.length - 3}</span>}
                                            </div>
                                        )}
                                        {enableRename && img.newName && (
                                            <div className="text-[9px] text-indigo-600 font-mono mt-1 flex items-center gap-1 truncate">
                                                <FileSignature size={10} /> {img.newName}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-[10px] text-stone-400 italic">等待处理...</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
      </div>

      {/* Template Preview Modal/Popover */}
      <AnimatePresence>
        {previewTemplateId && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
                onClick={() => setPreviewTemplateId(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-stone-800">模板效果预览</h3>
                        <button onClick={() => setPreviewTemplateId(null)} className="text-stone-400 hover:text-stone-600">
                            <X size={20} />
                        </button>
                    </div>
                    
                    <div className="bg-stone-50 rounded-lg p-4 border border-stone-200 text-sm text-stone-600 leading-relaxed">
                        {templates.find(t => t.id === previewTemplateId)?.type === 'annotation' && (
                            <p>"A vibrant landscape featuring a majestic mountain peak covered in snow, illuminated by the warm glow of a setting sun..."</p>
                        )}
                        {templates.find(t => t.id === previewTemplateId)?.type === 'tag' && (
                            <div className="flex flex-wrap gap-2">
                                {['landscape', 'mountain', 'snow', 'sunset', 'nature'].map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white border border-stone-200 rounded text-xs">{tag}</span>
                                ))}
                            </div>
                        )}
                        {templates.find(t => t.id === previewTemplateId)?.type === 'rename' && (
                            <div className="font-mono text-indigo-600">mountain_landscape_sunset_v2.jpg</div>
                        )}
                    </div>
                    
                    <div className="mt-4 text-xs text-stone-400 text-center">
                        这是基于该模板的示例输出
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
