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
    
    // 初始化历史记录显示
    initHistoryDisplay();
    
    console.log('UI 初始化完成');
}

// 检查 API 配置状态
function checkAPIConfigurationUI() {
    if (!window.eagleAutoAnnotation) return;
    
    const { pluginConfig } = window.eagleAutoAnnotation;
    const apiKey = pluginConfig.apiKey;
    
    const apiWarning = document.getElementById('apiWarning');
    const imageStatusCard = document.getElementById('imageStatusCard');
    const controlPanel = document.querySelector('.control-panel');
    
    if (!apiKey) {
        // 显示警告
        if (apiWarning) apiWarning.style.display = 'flex';
    } else {
        // 隐藏警告
        if (apiWarning) apiWarning.style.display = 'none';
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
    
    // 如果切换到设置或统计页面，刷新统计数据
    if ((tabName === 'settings' || tabName === 'stats') && window.eagleAutoAnnotation) {
        window.eagleAutoAnnotation.updateTokenUsageUI();
    }
    
    // 切换到统计页面时渲染明细
    if (tabName === 'stats' && window.renderUsageDetails) {
        window.renderUsageDetails();
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
                updateStartButton();
            });
        }
    });
    
    // 初始化按钮状态
    setTimeout(() => updateStartButton(), 100);
}

// 更新开始按钮状态和文案
function updateStartButton() {
    const enableAnnotation = document.getElementById('enable-annotation')?.checked;
    const enableTag = document.getElementById('enable-tag')?.checked;
    const startBtn = document.getElementById('startBtn');
    if (!startBtn) return;
    
    const svgIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    
    if (!enableAnnotation && !enableTag) {
        startBtn.disabled = true;
        startBtn.title = '请至少选择一种处理方式';
        startBtn.innerHTML = `${svgIcon} 开始处理`;
    } else {
        startBtn.disabled = false;
        startBtn.title = '';
        if (enableAnnotation && enableTag) {
            startBtn.innerHTML = `${svgIcon} 开始 添加注释与标签`;
        } else if (enableAnnotation) {
            startBtn.innerHTML = `${svgIcon} 开始 添加注释`;
        } else {
            startBtn.innerHTML = `${svgIcon} 开始 添加标签`;
        }
    }
}

window.updateStartButton = updateStartButton;

// 切换窗口置顶
let isPinned = false;
async function toggleAlwaysOnTop() {
    isPinned = !isPinned;
    await eagle.window.setAlwaysOnTop(isPinned);
    
    const btn = document.getElementById('pinBtn');
    if (btn) {
        btn.classList.toggle('pinned', isPinned);
        btn.title = isPinned ? '取消置顶' : '置顶窗口';
    }
}

window.toggleAlwaysOnTop = toggleAlwaysOnTop;

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
        
        const countElement = document.getElementById('imageCount');
        const statusTextElement = document.getElementById('imageStatusText');
        
        if (countElement) countElement.textContent = uiState.images.length;
        if (statusTextElement) {
            statusTextElement.textContent = uiState.images.length === 0 ? '请在eagle中至少选择一张图片' : '';
        }
        
        uiState.imageStatuses = {};
        uiState.imageErrors = {};
        uiState.images.forEach(img => {
            uiState.imageStatuses[img.id] = 'pending';
        });
        
        renderQueueList();
        updateStatusIcon();
        
    } catch (error) {
        console.error('刷新图片列表失败:', error);
        uiState.images = [];
        uiState.imageStatuses = {};
        renderQueueList();
        updateStatusIcon();
    }
}

// 历史记录数据（从localStorage加载）
let historyRecords = JSON.parse(localStorage.getItem('eagleHistoryRecords') || '[]');
let expandedRecordIds = new Set(); // 支持多条同时展开
let currentHistoryTab = 'processing';

function saveHistoryRecords() {
    if (historyRecords.length > 50) historyRecords.splice(50);
    localStorage.setItem('eagleHistoryRecords', JSON.stringify(historyRecords));
}

