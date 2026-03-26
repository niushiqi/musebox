/*
 * 批量重命名备注标签 - MuseAI
 * 
 */

console.log(`批量重命名备注标签 - MuseAI v1.0.0 已启动`);

// 模板管理函数 - 全局立即可用
function switchTemplateTab(type) {
    console.log('switchTemplateTab 被调用:', type);
    
    if (!window.templateUIState) {
        window.templateUIState = {
            currentType: 'annotation',
            selectedTemplateId: null,
            hasUnsavedChanges: false
        };
    }
    
    window.templateUIState.currentType = type;
    
    // 更新标签页状态
    document.querySelectorAll('.template-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.type === type);
    });
    
    // 延迟执行，确保插件已初始化
    setTimeout(() => {
        if (window.renderTemplateList) {
            window.renderTemplateList();
        } else if (typeof renderTemplateList === 'function') {
            renderTemplateList();
        }
        
        if (window.clearTemplateEditor) {
            window.clearTemplateEditor();
        } else if (typeof clearTemplateEditor === 'function') {
            clearTemplateEditor();
        }
    }, 100);
}

// 立即将函数添加到全局作用域
window.switchTemplateTab = switchTemplateTab;

function createNewTemplate() {
    console.log('createNewTemplate 被调用');
    setTimeout(() => {
        if (window.eagleAutoAnnotation && window.eagleAutoAnnotation.createTemplate) {
            const type = window.templateUIState?.currentType || 'annotation';
            const template = window.eagleAutoAnnotation.createTemplate(type);
            
            if (window.renderTemplateList) {
                window.renderTemplateList();
            } else if (typeof renderTemplateList === 'function') {
                renderTemplateList();
            }
            
            if (window.selectTemplate) {
                window.selectTemplate(template.id);
            } else if (typeof selectTemplate === 'function') {
                selectTemplate(template.id);
            }
            
            // 更新工作台的模板选择器
            if (window.updateTemplateSelectors) {
                window.updateTemplateSelectors();
            } else if (typeof updateTemplateSelectors === 'function') {
                updateTemplateSelectors();
            }
        }
    }, 50);
}

// 立即将函数添加到全局作用域
window.createNewTemplate = createNewTemplate;

function saveCurrentTemplate() {
    console.log('saveCurrentTemplate 被调用');
    if (window.eagleAutoAnnotation && window.eagleAutoAnnotation.saveCurrentTemplate) {
        window.eagleAutoAnnotation.saveCurrentTemplate();
    } else if (typeof saveCurrentTemplate === 'function') {
        // 调用本地定义的函数
        const templateId = window.templateUIState?.selectedTemplateId;
        if (templateId) {
            const nameInput = document.getElementById('templateNameInput');
            const promptInput = document.getElementById('templatePromptInput');
            
            if (nameInput && promptInput) {
                const name = nameInput.value.trim();
                const prompt = promptInput.value.trim();
                
                if (name && prompt && window.eagleAutoAnnotation) {
                    try {
                        window.eagleAutoAnnotation.updateTemplate(templateId, { name, prompt });
                        if (window.templateUIState) {
                            window.templateUIState.hasUnsavedChanges = false;
                        }
                        
                        const saveBtn = document.getElementById('saveTemplateBtn');
                        if (saveBtn) {
                            saveBtn.disabled = true;
                            saveBtn.style.color = '';
                        }
                        
                        if (window.renderTemplateList) {
                            window.renderTemplateList();
                        }
                        
                        if (window.showNotification) {
                            window.showNotification('模板已保存', 'success');
                        }
                    } catch (error) {
                        if (window.showNotification) {
                            window.showNotification('保存失败: ' + error.message, 'error');
                        }
                    }
                }
            }
        }
    }
}

// 立即将函数添加到全局作用域
window.saveCurrentTemplate = saveCurrentTemplate;

function toggleTemplateDefault(templateId) {
    console.log('toggleTemplateDefault 被调用:', templateId);
    if (window.eagleAutoAnnotation && window.eagleAutoAnnotation.toggleTemplateDefault) {
        window.eagleAutoAnnotation.toggleTemplateDefault(templateId);
    } else if (typeof toggleTemplateDefault === 'function') {
        // 调用本地定义的函数
        if (window.eagleAutoAnnotation) {
            const template = window.eagleAutoAnnotation.pluginConfig.templates.find(t => t.id === templateId);
            if (template) {
                const currentActiveId = window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[template.type];
                
                if (currentActiveId === templateId) {
                    // 取消默认
                    window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[template.type] = '';
                    if (window.showNotification) {
                        window.showNotification('已取消默认模板', 'success');
                    }
                } else {
                    // 设为默认
                    window.eagleAutoAnnotation.setActiveTemplate(template.type, templateId);
                    if (window.showNotification) {
                        window.showNotification('已设为默认模板', 'success');
                    }
                }
                
                // 刷新列表和编辑器
                if (window.renderTemplateList) {
                    window.renderTemplateList();
                }
                if (window.loadTemplateToEditor) {
                    window.loadTemplateToEditor(templateId);
                }
            }
        }
    }
}

// 立即将函数添加到全局作用域
window.toggleTemplateDefault = toggleTemplateDefault;

function deleteTemplateConfirm(templateId) {
    console.log('deleteTemplateConfirm 被调用:', templateId);
    if (window.eagleAutoAnnotation && window.eagleAutoAnnotation.deleteTemplateConfirm) {
        window.eagleAutoAnnotation.deleteTemplateConfirm(templateId);
    } else if (typeof deleteTemplateConfirm === 'function') {
        // 调用本地定义的函数
        if (window.eagleAutoAnnotation) {
            const template = window.eagleAutoAnnotation.pluginConfig.templates.find(t => t.id === templateId);
            if (template && confirm(`确定要删除模板"${template.name}"吗？`)) {
                try {
                    window.eagleAutoAnnotation.deleteTemplate(templateId);
                    if (window.renderTemplateList) {
                        window.renderTemplateList();
                    }
                    if (window.clearTemplateEditor) {
                        window.clearTemplateEditor();
                    }
                    if (window.showNotification) {
                        window.showNotification('模板已删除', 'success');
                    }
                } catch (error) {
                    if (window.showNotification) {
                        window.showNotification('删除失败: ' + error.message, 'error');
                    }
                }
            }
        }
    }
}

// 立即将函数添加到全局作用域
window.deleteTemplateConfirm = deleteTemplateConfirm;

function markTemplateAsChanged() {
    console.log('markTemplateAsChanged 被调用');
    if (window.templateUIState) {
        window.templateUIState.hasUnsavedChanges = true;
    }
    
    const saveBtn = document.getElementById('saveTemplateBtn');
    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.style.color = '#3b82f6';
    }
}

// 立即将函数添加到全局作用域
window.markTemplateAsChanged = markTemplateAsChanged;

function updateSelectedTemplate(type) {
    console.log('updateSelectedTemplate 被调用:', type);
    
    if (!window.eagleAutoAnnotation) {
        console.warn('eagleAutoAnnotation 未初始化');
        return;
    }
    
    const selector = document.getElementById(`${type}-template`);
    if (!selector) {
        console.warn(`找不到 ${type} 模板选择器`);
        return;
    }
    
    const selectedValue = selector.value;
    
    // 检查是否选择了"添加模板"选项
    if (selectedValue === 'add-template') {
        // 跳转到模板管理页面
        if (typeof switchTab === 'function') {
            switchTab('templates');
        } else if (window.switchTab) {
            window.switchTab('templates');
        }
        
        // 延迟一下让页面切换完成
        setTimeout(() => {
            // 切换到对应的模板类型标签页
            if (window.switchTemplateTab) {
                window.switchTemplateTab(type);
            }
            
            // 再延迟一下创建新模板
            setTimeout(() => {
                if (window.createNewTemplate) {
                    window.createNewTemplate();
                }
            }, 200);
        }, 100);
        
        // 重置选择器到之前的值
        const activeId = window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[type];
        if (activeId) {
            selector.value = activeId;
        } else {
            selector.selectedIndex = 0;
        }
        
        return;
    }
    
    // 正常的模板选择逻辑
    if (selectedValue) {
        try {
            window.eagleAutoAnnotation.setActiveTemplate(type, selectedValue);
            console.log(`已设置 ${type} 的激活模板:`, selectedValue);
        } catch (error) {
            console.error(`设置激活模板失败:`, error);
        }
    }
}

// 立即将函数添加到全局作用域
window.updateSelectedTemplate = updateSelectedTemplate;

// 更新工作台的模板选择器
function updateTemplateSelectors() {
    console.log('更新模板选择器');
    
    if (!window.eagleAutoAnnotation || !window.eagleAutoAnnotation.pluginConfig) {
        console.warn('eagleAutoAnnotation 未初始化，跳过模板选择器更新');
        return;
    }
    
    const types = ['annotation', 'tag', 'rename'];
    
    types.forEach(type => {
        const selector = document.getElementById(`${type}-template`);
        if (!selector) return;
        
        // 清空现有选项
        selector.innerHTML = '';
        
        // 获取该类型的所有模板
        const templates = window.eagleAutoAnnotation.getTemplatesByType(type);
        const activeId = window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[type];
        
        if (templates.length === 0) {
            // 如果没有模板，显示提示
            const option = document.createElement('option');
            option.value = '';
            option.textContent = `暂无${getTypeDisplayName(type)}模板`;
            option.disabled = true;
            selector.appendChild(option);
        } else {
            // 添加模板选项
            templates.forEach(template => {
                const option = document.createElement('option');
                option.value = template.id;
                option.textContent = template.name;
                if (template.id === activeId) {
                    option.selected = true;
                }
                selector.appendChild(option);
            });
        }
        
        // 添加"添加模板"选项（仅对注释模板）
        if (type === 'annotation') {
            const addOption = document.createElement('option');
            addOption.value = 'add-template';
            addOption.textContent = '+ 添加模板';
            addOption.style.color = '#3b82f6';
            addOption.style.fontWeight = '500';
            selector.appendChild(addOption);
        }
    });
}

// 插件配置
const pluginConfig = {
    provider: 'volcano',
    apiKey: '',
    model: '',
    apiConnected: false,
    maxTokens: 200,
    autoAnnotation: false,
    customModels: {},
    templates: [],
    activeTemplateIds: {
        annotation: '',
        tag: '',
        rename: ''
    }
};

// AI服务商配置
const aiProviders = {
    volcano: {
        name: '火山方舟',
        baseUrl: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
        models: [
            { 
                value: 'doubao-seed-1-6-250615', 
                label: '豆包Seed 1.6', 
                description: '新一代, 高质量'
            },
            { 
                value: 'doubao-seed-1-6-flash-250828', 
                label: '豆包Seed 1.6 Flash', 
                description: '快速响应, 高效'
            }
        ],
        authHeader: 'Authorization',
        authFormat: 'Bearer {apiKey}',
        requestFormat: 'openai'
    },
    alibaba: {
        name: '阿里云百炼',
        baseUrl: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
        models: [
            { 
                value: 'qwen-vl-max-latest', 
                label: '通义千问 VL Max', 
                description: '顶级模型, 最强能力'
            },
            { 
                value: 'qwen-vl-plus-latest', 
                label: '通义千问 VL Plus', 
                description: '平衡性能, 推荐使用'
            }
        ],
        authHeader: 'Authorization',
        authFormat: 'Bearer {apiKey}',
        requestFormat: 'alibaba'
    },
    zhipu: {
        name: '智谱AI开放平台',
        baseUrl: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        models: [
            { 
                value: 'GLM-4.5V', 
                label: 'GLM-4.5V', 
                description: '旗舰模型, 效果最强'
            },
            { 
                value: 'GLM-4V-Plus-0111', 
                label: 'GLM-4V-Plus-0111', 
                description: '专业级, 理解精准'
            },
            { 
                value: 'GLM-4.1V-Thinking-FlashX', 
                label: 'GLM-4.1V-Thinking-FlashX', 
                description: '高性价比, 均衡全面'
            },
            { 
                value: 'GLM-4.1V-Thinking-Flash', 
                label: 'GLM-4.1V-Thinking-Flash', 
                description: '免费, 支持推理'
            },
            { 
                value: 'GLM-4V-Flash', 
                label: 'GLM-4V-Flash', 
                description: '免费, 基础快速'
            }
        ],
        authHeader: 'Authorization',
        authFormat: 'Bearer {apiKey}',
        requestFormat: 'openai'
    },
    google: {
        name: 'Google AI Studio',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
        models: [
            { 
                value: 'gemini-2.5-pro', 
                label: 'Gemini 2.5 Pro', 
                description: '专业级, 高质量'
            },
            { 
                value: 'gemini-2.5-flash', 
                label: 'Gemini 2.5 Flash', 
                description: '推荐, 平衡高效'
            },
            { 
                value: 'gemini-2.5-flash-lite', 
                label: 'Gemini 2.5 Flash-Lite', 
                description: '经济型, 高速'
            }
        ],
        authHeader: 'X-Goog-Api-Key',
        authFormat: '{apiKey}',
        requestFormat: 'google'
    }
};

