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
    }
    
    // 刷新图片列表
    refreshImageList();
    
    console.log('UI 初始化完成');
}

// 检查 API 配置状态
function checkAPIConfigurationUI() {
    if (!window.eagleAutoAnnotation) return;
    
    const { pluginConfig } = window.eagleAutoAnnotation;
    const currentProvider = pluginConfig.provider;
    const apiKey = pluginConfig.apiKeys[currentProvider];
    
    const apiWarning = document.getElementById('apiWarning');
    const imageStatusCard = document.getElementById('imageStatusCard');
    const controlPanel = document.querySelector('.control-panel');
    
    if (!apiKey) {
        // 显示警告
        if (apiWarning) apiWarning.style.display = 'flex';
        // 禁用控制面板
        if (imageStatusCard) imageStatusCard.style.opacity = '0.5';
        if (controlPanel) {
            controlPanel.style.opacity = '0.5';
            controlPanel.style.pointerEvents = 'none';
        }
    } else {
        // 隐藏警告
        if (apiWarning) apiWarning.style.display = 'none';
        // 启用控制面板
        if (imageStatusCard) imageStatusCard.style.opacity = '1';
        if (controlPanel) {
            controlPanel.style.opacity = '1';
            controlPanel.style.pointerEvents = 'auto';
        }
    }
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
        
        // 更新计数
        const countElement = document.getElementById('imageCount');
        if (countElement) {
            countElement.textContent = uiState.images.length;
        }
        
        // 渲染网格
        renderImageGrid();
        
    } catch (error) {
        console.error('刷新图片列表失败:', error);
        uiState.images = [];
        renderImageGrid();
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
        
        item.classList.add(statusClass);
        
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
    
    const { pluginConfig, generateImageAnnotation, addAnnotationToImage } = window.eagleAutoAnnotation;
    
    // 检查 API 配置
    const currentProvider = pluginConfig.provider;
    const apiKey = pluginConfig.apiKeys[currentProvider];
    
    if (!apiKey) {
        throw new Error('API 密钥未配置');
    }
    
    // 生成注释
    if (options.annotation) {
        const annotation = await generateImageAnnotation(image);
        if (annotation) {
            await addAnnotationToImage(image, annotation);
        }
    }
    
    // TODO: 实现标签和重命名功能
    // 这些功能需要在 plugin.js 中添加相应的函数
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
    // TODO: 实现模板预览功能
    showNotification('模板预览功能即将推出', 'info');
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

// 导出函数供全局使用
window.handleStartProcessing = handleStartProcessing;
window.handleProviderChange = handleProviderChange;
window.saveSettings = saveSettings;
window.resetSettings = resetSettings;
window.testAPIConnection = testAPIConnection;
window.previewTemplate = previewTemplate;
window.refreshImageList = refreshImageList;
window.navigateToAPISettings = navigateToAPISettings;

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