let historyBodyCollapsed = false;
function toggleHistory() {
    historyBodyCollapsed = !historyBodyCollapsed;
    const body = document.getElementById('historyBody');
    const chevron = document.getElementById('historyChevron');
    if (body) body.style.display = historyBodyCollapsed ? 'none' : 'block';
    if (chevron) chevron.style.transform = historyBodyCollapsed ? 'rotate(-90deg)' : '';
}
window.toggleHistory = toggleHistory;

function toggleHistoryRecord(recordId) {
    if (expandedRecordIds.has(recordId)) {
        expandedRecordIds.delete(recordId);
    } else {
        expandedRecordIds.add(recordId);
        // 切换到有数据的tab（每条记录独立tab状态）
        const record = historyRecords.find(r => r.id === recordId);
        if (record) {
            const hasProcessing = record.images.some(i => i.status === 'processing');
            const hasError = record.images.some(i => i.status === 'error');
            const hasDone = record.images.some(i => i.status === 'done');
            if (!recordTabState[recordId]) {
                if (hasProcessing) recordTabState[recordId] = 'processing';
                else if (hasError) recordTabState[recordId] = 'error';
                else if (hasDone) recordTabState[recordId] = 'done';
                else recordTabState[recordId] = 'skipped';
            }
        }
    }
    renderHistoryRecordList();
}
window.toggleHistoryRecord = toggleHistoryRecord;

// 每条记录独立的tab状态
let recordTabState = {};

function switchHistoryTab(tab, recordId) {
    recordTabState[recordId] = tab;
    renderHistoryRecordList();
}
window.switchHistoryTab = switchHistoryTab;

function startHistoryRecord(images, taskTypes) {
    const index = historyRecords.length + 1;
    const taskLabel = taskTypes.join('与');
    const record = {
        id: Date.now(),
        index,
        title: '第' + index + '次给' + images.length + '张图片' + taskLabel,
        startTime: new Date().toISOString(),
        images: images.map(img => ({
            id: img.id,
            name: img.name,
            ext: img.ext,
            thumbnailURL: img.thumbnailURL,
            fileURL: img.fileURL,
            status: 'processing',
            error: ''
        }))
    };
    historyRecords.unshift(record);
    expandedRecordIds.add(record.id);
    recordTabState[record.id] = 'processing';
    saveHistoryRecords();
    const section = document.getElementById('historySection');
    if (section) section.style.display = 'block';
    renderHistoryRecordList();
    return record;
}

function updateHistoryImageStatus(recordId, imageId, status, errorMsg) {
    const record = historyRecords.find(r => r.id === recordId);
    if (!record) return;
    const img = record.images.find(i => i.id === imageId);
    if (!img) return;
    img.status = status;
    if (errorMsg) img.error = errorMsg;
    saveHistoryRecords();
    renderHistoryRecordList();
}

function finishHistoryRecord(recordId) {
    const record = historyRecords.find(r => r.id === recordId);
    if (record && expandedRecordIds.has(recordId)) {
        const hasError = record.images.some(i => i.status === 'error');
        const hasDone = record.images.some(i => i.status === 'done');
        if (hasError) recordTabState[recordId] = 'error';
        else if (hasDone) recordTabState[recordId] = 'done';
        else recordTabState[recordId] = 'skipped';
    }
    saveHistoryRecords();
    renderHistoryRecordList();
}