// 插件状态
let pluginState = {
    isProcessing: false,
    processedImages: new Set(), // 已处理的图片ID集合
    selectedImages: [], // 当前选中的图片
    processingQueue: [], // 待处理图片队列
    settings: {
        autoAnnotation: false,
        manualAnnotation: true,
        apiConfigured: false,
        skipExistingAnnotations: true, // 跳过已有注释的图片
        skipProcessedImages: true // 跳过已被插件处理过的图片
    },
    tokenUsage: { // token使用统计
        totalTokens: 0,
        totalInputTokens: 0,  // 累计输入Token
        totalOutputTokens: 0, // 累计输出Token
        totalCost: 0,
        requests: 0,
        lastRequest: null
    }
};

// Eagle插件生命周期事件
eagle.onPluginCreate((plugin) => {
    console.log('插件已创建:', plugin);
    initializePlugin();
});

eagle.onPluginRun(() => {
    console.log('插件开始运行');
    setupEventListeners();
});

eagle.onPluginShow(() => {
    console.log('插件界面显示');
    updateUI();
});

eagle.onPluginHide(() => {
    console.log('插件界面隐藏');
});

// 初始化插件
function initializePlugin() {
    // 检查API配置
    checkAPIConfiguration();
    
    // 加载token统计
    loadTokenUsageStats();
    
    // 设置后台验证机制
    setupBackgroundVerification();
    
    // 设置UI界面
    setupUI();
    
    console.log('插件初始化完成');
}

// 重置为默认配置 - v1.9.0 新增
function resetToDefaultConfig() {
    console.log('🔄 重置为默认配置...');
    
    // 清空所有本地存储
    try {
        localStorage.removeItem('eagleAutoAnnotationConfig');
        localStorage.removeItem('eagleAutoAnnotationTokenUsage');
        localStorage.removeItem('eagleAutoAnnotationTokenStats');
        localStorage.removeItem('eaglePluginBackgroundTest');
        console.log('✅ 本地存储已清空');
    } catch (error) {
        console.warn('⚠️ 清空本地存储时出错:', error);
    }
    
    // 提示用户重启插件
    if (window.showNotification) {
        window.showNotification('配置已重置，请重新打开插件生效', 'success');
    }
    
    // 延迟关闭插件窗口
    setTimeout(() => {
        if (typeof eagle !== 'undefined' && eagle.onPluginHide) {
            eagle.onPluginHide();
        }
        // 尝试关闭当前窗口
        if (window.close) {
            window.close();
        }
    }, 2000);
}

// 检查API配置
function checkAPIConfiguration() {
    try {
        console.log('📦 开始检查API配置...');
        
        const savedConfig = localStorage.getItem('eagleAutoAnnotationConfig');
        
        if (savedConfig) {
            console.log('📝 发现已保存的配置，正在加载...');
            const config = JSON.parse(savedConfig);
            
            pluginConfig.provider = config.provider || 'volcano';
            pluginConfig.apiKey = config.apiKey || '';
            pluginConfig.model = config.model || '';
            pluginConfig.apiConnected = config.apiConnected || false;
            pluginConfig.maxTokens = config.maxTokens || 200;
            pluginConfig.customModels = config.customModels || {};
            
            // 兼容旧版本多服务商配置
            if (!config.apiKey && config.apiKeys) {
                pluginConfig.apiKey = config.apiKeys[pluginConfig.provider] || '';
            }
            if (!config.model && config.models) {
                pluginConfig.model = config.models[pluginConfig.provider] || '';
            }
            
            // 加载模板数据
            if (config.templates && Array.isArray(config.templates)) {
                pluginConfig.templates = config.templates;
            }
            if (config.activeTemplateIds && typeof config.activeTemplateIds === 'object') {
                pluginConfig.activeTemplateIds = config.activeTemplateIds;
            }
            
            pluginState.settings.apiConfigured = !!pluginConfig.apiKey;
            pluginState.settings.autoAnnotation = config.autoAnnotation !== undefined ? config.autoAnnotation : false;
            pluginState.settings.manualAnnotation = config.manualAnnotation !== undefined ? config.manualAnnotation : true;
            pluginState.settings.skipExistingAnnotations = config.skipExistingAnnotations !== undefined ? config.skipExistingAnnotations : true;
            pluginState.settings.skipProcessedImages = config.skipProcessedImages !== undefined ? config.skipProcessedImages : true;
            
            console.log('✅ 配置加载成功:', {
                provider: pluginConfig.provider,
                apiConfigured: pluginState.settings.apiConfigured,
                model: pluginConfig.model
            });
            
            setTimeout(() => {
                syncConfigurationToUI();
            }, 100);
            
        } else {
            console.log('🆕 未找到保存的配置，使用默认配置');
        }
    } catch (error) {
        console.error('❌ 加载配置时出错:', error);
        resetToDefaultConfig();
    }
}

// 设置事件监听器
function setupEventListeners() {
    console.log('开始设置事件监听器...');
    console.log('当前设置状态:', {
        autoAnnotation: pluginState.settings.autoAnnotation,
        apiConfigured: pluginState.settings.apiConfigured,
        provider: pluginConfig.provider,
        hasApiKey: !!pluginConfig.apiKey
    });
    
    let eventListenerSetup = false;
    
    try {
        // 尝试多种Eagle API方式
        console.log('检查Eagle API可用性:');
        console.log('- eagle.on:', typeof eagle.on);
        console.log('- eagle.addEventListener:', typeof eagle.addEventListener);
        console.log('- eagle.item:', typeof eagle.item);
        
        // 方式1: 使用 eagle.on
        if (typeof eagle.on === 'function') {

            
            eagle.on('imageAdded', (imageData) => {
                console.log('🎯 检测到新图片添加 (imageAdded):', imageData);
                handleNewImageEvent(imageData, 'imageAdded');
            });
            
            eagle.on('itemAdded', (imageData) => {
                console.log('🎯 检测到新项目添加 (itemAdded):', imageData);
                handleNewImageEvent(imageData, 'itemAdded');
            });
            
            eagle.on('imageImported', (imageData) => {
                console.log('🎯 检测到图片导入 (imageImported):', imageData);
                handleNewImageEvent(imageData, 'imageImported');
            });
            
            eagle.on('fileAdded', (imageData) => {
                console.log('🎯 检测到文件添加 (fileAdded):', imageData);
                handleNewImageEvent(imageData, 'fileAdded');
            });
            
            // 选择相关事件
            eagle.on('imageSelected', (imageData) => {
                console.log('图片被选中:', imageData);
                pluginState.selectedImages = Array.isArray(imageData) ? imageData : [imageData];
                updateSelectedImagesUI(imageData);
            });
            
            eagle.on('selectionChanged', (selectedItems) => {
                console.log('选择发生变化:', selectedItems);
                pluginState.selectedImages = selectedItems || [];
            });
            
            eagle.on('itemsSelected', (items) => {
                console.log('项目被选中:', items);
                pluginState.selectedImages = items || [];
            });
            
            eagle.on('imageDeleted', (imageData) => {
                console.log('图片被删除:', imageData);
                if (imageData && imageData.id) {
                    pluginState.processedImages.delete(imageData.id);
                }
            });
            
            eventListenerSetup = true;
            console.log('✅ eagle.on 事件监听器设置成功');
            
        } else if (typeof eagle.addEventListener === 'function') {
            // 方式2: 使用 eagle.addEventListener

            
            eagle.addEventListener('imageAdded', (imageData) => {
                console.log('🎯 检测到新图片添加 (addEventListener):', imageData);
                handleNewImageEvent(imageData, 'addEventListener:imageAdded');
            });
            
            eventListenerSetup = true;
            console.log('✅ eagle.addEventListener 事件监听器设置成功');
        }
        
        // 无论是否设置了事件监听器，都启动轮询作为备用
        console.log('启动轮询检测作为备用机制...');
        startPollingForNewImages();
        
        if (!eventListenerSetup) {
            console.warn('⚠️ 无法设置任何事件监听器，完全依赖轮询检测');
        }
        
    } catch (error) {
        console.error('❌ 设置事件监听器时出错:', error);
        console.log('启动轮询检测作为fallback机制...');
        startPollingForNewImages();
    }
}

// 统一处理新图片事件
function handleNewImageEvent(imageData, eventType) {
    console.log(`📥 处理新图片事件 [${eventType}]:`, {
        name: imageData?.name,
        id: imageData?.id,
        autoAnnotation: pluginState.settings.autoAnnotation,
        apiConfigured: pluginState.settings.apiConfigured
    });
    
    // 检查条件
    if (!pluginState.settings.autoAnnotation) {
        console.log('❌ 自动注释功能已关闭，跳过处理');
        return;
    }
    
    if (!pluginState.settings.apiConfigured) {
        console.log('❌ API未配置，跳过处理');
        return;
    }
    
    if (!imageData) {
        console.log('❌ 图片数据为空，跳过处理');
        return;
    }
    
    // 调用处理函数
    handleNewImage(imageData);
    
    // 调用自动标签匹配处理
    if (window.processAutoTagMatching && typeof window.processAutoTagMatching === 'function') {
        console.log('🏷️ 调用自动标签匹配处理...');
        setTimeout(() => {
            window.processAutoTagMatching(imageData).catch(error => {
                console.error('❌ 自动标签匹配处理失败:', error);
            });
        }, 1000); // 延迟1秒，确保注释处理完成
    } else {
        console.log('⚠️ processAutoTagMatching 函数不可用');
    }
}

// 轮询检测新图片（备用方案）
let lastImageCount = -1; // -1 表示还未设置基线
let pollingInterval = null;
let lastImageIds = new Set();
let fallbackPollingInterval = null;

function startPollingForNewImages() {
    if (pollingInterval) {
        console.log('轮询已在运行，跳过重复启动');
        return;
    }
    
    console.log('🔄 开始轮询检测新图片...');
    
    // 延迟初始化基线数据，确保只处理插件启动后的新图片
    console.log('📊 将在首次轮询时设置基线，只处理插件启动后新增的图片');

    const userInterval = pluginState.settings.pollingInterval || 10;
    const intervalMs = userInterval * 1000;
    console.log(`🔄 开始轮询检测新图片，间隔: ${userInterval} 秒...`);
    
    pollingInterval = setInterval(async () => {
        try {
            // 检查是否应该轮询
            if (!pluginState.settings.autoAnnotation) {
                console.log('自动注释已关闭，跳过轮询');
                return;
            }
            
            if (!pluginState.settings.apiConfigured) {
                console.log('API未配置，跳过轮询');
                return;
            }
            
            console.log('🔍 尝试获取图片列表...');
            
            const currentImages = await getAllImages();
            
            // 如果无法获取图片列表，尝试备用方案
            if (!currentImages || currentImages.length === 0) {
                console.log('无法获取图片列表，启动备用检测机制');
                startFallbackDetection();
                return;
            }
            
            console.log(`获取到图片数量: ${currentImages.length}`);
            
            // 如果是第一次轮询，设置基线（不处理现有图片）
            if (lastImageCount === -1) {
                console.log('📊 首次轮询，设置基线数据（不处理现有图片）');
                lastImageCount = currentImages.length;
                lastImageIds = new Set(currentImages.map(img => img.id));
                console.log(`📊 基线设置完成: ${lastImageCount} 张图片，只处理后续新增的图片`);
                return;
            }
            
            console.log(`当前图片数量: ${currentImages.length}, 上次记录: ${lastImageCount}`);
            
            // 检测新增的图片
            const newImages = [];
            const currentImageIds = new Set(currentImages.map(img => img.id));
            
            // 找出新增的图片ID
            for (const imageId of currentImageIds) {
                if (!lastImageIds.has(imageId)) {
                    const newImage = currentImages.find(img => img.id === imageId);
                    if (newImage) {
                        newImages.push(newImage);
                    }
                }
            }
            
            if (newImages.length > 0) {
                console.log(`🎆 轮询发现 ${newImages.length} 张新图片:`, newImages.map(img => img.name));
                
                for (const imageData of newImages) {
                    console.log(`📥 处理轮询发现的新图片: ${imageData.name}`);
                    handleNewImageEvent(imageData, 'polling');
                }
            }
            
            // 更新基线数据
            lastImageCount = currentImages.length;
            lastImageIds = currentImageIds;
            
        } catch (error) {
            console.error('❌ 轮询检测新图片时出错:', error);
        }
    }, intervalMs);
    
    console.log(`✅ 轮询检测已启动，间隔 ${userInterval} 秒`);
}

