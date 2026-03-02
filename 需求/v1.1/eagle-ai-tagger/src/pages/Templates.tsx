import React, { useState, useEffect } from 'react';
import { useStore, TemplateType } from '@/store';
import { Plus, Trash2, Check, FileText, Tag, FileSignature, Save, Star, LayoutTemplate, X } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function TemplatesPage() {
  const { 
    templates, 
    addTemplate, 
    updateTemplate, 
    deleteTemplate, 
    activeAnnotationTemplateId,
    activeTagTemplateId,
    activeRenameTemplateId,
    setActiveAnnotationTemplateId,
    setActiveTagTemplateId,
    setActiveRenameTemplateId,
    activeTemplateTab,
    setActiveTemplateTab
  } = useStore();
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // Local state for editing to support "Save" functionality
  const [editName, setEditName] = useState('');
  const [editPrompt, setEditPrompt] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Filter templates by current tab
  const currentTemplates = templates.filter(t => t.type === activeTemplateTab);
  
  // Auto-select first template if selection is invalid for current tab
  useEffect(() => {
    if (selectedId && !currentTemplates.find(t => t.id === selectedId)) {
      setSelectedId(currentTemplates[0]?.id || null);
    } else if (!selectedId && currentTemplates.length > 0) {
      setSelectedId(currentTemplates[0].id);
    }
  }, [activeTemplateTab, currentTemplates, selectedId]);

  // Sync local state when selection changes
  useEffect(() => {
    const template = templates.find(t => t.id === selectedId);
    if (template) {
      setEditName(template.name);
      setEditPrompt(template.prompt);
      setHasUnsavedChanges(false);
    }
  }, [selectedId, templates]);

  const selectedTemplate = templates.find(t => t.id === selectedId);
  
  const isTemplateActive = (id: string) => {
    if (activeTemplateTab === 'annotation') return activeAnnotationTemplateId === id;
    if (activeTemplateTab === 'tag') return activeTagTemplateId === id;
    return activeRenameTemplateId === id;
  };

  const handleToggleDefault = (id: string) => {
    const isActive = isTemplateActive(id);
    const newId = isActive ? '' : id;

    if (activeTemplateTab === 'annotation') setActiveAnnotationTemplateId(newId);
    else if (activeTemplateTab === 'tag') setActiveTagTemplateId(newId);
    else setActiveRenameTemplateId(newId);
  };

  const handleCreate = () => {
    let name = '新建模板';
    let prompt = '';
    
    if (activeTemplateTab === 'annotation') {
        name = '新建注释模板';
        prompt = '描述这张图片...';
    } else if (activeTemplateTab === 'tag') {
        name = '新建标签模板';
        prompt = '为这张图片生成标签...';
    } else {
        name = '新建重命名模板';
        prompt = '生成文件名...';
    }

    addTemplate({
      name,
      type: activeTemplateTab,
      isDefault: false,
      prompt,
    });
  };

  const handleSave = () => {
    if (selectedId) {
      updateTemplate(selectedId, { name: editName, prompt: editPrompt });
      setHasUnsavedChanges(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个模板吗？')) {
        deleteTemplate(id);
        if (selectedId === id) {
            setSelectedId(null);
        }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-6rem)] flex flex-col gap-6 bg-stone-50/50 -m-6 p-6"
    >
      {/* Top Navigation Bar */}
      <div className="bg-white rounded-xl shadow-sm px-6 py-2 flex items-center gap-8">
          <button
            onClick={() => setActiveTemplateTab('annotation')}
            className={cn(
              "py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
              activeTemplateTab === 'annotation' 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-stone-500 hover:text-stone-800"
            )}
          >
            <FileText size={18} /> 注释模板
          </button>
          <button
            onClick={() => setActiveTemplateTab('tag')}
            className={cn(
              "py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
              activeTemplateTab === 'tag' 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-stone-500 hover:text-stone-800"
            )}
          >
            <Tag size={18} /> 标签模板
          </button>
          <button
            onClick={() => setActiveTemplateTab('rename')}
            className={cn(
              "py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2",
              activeTemplateTab === 'rename' 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-stone-500 hover:text-stone-800"
            )}
          >
            <FileSignature size={18} /> 重命名模板
          </button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left Sidebar List */}
        <div className="w-64 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {currentTemplates.map((template) => (
                <div
                key={template.id}
                onClick={() => setSelectedId(template.id)}
                className={cn(
                    "p-3 rounded-lg cursor-pointer transition-all group relative border",
                    selectedId === template.id
                    ? "bg-indigo-50 border-indigo-200 shadow-sm"
                    : "bg-stone-50 border-transparent hover:bg-stone-100 hover:border-stone-200"
                )}
                >
                    <div className="flex items-center justify-between mb-1">
                        <h3 className={cn("font-medium text-sm truncate pr-6", selectedId === template.id ? "text-indigo-700" : "text-stone-700")}>
                            {template.name}
                        </h3>
                    </div>
                    
                    {isTemplateActive(template.id) && (
                        <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-medium bg-indigo-100/50 px-1.5 py-0.5 rounded w-fit">
                            <Check size={10} /> 默认
                        </div>
                    )}

                    {/* Delete Action on Hover */}
                    {!template.isDefault && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDelete(template.id); }}
                            className="absolute right-2 top-3 p-1 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                            title="删除"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            ))}
            
            {currentTemplates.length === 0 && (
                <div className="text-center py-12 text-stone-400 text-sm">
                    暂无模板
                </div>
            )}
            </div>
            
            <div className="p-3 border-t border-stone-100">
                <button
                onClick={handleCreate}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-50 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-100 hover:text-indigo-600 transition-all"
                >
                <Plus size={16} />
                新建模板
                </button>
            </div>
        </div>

        {/* Right Editor Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm flex flex-col overflow-hidden">
            {selectedTemplate ? (
            <>
                {/* Editor Header */}
                <div className="px-8 py-5 border-b border-stone-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-stone-800 w-32">编辑模板</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleToggleDefault(selectedTemplate.id)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors border mr-2",
                                isTemplateActive(selectedTemplate.id)
                                ? "bg-stone-100 border-stone-200 text-stone-500"
                                : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                            )}
                        >
                            {isTemplateActive(selectedTemplate.id) ? (
                                <>
                                <Check size={16} /> 已设为默认
                                </>
                            ) : (
                                <>
                                <Star size={16} /> 设为默认
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={!hasUnsavedChanges}
                            title="保存更改"
                            className={cn(
                                "p-2.5 rounded-lg transition-all",
                                hasUnsavedChanges
                                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                                : "bg-stone-100 text-stone-400 cursor-not-allowed"
                            )}
                        >
                            <Save size={20} />
                        </button>

                        {!selectedTemplate.isDefault && (
                            <button 
                                onClick={() => handleDelete(selectedTemplate.id)}
                                title="删除"
                                className="p-2.5 rounded-lg text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="space-y-8">
                        {/* Template Name Input */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-stone-900">模板名称</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => {
                                    setEditName(e.target.value);
                                    setHasUnsavedChanges(true);
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-stone-800"
                                placeholder="给模板起个名字..."
                            />
                        </div>

                        {/* Prompt Editor */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-stone-900">
                                    {activeTemplateTab === 'annotation' ? '注释提示词 (Annotation Prompt)' : 
                                    activeTemplateTab === 'tag' ? '标签提示词 (Tag Prompt)' : 
                                    '重命名提示词 (Rename Prompt)'}
                                </label>
                                {activeTemplateTab === 'tag' && (
                                    <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-md">
                                        可用变量: <code className="text-indigo-600 font-mono">{`{availableTags}`}</code>
                                    </span>
                                )}
                            </div>
                            <textarea
                                value={editPrompt}
                                onChange={(e) => {
                                    setEditPrompt(e.target.value);
                                    setHasUnsavedChanges(true);
                                }}
                                className="w-full h-80 p-5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none font-mono text-sm text-stone-700 leading-relaxed"
                                placeholder="在这里输入 AI 提示词..."
                            />
                        </div>

                        {/* Preview Section - Restored */}
                        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 space-y-3">
                            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                                <LayoutTemplate size={14} /> 效果预览 (示例)
                            </h4>
                            {activeTemplateTab === 'annotation' && (
                                <p className="text-sm text-stone-600 italic leading-relaxed">
                                    "A vibrant landscape featuring a majestic mountain peak covered in snow, illuminated by the warm glow of a setting sun. The foreground shows a dense pine forest..."
                                </p>
                            )}
                            {activeTemplateTab === 'tag' && (
                                <div className="flex flex-wrap gap-2">
                                    {['landscape', 'mountain', 'snow', 'sunset', 'forest', 'nature', 'scenic'].map(tag => (
                                        <span key={tag} className="text-xs px-2.5 py-1 bg-white border border-stone-200 text-stone-600 rounded-md shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {activeTemplateTab === 'rename' && (
                                <div className="flex items-center gap-2 text-sm text-stone-600 font-mono bg-white px-3 py-2 rounded-lg border border-stone-200 w-fit">
                                    <FileSignature size={14} className="text-indigo-500" />
                                    mountain_landscape_sunset_v2.jpg
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
            ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-stone-400 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
                    <LayoutTemplate size={32} className="opacity-50" />
                </div>
                <p>请从左侧选择一个模板进行编辑</p>
            </div>
            )}
        </div>
      </div>
    </motion.div>
  );
}