function renderHistoryRecordList() {
    const container = document.getElementById('historyRecordList');
    if (!container) return;
    if (historyRecords.length === 0) {
        container.innerHTML = '<div class="queue-empty">暂无历史记录</div>';
        return;
    }
    const statusConfig = {
        processing: { color: '#3b82f6', label: '处理中', bg: '#eff6ff' },
        done:       { color: '#10b981', label: '已完成', bg: '#f0fdf4' },
        error:      { color: '#ef4444', label: '失败',   bg: '#fef2f2' },
        skipped:    { color: '#94a3b8', label: '未处理', bg: '#f8fafc' }
    };
    container.innerHTML = historyRecords.map(record => {
        const isExpanded = expandedRecordIds.has(record.id);
        const isProcessing = record.images.some(i => i.status === 'processing');
        const doneCount = record.images.filter(i => i.status === 'done').length;
        const errorCount = record.images.filter(i => i.status === 'error').length;
        const time = new Date(record.startTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        let dotColor = '#10b981';
        if (isProcessing) dotColor = '#3b82f6';
        else if (errorCount > 0) dotColor = '#ef4444';
        const counts = { processing: 0, done: 0, error: 0, skipped: 0 };
        record.images.forEach(img => { counts[img.status] = (counts[img.status] || 0) + 1; });
        const tabs = [];
        if (counts.processing > 0) tabs.push({ key: 'processing', label: '处理中', badgeClass: '' });
        tabs.push(
            { key: 'done',    label: '已完成', badgeClass: 'success' },
            { key: 'error',   label: '失败',   badgeClass: 'error' },
            { key: 'skipped', label: '未处理', badgeClass: 'muted' }
        );
        const tabsHtml = tabs.map(t =>
            '<button class="queue-tab ' + (isExpanded && recordTabState[record.id] === t.key ? 'active' : '') + '" ' +
            'onclick="switchHistoryTab(\'' + t.key + '\', ' + record.id + '); event.stopPropagation();">' +
            t.label + ' <span class="queue-badge ' + t.badgeClass + '">' + (counts[t.key] || 0) + '</span></button>'
        ).join('');
        const activeTab = isExpanded ? (recordTabState[record.id] || 'done') : 'done';
        const filtered = record.images.filter(img => img.status === activeTab);
        const emptyTexts = { processing: '暂无处理中图片', done: '暂无已完成图片', error: '暂无失败图片', skipped: '暂无未处理图片' };
        const listHtml = filtered.length === 0
            ? '<div class="queue-empty">' + (emptyTexts[activeTab] || '') + '</div>'
            : filtered.map(img => {
                const cfg = statusConfig[img.status] || statusConfig.processing;
                return '<div class="queue-item" style="border-left:3px solid ' + cfg.color + ';">' +
                    '<div class="queue-item-thumb"><img src="' + (img.thumbnailURL || img.fileURL || '') + '" alt="" loading="lazy"></div>' +
                    '<div class="queue-item-info">' +
                    '<div class="queue-item-name">' + img.name + (img.ext ? '.' + img.ext : '') + '</div>' +
                    (img.error ? '<div class="queue-item-error">' + img.error + '</div>' : '') +
                    '</div>' +
                    '<span class="queue-item-badge" style="color:' + cfg.color + ';background:' + cfg.bg + ';">' + cfg.label + '</span>' +
                    '</div>';
            }).join('');
        return '<div class="history-record-item ' + (isExpanded ? 'expanded' : '') + '" onclick="toggleHistoryRecord(' + record.id + ')">' +
            '<span class="history-record-dot" style="background:' + dotColor + ';"></span>' +
            '<div class="history-record-info">' +
            '<div class="history-record-title">' + record.title + '</div>' +
            '<div class="history-record-meta">' + time + ' · 完成' + doneCount + '张' + (errorCount > 0 ? ' · 失败' + errorCount + '张' : '') + '</div>' +
            '</div>' +
            '<svg style="flex-shrink:0;color:#94a3b8;transition:transform 0.2s;' + (isExpanded ? 'transform:rotate(180deg)' : '') + '" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
            '</div>' +
            (isExpanded ? '<div class="history-record-detail"><div class="queue-tabs">' + tabsHtml + '</div><div class="queue-list">' + listHtml + '</div></div>' : '');
    }).join('');
}

function initHistoryDisplay() {
    if (historyRecords.length > 0) {
        const section = document.getElementById('historySection');
        if (section) section.style.display = 'block';
        expandedRecordIds = new Set();
        recordTabState = {};
        renderHistoryRecordList();
    }
}

// 兼容旧的updateImageStatus（不再使用，保留避免报错）
function updateImageStatus(imageId, status, errorMsg) {}
function renderQueueList() {}
function switchQueueTab(tab) {}
window.switchQueueTab = switchQueueTab;

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
    
    // 动态填充服务商列表
    const providerSelect = document.getElementById('provider');
    if (providerSelect && aiProviders) {
        providerSelect.innerHTML = '';
        Object.keys(aiProviders).forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = aiProviders[key].name;
            providerSelect.appendChild(option);
        });
        providerSelect.value = pluginConfig.provider;
        // 初始化时只填充模型列表，不清空已有配置
        handleProviderChange(true);
    }
    
    // 加载 API Key
    const apiKeyInput = document.getElementById('apiKey');
    if (apiKeyInput) {
        apiKeyInput.value = pluginConfig.apiKey || '';
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
    
    const skipExistingTags = document.getElementById('skipExistingTags');
    if (skipExistingTags) {
        skipExistingTags.checked = pluginState.settings.skipExistingTags !== false;
    }
    
    const skipProcessedTags = document.getElementById('skipProcessedTags');
    if (skipProcessedTags) {
        skipProcessedTags.checked = pluginState.settings.skipProcessedTags !== false;
    }
    
    // 更新测试按钮状态
    if (typeof checkTestConnEnabled === 'function') {
        checkTestConnEnabled();
    }
    
    // 如果已验证连接成功，显示已连接标识
    if (pluginConfig.apiConnected) {
        const connStatus = document.getElementById('connStatus');
        if (connStatus) {
            connStatus.style.display = 'inline-flex';
        }
    }
}