// 备用检测机制：当无法获取图片列表时使用
function startFallbackDetection() {
    if (fallbackPollingInterval) {
        return; // 已经在运行
    }
    
    console.log('🔄 启动备用检测机制...');
    console.log('💡 建议：由于无法自动检测新图片，请使用以下方式之一：');
    console.log('  1. 手动选择图片后点击“为选中图片生成注释”');
    console.log('  2. 将插件界面保持打开，然后添加新图片');
    
    // 尝试在未来的Eagle版本中能否使用新API
    fallbackPollingInterval = setInterval(async () => {
        try {
            // 定期重新检查API可用性
            const currentImages = await getAllImages();
            if (currentImages && currentImages.length > 0) {
                console.log('🎉 检测到API恢复可用，关闭备用机制');
                clearInterval(fallbackPollingInterval);
                fallbackPollingInterval = null;
                // 重新启动正常轮询
                if (!pollingInterval) {
                    startPollingForNewImages();
                }
                return;
            }
            
            // 检查是否有新的Eagle API可用
            console.log('🔎 检查Eagle API更新...');
            if (typeof eagle === 'object') {
                const currentEagleKeys = Object.keys(eagle);
                console.log('当前Eagle API:', currentEagleKeys);
            }
            
        } catch (error) {
            console.log('备用检测错误:', error.message);
        }
    }, 30000); // 每30秒检查一次
    
    // 显示用户提示
    if (typeof showNotification === 'function') {
        showNotification('⚠️ 无法自动检测新图片，请使用手动批量注释功能', 'warning');
    }
}

// 初始化轮询基线数据（现在只重置状态，不立即设置基线）
async function initializePollingBaseline() {
    console.log('🔄 重置轮询状态，准备在首次轮询时设置基线');
    lastImageCount = -1; // -1 表示还未设置基线
    lastImageIds = new Set();
}

// 测试后台运行状态
function testBackgroundMode() {
    console.log('🔍 测试插件后台运行状态...');
    
    const testInfo = {
        timestamp: new Date().toISOString(),
        pluginVisible: document.visibilityState !== 'hidden',
        eagleEvents: {
            hasOn: typeof eagle.on === 'function',
            hasAddEventListener: typeof eagle.addEventListener === 'function'
        },
        listeners: {
            pollingActive: !!pollingInterval,
            settingsValid: pluginState.settings.autoAnnotation && pluginState.settings.apiConfigured
        },
        serviceMode: true // 从manifest.json确认
    };
    
    console.log('📊 后台模式测试结果:', testInfo);
    
    // 记录到本地存储用于验证
    const testHistory = JSON.parse(localStorage.getItem('eaglePluginBackgroundTest') || '[]');
    testHistory.push(testInfo);
    // 只保留最近10条记录
    if (testHistory.length > 10) {
        testHistory.splice(0, testHistory.length - 10);
    }
    localStorage.setItem('eaglePluginBackgroundTest', JSON.stringify(testHistory));
    
    return testInfo;
}

// 获取后台测试历史
function getBackgroundTestHistory() {
    return JSON.parse(localStorage.getItem('eaglePluginBackgroundTest') || '[]');
}

// 添加后台运行验证机制
function setupBackgroundVerification() {
    console.log('🔧 设置后台运行验证机制...');
    
    // 每5分钟记录一次插件活跃状态
    setInterval(() => {
        if (pluginState.settings.autoAnnotation) {
            console.log('💓 插件后台心跳检测 -', new Date().toLocaleTimeString());
            testBackgroundMode();
        }
    }, 300000); // 5分钟
    
    // 立即执行一次测试
    testBackgroundMode();
}

// 新增诊断和状态检查函数
function diagnoseAutoAnnotationIssues() {
    console.log('🔍 开始诊断自动注释功能...');
    
    const diagnosis = {
        timestamp: new Date().toISOString(),
        settings: {
            autoAnnotation: pluginState.settings.autoAnnotation,
            apiConfigured: pluginState.settings.apiConfigured,
            manualAnnotation: pluginState.settings.manualAnnotation,
            skipExistingAnnotations: pluginState.settings.skipExistingAnnotations,
            skipProcessedImages: pluginState.settings.skipProcessedImages
        },
        config: {
            provider: pluginConfig.provider,
            hasApiKey: !!pluginConfig.apiKey,
            apiKeyLength: pluginConfig.apiKey?.length || 0,
            model: pluginConfig.model,
            maxTokens: pluginConfig.maxTokens
        },
        eagle: {
            hasEagleOn: typeof eagle.on === 'function',
            hasEagleAddEventListener: typeof eagle.addEventListener === 'function',
            hasEagleGetAllImages: typeof eagle.getAllImages === 'function',
            hasEagleGetImages: typeof eagle.getImages === 'function',
            hasEagleItem: typeof eagle.item !== 'undefined'
        },
        polling: {
            isActive: !!pollingInterval,
            lastImageCount: lastImageCount,
            lastImageIdsCount: lastImageIds.size
        },
        state: {
            isProcessing: pluginState.isProcessing,
            processedImagesCount: pluginState.processedImages.size,
            selectedImagesCount: pluginState.selectedImages.length
        }
    };
    
    console.log('📊 诊断结果:', diagnosis);
    
    // 检查常见问题
    const issues = [];
    
    if (!diagnosis.settings.autoAnnotation) {
        issues.push('⚠️ 自动注释功能已关闭');
    }
    
    if (!diagnosis.settings.apiConfigured) {
        issues.push('❌ API未配置或配置无效');
    }
    
    if (!diagnosis.config.hasApiKey) {
        issues.push('❌ 当前服务商的API密钥未设置');
    }
    
    if (diagnosis.config.apiKeyLength < 10) {
        issues.push('⚠️ API密钥可能太短，请检查是否正确');
    }
    
    if (!diagnosis.eagle.hasEagleOn && !diagnosis.eagle.hasEagleAddEventListener) {
        issues.push('⚠️ Eagle事件监听API不可用，完全依赖轮询');
    }
    
    if (!diagnosis.polling.isActive) {
        issues.push('❌ 轮询检测未启动');
    }
    
    if (!diagnosis.eagle.hasEagleGetAllImages && !diagnosis.eagle.hasEagleGetImages) {
        issues.push('❌ 无法获取图片列表，轮询无法正常工作');
    }
    
    if (issues.length > 0) {
        console.log('🚨 发现问题:');
        issues.forEach(issue => console.log('  -', issue));
    } else {
        console.log('✅ 没有发现明显问题，自动注释功能应该可以正常工作');
    }
    
    return { diagnosis, issues };
}

// 重新初始化自动注释功能
function reinitializeAutoAnnotation() {
    console.log('🔄 重新初始化自动注释功能...');
    
    // 停止现有轮询
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
        console.log('停止现有轮询');
    }
    
    // 停止备用检测
    if (fallbackPollingInterval) {
        clearInterval(fallbackPollingInterval);
        fallbackPollingInterval = null;
        console.log('停止备用检测');
    }
    
    // 重新设置事件监听器
    setupEventListeners();
    
    // 返回诊断结果
    return diagnoseAutoAnnotationIssues();
}
async function getAllImages() {
    try {
        console.log('🔍 尝试获取图片列表...');
        
        // 方法1: 尝试 eagle.getAllImages
        if (typeof eagle.getAllImages === 'function') {

            const images = await eagle.getAllImages();
            console.log('获取到图片数量:', images?.length || 0);
            return images || [];
        }
        
        // 方法2: 尝试 eagle.getImages
        if (typeof eagle.getImages === 'function') {

            const images = await eagle.getImages();
            console.log('获取到图片数量:', images?.length || 0);
            return images || [];
        }
        
        // 方法3: 尝试 eagle.library
        if (typeof eagle.library !== 'undefined' && typeof eagle.library.getAll === 'function') {

            const images = await eagle.library.getAll();
            console.log('获取到图片数量:', images?.length || 0);
            return images || [];
        }
        
        // 方法4: 尝试 eagle.item.getAll
        if (typeof eagle.item !== 'undefined' && typeof eagle.item.getAll === 'function') {

            const images = await eagle.item.getAll();
            console.log('获取到图片数量:', images?.length || 0);
            return images || [];
        }
        
        // 方法5: 尝试其他可能的API
        const possibleAPIs = [
            { path: 'eagle.images.getAll', desc: 'Eagle Images API' },
            { path: 'eagle.collection.getAll', desc: 'Eagle Collection API' },
            { path: 'eagle.files.getAll', desc: 'Eagle Files API' },
            { path: 'eagle.gallery.getAll', desc: 'Eagle Gallery API' },
            { path: 'eagle.assets.getAll', desc: 'Eagle Assets API' }
        ];
        
        for (const apiInfo of possibleAPIs) {
            try {
                const parts = apiInfo.path.split('.');
                let api = window;
                for (const part of parts) {
                    api = api[part];
                    if (!api) break;
                }
                
                if (typeof api === 'function') {
                    console.log(`使用 ${apiInfo.path} (${apiInfo.desc})`);
                    const images = await api();
                    console.log('获取到图片数量:', images?.length || 0);
                    return images || [];
                }
            } catch (e) {
                console.log(`${apiInfo.path} 调用失败:`, e.message);
            }
        }
        
        // 方法6: 检查是否有其他可用的eagle API
        console.log('🔎 检查所有可用的Eagle API:');
        if (typeof eagle === 'object') {
            const eagleKeys = Object.keys(eagle);
            console.log('Eagle API 键值:', eagleKeys);
            
            // 尝试每个可能含有get方法的属性
            for (const key of eagleKeys) {
                try {
                    const obj = eagle[key];
                    if (obj && typeof obj === 'object') {
                        const methods = Object.keys(obj).filter(k => typeof obj[k] === 'function');
                        if (methods.length > 0) {
                            console.log(`eagle.${key} 方法:`, methods);
                            
                            // 尝试常见的获取方法
                            const getMethods = ['getAll', 'list', 'find', 'query', 'get'];
                            for (const method of getMethods) {
                                if (typeof obj[method] === 'function') {
                                    console.log(`尝试 eagle.${key}.${method}()`);
                                    try {
                                        const result = await obj[method]();
                                        if (Array.isArray(result) && result.length > 0) {
                                            console.log(`✅ eagle.${key}.${method}() 成功，获取到 ${result.length} 个项目`);
                                            return result;
                                        }
                                    } catch (methodError) {
                                        console.log(`eagle.${key}.${method}() 失败:`, methodError.message);
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    // 忽略错误，继续下一个
                }
            }
        }
        
        console.warn('❌ 所有获取图片列表的方法都不可用，无法使用轮询模式');
        console.log('💡 建议：请使用手动批量注释功能来处理图片');
        return [];
        
    } catch (error) {
        console.error('获取图片列表时出错:', error);
        return [];
    }
}

// 处理新添加的图片
async function handleNewImage(imageData) {
    // 将图片添加到处理队列
    pluginState.processingQueue.push(imageData);
    console.log(`图片 "${imageData.name}" 已添加到处理队列，队列长度: ${pluginState.processingQueue.length}`);
    
    // 如果当前没有在处理，启动队列处理
    if (!pluginState.isProcessing) {
        processImageQueue();
    }
}

// 处理图片队列
async function processImageQueue() {
    if (pluginState.isProcessing || pluginState.processingQueue.length === 0) {
        return;
    }
    
    pluginState.isProcessing = true;
    console.log(`开始处理图片队列，共 ${pluginState.processingQueue.length} 张图片`);
    
    while (pluginState.processingQueue.length > 0) {
        const imageData = pluginState.processingQueue.shift();
        
        try {
            console.log('开始为新图片生成注释:', imageData.name);
            
            // 检查是否开启了跳过已有注释的设置
            if (pluginState.settings.skipExistingAnnotations && hasExistingAnnotation(imageData)) {
                console.log('图片已有注释，跳过处理:', imageData.name);
                continue;
            }
            
            // 检查是否已经处理过
            if (pluginState.settings.skipProcessedImages && pluginState.processedImages.has(imageData.id)) {
                console.log('图片已被插件处理过，跳过:', imageData.name);
                continue;
            }
            
            // 生成注释
            const annotation = await generateImageAnnotation(imageData);
            
            if (annotation) {
                // 将注释添加到图片
                await addAnnotationToImage(imageData, annotation);
                pluginState.processedImages.add(imageData.id);
                
                // 立即保存统计数据，确保数据持久化
                saveTokenUsageStats();
                
                console.log('成功为新图片添加注释:', annotation);
                showNotification(`已为 "${imageData.name}" 添加注释`, 'success');
            }
            
        } catch (error) {
            console.error('处理新图片时出错:', error);
            showNotification(`处理图片 "${imageData.name}" 时出错: ${error.message}`, 'error');
        }
        
        // 在处理下一张图片前稍作延迟，避免API请求过于频繁
        if (pluginState.processingQueue.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    pluginState.isProcessing = false;
    console.log('图片队列处理完成');
    
    // 隐藏进度条
    hideManualProgress();
}

// 生成图片注释
async function generateImageAnnotation(imageData) {
    try {
        console.log('开始生成图片注释:', imageData.name);
        
        // 检查API配置
        const currentProvider = pluginConfig.provider;
        const apiKey = pluginConfig.apiKey;
        if (!apiKey) {
            throw new Error(`${aiProviders[currentProvider]?.name || '当前服务商'}的API密钥未配置`);
        }
        
        // 获取图片数据
        console.log('获取图片Base64数据...');
        const imageBase64 = await getImageBase64(imageData);
        console.log('图片Base64长度:', imageBase64.length);
        
        // 获取当前服务商配置
        const provider = aiProviders[pluginConfig.provider];
        if (!provider) {
            throw new Error(`不支持的服务商: ${pluginConfig.provider}`);
        }
        
        // 获取当前服务商的模型
        const model = pluginConfig.model;
        
        console.log('使用服务商:', provider.name);
        console.log('使用模型:', model);
        
        // 构建请求
        const requestData = buildAPIRequest(provider, imageBase64, model);
        const headers = buildAPIHeaders(provider);
        const apiUrl = getAPIUrl(provider);
        
        console.log('API URL:', apiUrl);
        console.log('请求头已设置');
        console.log('请求数据已构建');
        
        // 验证URL格式
        try {
            new URL(apiUrl);
            console.log('URL格式验证通过');
        } catch (urlError) {
            console.error('URL格式错误:', urlError);
            throw new Error(`API URL格式错误: ${apiUrl}`);
        }
        
        // 调用大模型API
        console.log('发送API请求...');
        console.log('请求URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestData)
        });
        
        console.log('API响应状态:', response.status, response.statusText);
        console.log('响应头:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API错误响应:', errorText);
            
            let errorMessage = `API请求失败: ${response.status} ${response.statusText}`;
            try {
                const errorJson = JSON.parse(errorText);
                
                // 火山方舟特定错误处理
                if (pluginConfig.provider === 'volcano') {
                    if (errorJson.error && errorJson.error.message) {
                        errorMessage += ` - ${errorJson.error.message}`;
                    }
                    if (errorJson.error && errorJson.error.code) {
                        errorMessage += ` (错误码: ${errorJson.error.code})`;
                        
                        // 常见错误的中文提示
                        switch (errorJson.error.code) {
                            case 'invalid_api_key':
                                errorMessage += ' - API密钥无效，请检查您的API Key';
                                break;
                            case 'insufficient_quota':
                                errorMessage += ' - 余额不足，请充值或检查账户余额';
                                break;
                            case 'model_not_found':
                                errorMessage += ' - 模型不存在，请检查endpoint ID是否正确';
                                break;
                            case 'rate_limit_exceeded':
                                errorMessage += ' - 请求过于频繁，请稍后再试';
                                break;
                        }
                    }
                } else {
                    // 其他服务商的错误处理
                    if (errorJson.message) {
                        errorMessage += ` - ${errorJson.message}`;
                    }
                    if (errorJson.code) {
                        errorMessage += ` (错误码: ${errorJson.code})`;
                    }
                }
                
                if (errorJson.request_id) {
                    errorMessage += ` (请求ID: ${errorJson.request_id})`;
                }
            } catch (e) {
                errorMessage += ` - ${errorText}`;
            }
            
            throw new Error(errorMessage);
        }
        
        const result = await response.json();
        console.log('API响应已接收');
        
        const parseResult = parseAPIResponse(provider, result);
        const annotation = parseResult.content;
        const tokenUsage = parseResult.tokenUsage;
        
        console.log('解析后的注释:', annotation);
        console.log('Token使用情况:', tokenUsage);
        
        if (!annotation || annotation.trim() === '') {
            throw new Error('API返回的注释为空或无效');
        }
        
        // 更新token统计
        if (tokenUsage) {
            updateTokenUsage(tokenUsage, provider);
        }
        
        return annotation;
        
    } catch (error) {
        console.error('生成注释时出错:', error);
        console.error('错误堆栈:', error.stack);
        throw error;
    }
}

// 构建API请求数据
function buildAPIRequest(provider, imageBase64, model) {
    // 使用当前激活的注释模板
    const activeTemplate = getActiveTemplate('annotation');
    if (!activeTemplate || !activeTemplate.prompt) {
        throw new Error('请激活注释模板');
    }
    
    const prompt = activeTemplate.prompt;
    
    // 根据图片格式确定MIME类型
    let mimeType = 'image/jpeg';
    if (imageBase64.startsWith('/9j/') || imageBase64.startsWith('iVBOR')) {
        mimeType = 'image/jpeg';
    } else if (imageBase64.startsWith('iVBOR')) {
        mimeType = 'image/png';
    } else if (imageBase64.startsWith('UklGR')) {
        mimeType = 'image/webp';
    }
    
    console.log('图片MIME类型:', mimeType);
    console.log('使用模型:', model);
    
    switch (provider.requestFormat) {
        case 'openai':
            return {
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: prompt
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:${mimeType};base64,${imageBase64}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: pluginConfig.maxTokens
            };
            
        case 'alibaba':
            return {
                model: model,
                input: {
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    text: prompt
                                },
                                {
                                    image: `data:${mimeType};base64,${imageBase64}`
                                }
                            ]
                        }
                    ]
                },
                parameters: {
                    max_tokens: pluginConfig.maxTokens,
                    temperature: 0.7
                }
            };
            
        case 'google':
            return {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            },
                            {
                                inline_data: {
                                    mime_type: mimeType,
                                    data: imageBase64
                                }
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: pluginConfig.maxTokens
                }
            };
            
        default:
            throw new Error(`不支持的请求格式: ${provider.requestFormat}`);
    }
}

