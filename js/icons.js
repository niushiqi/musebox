/**
 * Material Icons - 本地版本
 * 使用 Google Material Design Icons
 */

const MaterialIcons = {
    // 机器人图标 - 用于头部
    SmartToy: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM9 12c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3 4c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm3-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
        </svg>`;
    },

    // 首页图标
    Home: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>`;
    },

    // 大脑/AI图标 - 用于模型配置
    Psychology: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M13 8.57c-.79 0-1.43.64-1.43 1.43s.64 1.43 1.43 1.43 1.43-.64 1.43-1.43S13.79 8.57 13 8.57z"/>
            <path d="M13 3C9.25 3 6.2 5.94 6.02 9.64L4.1 12.2C3.85 12.53 4.09 13 4.5 13h1.5v5c0 1.1.9 2 2 2h1V9.5C9 8.12 10.12 7 11.5 7S14 8.12 14 9.5c0 .17-.02.33-.05.5H15c1.1 0 2 .9 2 2v1.25c1.04-.83 1.69-2.1 1.69-3.52C18.69 5.18 16.18 3 13 3z"/>
        </svg>`;
    },

    // 设置图标
    Settings: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
        </svg>`;
    },

    // 统计图标
    TrendingUp: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>`;
    },

    // 帮助图标
    Help: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>`;
    },

    // 图片图标
    Image: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>`;
    },

    // 播放图标
    PlayArrow: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M8 5v14l11-7z"/>
        </svg>`;
    },

    // 检查图标
    CheckCircle: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>`;
    },

    // 保存图标
    Save: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
        </svg>`;
    },

    // 刷新图标
    Refresh: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        </svg>`;
    },

    // 标签图标
    LocalOffer: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
        </svg>`;
    },

    // 星星图标
    Star: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>`;
    },

    // API图标
    Api: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M14,12L10,8V11H2V13H10V16M20,12L16,8V11H8V13H16V16"/>
        </svg>`;
    },

    // 内存图标
    Memory: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M15,17H9V15H15M15,13H9V11H15M15,9H9V7H15M5,17H7V15H5M5,13H7V11H5M5,9H7V7H5M3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19Z"/>
        </svg>`;
    },

    // 分析图标
    Analytics: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>`;
    },

    // 删除图标
    Delete: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
        </svg>`;
    },

    // Bug报告图标
    BugReport: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M14,12H10V10H14M14,16H10V14H14M20,8H17.19C16.74,7.22 16.12,6.55 15.37,6.04L17,4.41L15.59,3L13.42,5.17C12.96,5.06 12.5,5 12,5C11.5,5 11.04,5.06 10.59,5.17L8.41,3L7,4.41L8.62,6.04C7.88,6.55 7.26,7.22 6.81,8H4V10H6.09C6.04,10.33 6,10.66 6,11V12H4V14H6V15C6,15.34 6.04,15.67 6.09,16H4V18H6.81C7.85,19.79 9.78,21 12,21C14.22,21 16.15,19.79 17.19,18H20V16H17.91C17.96,15.67 18,15.34 18,15V14H20V12H18V11C18,10.66 17.96,10.33 17.91,10H20V8Z"/>
        </svg>`;
    },

    // 注释图标 - 更符合注释含义
    Comment: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M21.99 4c0-1.1-.89-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>`;
    },

    // 编辑图标 - 表示编辑注释
    Edit: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>`;
    },

    // 文档图标 - 表示文档注释
    Description: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>`;
    },

    // 笔记图标 - 表示笔记注释
    Note: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>`;
    },

    // 四角星图标 - 表示模型/算法
    StarBorder: (props = {}) => {
        const { size = 24, color = 'currentColor' } = props;
        return `<svg width="${size}" height="${size}" viewBox="0 0 1024 1024" fill="${color}">
            <path d="M939.733 495.867C733.467 451.6 572.4 290.533 528.133 84.267L512 9.2l-16.533 77.067c-44 204.933-204.267 365.2-409.2 409.2L9.2 512l76.267 16.4c205.466 44.133 366 204.533 410 410l16.4 76.4 15.866-74.133c44.4-206.8 206-368.4 412.8-412.8L1014.667 512l-74.934-16.133z"/>
        </svg>`;
    }
};

// 导出到全局作用域
window.MaterialIcons = MaterialIcons;