// 处理服务商变更（isInit=true时为初始化加载，不清空配置）
function handleProviderChange(isInit) {
    if (!window.eagleAutoAnnotation) return;
    
    const { pluginConfig, aiProviders } = window.eagleAutoAnnotation;
    const providerSelect = document.getElementById('provider');
    const modelSelect = document.getElementById('model');
    const apiKeyInput = document.getElementById('apiKey');
    
    if (!providerSelect || !modelSelect) return;
    
    const provider = providerSelect.value;
    const providerInfo = aiProviders[provider];
    
    if (!providerInfo) return;
    
    pluginConfig.provider = provider;
    
    // 用户手动切换时清空
    if (!isInit) {
        pluginConfig.apiKey = '';
        pluginConfig.model = '';
        if (apiKeyInput) {
            apiKeyInput.value = '';
        }
    }
    
    // 更新模型列表
    modelSelect.innerHTML = '';
    providerInfo.models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.value;
        option.textContent = model.label;
        modelSelect.appendChild(option);
    });
    
    // 添加"更多模型"选项
    const moreOption = document.createElement('option');
    moreOption.value = '__custom__';
    moreOption.textContent = '其他模型...';
    modelSelect.appendChild(moreOption);
    
    // 设置当前模型
    if (pluginConfig.model) {
        // 检查模型是否在列表中
        const modelExists = providerInfo.models.some(m => m.value === pluginConfig.model);
        if (modelExists) {
            modelSelect.value = pluginConfig.model;
        } else {
            // 自定义模型，选中"其他模型"并显示输入框
            modelSelect.value = '__custom__';
            const customModelInput = document.getElementById('customModelInput');
            const customModelField = document.getElementById('customModel');
            if (customModelInput) {
                customModelInput.style.display = 'block';
            }
            if (customModelField) {
                customModelField.value = pluginConfig.model;
            }
        }
    }
    
    // 清空 API Key 输入框
    if (!isInit && apiKeyInput) {
        apiKeyInput.value = '';
    }
    
    // 隐藏自定义模型输入框（仅非自定义模型时）
    if (!pluginConfig.model || providerInfo.models.some(m => m.value === pluginConfig.model)) {
        const customModelInput = document.getElementById('customModelInput');
        if (customModelInput && !isInit) {
            customModelInput.style.display = 'none';
        }
    }
    
    // 更新测试按钮状态
    checkTestConnEnabled();
}

// 处理模型选择变更
function handleModelChange() {
    const modelSelect = document.getElementById('model');
    const customModelInput = document.getElementById('customModelInput');
    
    if (!modelSelect || !customModelInput) return;
    
    if (modelSelect.value === '__custom__') {
        customModelInput.style.display = 'block';
        document.getElementById('customModel')?.focus();
    } else {
        customModelInput.style.display = 'none';
    }
}

window.handleModelChange = handleModelChange;

