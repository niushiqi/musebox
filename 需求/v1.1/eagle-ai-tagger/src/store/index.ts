import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TemplateType = 'annotation' | 'tag' | 'rename';

export type Template = {
  id: string;
  type: TemplateType;
  name: string;
  isDefault: boolean;
  prompt: string;
};

export type AIServiceConfig = {
  provider: 'gemini' | 'openai' | 'custom';
  baseUrl: string;
  apiKey: string;
  model: string;
};

export type ProcessingStats = {
  processedCount: number;
  apiCallCount: number;
};

export type AppState = {
  // Settings
  aiConfig: AIServiceConfig;
  setAiConfig: (config: Partial<AIServiceConfig>) => void;
  
  // Preferences
  skipExistingAnnotation: boolean;
  skipExistingTags: boolean;
  maxTokens: number;
  setPreferences: (prefs: Partial<{ skipExistingAnnotation: boolean; skipExistingTags: boolean; maxTokens: number }>) => void;

  // Templates
  templates: Template[];
  activeAnnotationTemplateId: string;
  activeTagTemplateId: string;
  activeRenameTemplateId: string;
  
  addTemplate: (template: Omit<Template, 'id'>) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  
  setActiveAnnotationTemplateId: (id: string) => void;
  setActiveTagTemplateId: (id: string) => void;
  setActiveRenameTemplateId: (id: string) => void;
  
  // Stats
  stats: ProcessingStats;
  incrementStats: (processed: number, calls: number) => void;
  resetStats: () => void;

  // UI State
  autoMode: boolean;
  setAutoMode: (enabled: boolean) => void;
  
  activeTemplateTab: TemplateType;
  setActiveTemplateTab: (tab: TemplateType) => void;
};

const DEFAULT_ANNOTATION_TEMPLATE: Template = {
  id: 'default-annotation',
  type: 'annotation',
  name: '默认注释模板',
  isDefault: true,
  prompt: '分析这张图片，提供一个简洁的视觉描述，适合作为替代文本。重点关注主要主体、颜色和氛围。请使用中文回答。',
};

const DEFAULT_TAG_TEMPLATE: Template = {
  id: 'default-tag',
  type: 'tag',
  name: '默认标签模板',
  isDefault: true,
  prompt: '为这张图片生成 5-10 个相关标签。以逗号分隔的列表形式返回。如果适用，请使用现有标签：{availableTags}。请使用中文标签。',
};

const DEFAULT_RENAME_TEMPLATE: Template = {
  id: 'default-rename',
  type: 'rename',
  name: '默认重命名模板',
  isDefault: true,
  prompt: '根据图片内容生成一个简短的文件名（不含扩展名）。使用下划线分隔单词，例如：mountain_landscape_sunset。请使用英文或拼音。',
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      aiConfig: {
        provider: 'gemini',
        baseUrl: '',
        apiKey: '',
        model: 'gemini-2.5-flash',
      },
      setAiConfig: (config) => set((state) => ({ aiConfig: { ...state.aiConfig, ...config } })),

      skipExistingAnnotation: true,
      skipExistingTags: false,
      maxTokens: 500,
      setPreferences: (prefs) => set((state) => ({ ...state, ...prefs })),

      templates: [DEFAULT_ANNOTATION_TEMPLATE, DEFAULT_TAG_TEMPLATE, DEFAULT_RENAME_TEMPLATE],
      activeAnnotationTemplateId: 'default-annotation',
      activeTagTemplateId: 'default-tag',
      activeRenameTemplateId: 'default-rename',
      
      addTemplate: (template) =>
        set((state) => ({
          templates: [
            ...state.templates,
            { ...template, id: crypto.randomUUID(), isDefault: false },
          ],
        })),
        
      updateTemplate: (id, updates) =>
        set((state) => ({
          templates: state.templates.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
        
      deleteTemplate: (id) =>
        set((state) => {
          const newTemplates = state.templates.filter((t) => t.id !== id);
          // Reset active ID if the active one was deleted
          let newActiveAnnotationId = state.activeAnnotationTemplateId;
          let newActiveTagId = state.activeTagTemplateId;
          let newActiveRenameId = state.activeRenameTemplateId;

          if (state.activeAnnotationTemplateId === id) {
             newActiveAnnotationId = newTemplates.find(t => t.type === 'annotation')?.id || '';
          }
          if (state.activeTagTemplateId === id) {
             newActiveTagId = newTemplates.find(t => t.type === 'tag')?.id || '';
          }
          if (state.activeRenameTemplateId === id) {
             newActiveRenameId = newTemplates.find(t => t.type === 'rename')?.id || '';
          }

          return {
            templates: newTemplates,
            activeAnnotationTemplateId: newActiveAnnotationId,
            activeTagTemplateId: newActiveTagId,
            activeRenameTemplateId: newActiveRenameId,
          };
        }),
        
      setActiveAnnotationTemplateId: (id) => set({ activeAnnotationTemplateId: id }),
      setActiveTagTemplateId: (id) => set({ activeTagTemplateId: id }),
      setActiveRenameTemplateId: (id) => set({ activeRenameTemplateId: id }),

      stats: { processedCount: 0, apiCallCount: 0 },
      incrementStats: (processed, calls) =>
        set((state) => ({
          stats: {
            processedCount: state.stats.processedCount + processed,
            apiCallCount: state.stats.apiCallCount + calls,
          },
        })),
      resetStats: () => set({ stats: { processedCount: 0, apiCallCount: 0 } }),

      autoMode: false,
      setAutoMode: (enabled) => set({ autoMode: enabled }),
      
      activeTemplateTab: 'annotation',
      setActiveTemplateTab: (tab) => set({ activeTemplateTab: tab }),
    }),
    {
      name: 'eagle-ai-storage-v5', // Changed version to force reset
    }
  )
);
