/*
 * UI 管理模块
 * 负责界面交互和状态更新
 */

console.log('UI Manager v2.0.0 已加载');

// UI 状态
const uiState = {
    activeTab: 'dashboard',
    currentPage: 0,
    itemsPerPage: 4,
    images: [],
    processing: false
};

// 初始化 UI
function initializeUI() {
    console.log('初始化 UI...');
    
    // 检查 API 配置
    checkAPIConfigurationUI();
    
    // 标签页切换
    setupTabSwitching();
    
    // 功能开关
    setupFeatureToggles();
    
    // 分页控制
    setupPagination();
    
    // 自动模式开关
    setupAutoMode();
    
    // 加载配置到 UI
    loadConfigToUI();
    
    // 加载统计数据
    if (window.eagleAutoAnnotation) {
        window.eagleAutoAnnotation.updateTokenUsageUI();
        // 更新模板选择器
        if (typeof window.updateTemplateSelectors === 'function') {
            window.updateTemplateSelectors();
        }
    }
    
    // 刷新图片列表
    refreshImageList();
    
    // 初始化端侧 AI 区域状态
    setTimeout(() => initLocalAISection(), 200);
    
    console.log('UI 初始化完成');
}

// 检查 API 配置状态
// 检查 API 配置状态（现在改为检查本地模型是否已安装）
function checkAPIConfigurationUI() {
    const apiWarning = document.getElementById('apiWarning');
    if (!apiWarning) return;
    // 本地模型未安装时显示提示
    const modelInstalled = typeof checkModelExists === 'function' && checkModelExists();
    apiWarning.style.display = modelInstalled ? 'none' : 'flex';
}

// 标签页切换
function setupTabSwitching() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    // 更新标签页状态
    document.querySelectorAll('.tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabName);
    });
    
    // 更新内容区域
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === tabName);
    });
    
    uiState.activeTab = tabName;
    
    // 如果切换到设置页面,刷新统计数据
    if (tabName === 'settings' && window.eagleAutoAnnotation) {
        window.eagleAutoAnnotation.updateTokenUsageUI();
    }
    
    // 如果切换到模板管理页面,初始化模板UI
    if (tabName === 'templates' && window.switchTemplateTab) {
        setTimeout(() => {
            window.switchTemplateTab('annotation');
        }, 100);
    }
}

// 功能开关
function setupFeatureToggles() {
    const toggles = {
        'enable-annotation': 'annotation',
        'enable-tag': 'tag',
        'enable-rename': 'rename'
    };
    
    Object.entries(toggles).forEach(([id, feature]) => {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                const row = document.querySelector(`.control-row[data-feature="${feature}"]`);
                if (row) {
                    row.classList.toggle('active', e.target.checked);
                }
            });
        }
    });
}

// 分页控制
function setupPagination() {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (uiState.currentPage > 0) {
                uiState.currentPage--;
                renderImageGrid();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(uiState.images.length / uiState.itemsPerPage);
            if (uiState.currentPage < totalPages - 1) {
                uiState.currentPage++;
                renderImageGrid();
            }
        });
    }
}

// 自动模式开关
function setupAutoMode() {
    const autoToggle = document.getElementById('autoModeToggle');
    if (autoToggle && window.eagleAutoAnnotation) {
        // 加载保存的状态
        autoToggle.checked = window.eagleAutoAnnotation.pluginState.settings.autoAnnotation || false;
        
        autoToggle.addEventListener('change', (e) => {
            window.eagleAutoAnnotation.pluginState.settings.autoAnnotation = e.target.checked;
            window.eagleAutoAnnotation.saveConfiguration();
            
            showNotification(
                e.target.checked ? '自动模式已开启' : '自动模式已关闭',
                'success'
            );
        });
    }
}

// 刷新图片列表
async function refreshImageList() {
    try {
        const selectedImages = await eagle.item.getSelected();
        uiState.images = selectedImages || [];
        
        // 更新计数（两个位置）
        const countElement = document.getElementById('imageCount');
        const previewCountElement = document.getElementById('previewCount');
        const statusTextElement = document.getElementById('imageStatusText');
        
        if (countElement) {
            countElement.textContent = uiState.images.length;
        }
        if (previewCountElement) {
            previewCountElement.textContent = uiState.images.length;
        }
        
        // 更新状态文案
        if (statusTextElement) {
            if (uiState.images.length === 0) {
                statusTextElement.textContent = '请在eagle中至少选择一张图片';
            } else {
                statusTextElement.textContent = '';
            }
        }
        
        // 渲染网格
        renderImageGrid();
        
        // 更新状态图标
        updateStatusIcon();
        
    } catch (error) {
        console.error('刷新图片列表失败:', error);
        uiState.images = [];
        renderImageGrid();
        updateStatusIcon();
    }
}

