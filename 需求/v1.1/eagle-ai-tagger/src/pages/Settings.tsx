import React from 'react';
import { useStore } from '@/store';
import { Save, RotateCcw, CheckCircle2, AlertCircle, Edit2, X } from 'lucide-react';
import { motion } from 'motion/react';

export function SettingsPage() {
  const { 
    aiConfig, setAiConfig, 
    skipExistingAnnotation, skipExistingTags, maxTokens, setPreferences,
    stats, resetStats 
  } = useStore();

  const [isTesting, setIsTesting] = React.useState(false);
  const [testResult, setTestResult] = React.useState<'success' | 'error' | null>(null);
  
  // Local state for editing
  const [isEditing, setIsEditing] = React.useState(false);
  const [localConfig, setLocalConfig] = React.useState(aiConfig);

  // Sync local state with store when not editing
  React.useEffect(() => {
    if (!isEditing) {
      setLocalConfig(aiConfig);
    }
  }, [aiConfig, isEditing]);

  const handleSave = () => {
    setAiConfig(localConfig);
    setIsEditing(false);
    setTestResult(null); // Reset test result on save
  };

  const handleCancel = () => {
    setLocalConfig(aiConfig);
    setIsEditing(false);
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    // Simulate API check using localConfig (so users can test before saving)
    setTimeout(() => {
      setIsTesting(false);
      // Simple validation for demo
      if (localConfig.provider === 'gemini' || (localConfig.apiKey && localConfig.baseUrl)) {
        setTestResult('success');
      } else {
        setTestResult('error');
      }
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* AI Service Configuration */}
      <section className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-stone-800">AI 服务配置</h2>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-lg transition-colors"
              >
                <Edit2 size={14} />
                编辑
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-stone-500 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <X size={14} />
                  取消
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                >
                  <Save size={14} />
                  保存
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-stone-700">服务提供商</label>
            <select 
              value={localConfig.provider}
              onChange={(e) => setLocalConfig({ ...localConfig, provider: e.target.value as any })}
              disabled={!isEditing}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all disabled:bg-stone-50 disabled:text-stone-500"
            >
              <option value="gemini">Google Gemini (推荐)</option>
              <option value="openai">OpenAI</option>
              <option value="custom">自定义 (OpenAI 兼容)</option>
            </select>
          </div>

          {localConfig.provider !== 'gemini' && (
            <div className="grid gap-2">
              <label className="text-sm font-medium text-stone-700">API Base URL</label>
              <input 
                type="text" 
                value={localConfig.baseUrl}
                onChange={(e) => setLocalConfig({ ...localConfig, baseUrl: e.target.value })}
                disabled={!isEditing}
                placeholder="https://api.openai.com/v1"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-stone-50 disabled:text-stone-500"
              />
            </div>
          )}

          <div className="grid gap-2">
            <label className="text-sm font-medium text-stone-700">API Key</label>
            <input 
              type="password" 
              value={localConfig.apiKey}
              onChange={(e) => setLocalConfig({ ...localConfig, apiKey: e.target.value })}
              disabled={!isEditing}
              placeholder={localConfig.provider === 'gemini' ? "AIza..." : "sk-..."}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-stone-50 disabled:text-stone-500"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium text-stone-700">模型名称</label>
            <input 
              type="text" 
              value={localConfig.model}
              onChange={(e) => setLocalConfig({ ...localConfig, model: e.target.value })}
              disabled={!isEditing}
              placeholder={localConfig.provider === 'gemini' ? 'gemini-2.5-flash' : 'gpt-4o'}
              className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none disabled:bg-stone-50 disabled:text-stone-500"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button 
              onClick={handleTestConnection}
              disabled={isTesting}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 disabled:opacity-70 transition-colors"
            >
              {isTesting ? '测试中...' : '测试连接'}
            </button>
            {testResult === 'success' && (
              <span className="text-emerald-600 text-sm flex items-center gap-1">
                <CheckCircle2 size={16} /> 连接成功
              </span>
            )}
            {testResult === 'error' && (
              <span className="text-red-600 text-sm flex items-center gap-1">
                <AlertCircle size={16} /> 连接失败
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Processing Preferences */}
      <section className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <h2 className="text-lg font-semibold text-stone-800">处理偏好</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-stone-700">跳过已有注释的图片</label>
            <input 
              type="checkbox" 
              checked={skipExistingAnnotation}
              onChange={(e) => setPreferences({ skipExistingAnnotation: e.target.checked })}
              className="w-5 h-5 text-indigo-600 rounded border-stone-300 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-stone-700">跳过已有标签的图片</label>
            <input 
              type="checkbox" 
              checked={skipExistingTags}
              onChange={(e) => setPreferences({ skipExistingTags: e.target.checked })}
              className="w-5 h-5 text-indigo-600 rounded border-stone-300 focus:ring-indigo-500"
            />
          </div>
          <div className="grid gap-2 pt-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-stone-700">最大 Token 数 (Max Tokens)</label>
              <span className="text-sm text-stone-500">{maxTokens}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="4000" 
              step="100"
              value={maxTokens}
              onChange={(e) => setPreferences({ maxTokens: parseInt(e.target.value) })}
              className="w-full accent-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-stone-100 rounded-xl border border-stone-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-stone-600 uppercase tracking-wider">使用统计</h3>
          <button 
            onClick={resetStats}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} /> 重置
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-stone-900">{stats.processedCount}</div>
            <div className="text-xs text-stone-500">已处理图片数</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-stone-900">{stats.apiCallCount}</div>
            <div className="text-xs text-stone-500">API 调用次数</div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