// 构建API请求头
function buildAPIHeaders(provider) {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    // Google AI Studio使用URL参数认证，不需要请求头
    if (provider.requestFormat !== 'google') {
        // 添加认证头
        const apiKey = pluginConfig.apiKey;
        
        // 确保API Key只包含ASCII字符
        if (apiKey && !/^[\x00-\x7F]*$/.test(apiKey)) {
            throw new Error('API Key包含非法字符，请检查API Key格式');
        }
        
        // 确保authValue也只包含ASCII字符
        const authValue = provider.authFormat.replace('{apiKey}', apiKey);
        if (!/^[\x00-\x7F]*$/.test(authValue)) {
            throw new Error('认证头包含非法字符');
        }
        headers[provider.authHeader] = authValue;
    }
    
    return headers;
}

// 获取API URL
function getAPIUrl(provider) {
    const currentProvider = pluginConfig.provider;
    
    if (currentProvider === 'custom') {
        return provider.baseUrl;
    }
    
    if (provider.requestFormat === 'google') {
        const model = pluginConfig.model;
        const apiKey = pluginConfig.apiKey;
        return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    }
    
    return provider.baseUrl;
}

// 解析API响应
function parseAPIResponse(provider, result) {
    let content = '';
    let tokenUsage = null;
    
    switch (provider.requestFormat) {
        case 'openai':
            content = result.choices[0].message.content.trim();
            if (result.usage) {
                tokenUsage = {
                    promptTokens: result.usage.prompt_tokens || 0,
                    completionTokens: result.usage.completion_tokens || 0,
                    totalTokens: result.usage.total_tokens || 0
                };
            }
            break;
            
        case 'alibaba':
            if (result.output && result.output.text) {
                content = result.output.text.trim();
            } else if (result.output && result.output.choices && result.output.choices[0] && result.output.choices[0].message) {
                const message = result.output.choices[0].message;
                if (message.content) {
                    // 如果content是数组，取第一个元素的text
                    if (Array.isArray(message.content)) {
                        const textContent = message.content.find(item => item.text);
                        if (textContent && textContent.text) {
                            content = textContent.text.trim();
                        }
                    }
                    // 如果content是字符串
                    else if (typeof message.content === 'string') {
                        content = message.content.trim();
                    }
                }
                if (!content) {
                    throw new Error('无法从阿里百炼API响应中提取文本内容');
                }
            } else {
                throw new Error('无法解析阿里百炼API响应');
            }
            
            // 阿里百炼token统计
            if (result.usage) {
                tokenUsage = {
                    inputTokens: result.usage.input_tokens || 0,
                    outputTokens: result.usage.output_tokens || 0,
                    totalTokens: result.usage.total_tokens || (result.usage.input_tokens || 0) + (result.usage.output_tokens || 0)
                };
            }
            break;
            
        case 'google':
            content = result.candidates[0].content.parts[0].text.trim();
            // Google的token统计
            if (result.usageMetadata) {
                tokenUsage = {
                    promptTokenCount: result.usageMetadata.promptTokenCount || 0,
                    candidatesTokenCount: result.usageMetadata.candidatesTokenCount || 0,
                    totalTokenCount: result.usageMetadata.totalTokenCount || 0
                };
            }
            break;
            
        default:
            throw new Error(`不支持的响应格式: ${provider.requestFormat}`);
    }
    
    return { content, tokenUsage };
}

// 更新token使用统计
function updateTokenUsage(tokenUsage, provider) {
    if (!tokenUsage) return;
    
    const currentProvider = pluginConfig.provider;
    const providerName = aiProviders[currentProvider]?.name || '当前服务商';
    
    // 统一处理不同服务商的token统计格式
    let totalTokens = 0;
    let inputTokens = 0;
    let outputTokens = 0;
    
    switch (provider.requestFormat) {
        case 'openai':
            totalTokens = tokenUsage.totalTokens || 0;
            inputTokens = tokenUsage.promptTokens || 0;
            outputTokens = tokenUsage.completionTokens || 0;
            break;
        case 'alibaba':
            totalTokens = tokenUsage.totalTokens || 0;
            inputTokens = tokenUsage.inputTokens || 0;
            outputTokens = tokenUsage.outputTokens || 0;
            break;
        case 'google':
            totalTokens = tokenUsage.totalTokenCount || 0;
            inputTokens = tokenUsage.promptTokenCount || 0;
            outputTokens = tokenUsage.candidatesTokenCount || 0;
            break;
    }
    
    // 更新全局统计
    pluginState.tokenUsage.totalTokens += totalTokens;
    pluginState.tokenUsage.totalInputTokens += inputTokens;
    pluginState.tokenUsage.totalOutputTokens += outputTokens;
    pluginState.tokenUsage.requests += 1;
    pluginState.tokenUsage.lastRequest = {
        provider: providerName,
        totalTokens: totalTokens,
        inputTokens: inputTokens,
        outputTokens: outputTokens,
        timestamp: new Date().toISOString()
    };
    
    // 保存统计数据
    saveTokenUsageStats();
    
    // 只记录到控制台，不显示弹窗
    console.log(`📊 本次调用消耗 ${totalTokens} 个token（输入: ${inputTokens}, 输出: ${outputTokens}）`);
    
    // 更新UI统计
    updateTokenUsageUI();
}

// 检查图片是否已有注释
function hasExistingAnnotation(imageData) {
    try {
        // 检查多个可能的注释字段
        const annotation = imageData.annotation || 
                          imageData.description || 
                          imageData.comment || 
                          imageData.notes;
        
        // 如果注释存在且不为空，返回true
        if (annotation && typeof annotation === 'string' && annotation.trim().length > 0) {
            return true;
        }
        
        // 检查标签数组
        if (imageData.tags && Array.isArray(imageData.tags) && imageData.tags.length > 0) {
            return true;
        }
        
        return false;
    } catch (error) {
        console.warn('检查图片注释时出错:', error);
        return false; // 出错时默认为无注释
    }
}

// 保存token使用统计
function saveTokenUsageStats() {
    try {
        const stats = {
            totalTokens: pluginState.tokenUsage.totalTokens,
            totalInputTokens: pluginState.tokenUsage.totalInputTokens,
            totalOutputTokens: pluginState.tokenUsage.totalOutputTokens,
            totalCost: pluginState.tokenUsage.totalCost,
            requests: pluginState.tokenUsage.requests,
            lastRequest: pluginState.tokenUsage.lastRequest,
            processedImages: Array.from(pluginState.processedImages), // 保存已处理图片ID列表
            processedCount: pluginState.processedImages.size, // 保存已处理图片数量
            lastSaved: new Date().toISOString()
        };
        localStorage.setItem('eagleAutoAnnotationTokenStats', JSON.stringify(stats));
        console.log('📊 统计数据已保存:', {
            totalTokens: stats.totalTokens,
            totalInputTokens: stats.totalInputTokens,
            totalOutputTokens: stats.totalOutputTokens,
            requests: stats.requests,
            processedCount: stats.processedCount
        });
    } catch (error) {
        console.error('保存token统计失败:', error);
    }
}

// 加载token使用统计
function loadTokenUsageStats() {
    try {
        const savedStats = localStorage.getItem('eagleAutoAnnotationTokenStats');
        if (savedStats) {
            const stats = JSON.parse(savedStats);
            pluginState.tokenUsage.totalTokens = stats.totalTokens || 0;
            pluginState.tokenUsage.totalInputTokens = stats.totalInputTokens || 0;
            pluginState.tokenUsage.totalOutputTokens = stats.totalOutputTokens || 0;
            pluginState.tokenUsage.totalCost = stats.totalCost || 0;
            pluginState.tokenUsage.requests = stats.requests || 0;
            pluginState.tokenUsage.lastRequest = stats.lastRequest || null;
            
            // 恢复已处理图片数据
            if (stats.processedImages && Array.isArray(stats.processedImages)) {
                pluginState.processedImages = new Set(stats.processedImages);
                console.log('📊 恢复已处理图片数据:', stats.processedImages.length, '张');
            } else if (stats.processedCount && typeof stats.processedCount === 'number') {
                // 兼容旧版本：如果没有具体的图片ID列表，但有数量统计
                console.log('📊 恢复已处理图片数量（兼容模式）:', stats.processedCount, '张');
                // 创建虚拟ID来保持数量统计的准确性
                for (let i = 0; i < stats.processedCount; i++) {
                    pluginState.processedImages.add(`legacy_${i}`);
                }
            }
            
            console.log('📊 加载统计数据完成:', {
                totalTokens: pluginState.tokenUsage.totalTokens,
                totalInputTokens: pluginState.tokenUsage.totalInputTokens,
                totalOutputTokens: pluginState.tokenUsage.totalOutputTokens,
                requests: pluginState.tokenUsage.requests,
                processedImages: pluginState.processedImages.size,
                lastSaved: stats.lastSaved
            });
        }
    } catch (error) {
        console.error('加载token统计失败:', error);
    }
}