// 渲染图片网格
function renderImageGrid() {
    const grid = document.getElementById('imageGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const start = uiState.currentPage * uiState.itemsPerPage;
    const end = start + uiState.itemsPerPage;
    const pageImages = uiState.images.slice(start, end);
    
    if (pageImages.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>请在 Eagle 中选择图片</p>
            </div>
        `;
        return;
    }
    
    pageImages.forEach(image => {
        const item = document.createElement('div');
        item.className = 'image-item';
        item.dataset.imageId = image.id;
        
        const statusText = getImageStatusText(image);
        const statusClass = getImageStatusClass(image);
        
        if (statusClass) {
            item.classList.add(statusClass);
        }
        
        item.innerHTML = `
            <div class="image-preview">
                <img src="${image.thumbnailURL || image.fileURL}" alt="${image.name}" loading="lazy">
            </div>
            <div class="image-info">
                <div class="image-name" title="${image.name}">${image.name}</div>
                <div class="image-status">${statusText}</div>
            </div>
        `;
        
        grid.appendChild(item);
    });
    
    // 更新分页信息
    updatePaginationInfo();
    
    // 更新状态图标为缩略图
    updateStatusIcon();
}

// 获取图片状态文本
function getImageStatusText(image) {
    if (image.annotation) {
        return '已有注释';
    }
    return '等待处理';
}

// 获取图片状态类名
function getImageStatusClass(image) {
    if (image.annotation) {
        return 'done';
    }
    return '';
}

// 更新分页信息
function updatePaginationInfo() {
    const totalPages = Math.ceil(uiState.images.length / uiState.itemsPerPage);
    const pageInfo = document.getElementById('pageInfo');
    
    if (pageInfo) {
        pageInfo.textContent = `${uiState.currentPage + 1} / ${Math.max(1, totalPages)}`;
    }
    
    // 更新按钮状态
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    if (prevBtn) {
        prevBtn.disabled = uiState.currentPage === 0;
        prevBtn.style.opacity = uiState.currentPage === 0 ? '0.3' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = uiState.currentPage >= totalPages - 1;
        nextBtn.style.opacity = uiState.currentPage >= totalPages - 1 ? '0.3' : '1';
    }
}

// 开始处理
async function handleStartProcessing() {
    if (uiState.processing) {
        showNotification('正在处理中,请稍候...', 'warning');
        return;
    }
    
    if (!window.eagleAutoAnnotation) {
        showNotification('插件核心模块未加载', 'error');
        return;
    }

    // 检查本地模型是否已安装
    if (typeof checkModelExists === 'function' && !checkModelExists()) {
        showNotification('请先到设置页面安装本地模型', 'warning');
        return;
    }
    
    // 检查是否有启用的功能
    const enableAnnotation = document.getElementById('enable-annotation')?.checked;
    const enableTag = document.getElementById('enable-tag')?.checked;
    const enableRename = document.getElementById('enable-rename')?.checked;
    
    if (!enableAnnotation && !enableTag && !enableRename) {
        showNotification('请至少启用一个功能', 'warning');
        return;
    }
    
    // 检查是否有选中的图片
    if (uiState.images.length === 0) {
        showNotification('请先在 Eagle 中选择图片', 'warning');
        return;
    }
    
    try {
        uiState.processing = true;
        
        // 显示进度条
        showProgress();
        
        // 更新按钮状态
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
                处理中...
            `;
        }
        
        // 调用处理函数
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < uiState.images.length; i++) {
            const image = uiState.images[i];
            
            // 更新进度
            updateProgress(i + 1, uiState.images.length);
            
            try {
                // 这里调用实际的 AI 处理逻辑
                // 由于需要集成现有的 plugin.js 逻辑,这里先模拟
                await processImageWithAI(image, {
                    annotation: enableAnnotation,
                    tag: enableTag,
                    rename: enableRename
                });
                
                successCount++;
                
                // 更新图片状态
                updateImageStatus(image.id, 'done');
                
            } catch (error) {
                console.error('处理图片失败:', image.name, error);
                errorCount++;
                updateImageStatus(image.id, 'error');
            }
            
            // 添加延迟避免 API 限流
            if (i < uiState.images.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        // 显示结果
        let message = `处理完成! 成功: ${successCount} 张`;
        if (errorCount > 0) {
            message += `, 失败: ${errorCount} 张`;
        }
        
        showNotification(message, errorCount > 0 ? 'warning' : 'success');
        
    } catch (error) {
        console.error('处理过程出错:', error);
        showNotification('处理失败: ' + error.message, 'error');
    } finally {
        uiState.processing = false;
        hideProgress();
        
        // 恢复按钮状态
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                开始处理
            `;
        }
        
        // 刷新图片列表
        await refreshImageList();
    }
}

// 处理单张图片 (集成现有逻辑)
async function processImageWithAI(image, options) {
    if (!window.eagleAutoAnnotation) {
        throw new Error('插件核心模块未加载');
    }
    
    const {
        generateImageAnnotation, addAnnotationToImage,
        generateImageTags, addTagsToImage,
        generateImageRename, renameImage
    } = window.eagleAutoAnnotation;
    
    // 生成注释
    if (options.annotation) {
        const annotation = await generateImageAnnotation(image);
        if (annotation) {
            await addAnnotationToImage(image, annotation);
        }
    }

    // 生成标签
    if (options.tag) {
        const tags = await generateImageTags(image);
        if (tags && tags.length > 0) {
            await addTagsToImage(image, tags);
        }
    }

    // 重命名
    if (options.rename) {
        const newName = await generateImageRename(image);
        if (newName) {
            await renameImage(image, newName);
        }
    }
}

// 更新图片状态
function updateImageStatus(imageId, status) {
    const imageItem = document.querySelector(`[data-image-id="${imageId}"]`);
    if (!imageItem) return;
    
    // 移除所有状态类
    imageItem.classList.remove('processing', 'done', 'error');
    
    // 添加新状态类
    if (status) {
        imageItem.classList.add(status);
    }
    
    // 更新状态文本
    const statusElement = imageItem.querySelector('.image-status');
    if (statusElement) {
        const statusTexts = {
            'processing': '处理中...',
            'done': '处理完成',
            'error': '处理失败'
        };
        statusElement.textContent = statusTexts[status] || '等待处理';
    }
}

// 显示进度条
function showProgress() {
    const progressSection = document.getElementById('progressSection');
    if (progressSection) {
        progressSection.style.display = 'block';
    }
}

// 更新进度
function updateProgress(current, total) {
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    const progressFill = document.getElementById('progressFill');
    
    const percentage = Math.round((current / total) * 100);
    
    if (progressText) {
        progressText.textContent = `正在处理 ${current} / ${total}`;
    }
    
    if (progressPercent) {
        progressPercent.textContent = `${percentage}%`;
    }
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
}

// 隐藏进度条
function hideProgress() {
    const progressSection = document.getElementById('progressSection');
    if (progressSection) {
        progressSection.style.display = 'none';
    }
    
    // 重置进度
    updateProgress(0, 0);
}

// 显示通知
function showNotification(message, type = 'info') {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 加载配置到 UI
function loadConfigToUI() {
    if (!window.eagleAutoAnnotation) return;
    
    const { pluginConfig, pluginState, aiProviders } = window.eagleAutoAnnotation;
    
    // 加载服务商
    const providerSelect = document.getElementById('provider');
    if (providerSelect) {
        providerSelect.value = pluginConfig.provider;
        handleProviderChange();
    }
    
    // 加载 API Key
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput) {
        apiKeyInput.value = pluginConfig.apiKeys[pluginConfig.provider] || '';
    }
    
    // 加载最大 Token
    const maxTokensInput = document.getElementById('maxTokens');
    if (maxTokensInput) {
        maxTokensInput.value = pluginConfig.maxTokens || 200;
    }
    
    // 加载处理偏好
    const skipExisting = document.getElementById('skipExisting');
    if (skipExisting) {
        skipExisting.checked = pluginState.settings.skipExistingAnnotations !== false;
    }
    
    const skipProcessed = document.getElementById('skipProcessed');
    if (skipProcessed) {
        skipProcessed.checked = pluginState.settings.skipProcessedImages !== false;
    }
}

// 处理服务商变更
function handleProviderChange() {
    if (!window.eagleAutoAnnotation) return;
    
    const { pluginConfig, aiProviders } = window.eagleAutoAnnotation;
    const providerSelect = document.getElementById('provider');
    const modelSelect = document.getElementById('model');
    const apiKeyInput = document.getElementById('apiKey');
    
    if (!providerSelect || !modelSelect) return;
    
    const provider = providerSelect.value;
    const providerInfo = aiProviders[provider];
    
    if (!providerInfo) return;
    
    // 更新模型列表
    modelSelect.innerHTML = '';
    providerInfo.models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.value;
        option.textContent = model.label;
        if (model.description) {
            option.title = model.description;
        }
        modelSelect.appendChild(option);
    });
    
    // 设置当前模型
    if (pluginConfig.models[provider]) {
        modelSelect.value = pluginConfig.models[provider];
    }
    
    // 加载对应的 API Key
    if (apiKeyInput) {
        apiKeyInput.value = pluginConfig.apiKeys[provider] || '';
    }
}

// 保存设置
function saveSettings() {
    if (!window.eagleAutoAnnotation) {
        showNotification('插件核心模块未加载', 'error');
        return;
    }
    
    const { pluginConfig, pluginState } = window.eagleAutoAnnotation;
    
    // 保存服务商配置
    const provider = document.getElementById('provider')?.value;
    const apiKey = document.getElementById('apiKey')?.value;
    const model = document.getElementById('model')?.value;
    const maxTokens = parseInt(document.getElementById('maxTokens')?.value || '200');
    
    if (provider) {
        pluginConfig.provider = provider;
    }
    
    if (apiKey) {
        pluginConfig.apiKeys[provider] = apiKey;
        pluginState.settings.apiConfigured = true;
    }
    
    if (model) {
        pluginConfig.models[provider] = model;
    }
    
    pluginConfig.maxTokens = maxTokens;
    
    // 保存处理偏好
    pluginState.settings.skipExistingAnnotations = document.getElementById('skipExisting')?.checked !== false;
    pluginState.settings.skipProcessedImages = document.getElementById('skipProcessed')?.checked !== false;
    
    // 调用保存函数
    window.eagleAutoAnnotation.saveConfiguration();
    
    showNotification('设置已保存', 'success');
}

// 重置设置
function resetSettings() {
    if (!window.eagleAutoAnnotation) return;
    
    if (confirm('确定要重置所有设置吗?这将清除所有配置和统计数据。')) {
        window.eagleAutoAnnotation.resetToDefaultConfig();
        loadConfigToUI();
        window.eagleAutoAnnotation.updateTokenUsageUI();
        showNotification('设置已重置', 'success');
    }
}

// 测试 API 连接
async function testAPIConnection() {
    if (!window.eagleAutoAnnotation) {
        showNotification('插件核心模块未加载', 'error');
        return;
    }
    
    // 先保存当前设置
    saveSettings();
    
    try {
        showNotification('正在测试连接...', 'info');
        await window.eagleAutoAnnotation.testAPIConnection();
        showNotification('API 连接测试成功!', 'success');
    } catch (error) {
        console.error('API 测试失败:', error);
        showNotification('API 连接测试失败: ' + error.message, 'error');
    }
}

// 预览模板
function previewTemplate(type) {
    if (!window.eagleAutoAnnotation) {
        showNotification('插件核心模块未加载', 'error');
        return;
    }
    
    const { getActiveTemplate } = window.eagleAutoAnnotation;
    const template = getActiveTemplate(type);
    
    if (!template) {
        showNotification(`没有激活的${getTypeDisplayName(type)}模板`, 'warning');
        return;
    }
    
    // 创建预览弹窗
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    `;
    
    content.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; font-size: 18px; color: #1e293b;">模板预览 - ${template.name}</h3>
            <button onclick="this.closest('[style*=fixed]').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #64748b;">&times;</button>
        </div>
        <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; font-weight: 500; color: #374151; margin-bottom: 8px;">提示词内容</label>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-family: monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; max-height: 300px; overflow-y: auto;">${template.prompt}</div>
        </div>
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <div style="font-size: 12px; font-weight: 600; color: #0369a1; margin-bottom: 8px;">💡 使用提示</div>
            <div style="font-size: 13px; color: #0c4a6e; line-height: 1.5;">
                ${getTemplateUsageTip(type)}
            </div>
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 12px;">
            <button onclick="this.closest('[style*=fixed]').remove()" style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; color: #374151; border-radius: 6px; cursor: pointer; font-size: 14px;">关闭</button>
            <button onclick="editTemplate('${type}', '${template.id}'); this.closest('[style*=fixed]').remove();" style="padding: 8px 16px; border: none; background: #3b82f6; color: white; border-radius: 6px; cursor: pointer; font-size: 14px;">编辑模板</button>
        </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function getTypeDisplayName(type) {
    const names = {
        annotation: '注释',
        tag: '标签',
        rename: '重命名'
    };
    return names[type] || type;
}

function getTemplateUsageTip(type) {
    const tips = {
        annotation: '此模板将用于生成图片的描述性注释，帮助您更好地管理和搜索图片。',
        tag: '此模板将用于生成图片的标签，可以包含风格、颜色、主题等关键词。',
        rename: '此模板将用于根据图片内容生成新的文件名，建议使用英文或拼音。'
    };
    return tips[type] || '';
}

// 添加旋转动画
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Eagle 插件生命周期
eagle.onPluginCreate(() => {
    console.log('插件已创建');
    initializeUI();
});

eagle.onPluginShow(() => {
    console.log('插件显示');
    refreshImageList();
});

// 更新状态图标为缩略图
function updateStatusIcon() {
    const container = document.getElementById('statusIconContainer');
    if (!container) return;
    
    const images = uiState.images;
    
    if (images.length === 0) {
        // 显示默认图标
        container.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
        `;
        container.className = 'status-icon';
    } else {
        // 显示缩略图堆叠效果，最多显示3张，最后选择的在最上面
        const displayImages = images.slice(-3).reverse();
        container.innerHTML = displayImages.map((img, index) => {
            const size = 44 - index * 2; // 最上面的图片最小
            const rotation = index === 0 ? 0 : (index - 1) * 8 + 8; // 最上面的图片不旋转
            return `
                <img src="${img.thumbnailURL || img.fileURL}" 
                     alt="${img.name}" 
                     class="status-thumbnail" 
                     style="z-index: ${displayImages.length - index}; transform: rotate(${rotation}deg); width: ${size}px; height: ${size}px; margin-left: ${-size/2}px; margin-top: ${-size/2}px;">
            `;
        }).join('');
        container.className = 'status-icon has-images';
    }
}

// 导出函数供全局使用
window.handleStartProcessing = handleStartProcessing;
window.handleProviderChange = handleProviderChange;
window.saveSettings = saveSettings;
window.resetSettings = resetSettings;
window.testAPIConnection = testAPIConnection;
window.previewTemplate = previewTemplate;
window.refreshImageList = refreshImageList;
window.navigateToAPISettings = navigateToAPISettings;
window.checkAPIConfigurationUI = checkAPIConfigurationUI;

// 导航到 API 设置并高亮
function navigateToAPISettings() {
    // 切换到设置页面
    switchTab('settings');
    
    // 延迟一下让页面切换完成
    setTimeout(() => {
        const aiConfigSection = document.getElementById('aiConfigSection');
        if (aiConfigSection) {
            // 添加高亮类
            aiConfigSection.classList.add('highlight');
            
            // 滚动到该区域
            aiConfigSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // 2次动画后移除高亮类（每次2秒，共4秒）
            setTimeout(() => {
                aiConfigSection.classList.remove('highlight');
            }, 4000);
        }
    }, 100);
}

console.log('UI Manager 初始化完成');
// 编辑模板
function editTemplate(type, templateId) {
    // 切换到模板管理页面
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
        
        // 再延迟一下选中对应的模板
        setTimeout(() => {
            if (window.selectTemplate) {
                window.selectTemplate(templateId);
            }
        }, 200);
    }, 100);
}

// 导出函数供全局使用
window.editTemplate = editTemplate;
// 带动画的刷新图片列表
async function refreshImageListWithAnimation(button) {
    // 添加旋转动画
    button.classList.add('refreshing');
    button.disabled = true;
    
    try {
        await refreshImageList();
        
    } catch (error) {
        console.error('刷新失败:', error);
        if (window.showNotification) {
            window.showNotification('刷新失败，请重试', 'error');
        }
    } finally {
        // 移除动画并恢复按钮
        setTimeout(() => {
            button.classList.remove('refreshing');
            button.disabled = false;
        }, 500); // 延迟一下让用户看到动画效果
    }
}

// 导出函数供全局使用
window.refreshImageListWithAnimation = refreshImageListWithAnimation;


// ==================== 本地模型管理 ====================

// 进程状态
let localAIProcess = null;
let localAIRunning = false;
let localAIStartTime = null;       // 本次启动时间
let localAIUptimeTimer = null;     // 运行时长定时器
let localAIRunStatus = 'idle';     // idle | starting | running | failed
let localAIFailReason = '';        // 失败原因
let localAIDetailVisible = false;  // 详情面板是否展开
let localAITerminalVisible = false;// 日志是否展开

// 下载状态
const dlState = {
    status: 'idle',       // idle | downloading | paused | unzipping | done | unzip_failed
    downloaded: 0,
    total: 0,
    startTime: 0,
    startBytes: 0,
    request: null,
    fileStream: null,
};

const MODEL_URL = 'https://www.aidevhome.com/data/adh2/models/suggested/qwen2.5vl3b-8380-2.42.zip';
const MODEL_ZIP_NAME = 'qwen2.5vl3b-8380-2.42.zip';
const MODEL_DIR_NAME = 'qwen2.5vl3b';
const PROGRESS_KEY = 'localAI_dl_progress';
const INSTALL_TIME_KEY = 'localAI_install_time';

// ---- 工具函数 ----
function getPluginPath() {
    return window.eaglePlugin ? window.eaglePlugin.path : '';
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
}

function formatSeconds(sec) {
    if (!isFinite(sec) || sec <= 0) return '--';
    if (sec < 60) return Math.ceil(sec) + ' 秒';
    if (sec < 3600) return Math.ceil(sec / 60) + ' 分钟';
    return (sec / 3600).toFixed(1) + ' 小时';
}

function formatDuration(ms) {
    const s = Math.floor(ms / 1000);
    if (s < 60) return s + ' 秒';
    const m = Math.floor(s / 60);
    if (m < 60) return m + ' 分 ' + (s % 60) + ' 秒';
    return Math.floor(m / 60) + ' 时 ' + (m % 60) + ' 分';
}

// ---- 进度 UI ----
function showProgressArea(show) {
    const el = document.getElementById('modelProgressArea');
    if (el) el.style.display = show ? 'block' : 'none';
}

function setProgressBar(percent) {
    const fill = document.getElementById('modelProgressFill');
    const pct = document.getElementById('modelProgressPercent');
    if (fill) fill.style.width = percent + '%';
    if (pct) pct.textContent = percent.toFixed(1) + '%';
}

function setProgressLabel(text) {
    const el = document.getElementById('modelProgressLabel');
    if (el) el.textContent = text;
}

function setProgressMeta(text) {
    const el = document.getElementById('modelProgressMeta');
    if (el) el.textContent = text;
}

function showUnzipWarning(show) {
    const el = document.getElementById('unzipWarning');
    if (el) el.style.display = show ? 'flex' : 'none';
}

// ---- 下载按钮状态 ----
function setDownloadBtn(state) {
    const btn = document.getElementById('downloadModelBtn');
    const cancelBtn = document.getElementById('cancelDownloadBtn');
    const importBtn = document.getElementById('importModelBtn');
    if (!btn) return;

    btn.disabled = false;
    btn.classList.remove('delete-mode');

    const icons = {
        download: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
        pause:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
        resume:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
        unzipping:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path></svg>`,
        delete:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>`,
        reUnzip:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path></svg>`,
    };

    const labels = {
        download: '下载',
        pause:    '暂停',
        resume:   '继续',
        unzipping:'解压中',
        delete:   '删除',
        reUnzip:  '重新解压',
    };

    btn.innerHTML = (icons[state] || '') + `<span id="downloadModelBtnText">${labels[state] || state}</span>`;

    if (state === 'unzipping') btn.disabled = true;
    if (state === 'delete') btn.classList.add('delete-mode');

    // 取消按钮：下载中或暂停时显示
    if (cancelBtn) {
        cancelBtn.style.display = (state === 'pause' || state === 'resume') ? 'inline-flex' : 'none';
    }
    // 导入按钮：仅 idle 时显示
    if (importBtn) {
        importBtn.style.display = (state === 'download') ? 'inline-flex' : 'none';
    }
}

// ---- 查看状态按钮显隐 ----
function setViewStatusBtnVisible(show) {
    const btn = document.getElementById('viewStatusBtn');
    if (btn) btn.style.display = show ? 'inline-flex' : 'none';
}

// ---- 已安装 tag ----
function setInstalledTagVisible(show) {
    const el = document.getElementById('lmTagInstalled');
    if (el) el.style.display = show ? 'inline-flex' : 'none';
}

// ---- 运行状态 tag ----
// status: 'idle'|'starting'|'running'|'failed'
function setRunStatusTag(status, failReason) {
    const el = document.getElementById('lmTagStatus');
    if (!el) return;

    const map = {
        idle:     { text: '未启动', cls: '' },
        starting: { text: '正在启动', cls: '' },
        running:  { text: '运行中', cls: '' },
        failed:   { text: '运行失败', cls: 'failed' },
    };

    const info = map[status] || map.idle;
    el.textContent = info.text;
    el.className = 'lm-tag lm-tag-status' + (info.cls ? ' ' + info.cls : '');

    // idle 也显示，只是样式不同
    el.style.display = 'inline-flex';
}

// ---- 详情面板数据更新 ----
function updateDetailPanel() {
    const path = require('path');
    const fs = require('fs');
    const pluginPath = getPluginPath();
    const modelDir = path.join(pluginPath, MODEL_DIR_NAME);

    // 安装路径（可点击打开文件夹）
    const pathEl = document.getElementById('lmDetailPath');
    if (pathEl) {
        pathEl.textContent = modelDir;
        pathEl.style.cursor = 'pointer';
        pathEl.title = '点击打开文件夹';
        pathEl.onclick = () => {
            try {
                const { exec } = require('child_process');
                exec(`explorer "${modelDir}"`);
            } catch (e) {
                console.warn('打开文件夹失败:', e);
            }
        };
    }

    // 模型大小
    const sizeEl = document.getElementById('lmDetailSize');
    if (sizeEl) {
        try {
            let total = 0;
            const walk = (dir) => {
                fs.readdirSync(dir).forEach(f => {
                    const fp = path.join(dir, f);
                    const st = fs.statSync(fp);
                    if (st.isDirectory()) walk(fp);
                    else total += st.size;
                });
            };
            walk(modelDir);
            sizeEl.textContent = formatBytes(total);
        } catch (e) {
            sizeEl.textContent = '--';
        }
    }

    // 安装时间
    const installEl = document.getElementById('lmDetailInstallTime');
    if (installEl) {
        const t = localStorage.getItem(INSTALL_TIME_KEY);
        installEl.textContent = t ? new Date(t).toLocaleString('zh-CN') : '--';
    }

    // 运行状态文字
    updateDetailRunStatus();
}

function updateDetailRunStatus() {
    const statusEl = document.getElementById('lmDetailRunStatus');
    const descEl   = document.getElementById('lmDetailDesc');

    const statusText = {
        idle:     '未启动',
        starting: '正在启动',
        running:  '运行中',
        failed:   '运行失败',
    };

    const descText = {
        idle:     '模型尚未启动，点击下方启动按钮开始运行。',
        starting: '模型正在初始化，等待服务就绪（检测到 API 地址后即为运行中）。',
        running:  '模型已就绪，正在提供本地推理服务。',
        failed:   `模型启动或运行过程中发生错误。${localAIFailReason ? '原因：' + localAIFailReason : '请查看运行日志了解详情。'}`,
    };

    if (statusEl) statusEl.textContent = statusText[localAIRunStatus] || '--';
    if (descEl)   descEl.textContent   = descText[localAIRunStatus]   || '';
}

// ---- 运行时长定时器 ----
function startUptimeTimer() {
    stopUptimeTimer();
    localAIStartTime = Date.now();
    localAIUptimeTimer = setInterval(() => {
        const el = document.getElementById('lmDetailUptime');
        if (el && localAIStartTime) {
            el.textContent = formatDuration(Date.now() - localAIStartTime);
        }
    }, 1000);
}

function stopUptimeTimer() {
    if (localAIUptimeTimer) {
        clearInterval(localAIUptimeTimer);
        localAIUptimeTimer = null;
    }
    localAIStartTime = null;
    const el = document.getElementById('lmDetailUptime');
    if (el) el.textContent = '--';
}

// ---- 切换详情面板 ----
function toggleModelDetail() {
    localAIDetailVisible = !localAIDetailVisible;
    const panel = document.getElementById('lmDetailPanel');
    const btn   = document.getElementById('viewStatusBtn');
    if (panel) panel.style.display = localAIDetailVisible ? 'block' : 'none';
    if (btn) {
        const textSpan = btn.querySelector('span') || btn;
        // 替换按钮文字（保留 svg）
        const svgHtml = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        btn.innerHTML = svgHtml + (localAIDetailVisible ? ' 收起查看' : ' 查看状态');
    }
    if (localAIDetailVisible) updateDetailPanel();
}

// ---- 切换日志终端 ----
function toggleTerminal() {
    localAITerminalVisible = !localAITerminalVisible;
    const terminal = document.getElementById('localAITerminal');
    const header   = document.querySelector('.lm-log-header');
    if (terminal) terminal.style.display = localAITerminalVisible ? 'block' : 'none';
    if (header)   header.classList.toggle('open', localAITerminalVisible);
}

// ---- 检查模型是否已存在 ----
function checkModelExists() {
    const fs = require('fs');
    const path = require('path');
    const pluginPath = getPluginPath();
    if (!pluginPath) return false;
    const modelDir = path.join(pluginPath, MODEL_DIR_NAME);
    try {
        const files = fs.readdirSync(modelDir);
        return files.length > 0;
    } catch (e) {
        return false;
    }
}

// ---- 初始化本地模型区域 ----
function initLocalAISection() {
    if (checkModelExists()) {
        dlState.status = 'done';
        setDownloadBtn('delete');
        setInstalledTagVisible(true);
        setRunStatusTag('idle'); // 初始显示未启动
        setViewStatusBtnVisible(true);
        showProgressArea(false);
        // 插件打开时自动启动模型
        startLocalAI();
    } else {
        const saved = parseInt(localStorage.getItem(PROGRESS_KEY) || '0', 10);
        if (saved > 0) {
            dlState.downloaded = saved;
            dlState.status = 'paused';
            setDownloadBtn('resume');
            showProgressArea(true);
            setProgressLabel('下载已暂停');
            setProgressBar(0);
            setProgressMeta(`已下载 ${formatBytes(saved)}`);
        } else {
            dlState.status = 'idle';
            setDownloadBtn('download');
            showProgressArea(false);
        }
        setInstalledTagVisible(false);
        setViewStatusBtnVisible(false);
    }
}

// ---- 下载按钮点击分发 ----
function handleDownloadModelClick() {
    switch (dlState.status) {
        case 'idle':         startDownload(); break;
        case 'downloading':  pauseDownload(); break;
        case 'paused':       startDownload(); break;
        case 'unzip_failed': startUnzip();    break;
        case 'done':         deleteModel();   break;
        default: break;
    }
}

// ---- 开始/续传下载 ----
function startDownload() {
    const https = require('https');
    const fs = require('fs');
    const path = require('path');
    const pluginPath = getPluginPath();
    const zipPath = path.join(pluginPath, MODEL_ZIP_NAME);

    const existingSize = dlState.downloaded > 0
        ? dlState.downloaded
        : (fs.existsSync(zipPath) ? fs.statSync(zipPath).size : 0);

    dlState.downloaded = existingSize;
    dlState.status = 'downloading';
    dlState.startTime = Date.now();
    dlState.startBytes = existingSize;

    setDownloadBtn('pause');
    showProgressArea(true);
    setProgressLabel(existingSize > 0 ? '续传中...' : '下载中...');

    const options = {
        headers: existingSize > 0 ? { 'Range': `bytes=${existingSize}-` } : {}
    };

    const req = https.get(MODEL_URL, options, (res) => {
        // 服务器不支持续传时重头来
        const isResume = res.statusCode === 206;
        if (res.statusCode !== 200 && res.statusCode !== 206) {
            dlState.status = 'paused';
            setDownloadBtn('resume');
            setProgressLabel('下载失败，请重试');
            showNotification(`下载失败，HTTP ${res.statusCode}`, 'error');
            return;
        }

        // 计算总大小
        if (isResume) {
            const range = res.headers['content-range']; // bytes 0-xxx/total
            if (range) {
                dlState.total = parseInt(range.split('/')[1], 10);
            }
        } else {
            dlState.total = parseInt(res.headers['content-length'] || '0', 10);
            dlState.downloaded = 0;
        }

        const writeFlag = isResume ? 'a' : 'w';
        dlState.fileStream = fs.createWriteStream(zipPath, { flags: writeFlag });

        res.on('data', (chunk) => {
            dlState.downloaded += chunk.length;
            localStorage.setItem(PROGRESS_KEY, String(dlState.downloaded));

            // 计算速度和剩余时间
            const elapsed = (Date.now() - dlState.startTime) / 1000;
            const deltaBytes = dlState.downloaded - dlState.startBytes;
            const speed = elapsed > 0 ? deltaBytes / elapsed : 0;
            const remaining = speed > 0 ? (dlState.total - dlState.downloaded) / speed : Infinity;
            const percent = dlState.total > 0 ? (dlState.downloaded / dlState.total) * 100 : 0;

            setProgressBar(percent);
            setProgressLabel('下载中...');
            setProgressMeta(
                `已下载 ${formatBytes(dlState.downloaded)} / ${formatBytes(dlState.total)}` +
                `　速度 ${formatBytes(speed)}/s　剩余 ${formatSeconds(remaining)}`
            );
        });

        res.on('end', () => {
            if (dlState.fileStream) dlState.fileStream.end();
            if (dlState.status === 'downloading') {
                // 下载完成，开始解压
                localStorage.removeItem(PROGRESS_KEY);
                setProgressBar(100);
                setProgressLabel('下载完成，准备解压...');
                setProgressMeta('');
                setTimeout(() => startUnzip(), 500);
            }
        });

        res.on('error', (err) => {
            dlState.status = 'paused';
            setDownloadBtn('resume');
            setProgressLabel('下载出错，可继续下载');
            showNotification('下载出错: ' + err.message, 'error');
        });

        res.pipe(dlState.fileStream);
    });

    req.on('error', (err) => {
        dlState.status = 'paused';
        setDownloadBtn('resume');
        setProgressLabel('连接失败，可继续下载');
        showNotification('连接失败: ' + err.message, 'error');
    });

    dlState.request = req;
}

// ---- 暂停下载 ----
function pauseDownload() {
    if (dlState.request) {
        dlState.request.destroy();
        dlState.request = null;
    }
    if (dlState.fileStream) {
        dlState.fileStream.end();
        dlState.fileStream = null;
    }
    dlState.status = 'paused';
    setDownloadBtn('resume');
    setProgressLabel('已暂停');
    showNotification('下载已暂停', 'info');
}

// ---- 取消下载（删除已下载部分，回到 idle）----
function cancelDownload() {
    if (!confirm('确定取消下载？已下载的内容将被删除。')) return;

    // 中断请求和写入流
    if (dlState.request) {
        dlState.request.destroy();
        dlState.request = null;
    }
    if (dlState.fileStream) {
        dlState.fileStream.end();
        dlState.fileStream = null;
    }

    // 删除已下载的 zip 文件
    try {
        const fs   = require('fs');
        const path = require('path');
        const zipPath = path.join(getPluginPath(), MODEL_ZIP_NAME);
        if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    } catch (e) {
        console.warn('删除临时文件失败:', e);
    }

    // 清空进度记录
    dlState.status = 'idle';
    dlState.downloaded = 0;
    dlState.total = 0;
    localStorage.removeItem(PROGRESS_KEY);

    setDownloadBtn('download');
    showProgressArea(false);
    showNotification('下载已取消', 'info');
}

// ---- 导入本地模型文件夹 ----
async function importLocalModel() {
    try {
        // 用 Eagle dialog API 选择文件夹
        const result = await eagle.dialog.showOpenDialog({
            properties: ['openDirectory'],
            title: '选择模型文件夹',
            buttonLabel: '导入'
        });

        if (!result || result.canceled || !result.filePaths || result.filePaths.length === 0) return;

        const srcDir  = result.filePaths[0];
        const fs      = require('fs');
        const path    = require('path');
        const destDir = path.join(getPluginPath(), MODEL_DIR_NAME);

        // 检查源目录是否包含 config.json（基本校验）
        const configFile = path.join(srcDir, 'config.json');
        if (!fs.existsSync(configFile)) {
            showNotification('所选文件夹不包含 config.json，请确认是否为正确的模型目录', 'error');
            return;
        }

        showNotification('正在导入模型文件夹...', 'info');

        // 如果目标目录已存在先删除
        if (fs.existsSync(destDir)) {
            fs.rmSync(destDir, { recursive: true, force: true });
        }

        // 递归复制文件夹
        const copyDir = (src, dest) => {
            fs.mkdirSync(dest, { recursive: true });
            for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
                const srcPath  = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);
                if (entry.isDirectory()) {
                    copyDir(srcPath, destPath);
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }
            }
        };

        copyDir(srcDir, destDir);

        // 记录安装时间
        localStorage.setItem(INSTALL_TIME_KEY, new Date().toISOString());

        dlState.status = 'done';
        setDownloadBtn('delete');
        setInstalledTagVisible(true);
        setRunStatusTag('idle');
        setViewStatusBtnVisible(true);
        showProgressArea(false);

        showNotification('模型导入成功，正在自动启动...', 'success');
        startLocalAI();

    } catch (error) {
        console.error('导入模型失败:', error);
        showNotification('导入失败: ' + error.message, 'error');
    }
}

// ---- 解压 ----
function startUnzip() {
    const path = require('path');
    const fs = require('fs');
    const pluginPath = getPluginPath();
    const zipPath = path.join(pluginPath, MODEL_ZIP_NAME);
    const destDir = path.join(pluginPath, MODEL_DIR_NAME);

    dlState.status = 'unzipping';
    setDownloadBtn('unzipping');
    showUnzipWarning(true);
    setProgressBar(0);
    setProgressLabel('正在读取压缩包...');
    setProgressMeta('');

    // 确保目标目录存在
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // 用 PowerShell System.IO.Compression 逐条目解压：
    // 1. 跳过 zip 内顶层目录，直接把内容解压到 destDir
    // 2. 每解压一个文件输出进度行，格式：PROGRESS:已完成数/总数
    const { spawn } = require('child_process');

    // 把路径里的反斜杠转义，避免 PS 字符串问题
    const zipPathPS  = zipPath.replace(/\\/g, '\\\\');
    const destDirPS  = destDir.replace(/\\/g, '\\\\');

    const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('${zipPathPS}')
$entries = $zip.Entries | Where-Object { $_.Name -ne '' }
$total = $entries.Count
$done = 0
foreach ($entry in $entries) {
    # 去掉第一段目录（zip 内顶层目录名）
    $parts = $entry.FullName -split '/',2
    $relPath = if ($parts.Count -gt 1) { $parts[1] } else { $parts[0] }
    if ($relPath -eq '') { $done++; continue }
    $target = Join-Path '${destDirPS}' $relPath
    $targetDir = Split-Path $target -Parent
    if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir -Force | Out-Null }
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $target, $true)
    $done++
    Write-Output "PROGRESS:$done/$total"
}
$zip.Dispose()
Write-Output "DONE"
`.trim();

    const ps = spawn('powershell.exe', [
        '-NoProfile', '-NonInteractive', '-Command', psScript
    ]);

    let totalFiles = 0;
    let doneFiles  = 0;

    ps.stdout.on('data', (data) => {
        const lines = data.toString().split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line.startsWith('PROGRESS:')) {
                const parts = line.slice(9).split('/');
                doneFiles  = parseInt(parts[0], 10);
                totalFiles = parseInt(parts[1], 10);
                if (totalFiles > 0) {
                    const pct = (doneFiles / totalFiles) * 100;
                    setProgressBar(pct);
                    setProgressLabel('解压中...');
                    setProgressMeta(`已解压 ${doneFiles} / ${totalFiles} 个文件`);
                }
            }
        });
    });

    ps.stderr.on('data', (data) => {
        console.warn('[unzip stderr]', data.toString());
    });

    ps.on('close', (code) => {
        showUnzipWarning(false);
        if (code === 0) {
            try { fs.unlinkSync(zipPath); } catch (e) { console.warn('删除zip失败:', e); }
            // 记录安装时间
            localStorage.setItem(INSTALL_TIME_KEY, new Date().toISOString());
            dlState.status = 'done';
            setProgressBar(100);
            setProgressLabel('解压完成');
            setProgressMeta('');
            setDownloadBtn('delete');
            setInstalledTagVisible(true);
            setViewStatusBtnVisible(true);
            showNotification('模型已就绪，正在自动启动...', 'success');
            // 解压完成后自动启动
            startLocalAI();
        } else {
            dlState.status = 'unzip_failed';
            setProgressLabel('解压失败');
            setProgressMeta('');
            setDownloadBtn('reUnzip');
            showNotification('解压失败，请点击重新解压', 'error');
        }
    });

    ps.on('error', (err) => {
        showUnzipWarning(false);
        dlState.status = 'unzip_failed';
        setProgressLabel('解压失败: ' + err.message);
        setDownloadBtn('reUnzip');
        showNotification('解压失败: ' + err.message, 'error');
    });
}

// ---- 删除模型 ----
function deleteModel() {
    if (!confirm('确定要删除模型文件吗？删除后需要重新下载。')) return;

    // 先停止运行中的模型
    if (localAIRunning) stopLocalAI();

    const fs = require('fs');
    const path = require('path');
    const pluginPath = getPluginPath();
    const modelDir = path.join(pluginPath, MODEL_DIR_NAME);

    try {
        fs.rmSync(modelDir, { recursive: true, force: true });
    } catch (e) {
        console.warn('删除模型目录失败:', e);
    }

    dlState.status = 'idle';
    dlState.downloaded = 0;
    dlState.total = 0;
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(INSTALL_TIME_KEY);

    setDownloadBtn('download');
    showProgressArea(false);
    setInstalledTagVisible(false);
    setViewStatusBtnVisible(false);
    setRunStatusTag('idle');

    // 隐藏详情面板
    localAIDetailVisible = false;
    const panel = document.getElementById('lmDetailPanel');
    if (panel) panel.style.display = 'none';

    showNotification('模型已删除', 'success');
}

// ---- 切换端侧 AI 启动/停止 ----
function toggleLocalAI() {
    if (localAIRunning) {
        stopLocalAI();
    } else {
        startLocalAI();
    }
}

// ---- 启动端侧 AI ----
function startLocalAI() {
    const { spawn } = require('child_process');
    const path = require('path');

    const pluginPath = getPluginPath();
    const exePath = path.join(pluginPath, 'GenieAPIService', 'GenieAPIService.exe');
    const configPath = path.join(pluginPath, MODEL_DIR_NAME, 'config.json');

    const terminalOutput = document.getElementById('terminalOutput');
    if (terminalOutput) {
        terminalOutput.innerHTML = '<span class="terminal-line system">正在启动本地模型服务...</span>\n';
    }

    // 更新状态为启动中
    localAIRunStatus = 'starting';
    localAIFailReason = '';
    setRunStatusTag('starting');
    updateLocalAIButton(true);
    updateDetailRunStatus();

    try {
        localAIProcess = spawn(exePath, ['-c', configPath, '-l']);
        localAIRunning = true;
        // 不在这里启动计时器，等检测到运行中再启动

        localAIProcess.stdout.on('data', (data) => {
            const text = data.toString();
            appendTerminalOutput(text, 'stdout');

            // 检测到 "http://0.0.0.0" 视为运行中
            if (localAIRunStatus === 'starting') {
                if (text.includes('http://0.0.0.0')) {
                    localAIRunStatus = 'running';
                    startUptimeTimer(); // 运行中才开始计时
                    setRunStatusTag('running');
                    updateDetailRunStatus();
                    showNotification('本地模型已就绪', 'success');
                }
            }
        });

        localAIProcess.stderr.on('data', (data) => {
            const text = data.toString();
            appendTerminalOutput(text, 'stderr');

            // stderr 里也可能有就绪信息
            if (localAIRunStatus === 'starting') {
                if (text.includes('http://0.0.0.0')) {
                    localAIRunStatus = 'running';
                    startUptimeTimer(); // 运行中才开始计时
                    setRunStatusTag('running');
                    updateDetailRunStatus();
                }
            }

            // 检测明显错误
            if (/error|failed|exception/i.test(text) && localAIRunStatus !== 'running') {
                localAIFailReason = text.split('\n')[0].trim().slice(0, 100);
            }
        });

        localAIProcess.on('close', (code) => {
            localAIRunning = false;
            stopUptimeTimer();
            if (code !== 0 && localAIRunStatus !== 'idle') {
                localAIRunStatus = 'failed';
                setRunStatusTag('failed', localAIFailReason);
            } else {
                localAIRunStatus = 'idle';
                setRunStatusTag('idle');
            }
            updateLocalAIButton(false);
            updateDetailRunStatus();
            appendTerminalOutput(`进程已退出，退出码: ${code}`, 'system');
            localAIProcess = null;
        });

        localAIProcess.on('error', (err) => {
            localAIRunning = false;
            stopUptimeTimer();
            localAIRunStatus = 'failed';
            localAIFailReason = err.message;
            setRunStatusTag('failed');
            updateLocalAIButton(false);
            updateDetailRunStatus();
            appendTerminalOutput(`启动失败: ${err.message}`, 'stderr');
            localAIProcess = null;
            showNotification('启动失败: ' + err.message, 'error');
        });

        appendTerminalOutput('服务启动中，请稍候...', 'system');

    } catch (error) {
        localAIRunning = false;
        stopUptimeTimer();
        localAIRunStatus = 'failed';
        localAIFailReason = error.message;
        setRunStatusTag('failed');
        updateLocalAIButton(false);
        updateDetailRunStatus();
        appendTerminalOutput(`启动失败: ${error.message}`, 'stderr');
        showNotification('启动失败: ' + error.message, 'error');
    }
}

// ---- 停止端侧 AI ----
function stopLocalAI() {
    if (!localAIProcess) return;

    try {
        const { exec } = require('child_process');
        exec(`taskkill /pid ${localAIProcess.pid} /T /F`, (error) => {
            if (error) localAIProcess && localAIProcess.kill('SIGTERM');
        });

        localAIRunning = false;
        stopUptimeTimer();
        localAIRunStatus = 'idle';
        setRunStatusTag('idle');
        updateLocalAIButton(false);
        updateDetailRunStatus();
        appendTerminalOutput('服务已停止', 'system');
        showNotification('本地模型已停止', 'success');
        localAIProcess = null;

    } catch (error) {
        showNotification('停止失败: ' + error.message, 'error');
    }
}

// ---- 更新启动按钮外观 ----
function updateLocalAIButton(running) {
    const btn     = document.getElementById('localAIBtn');
    const btnText = document.getElementById('localAIBtnText');
    const btnIcon = document.getElementById('localAIBtnIcon');

    if (!btn || !btnText || !btnIcon) return;

    if (running) {
        btn.classList.add('running');
        btnText.textContent = '停止';
        btnIcon.innerHTML = '<rect x="6" y="6" width="12" height="12"></rect>';
    } else {
        btn.classList.remove('running');
        btnText.textContent = '启动';
        btnIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
    }
}

// ---- 追加终端输出 ----
function appendTerminalOutput(text, type = 'stdout') {
    const terminalOutput = document.getElementById('terminalOutput');
    if (!terminalOutput) return;

    const placeholder = terminalOutput.querySelector('.terminal-placeholder');
    if (placeholder) placeholder.remove();

    const lines = text.split('\n');
    lines.forEach(line => {
        if (line.trim()) {
            const lineElement = document.createElement('span');
            lineElement.className = `terminal-line ${type}`;
            lineElement.textContent = line;
            terminalOutput.appendChild(lineElement);
            terminalOutput.appendChild(document.createTextNode('\n'));
        }
    });

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// 导出函数
window.toggleLocalAI = toggleLocalAI;
window.startLocalAI = startLocalAI;
window.stopLocalAI = stopLocalAI;
window.handleDownloadModelClick = handleDownloadModelClick;
window.initLocalAISection = initLocalAISection;
window.toggleModelDetail = toggleModelDetail;
window.toggleTerminal = toggleTerminal;
window.cancelDownload = cancelDownload;
window.importLocalModel = importLocalModel;