// 检查是否可以测试连接
function checkTestConnEnabled() {
    const apiKey = document.getElementById('apiKey')?.value?.trim();
    const modelSelect = document.getElementById('model')?.value;
    const customModel = document.getElementById('customModel')?.value?.trim();
    const btn = document.getElementById('testConnBtn');
    
    if (!btn) return;
    
    const hasModel = modelSelect === '__custom__' ? !!customModel : !!modelSelect;
    const enabled = !!(apiKey && hasModel);
    btn.disabled = !enabled;
    btn.title = enabled ? '点击测试API连接' : '请先填写API Key和选择模型';
}

// 用户修改配置时重置已连接状态
function onConfigInputChanged() {
    checkTestConnEnabled();
    const connStatus = document.getElementById('connStatus');
    if (connStatus) {
        connStatus.style.display = 'none';
    }
    if (window.eagleAutoAnnotation) {
        window.eagleAutoAnnotation.pluginConfig.apiConnected = false;
    }
}

window.checkTestConnEnabled = checkTestConnEnabled;
window.onConfigInputChanged = onConfigInputChanged;

// 切换API Key显示/隐藏
function toggleApiKeyVisibility() {
    const input = document.getElementById('apiKey');
    const icon = document.getElementById('eyeIcon');
    if (!input) return;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    } else {
        input.type = 'password';
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
}

window.toggleApiKeyVisibility = toggleApiKeyVisibility;

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
    const modelSelect = document.getElementById('model')?.value;
    const model = modelSelect === '__custom__' ? (document.getElementById('customModel')?.value || '') : modelSelect;
    const maxTokens = parseInt(document.getElementById('maxTokens')?.value || '200');
    
    if (provider) {
        pluginConfig.provider = provider;
    }
    
    if (apiKey) {
        pluginConfig.apiKey = apiKey;
        pluginState.settings.apiConfigured = true;
    }
    
    if (model) {
        pluginConfig.model = model;
    }
    
    pluginConfig.maxTokens = maxTokens;
    
    // 保存处理偏好
    pluginState.settings.skipExistingAnnotations = document.getElementById('skipExisting')?.checked !== false;
    pluginState.settings.skipProcessedImages = document.getElementById('skipProcessed')?.checked !== false;
    pluginState.settings.skipExistingTags = document.getElementById('skipExistingTags')?.checked !== false;
    pluginState.settings.skipProcessedTags = document.getElementById('skipProcessedTags')?.checked !== false;
    
    // 调用保存函数
    window.eagleAutoAnnotation.saveConfiguration();
    
    showNotification('设置已保存', 'success');
}