// 更新UI中token统计显示
function updateTokenUsageUI() {
    // 更新统计信息
    const totalTokensElement = document.getElementById('total-tokens');
    const inputTokensElement = document.getElementById('input-tokens');
    const outputTokensElement = document.getElementById('output-tokens');
    const processedCountElement = document.getElementById('processed-count');
    const requestsCountElement = document.getElementById('requests-count');
    
    const totalInputTokens = pluginState.tokenUsage.totalInputTokens || 0;
    const totalOutputTokens = pluginState.tokenUsage.totalOutputTokens || 0;
    const totalTokens = totalInputTokens + totalOutputTokens;
    
    if (totalTokensElement) {
        totalTokensElement.textContent = totalTokens.toLocaleString();
    }
    
    if (inputTokensElement) {
        inputTokensElement.textContent = totalInputTokens.toLocaleString();
    }
    
    if (outputTokensElement) {
        outputTokensElement.textContent = totalOutputTokens.toLocaleString();
    }
    
    if (processedCountElement) {
        processedCountElement.textContent = pluginState.processedImages.size;
    }
    
    if (requestsCountElement) {
        requestsCountElement.textContent = pluginState.tokenUsage.requests;
    }
    
    console.log('📊 UI统计数据已更新:', {
        totalTokens: totalTokens,
        totalInputTokens: totalInputTokens,
        totalOutputTokens: totalOutputTokens,
        processedImages: pluginState.processedImages.size,
        requests: pluginState.tokenUsage.requests
    });
}

// 获取图片的Base64编码
async function getImageBase64(imageData) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('获取图片Base64编码:', imageData.name);
            console.log('图片数据详情:', {
                id: imageData.id,
                name: imageData.name,
                ext: imageData.ext,
                fileURL: imageData.fileURL,
                thumbnailURL: imageData.thumbnailURL
            });
            
            // 使用参考插件的方法：通过fetch获取图片数据
            let imageUrl = imageData.fileURL || imageData.thumbnailURL;
            
            if (!imageUrl) {
                const error = new Error('无法获取图片URL - 图片可能已损坏或不存在');
                console.error('图片URL检查失败:', error);
                reject(error);
                return;
            }
            
            console.log('图片URL:', imageUrl);
            
            // 验证URL格式
            try {
                new URL(imageUrl);
            } catch (urlError) {
                const error = new Error(`图片URL格式无效: ${imageUrl}`);
                console.error('URL格式验证失败:', error);
                reject(error);
                return;
            }
            
            // 使用fetch获取图片数据
            console.log('开始获取图片数据...');
            const response = await fetch(imageUrl);
            console.log('图片获取响应状态:', response.status, response.statusText);
            console.log('响应头:', Object.fromEntries(response.headers.entries()));
            
            if (!response.ok) {
                const error = new Error(`获取图片失败: HTTP ${response.status} ${response.statusText}`);
                console.error('图片获取失败:', error);
                reject(error);
                return;
            }
            
            const blob = await response.blob();
            console.log('图片Blob信息:', {
                size: blob.size,
                type: blob.type
            });
            
            if (blob.size === 0) {
                const error = new Error('图片数据为空');
                console.error('图片数据为空:', error);
                reject(error);
                return;
            }
            
            const fileName = imageData.name + '.' + imageData.ext;
            const file = new File([blob], fileName, { type: blob.type });
            
            // 转换为Base64
            const reader = new FileReader();
            reader.onload = function() {
                try {
                    const base64String = reader.result.split(',')[1];
                    console.log('Base64编码完成，长度:', base64String.length);
                    resolve(base64String);
                } catch (parseError) {
                    console.error('Base64解析失败:', parseError);
                    reject(new Error('Base64编码解析失败'));
                }
            };
            reader.onerror = function(error) {
                console.error('FileReader错误:', error);
                reject(new Error('图片读取失败'));
            };
            reader.readAsDataURL(file);
            
        } catch (error) {
            console.error('获取图片Base64编码时出错:', error);
            console.error('错误详情:', {
                message: error.message,
                name: error.name,
                stack: error.stack
            });
            reject(error);
        }
    });
}

// 将注释添加到图片
async function addAnnotationToImage(imageData, annotation) {
    try {
        console.log('添加注释到图片:', imageData.name, '注释:', annotation);
        
        // 使用参考插件发现的正确方法：直接设置annotation属性并保存
        if (imageData && typeof imageData.save === 'function') {
            // 直接设置annotation属性
            imageData.annotation = annotation;
            
            // 保存图片
            await imageData.save();
            
            console.log('注释已成功添加到图片:', imageData.name);
            return true;
        } else {
            // 备用方案：尝试其他API方式
            console.log('尝试备用保存方法...');
            
            let success = false;
            
            // 方式1: 直接更新元数据
            if (typeof eagle.updateImageMetadata === 'function') {
                try {
                    await eagle.updateImageMetadata(imageData.id, {
                        annotation: annotation,
                        autoGenerated: true,
                        generatedAt: new Date().toISOString()
                    });
                    success = true;
                } catch (error) {
                    console.warn('方式1更新元数据失败:', error);
                }
            }
            
            // 方式2: 更新图片属性
            if (!success && typeof eagle.updateImageProperties === 'function') {
                try {
                    await eagle.updateImageProperties(imageData.id, {
                        annotation: annotation,
                        autoGenerated: true,
                        generatedAt: new Date().toISOString()
                    });
                    success = true;
                } catch (error) {
                    console.warn('方式2更新属性失败:', error);
                }
            }
            
            if (success) {
                console.log('注释已添加到图片:', imageData.name);
                return true;
            } else {
                console.warn('所有更新方式都失败了，但注释生成成功');
                // 即使无法更新到Eagle，我们也记录这个注释
                pluginState.generatedAnnotations = pluginState.generatedAnnotations || new Map();
                pluginState.generatedAnnotations.set(imageData.id, {
                    annotation: annotation,
                    timestamp: new Date().toISOString(),
                    imageName: imageData.name
                });
                return false;
            }
        }
        
    } catch (error) {
        console.error('添加注释到图片时出错:', error);
        throw error;
    }
}

// 手动为选中图片添加注释
async function addAnnotationToSelectedImages() {
    // 记录用户操作日志
    addDebugLog('🎯 用户点击"为选中图片生成注释"按钮');
    
    if (pluginState.isProcessing) {
        addDebugLog('⚠️ 操作被拒绝：当前正在处理其他图片');
        showNotification('正在处理其他图片，请稍后再试', 'warning');
        return;
    }
    
    try {
        pluginState.isProcessing = true;
        addDebugLog('🚀 开始批量处理选中图片');
        
        // 立即显示进度条，给用户即时反馈
        showManualProgress(0, 0);
        
        // 获取当前选中的图片 - 使用统一的检测函数
        let selectedImages = [];
        
        try {
            // 使用统一的选中图片检测函数，显示详细日志
            if (typeof window.refreshSelectedImages === 'function') {
                selectedImages = await window.refreshSelectedImages(true);
            } else {
                throw new Error('统一的选中图片检测函数不可用');
            }
            
            addDebugLog(`📋 获取到选中图片：${selectedImages?.length || 0}张`);
            
            // 验证获取到的数据
            if (!Array.isArray(selectedImages)) {
                throw new Error('获取到的数据不是数组格式');
            }
            
        } catch (apiError) {
            addDebugLog(`❌ 获取选中图片失败：${apiError.message}`);
            
            let errorMessage = '无法获取选中的图片。';
            if (apiError.message.includes('not a function')) {
                errorMessage += ' Eagle API可能不兼容，请尝试重新选择图片。';
            } else if (apiError.message.includes('permission')) {
                errorMessage += ' 权限不足，请检查插件权限设置。';
            } else {
                errorMessage += ' 请确保已选择图片，或尝试重新选择图片。';
            }
            
            showNotification(errorMessage, 'error');
            return;
        }
        
        if (!selectedImages || selectedImages.length === 0) {
            addDebugLog('⚠️ 未检测到选中的图片');
            showNotification('请先选择要添加注释的图片', 'warning');
            return;
        }
        
        addDebugLog(`📊 准备处理 ${selectedImages.length} 张图片`);
        showNotification(`开始为 ${selectedImages.length} 张图片生成注释...`, 'info');
        
        // 更新进度条显示总数
        updateManualProgress(0, selectedImages.length);
        
        let successCount = 0;
        let errorCount = 0;
        let skippedCount = 0;
        let processedCount = 0;
        
        for (const imageData of selectedImages) {
            try {
                addDebugLog(`🖼️ 开始处理图片：${imageData.name}`);
                
                // 检查是否开启了跳过已有注释的设置
                if (pluginState.settings.skipExistingAnnotations && hasExistingAnnotation(imageData)) {
                    addDebugLog(`⏭️ 跳过图片：${imageData.name} (已有注释)`);
                    skippedCount++;
                    continue;
                }
                
                // 检查是否开启了跳过已处理图片的设置
                if (pluginState.settings.skipProcessedImages && pluginState.processedImages.has(imageData.id)) {
                    addDebugLog(`⏭️ 跳过图片：${imageData.name} (已处理过)`);
                    skippedCount++;
                    continue;
                }
                
                // 检查API配置
                if (!pluginState.settings.apiConfigured) {
                    throw new Error('API未配置，请先配置AI服务');
                }
                
                // 检查图片URL
                if (!imageData.fileURL && !imageData.thumbnailURL) {
                    throw new Error('图片URL无效，无法获取图片数据');
                }
                
                const annotation = await generateImageAnnotation(imageData);
                addDebugLog(`✅ 生成注释：${imageData.name} -> "${annotation}"`);
                
                if (annotation && annotation.trim()) {
                    const saveResult = await addAnnotationToImage(imageData, annotation);
                    if (saveResult) {
                        pluginState.processedImages.add(imageData.id);
                        successCount++;
                        addDebugLog(`✅ 成功处理：${imageData.name}`);
                        
                        // 立即保存统计数据，确保数据持久化
                        saveTokenUsageStats();
                    } else {
                        errorCount++;
                        addDebugLog(`❌ 保存失败：${imageData.name}`);
                        showNotification(`保存注释失败: ${imageData.name}`, 'error');
                    }
                } else {
                    errorCount++;
                    addDebugLog(`❌ 注释为空：${imageData.name}`);
                    showNotification(`生成的注释为空: ${imageData.name}`, 'error');
                }
                
            } catch (error) {
                addDebugLog(`❌ 处理失败：${imageData.name} - ${error.message}`);
                errorCount++;
                
                // 显示具体的错误信息
                let errorMessage = `处理图片 "${imageData.name}" 失败: `;
                if (error.message.includes('API请求失败')) {
                    errorMessage += 'API请求失败，请检查网络连接和API配置';
                } else if (error.message.includes('无法获取图片URL')) {
                    errorMessage += '无法获取图片URL，请检查图片是否有效';
                } else if (error.message.includes('API返回的注释为空')) {
                    errorMessage += 'AI返回的注释为空，请尝试其他模型';
                } else if (error.message.includes('无法解析')) {
                    errorMessage += 'API响应解析失败，请检查API配置';
                } else {
                    errorMessage += error.message;
                }
                
                showNotification(errorMessage, 'error');
            }
            
            // 更新进度
            processedCount++;
            updateManualProgress(processedCount, selectedImages.length);
        }
        
        let message = `处理完成！成功: ${successCount} 张`;
        if (skippedCount > 0) message += `，跳过: ${skippedCount} 张`;
        if (errorCount > 0) message += `，失败: ${errorCount} 张`;
        
        addDebugLog(`📊 处理完成：成功${successCount}张，跳过${skippedCount}张，失败${errorCount}张`);
        showNotification(message, errorCount > 0 ? 'warning' : 'success');
        
        // 返回处理结果，用于UI状态更新
        const result = {
            success: successCount > 0 && errorCount === 0,
            successCount,
            errorCount,
            skippedCount,
            message
        };
        
        // 如果全部失败，抛出异常让UI知道处理失败
        if (successCount === 0 && errorCount > 0) {
            throw new Error(`所有图片处理失败（${errorCount}张）`);
        }
        
        return result;
        
    } catch (error) {
        addDebugLog(`❌ 批量处理异常：${error.message}`);
        showNotification(`批量处理时出错: ${error.message}`, 'error');
    } finally {
        pluginState.isProcessing = false;
        hideManualProgress(); // 重置按钮进度条状态
        addDebugLog('🏁 批量处理流程结束');
    }
}

// 显示通知
function showNotification(message, type = 'info', duration = 3000) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加移除方法
    notification.remove = function() {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    };
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 如果duration大于0，则自动移除
    if (duration > 0) {
        setTimeout(() => {
            notification.remove();
        }, duration);
    }
    
    // 返回通知对象，以便手动控制
    return notification;
}

// 调试日志函数
function addDebugLog(message) {
    console.log(`[Debug] ${message}`);
}

// 设置UI界面
function setupUI() {
    // 这个函数将在HTML中实现
    console.log('UI界面设置完成');
}

// 更新UI界面
function updateUI() {
    // 更新界面状态
    console.log('更新UI界面');
}

// 更新选中图片的UI
function updateSelectedImagesUI(imageData) {
    console.log('更新选中图片UI:', imageData);
    
    // 更新插件状态中的选中图片
    if (imageData) {
        if (Array.isArray(imageData)) {
            pluginState.selectedImages = imageData;
        } else {
            pluginState.selectedImages = [imageData];
        }
    }
    
    // 调用HTML中的更新函数
    if (typeof window.updateSelectedImagesCount === 'function') {
        window.updateSelectedImagesCount();
    }
    
    // 也调用新的显示更新函数
    if (typeof window.updateSelectedCountDisplay === 'function') {
        window.updateSelectedCountDisplay(pluginState.selectedImages.length);
    }
}

// 重置为默认配置
function resetToDefaultConfig() {
    console.log('🔄 重置为默认配置...');
    
    // 清空所有本地存储
    try {
        localStorage.removeItem('eagleAutoAnnotationConfig');
        localStorage.removeItem('eagleAutoAnnotationTokenUsage');
        localStorage.removeItem('eagleAutoAnnotationTokenStats');
        localStorage.removeItem('eaglePluginBackgroundTest');
        console.log('✅ 本地存储已清空');
    } catch (error) {
        console.warn('⚠️ 清空本地存储时出错:', error);
    }
    
    // 提示用户重启插件
    if (window.showNotification) {
        window.showNotification('配置已重置，请重新打开插件生效', 'success');
    }
    
    // 延迟关闭插件窗口
    setTimeout(() => {
        if (typeof eagle !== 'undefined' && eagle.onPluginHide) {
            eagle.onPluginHide();
        }
        // 尝试关闭当前窗口
        if (window.close) {
            window.close();
        }
    }, 2000);
}

// 保存配置
function saveConfiguration() {
    try {
        console.log('💾 开始保存插件配置...');

        // v1.9.1 修复：直接从UI读取当前服务商，确保保存的是用户选择的值
        const selectedProvider = document.getElementById('provider')?.value || pluginConfig.provider;
        pluginConfig.provider = selectedProvider; // 同步到全局状态
        
        const config = {
            provider: selectedProvider,
            apiKey: pluginConfig.apiKey,
            model: pluginConfig.model,
            apiConnected: pluginConfig.apiConnected || false,
            maxTokens: pluginConfig.maxTokens,
            autoAnnotation: pluginState.settings.autoAnnotation,
            manualAnnotation: pluginState.settings.manualAnnotation,
            skipExistingAnnotations: pluginState.settings.skipExistingAnnotations,
            skipProcessedImages: pluginState.settings.skipProcessedImages,
            customModels: pluginConfig.customModels || {},
            templates: pluginConfig.templates || [],
            activeTemplateIds: pluginConfig.activeTemplateIds || {},
            lastSaved: new Date().toISOString()
        };
        
        console.log('📄 保存配置:', {
            provider: config.provider,
            maxTokens: config.maxTokens,
            autoAnnotation: config.autoAnnotation,
            lastSaved: config.lastSaved
        });
        
        localStorage.setItem('eagleAutoAnnotationConfig', JSON.stringify(config));
        console.log('✅ 配置保存成功！');
        
        // 立即验证保存结果
        const savedConfig = localStorage.getItem('eagleAutoAnnotationConfig');
        if (savedConfig) {
            const parsed = JSON.parse(savedConfig);
            console.log('🔍 验证保存结果:', {
                provider: parsed.provider,
                lastSaved: parsed.lastSaved,
                apiKeysCount: Object.keys(parsed.apiKeys || {}).length
            });
        }
        
        // showNotification('配置已保存', 'success');
        return true;
    } catch (error) {
        console.error('❌ 保存配置时出错:', error);
        console.error('错误堆栈:', error.stack);
        showNotification('配置保存失败: ' + error.message, 'error');
        return false;
    }
}

// 获取服务商信息
function getProviderInfo(providerKey) {
    return aiProviders[providerKey] || null;
}

// v1.8.1 新增：强制UI同步配置的方法
function syncConfigurationToUI() {
    console.log('🔄 强制同步配置到UI界面...');
    
    // 触发自定义事件通知UI更新
    const event = new CustomEvent('eagleConfigLoaded', {
        detail: {
            provider: pluginConfig.provider,
            apiKey: pluginConfig.apiKey,
            model: pluginConfig.model,
            settings: pluginState.settings
        }
    });
    
    window.dispatchEvent(event);
    console.log('✅ 配置同步事件已触发');
}

// 更新模型列表
function updateModelList(providerKey) {
    const provider = aiProviders[providerKey];
    if (!provider) return;
    
    // 触发UI更新事件
    if (typeof window.updateModelOptions === 'function') {
        window.updateModelOptions(provider.models);
    }
}

// 手动刷新选中图片 - 已移至 index.html 中的统一实现

// 测试API连接
async function testAPIConnection() {
    let loadingNotification = null;
    
    try {
        console.log('🧪 用户点击了"测试API连接"按钮');
        addDebugLog('用户操作：点击"测试API连接"按钮');
        console.log('测试API连接...');
        
        // 显示加载中的通知
        if (window.showNotification) {
            loadingNotification = window.showNotification('正在测试连接...', 'info', 0); // 0表示不自动消失
        }
        
        const currentProvider = pluginConfig.provider;
        const apiKey = pluginConfig.apiKey;
        const model = pluginConfig.model;
        
        if (!apiKey) {
            throw new Error(`${aiProviders[currentProvider]?.name || '当前服务商'}的API密钥未配置`);
        }
        
        if (currentProvider === 'volcano' && (!model || model.includes('请输入'))) {
            throw new Error('火山方舟需要有效的endpoint ID，格式如：ep-20241220123456-abcdef');
        }
        
        const provider = aiProviders[pluginConfig.provider];
        if (!provider) {
            throw new Error(`不支持的服务商: ${pluginConfig.provider}`);
        }
        
        // 构建简单的测试请求
        let testRequest;
        
        if (provider.requestFormat === 'alibaba') {
            testRequest = {
                model: model,
                input: {
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    text: '你好，这是一个测试消息，请简单回复。'
                                }
                            ]
                        }
                    ]
                },
                parameters: {
                    max_tokens: 20,
                    temperature: 0.7
                }
            };
        } else if (provider.requestFormat === 'google') {
            testRequest = {
                contents: [
                    {
                        parts: [
                            {
                                text: '你好，这是一个测试消息，请简单回复。'
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 20
                }
            };
        } else {
            // OpenAI格式（包括火山方舟）
            testRequest = {
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: '你好，这是一个测试消息，请简单回复。'
                    }
                ],
                max_tokens: 20
            };
        }
        
        const headers = buildAPIHeaders(provider);
        const apiUrl = getAPIUrl(provider);
        
        console.log('测试URL:', apiUrl);
        console.log('测试请求已构建');
        
        // 验证URL格式
        try {
            new URL(apiUrl);
        } catch (urlError) {
            throw new Error(`API URL格式错误: ${apiUrl}`);
        }
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(testRequest)
        });
        
        console.log('测试响应状态:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API测试错误响应:', errorText);
            
            let errorMessage = `API测试失败: ${response.status} ${response.statusText}`;
            
            try {
                const errorJson = JSON.parse(errorText);
                
                // 火山方舟特定错误处理
                if (currentProvider === 'volcano' && errorJson.error) {
                    if (errorJson.error.message) {
                        errorMessage += ` - ${errorJson.error.message}`;
                    }
                    
                    // 常见错误的解决建议
                    if (errorJson.error.code === 'invalid_api_key') {
                        errorMessage += '\n建议：请检查API Key是否正确';
                    } else if (errorJson.error.code === 'model_not_found') {
                        errorMessage += '\n建议：请检查endpoint ID是否存在且有权限访问';
                    } else if (errorJson.error.code === 'insufficient_quota') {
                        errorMessage += '\n建议：请充值或检查账户余额';
                    }
                } else {
                    if (errorJson.message) {
                        errorMessage += ` - ${errorJson.message}`;
                    }
                }
            } catch (e) {
                errorMessage += ` - ${errorText.substring(0, 200)}`;
            }
            
            throw new Error(errorMessage);
        }
        
        const result = await response.json();
        console.log('测试响应已接收');
        
        // 验证响应格式
        try {
            const parseResult = parseAPIResponse(provider, result);
            const testContent = parseResult.content;
            const tokenUsage = parseResult.tokenUsage;
            
            console.log('解析的测试内容:', testContent);
            
            if (tokenUsage) {
                console.log('测试Token使用:', tokenUsage);
                // 只记录到控制台，不显示弹窗
                console.log(`🎉 API测试成功！本次测试消耗 ${tokenUsage.totalTokens || tokenUsage.totalTokenCount || 0} 个token`);
            }
        } catch (parseError) {
            console.warn('响应解析警告:', parseError.message);
            // 对于测试，解析失败不一定是致命错误
        }
        
        console.log('✅ API连接测试成功');
        addDebugLog('API连接测试成功');
        
        // 隐藏加载通知并显示成功通知
        if (loadingNotification && loadingNotification.remove) {
            loadingNotification.remove();
        }
        if (window.showNotification) {
            window.showNotification('API连接测试成功!', 'success');
        }
        
        // 更新API配置状态
        pluginState.settings.apiConfigured = true;
        pluginConfig.apiConnected = true;
        saveConfiguration();
        
        // 更新UI状态，隐藏API配置警告
        if (typeof checkAPIConfigurationUI === 'function') {
            checkAPIConfigurationUI();
        } else if (window.checkAPIConfigurationUI) {
            window.checkAPIConfigurationUI();
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ API测试失败:', error);
        addDebugLog(`API测试失败：${error.message}`);
        
        // 隐藏加载通知并显示错误通知
        if (loadingNotification && loadingNotification.remove) {
            loadingNotification.remove();
        }
        if (window.showNotification) {
            window.showNotification('API连接测试失败: ' + error.message, 'error');
        }
        
        throw error;
    }
}

// 导出函数供HTML使用 - v1.9.0 增强版
window.eagleAutoAnnotation = {
    addAnnotationToSelectedImages,
    saveConfiguration,
    getProviderInfo,
    updateModelList,
    testAPIConnection,
    updateTokenUsage,
    updateTokenUsageUI,
    loadTokenUsageStats,
    saveTokenUsageStats,
    diagnoseAutoAnnotationIssues,
    reinitializeAutoAnnotation,
    testBackgroundMode,
    getBackgroundTestHistory,
    syncConfigurationToUI,  // v1.8.1 新增
    resetToDefaultConfig,   // v1.9.0 新增一键还原功能
    updateSelectedImagesUI, // 新增：更新选中图片UI
    buildAPIRequest,        // 导出API请求构建函数
    buildAPIHeaders,        // 导出API请求头构建函数
    getAPIUrl,             // 导出API URL获取函数
    generateImageAnnotation, // 导出图片注释生成函数
    addAnnotationToImage,   // 导出添加注释函数
    pluginConfig,
    pluginState,
    aiProviders,
    // 模板管理函数
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplatesByType,
    setActiveTemplate,
    getActiveTemplate,
    initializeDefaultTemplates,
    updateTemplateSelectors
};

// v1.9.0 实时监控选中图片变化
function startRealTimeSelectedImagesMonitoring() {
    console.log('🔍 启动实时选中图片监控');
    
    let lastSelectedCount = 0;
    let monitoringInterval;
    
    async function checkSelectedImages() {
        try {
            // 使用统一的选中图片检测函数，不显示日志
            if (typeof window.refreshSelectedImages === 'function') {
                const selectedImages = await window.refreshSelectedImages(false);
                const currentCount = selectedImages ? selectedImages.length : 0;
                
                // 只有当数量发生变化时才更新
                if (currentCount !== lastSelectedCount) {
                    // 更新插件状态
                    pluginState.selectedImages = selectedImages || [];
                    lastSelectedCount = currentCount;
                    
                    // 通知UI更新
                    if (typeof window.updateSelectedCountDisplay === 'function') {
                        window.updateSelectedCountDisplay(currentCount);
                    }
                }
            }
        } catch (error) {
            console.warn('检查选中图片时出错:', error);
        }
    }
    
    // 立即检查一次
    checkSelectedImages();
    
    // 每1秒检查一次（更频繁的检查）
    monitoringInterval = setInterval(checkSelectedImages, 1000);
    
    // 返回停止监控的函数
    return () => {
        if (monitoringInterval) {
            clearInterval(monitoringInterval);
            console.log('🛑 已停止实时选中图片监控');
        }
    };
}