// 重置设置
function resetSettings() {
    if (!window.eagleAutoAnnotation) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;z-index:99999;';
    modal.innerHTML = `
        <div style="background:white;border-radius:10px;padding:24px;width:260px;box-shadow:0 8px 24px rgba(0,0,0,0.15);">
            <div style="font-size:15px;font-weight:600;color:#1e293b;margin-bottom:8px;">重置设置</div>
            <div style="font-size:13px;color:#64748b;margin-bottom:20px;">确定要重置所有设置吗？这将清除所有配置和统计数据。</div>
            <div style="display:flex;gap:8px;justify-content:flex-end;">
                <button id="cancelRst" style="padding:6px 14px;border:1px solid #e2e8f0;background:white;border-radius:6px;cursor:pointer;font-size:13px;color:#475569;">取消</button>
                <button id="confirmRst" style="padding:6px 14px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-size:13px;">确定</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('cancelRst').onclick = () => modal.remove();
    document.getElementById('confirmRst').onclick = () => {
        modal.remove();
        window.eagleAutoAnnotation.resetToDefaultConfig();
        loadConfigToUI();
        window.eagleAutoAnnotation.updateTokenUsageUI();
        showNotification('设置已重置', 'success');
    };
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
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
        await window.eagleAutoAnnotation.testAPIConnection();
        
        // 显示已连接标识
        const connStatus = document.getElementById('connStatus');
        if (connStatus) {
            connStatus.style.display = 'inline-flex';
        }
    } catch (error) {
        console.error('API 测试失败:', error);
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
            <div style="position: relative;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; padding-bottom: 32px; font-family: monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; max-height: 300px; overflow-y: auto;">${template.prompt}</div>
                <span style="position: absolute; bottom: 8px; right: 12px; font-size: 10px; color: #94a3b8; background: rgba(255, 255, 255, 0.9); padding: 2px 6px; border-radius: 4px; pointer-events: none; user-select: none; box-shadow: 0 1px 2px rgba(0, 0, 0, 0);">${template.prompt.length} 字</span>
            </div>
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
        // 显示未选择图片的提示icon
        container.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-dasharray="4 2"></rect>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
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
    
    const { pluginConfig } = window.eagleAutoAnnotation;
    if (!pluginConfig.apiKey) {
        showNotification('请先到设置页面配置大模型', 'warning');
        return;
    }
    
    const enableAnnotation = document.getElementById('enable-annotation')?.checked;
    const enableTag = document.getElementById('enable-tag')?.checked;
    const enableRename = document.getElementById('enable-rename')?.checked;
    
    if (!enableAnnotation && !enableTag && !enableRename) {
        showNotification('请至少启用一个功能', 'warning');
        return;
    }
    
    if (uiState.images.length === 0) {
        showNotification('请先在 Eagle 中选择图片', 'warning');
        return;
    }
    
    try {
        uiState.processing = true;
        showProgress();
        
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
        
        // 开始历史记录
        const taskTypes = [];
        if (enableAnnotation) taskTypes.push('注释');
        if (enableTag) taskTypes.push('打标签');
        const historyRecord = startHistoryRecord(uiState.images, taskTypes);
        
        let successCount = 0;
        let errorCount = 0;
        let skippedCount = 0;
        
        for (let i = 0; i < uiState.images.length; i++) {
            const image = uiState.images[i];
            updateProgress(i + 1, uiState.images.length);
            
            // 检查跳过条件
            const { pluginState } = window.eagleAutoAnnotation;
            if (enableAnnotation && pluginState.settings.skipExistingAnnotations && image.annotation) {
                skippedCount++;
                updateHistoryImageStatus(historyRecord.id, image.id, 'skipped', '已有注释，跳过');
                continue;
            }
            
            if (enableTag && pluginState.settings.skipExistingTags && image.tags && image.tags.length > 0) {
                skippedCount++;
                updateHistoryImageStatus(historyRecord.id, image.id, 'skipped', '已有标签，跳过');
                continue;
            }
            
            try {
                await processImageWithAI(image, {
                    annotation: enableAnnotation,
                    tag: enableTag,
                    rename: enableRename
                });
                successCount++;
                updateHistoryImageStatus(historyRecord.id, image.id, 'done');
            } catch (error) {
                console.error('处理图片失败:', image.name, error);
                errorCount++;
                updateHistoryImageStatus(historyRecord.id, image.id, 'error', error.message);
            }
            
            if (i < uiState.images.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        // 处理完成
        finishHistoryRecord(historyRecord.id);
        
        let message = `处理完成! 成功: ${successCount} 张`;
        if (skippedCount > 0) message += `，跳过: ${skippedCount} 张`;
        if (errorCount > 0) message += `，失败: ${errorCount} 张`;
        showNotification(message, errorCount > 0 ? 'warning' : 'success');
        
    } catch (error) {
        console.error('处理过程出错:', error);
        showNotification('处理失败: ' + error.message, 'error');
    } finally {
        uiState.processing = false;
        hideProgress();
        updateStartButton();
    }
}

// 处理单张图片
async function processImageWithAI(image, options) {
    if (!window.eagleAutoAnnotation) throw new Error('插件核心模块未加载');
    
    const { pluginConfig, generateImageAnnotation, addAnnotationToImage } = window.eagleAutoAnnotation;
    
    if (!pluginConfig.apiKey) throw new Error('API 密钥未配置');
    
    if (options.annotation) {
        const annotation = await generateImageAnnotation(image);
        if (annotation) await addAnnotationToImage(image, annotation);
    }
    
    if (options.tag) {
        await generateAndApplyTags(image);
    }
}

// 生成并应用标签
async function generateAndApplyTags(image) {
    const { generateImageTags } = window.eagleAutoAnnotation;
    const tags = await generateImageTags(image);
    if (!tags || tags.length === 0) return;
    const existingTags = image.tags || [];
    const mergedTags = Array.from(new Set([...existingTags, ...tags]));
    image.tags = mergedTags;
    if (typeof image.save === 'function') await image.save();
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