// v1.9.0 确保函数也直接在全局作用域中可用
setTimeout(() => {
    // 这些函数需要在HTML中通过onclick直接调用
    window.addAnnotationToSelectedImages = addAnnotationToSelectedImages;
    
    // 进度条控制函数
    window.showManualProgress = showManualProgress;
    window.updateManualProgress = updateManualProgress;
    window.hideManualProgress = hideManualProgress; 
    window.testAPIConnection = testAPIConnection;
    window.diagnoseAutoAnnotationIssues = diagnoseAutoAnnotationIssues;
    window.reinitializeAutoAnnotation = reinitializeAutoAnnotation;
    window.testBackgroundMode = testBackgroundMode;
    window.resetToDefaultConfig = resetToDefaultConfig; // v1.9.0 新增
    
    // 模板管理函数 - 确保在全局作用域中可用
    window.switchTemplateTab = switchTemplateTab;
    window.createNewTemplate = createNewTemplate;
    window.saveCurrentTemplate = saveCurrentTemplate;
    window.toggleTemplateDefault = toggleTemplateDefault;
    window.deleteTemplateConfirm = deleteTemplateConfirm;
    window.markTemplateAsChanged = markTemplateAsChanged;
    window.updateSelectedTemplate = updateSelectedTemplate;
    window.updateTemplateSelectors = updateTemplateSelectors;
    
    // 模板管理UI函数
    window.renderTemplateList = renderTemplateList;
    window.selectTemplate = selectTemplate;
    window.loadTemplateToEditor = loadTemplateToEditor;
    window.clearTemplateEditor = clearTemplateEditor;
    window.initializeTemplateUI = initializeTemplateUI;
    
    // 启动实时监控
    startRealTimeSelectedImagesMonitoring();
    
    // 添加测试函数到全局作用域
    window.testProgressBar = function() {
        console.log('🧪 开始测试进度条效果...');
        showManualProgress(0, 5);
        
        setTimeout(() => {
            updateManualProgress(1, 5);
        }, 500);
        
        setTimeout(() => {
            updateManualProgress(2, 5);
        }, 1000);
        
        setTimeout(() => {
            updateManualProgress(3, 5);
        }, 1500);
        
        setTimeout(() => {
            updateManualProgress(4, 5);
        }, 2000);
        
        setTimeout(() => {
            updateManualProgress(5, 5);
        }, 2500);
        
        setTimeout(() => {
            hideManualProgress();
            console.log('✅ 进度条测试完成');
        }, 3000);
    };
    
    console.log('✅ 全局函数导出完成 - v0.3.0');
    console.log('🧪 可以在控制台输入 testProgressBar() 来测试进度条效果');
    console.log('📝 模板管理功能已就绪');
}, 50);

// 进度条控制函数实现 - 使用按钮背景渐变
function showManualProgress(current, total) {
    const buttonText = document.getElementById('manual-btn-text');
    const manualBtn = document.getElementById('manual-btn');
    
    console.log('🎯 showManualProgress 被调用:', { current, total, buttonText: !!buttonText, manualBtn: !!manualBtn });
    
    if (buttonText && manualBtn) {
        // 禁用按钮并改变背景色为灰色
        manualBtn.disabled = true;
        manualBtn.style.backgroundColor = '#6b7280'; // 灰色背景
        manualBtn.style.opacity = '1';
        
        // 使用background-image创建进度条效果
        const percentage = total > 0 ? (current / total) * 100 : 0;
        manualBtn.style.backgroundImage = `linear-gradient(to right, #3a8ffd ${percentage}%, transparent ${percentage}%)`;
        manualBtn.style.backgroundSize = '100% 100%';
        manualBtn.style.backgroundRepeat = 'no-repeat';
        
        console.log('📊 进度条更新:', { percentage, backgroundImage: manualBtn.style.backgroundImage });
        
        // 更新按钮文本
        if (total > 0) {
            buttonText.textContent = `处理中 ${current}/${total}`;
        } else {
            buttonText.textContent = '处理中...';
        }
    } else {
        console.error('❌ 找不到必要的DOM元素:', { buttonText: !!buttonText, manualBtn: !!manualBtn });
    }
}

function updateManualProgress(current, total) {
    const buttonText = document.getElementById('manual-btn-text');
    const manualBtn = document.getElementById('manual-btn');
    
    console.log('🔄 updateManualProgress 被调用:', { current, total, buttonText: !!buttonText, manualBtn: !!manualBtn });
    
    if (buttonText && manualBtn) {
        // 更新进度条
        const percentage = total > 0 ? (current / total) * 100 : 0;
        manualBtn.style.backgroundImage = `linear-gradient(to right, #3a8ffd ${percentage}%, transparent ${percentage}%)`;
        
        console.log('📊 进度条更新:', { percentage, backgroundImage: manualBtn.style.backgroundImage });
        
        // 更新按钮文本
        if (total > 0) {
            buttonText.textContent = `处理中 ${current}/${total}`;
        } else {
            buttonText.textContent = '处理中...';
        }
    } else {
        console.error('❌ updateManualProgress 找不到必要的DOM元素:', { buttonText: !!buttonText, manualBtn: !!manualBtn });
    }
}

function hideManualProgress() {
    const buttonText = document.getElementById('manual-btn-text');
    const manualBtn = document.getElementById('manual-btn');
    
    console.log('🏁 hideManualProgress 被调用:', { buttonText: !!buttonText, manualBtn: !!manualBtn });
    
    if (buttonText && manualBtn) {
        // 恢复按钮状态
        manualBtn.disabled = false;
        manualBtn.style.backgroundColor = ''; // 清除背景色
        manualBtn.style.backgroundImage = ''; // 清除进度条
        manualBtn.style.backgroundSize = '';
        manualBtn.style.backgroundRepeat = '';
        manualBtn.style.opacity = '';
        
        // 恢复按钮文本
        buttonText.textContent = '为选中图片生成注释';
        
        console.log('✅ 按钮状态已恢复');
    } else {
        console.error('❌ hideManualProgress 找不到必要的DOM元素:', { buttonText: !!buttonText, manualBtn: !!manualBtn });
    }
}

// ==================== 模板管理功能 ====================

// 默认模板
const DEFAULT_TEMPLATES = [
    {
        id: 'default-annotation',
        type: 'annotation',
        name: '默认注释模板',
        isDefault: true,
        prompt: '你是一位专业的数字资产管理员，你的任务是为 Eagle 素材库中的图片生成一段生动的描述和一组精确的关键词（标签），以实现高效的搜索和分类。\n\n请严格按照以下格式为我提供的图片生成内容：\n\n**描述：**\n[在这里用 2-3 句话生动地描述图片。内容应包括：画面的核心主体、整体风格、构图方式、色调与光影，以及传递出的氛围或情感。]\n\n**标签：**\n[在这里列出 10-15 个相关的关键词，用逗号「,」分隔。关键词应涵盖：\n- **核心对象/场景:** (例如: 猫, 城市, 森林, UI界面)\n- **风格流派:** (例如: 赛博朋克, 水彩, 扁平插画, 摄影, 3D渲染)\n- **构图/视角:** (例如: 特写, 远景, 对称, 俯视)\n- **颜色色调:** (例如: 蓝色, 暖色调, 高对比度, 莫兰迪色)\n- **氛围/情感:** (例如: 宁静, 活力, 神秘, 复古)\n- **用途/概念:** (例如: 网站背景, 角色参考, LOGO灵感, 海报设计)]\n\n---\n\n**这是一个优秀的范例：**\n\n**图片内容:** 一张赛博朋克风格的城市夜景插画，视角从低处仰望，街道上霓虹灯闪烁，空中有点缀的飞行器。\n**AI应输出:**\n**描述：**\n一张充满未来感的赛博朋克城市夜景插画。画面采用低角度仰视构图，突显了摩天大楼的宏伟。深蓝色与紫色的主色调中，穿插着明亮的粉色和青色霓虹灯，营造出一种神秘、繁华又略带迷幻的氛围。光影对比强烈，细节丰富，展现了一个科技高度发达的未来世界。\n**标签：**\n赛博朋克, 城市夜景, 插画, 未来科技, 霓虹灯, 街道, 摩天大楼, 飞行器, 紫色, 蓝色, 低角度, 科幻, 概念艺术, 游戏背景, 赛博美学'
    },
    {
        id: 'default-tag',
        type: 'tag',
        name: '默认标签模板',
        isDefault: true,
        prompt: '你是一位专业的数字资产管理员，你的任务是为图片匹配最合适的标签。\n\n请根据图片内容，从以下可用标签中选择最匹配的标签：\n\n可用标签：{availableTags}\n\n请严格按照以下要求：\n1. 只选择与图片内容高度相关的标签\n2. 每个标签用逗号分隔\n3. 不要添加可用标签列表中没有的标签\n4. 选择数量控制在3-8个标签之间\n5. 优先选择描述性强的标签\n\n请直接输出匹配的标签，用逗号分隔，不要添加其他说明文字。'
    },
    {
        id: 'default-rename',
        type: 'rename',
        name: '默认重命名模板',
        isDefault: true,
        prompt: '你是一位专业的数字资产管理员，你的任务是为 Eagle 素材库中的图片进行重命名，以实现高效的搜索和分类。\n\n请严格按照以下格式为我提供的图片生成内容：\n使用中文进行命名\n不含扩展名\n\n---\n\n例子：\n\n一二布布大电影.png'
    }
];

// 初始化默认模板
function initializeDefaultTemplates() {
    if (!pluginConfig.templates || pluginConfig.templates.length === 0) {
        pluginConfig.templates = [...DEFAULT_TEMPLATES];
        pluginConfig.activeTemplateIds = {
            annotation: 'default-annotation',
            tag: 'default-tag',
            rename: 'default-rename'
        };
        console.log('已初始化默认模板');
        saveConfiguration();
    }
}

// 创建新模板
function createTemplate(type, name, prompt) {
    const template = {
        id: generateTemplateId(),
        type: type,
        name: name || `新建${getTypeDisplayName(type)}模板`,
        isDefault: false,
        prompt: prompt || getDefaultPromptForType(type)
    };
    
    pluginConfig.templates.push(template);
    saveConfiguration();
    
    console.log('已创建新模板:', template);
    return template;
}

// 更新模板
function updateTemplate(id, updates) {
    const templateIndex = pluginConfig.templates.findIndex(t => t.id === id);
    if (templateIndex === -1) {
        throw new Error('模板不存在');
    }
    
    const template = pluginConfig.templates[templateIndex];
    Object.assign(template, updates);
    
    saveConfiguration();
    console.log('已更新模板:', template);
    return template;
}

// 删除模板
function deleteTemplate(id) {
    const templateIndex = pluginConfig.templates.findIndex(t => t.id === id);
    if (templateIndex === -1) {
        throw new Error('模板不存在');
    }
    
    const template = pluginConfig.templates[templateIndex];
    if (template.isDefault) {
        throw new Error('不能删除默认模板');
    }
    
    // 如果删除的是当前激活的模板，重置为默认模板
    if (pluginConfig.activeTemplateIds[template.type] === id) {
        const defaultTemplate = pluginConfig.templates.find(t => t.type === template.type && t.isDefault);
        if (defaultTemplate) {
            pluginConfig.activeTemplateIds[template.type] = defaultTemplate.id;
        } else {
            pluginConfig.activeTemplateIds[template.type] = '';
        }
    }
    
    pluginConfig.templates.splice(templateIndex, 1);
    saveConfiguration();
    
    console.log('已删除模板:', template);
    return true;
}

// 获取指定类型的模板
function getTemplatesByType(type) {
    return pluginConfig.templates.filter(t => t.type === type);
}

// 设置激活模板
function setActiveTemplate(type, id) {
    const template = pluginConfig.templates.find(t => t.id === id && t.type === type);
    if (!template) {
        throw new Error('模板不存在');
    }
    
    pluginConfig.activeTemplateIds[type] = id;
    saveConfiguration();
    
    console.log(`已设置${getTypeDisplayName(type)}模板为激活:`, template);
    return template;
}

// 获取激活模板
function getActiveTemplate(type) {
    const activeId = pluginConfig.activeTemplateIds[type];
    if (!activeId) return null;
    
    return pluginConfig.templates.find(t => t.id === activeId && t.type === type) || null;
}

// 生成模板ID
function generateTemplateId() {
    return 'template_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// 获取类型显示名称
function getTypeDisplayName(type) {
    const names = {
        annotation: '注释',
        tag: '标签',
        rename: '重命名'
    };
    return names[type] || type;
}

// 获取类型的默认提示词
function getDefaultPromptForType(type) {
    const prompts = {
        annotation: '描述这张图片...',
        tag: '为这张图片生成标签...',
        rename: '生成文件名...'
    };
    return prompts[type] || '';
}

// 模板管理UI状态
let templateUIState = {
    currentType: 'annotation',
    selectedTemplateId: null,
    hasUnsavedChanges: false
};

// 切换模板类型标签页
function switchTemplateTab(type) {
    if (!window.templateUIState) {
        window.templateUIState = {
            currentType: 'annotation',
            selectedTemplateId: null,
            hasUnsavedChanges: false
        };
    }
    
    window.templateUIState.currentType = type;
    
    // 更新标签页状态
    document.querySelectorAll('.template-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.type === type);
    });
    
    // 刷新模板列表
    renderTemplateList();
    
    // 清空编辑器
    clearTemplateEditor();
    
    // 自动选中第一个模板
    if (window.eagleAutoAnnotation) {
        const templates = window.eagleAutoAnnotation.getTemplatesByType(type);
        if (templates.length > 0) {
            selectTemplate(templates[0].id);
        }
    }
}

// 渲染模板列表
function renderTemplateList() {
    const templateList = document.getElementById('templateList');
    if (!templateList) return;
    
    const templates = window.eagleAutoAnnotation ? window.eagleAutoAnnotation.getTemplatesByType(window.templateUIState?.currentType || 'annotation') : [];
    const activeId = window.eagleAutoAnnotation ? window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[window.templateUIState?.currentType || 'annotation'] : '';
    
    templateList.innerHTML = '';
    
    if (templates.length === 0) {
        templateList.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <p>暂无${getTypeDisplayName(window.templateUIState?.currentType || 'annotation')}模板</p>
            </div>
        `;
        return;
    }
    
    templates.forEach(template => {
        const item = document.createElement('div');
        item.className = 'template-item';
        item.dataset.templateId = template.id;
        
        if (template.id === window.templateUIState?.selectedTemplateId) {
            item.classList.add('active');
        }
        
        item.innerHTML = `
            <div class="template-item-header">
                <div class="template-item-name">${template.name}</div>
                <div class="template-item-actions">
                    ${template.id === activeId ? '<div class="template-default-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>使用中</div>' : ''}
                    ${!template.isDefault ? `<button class="template-item-btn delete" onclick="deleteTemplateConfirm('${template.id}')" title="删除"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>` : ''}
                </div>
            </div>
        `;
        
        item.addEventListener('click', () => selectTemplate(template.id));
        templateList.appendChild(item);
    });
}

// 选择模板
function selectTemplate(templateId) {
    // 检查是否有未保存的更改
    if (window.templateUIState?.hasUnsavedChanges) {
        if (!confirm('您有未保存的更改，确定要切换模板吗？')) {
            return;
        }
    }
    
    if (!window.templateUIState) {
        window.templateUIState = {
            currentType: 'annotation',
            selectedTemplateId: null,
            hasUnsavedChanges: false
        };
    }
    
    window.templateUIState.selectedTemplateId = templateId;
    window.templateUIState.hasUnsavedChanges = false;
    
    // 更新列表选中状态
    document.querySelectorAll('.template-item').forEach(item => {
        item.classList.toggle('active', item.dataset.templateId === templateId);
    });
    
    // 加载模板到编辑器
    loadTemplateToEditor(templateId);
}

// 加载模板到编辑器
function loadTemplateToEditor(templateId) {
    if (!window.eagleAutoAnnotation || !window.eagleAutoAnnotation.pluginConfig) {
        console.warn('eagleAutoAnnotation 未初始化');
        return;
    }
    
    const template = window.eagleAutoAnnotation.pluginConfig.templates.find(t => t.id === templateId);
    if (!template) return;
    
    const editor = document.getElementById('templateEditor');
    if (!editor) return;
    
    const activeId = window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[template.type];
    const isActive = template.id === activeId;
    
    editor.innerHTML = `
        <div class="template-editor-content">
            <div class="template-editor-header">
                <div class="template-editor-title">编辑模板</div>
                <div class="template-editor-actions">
                    <button class="btn-icon" onclick="toggleTemplateDefault('${template.id}')" title="${isActive ? '取消默认' : '设为默认'}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isActive ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    </button>
                    <button class="btn-icon" onclick="saveCurrentTemplate()" title="保存" id="saveTemplateBtn" disabled>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21v-8H7v8"></polyline>
                            <polyline points="7 3v5h8"></polyline>
                        </svg>
                    </button>
                    ${!template.isDefault ? `<button class="btn-icon" onclick="deleteTemplateConfirm('${template.id}')" title="删除" style="color: #ef4444;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2 2h4a2 2 0 0 1 2 2v2"></path></svg></button>` : ''}
                </div>
            </div>
            <div class="template-editor-body">
                <div class="template-form-group">
                    <label class="template-form-label">模板名称</label>
                    <input type="text" class="template-form-input" id="templateNameInput" value="${template.name}" onchange="markTemplateAsChanged()">
                </div>
                <div class="template-form-group">
                    <label class="template-form-label">${getTypeDisplayName(template.type)}提示词</label>
                    <textarea class="template-form-textarea" id="templatePromptInput" onchange="markTemplateAsChanged()">${template.prompt}</textarea>
                </div>
                <!--<div class="template-preview">
                    <div class="template-preview-title">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        效果预览
                    </div>
                    <div class="template-preview-content">
                        ${getPreviewContent(template.type)}
                    </div>
                </div>-->
            </div>
        </div>
    `;
}

// 获取预览内容
function getPreviewContent(type) {
    switch (type) {
        case 'annotation':
            return '<div style="font-style: italic; color: #64748b;">一张充满未来感的赛博朋克城市夜景插画。画面采用低角度仰视构图，突显了摩天大楼的宏伟...</div>';
        case 'tag':
            return '<div class="template-preview-tags"><span class="template-preview-tag">风景</span><span class="template-preview-tag">山脉</span><span class="template-preview-tag">雪景</span><span class="template-preview-tag">日落</span><span class="template-preview-tag">森林</span></div>';
        case 'rename':
            return '<div class="template-preview-filename"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>mountain_landscape_sunset.jpg</div>';
        default:
            return '';
    }
}

// 清空编辑器
function clearTemplateEditor() {
    const editor = document.getElementById('templateEditor');
    if (!editor) return;
    
    editor.innerHTML = `
        <div class="template-editor-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <p>请选择一个模板进行编辑</p>
        </div>
    `;
    
    if (!window.templateUIState) {
        window.templateUIState = {
            currentType: 'annotation',
            selectedTemplateId: null,
            hasUnsavedChanges: false
        };
    }
    
    window.templateUIState.selectedTemplateId = null;
    window.templateUIState.hasUnsavedChanges = false;
}

// 创建新模板
function createNewTemplate() {
    const type = window.templateUIState?.currentType || 'annotation';
    
    if (!window.eagleAutoAnnotation) {
        console.warn('eagleAutoAnnotation 未初始化');
        return;
    }
    
    const template = window.eagleAutoAnnotation.createTemplate(type);
    
    // 刷新列表并选中新模板
    renderTemplateList();
    selectTemplate(template.id);
    
    // 更新工作台的模板选择器
    if (window.updateTemplateSelectors) {
        window.updateTemplateSelectors();
    } else if (typeof updateTemplateSelectors === 'function') {
        updateTemplateSelectors();
    }
    
    // 聚焦到名称输入框
    setTimeout(() => {
        const nameInput = document.getElementById('templateNameInput');
        if (nameInput) {
            nameInput.select();
        }
    }, 100);
}

// 标记模板已更改
function markTemplateAsChanged() {
    templateUIState.hasUnsavedChanges = true;
    
    const saveBtn = document.getElementById('saveTemplateBtn');
    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.style.color = '#3b82f6';
    }
}

// 保存当前模板
function saveCurrentTemplate() {
    if (!window.templateUIState?.selectedTemplateId) return;
    
    const nameInput = document.getElementById('templateNameInput');
    const promptInput = document.getElementById('templatePromptInput');
    
    if (!nameInput || !promptInput) return;
    
    const name = nameInput.value.trim();
    const prompt = promptInput.value.trim();
    
    if (!name) {
        if (window.showNotification) {
            window.showNotification('模板名称不能为空', 'warning');
        }
        return;
    }
    
    if (!prompt) {
        if (window.showNotification) {
            window.showNotification('提示词不能为空', 'warning');
        }
        return;
    }
    
    try {
        if (window.eagleAutoAnnotation) {
            window.eagleAutoAnnotation.updateTemplate(window.templateUIState.selectedTemplateId, { name, prompt });
            window.templateUIState.hasUnsavedChanges = false;
            
            const saveBtn = document.getElementById('saveTemplateBtn');
            if (saveBtn) {
                saveBtn.disabled = true;
                saveBtn.style.color = '';
            }
            
            // 刷新列表
            renderTemplateList();
            
            // 更新工作台的模板选择器
            if (window.updateTemplateSelectors) {
                window.updateTemplateSelectors();
            } else if (typeof updateTemplateSelectors === 'function') {
                updateTemplateSelectors();
            }
            
            if (window.showNotification) {
                window.showNotification('模板已保存', 'success');
            }
        }
    } catch (error) {
        if (window.showNotification) {
            window.showNotification('保存失败: ' + error.message, 'error');
        }
    }
}

// 切换模板默认状态
function toggleTemplateDefault(templateId) {
    if (!window.eagleAutoAnnotation) {
        console.warn('eagleAutoAnnotation 未初始化');
        return;
    }
    
    const template = window.eagleAutoAnnotation.pluginConfig.templates.find(t => t.id === templateId);
    if (!template) return;
    
    const currentActiveId = window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[template.type];
    
    if (currentActiveId === templateId) {
        // 取消默认
        window.eagleAutoAnnotation.pluginConfig.activeTemplateIds[template.type] = '';
        if (window.showNotification) {
            window.showNotification('已取消默认模板', 'success');
        }
    } else {
        // 设为默认
        window.eagleAutoAnnotation.setActiveTemplate(template.type, templateId);
        if (window.showNotification) {
            window.showNotification('已设为默认模板', 'success');
        }
    }
    
    // 刷新列表和编辑器
    renderTemplateList();
    loadTemplateToEditor(templateId);
    
    // 更新工作台的模板选择器
    if (window.updateTemplateSelectors) {
        window.updateTemplateSelectors();
    } else if (typeof updateTemplateSelectors === 'function') {
        updateTemplateSelectors();
    }
}

// 删除模板确认
function deleteTemplateConfirm(templateId) {
    if (!window.eagleAutoAnnotation) {
        console.warn('eagleAutoAnnotation 未初始化');
        return;
    }
    
    const template = window.eagleAutoAnnotation.pluginConfig.templates.find(t => t.id === templateId);
    if (!template) return;
    
    if (confirm(`确定要删除模板"${template.name}"吗？`)) {
        try {
            window.eagleAutoAnnotation.deleteTemplate(templateId);
            renderTemplateList();
            clearTemplateEditor();
            
            // 更新工作台的模板选择器
            if (window.updateTemplateSelectors) {
                window.updateTemplateSelectors();
            } else if (typeof updateTemplateSelectors === 'function') {
                updateTemplateSelectors();
            }
            
            if (window.showNotification) {
                window.showNotification('模板已删除', 'success');
            }
        } catch (error) {
            if (window.showNotification) {
                window.showNotification('删除失败: ' + error.message, 'error');
            }
        }
    }
}

// 初始化模板管理UI
function initializeTemplateUI() {
    if (window.eagleAutoAnnotation) {
        window.eagleAutoAnnotation.initializeDefaultTemplates();
    }
    
    // 设置默认选中的标签页
    switchTemplateTab('annotation');
    
    // 更新工作台的模板选择器
    if (window.eagleAutoAnnotation && window.eagleAutoAnnotation.updateTemplateSelectors) {
        window.eagleAutoAnnotation.updateTemplateSelectors();
    }
}


// 在插件初始化时调用
eagle.onPluginCreate(() => {
    console.log('插件已创建');
    initializePlugin();
    
    // 延迟初始化模板UI，确保DOM已加载
    setTimeout(() => {
        initializeTemplateUI();
    }, 200);
});
// 显示开发中提示
function showComingSoonNotification(feature) {
    if (window.showNotification) {
        window.showNotification(`${feature}功能开发中，敬请期待下个版本！`, 'info');
    }
}

// 立即将函数添加到全局作用域
window.showComingSoonNotification = showComingSoonNotification;
// 导航到使用统计
function navigateToUsageStats() {
    // 切换到设置页面
    if (typeof switchTab === 'function') {
        switchTab('settings');
    } else if (window.switchTab) {
        window.switchTab('settings');
    }
    
    // 延迟一下让页面切换完成，然后滚动到使用统计区域
    setTimeout(() => {
        // 查找使用统计标题
        const allH3 = document.querySelectorAll('.settings-section h3');
        let statsSection = null;
        
        for (const h3 of allH3) {
            if (h3.textContent.includes('使用统计')) {
                statsSection = h3.closest('.settings-section');
                break;
            }
        }
        
        if (statsSection) {
            // 添加高亮类
            statsSection.classList.add('highlight');
            
            // 滚动到该区域
            statsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center'
            });
            
            // 2秒后移除高亮类
            setTimeout(() => {
                statsSection.classList.remove('highlight');
            }, 2000);
        } else {
            console.warn('未找到使用统计区域');
        }
    }, 200);
}

// 立即将函数添加到全局作用域
window.navigateToUsageStats = navigateToUsageStats;