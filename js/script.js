// JavaScript文件 - 实现网站交互功能

// DOM元素加载完成前的初始化
(function() {
    // 1. 添加页面加载进度条
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = 'loading-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = '#1e40af';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.2s ease';
    document.body.appendChild(progressBar);
    
    // 设置初始进度
    document.addEventListener('DOMContentLoaded', function() {
        progressBar.style.width = '70%';
    });
    
    // 监听页面加载完成
    window.addEventListener('load', function() {
        setTimeout(() => {
            progressBar.style.width = '100%';
            setTimeout(() => {
                progressBar.style.opacity = '0';
                setTimeout(() => {
                    progressBar.remove();
                }, 300);
            }, 300);
        }, 200);
    });
    
    // 监听资源加载进度
    window.addEventListener('progress', function(e) {
        if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            progressBar.style.width = percent + '%';
        }
    }, false);
})();

// 创建QQ二维码弹窗函数 - 移到全局作用域
window.showQQImage = function() {
    // 检查是否已存在QQ模态框
    let modal = document.getElementById('qq-modal');
    if (modal) {
        modal.style.display = 'flex';
        return;
    }
    
    // 创建新的QQ模态框
    modal = document.createElement('div');
    modal.id = 'qq-modal';
    modal.className = 'detail-modal';
    modal.style.display = 'flex';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.maxWidth = '300px';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h3');
    modalTitle.className = 'modal-title';
    modalTitle.textContent = 'QQ二维码';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.style.textAlign = 'center';
    
    const qqImage = document.createElement('img');
    qqImage.src = 'images/QQ.png';
    qqImage.alt = 'QQ二维码';
    qqImage.style.maxWidth = '100%';
    qqImage.style.height = 'auto';
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    modalBody.appendChild(qqImage);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框外部关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
};

// DOM元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 创建微信二维码弹窗
    const createQrCodeModal = function() {
        const modal = document.createElement('div');
        modal.className = 'qr-code-modal';
        modal.id = 'wechat-modal';
        
        const content = document.createElement('div');
        content.className = 'qr-code-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-qr';
        closeBtn.innerHTML = '&times;';
        
        const qrImage = document.createElement('img');
        qrImage.className = 'qr-code-image';
        qrImage.src = 'images/微信二维码.png';
        qrImage.alt = '万里国贸之家微信群二维码';
        
        const qrText = document.createElement('p');
        qrText.style.marginTop = '15px';
        qrText.style.fontSize = '16px';
        qrText.style.color = 'var(--text-color)';
        qrText.textContent = '扫码加入万里国贸之家微信群';
        
        content.appendChild(closeBtn);
        content.appendChild(qrImage);
        content.appendChild(qrText);
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // 关闭弹窗事件
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // 点击弹窗外部关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
    
    // 创建二维码弹窗
    createQrCodeModal();
    
    // 1. 移动端菜单切换功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // 菜单切换功能
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // 防止背景滚动
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 点击菜单项后关闭菜单
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 点击菜单外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 窗口大小改变时关闭菜单
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // 滚动时关闭菜单
        window.addEventListener('scroll', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 移动端触摸优化
    if ('ontouchstart' in window) {
        // 添加触摸反馈
        document.addEventListener('touchstart', function(e) {
            if (e.target.classList.contains('btn') || 
                e.target.classList.contains('btn-primary') || 
                e.target.classList.contains('btn-submit') ||
                e.target.classList.contains('btn-secondary') ||
                e.target.classList.contains('unified-card') ||
                e.target.classList.contains('info-card') ||
                e.target.classList.contains('news-item') ||
                e.target.classList.contains('objective-item')) {
                e.target.style.transform = 'scale(0.98)';
            }
        });
        
        document.addEventListener('touchend', function(e) {
            if (e.target.classList.contains('btn') || 
                e.target.classList.contains('btn-primary') || 
                e.target.classList.contains('btn-submit') ||
                e.target.classList.contains('btn-secondary') ||
                e.target.classList.contains('unified-card') ||
                e.target.classList.contains('info-card') ||
                e.target.classList.contains('news-item') ||
                e.target.classList.contains('objective-item')) {
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            }
        });
        
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // 移动端性能优化
    if (window.innerWidth <= 768) {
        // 减少动画复杂度
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                
                .unified-card:hover,
                .info-card:hover,
                .news-item:hover,
                .objective-item:hover {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 延迟加载非关键资源
        const lazyLoadImages = function() {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        };
        
        // 页面加载完成后执行延迟加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', lazyLoadImages);
        } else {
            lazyLoadImages();
        }
    }
    
    // 滚动效果 - 导航栏样式变化
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // 2. 平滑滚动导航
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 如果是移动端导航，点击后关闭菜单
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // 论坛留言的本地存储功能 - 初始化
    const initializeForum = function() {
        // 配置项
        window.forumConfig = {
            maxMessages: 50, // 最多保存的留言数量
            messagesPerPage: 5 // 每页显示的留言数量
        };
        
        // 当前页码
        window.forumCurrentPage = 1;
        
        // 加载存储的留言
        const loadMessages = function() {
            // 获取留言容器
            const messagesContainer = document.querySelector('.forum-messages');
            if (!messagesContainer) return;
            
            // 获取留言列表
            const storedMessages = localStorage.getItem('forumMessages');
            const messages = storedMessages ? JSON.parse(storedMessages) : [];
            
            // 按时间戳排序（降序）
            messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // 移除所有非示例留言
            const existingMessages = messagesContainer.querySelectorAll('.message-item:not(.example-message)');
            existingMessages.forEach(message => {
                message.remove();
            });
            
            // 如果是第一次访问，添加示例数据
            if (messages.length === 0) {
                const exampleMessages = [
                    {
                        id: generateId(),
                        name: "张三 - 国贸2101班",
                        email: "example1@zwu.edu.cn",
                        content: "希望专业能多组织一些实践活动，比如企业参观、行业讲座等，这样可以帮助我们更好地了解实际工作环境和行业需求。",
                        timestamp: new Date('2023-05-20').toISOString()
                    },
                    {
                        id: generateId(),
                        name: "李四 - 国贸2102班",
                        email: "example2@zwu.edu.cn",
                        content: "请问专业需求页面中的一些证书考试时间和报名方式在哪里可以查询到？有没有相关的备考资料可以分享？",
                        timestamp: new Date('2023-05-18').toISOString()
                    },
                    {
                        id: generateId(),
                        name: "王五 - 国贸2001班",
                        email: "example3@zwu.edu.cn",
                        content: "作为学长，建议学弟学妹们尽早确定自己的职业规划，并根据规划有针对性地学习和考取相关证书，这对以后的就业会有很大帮助。",
                        timestamp: new Date('2023-05-15').toISOString()
                    },
                    {
                        id: generateId(),
                        name: "赵六 - 国贸2002班",
                        email: "example4@zwu.edu.cn",
                        content: "希望学院能提供更多的实习机会和就业指导，帮助我们更好地完成从学生到职场人的转变。",
                        timestamp: new Date('2023-05-10').toISOString()
                    },
                    {
                        id: generateId(),
                        name: "钱七 - 国贸1901班",
                        email: "example5@zwu.edu.cn",
                        content: "已经毕业一年了，感谢母校和老师们的培养。建议在校的同学们珍惜大学时光，多学习、多实践、多交流，为未来的发展打下坚实的基础。",
                        timestamp: new Date('2023-05-05').toISOString()
                    }
                ];
                
                // 保存示例数据
                localStorage.setItem('forumMessages', JSON.stringify(exampleMessages));
                
                // 重新获取数据
                return loadMessages();
            }
            
            // 处理分页
            renderPagination(messages);
            
            // 显示当前页的留言
            showCurrentPageMessages(messages);
        };
        
        // 创建留言元素
        const createMessageElement = function(message, isExample = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message-item' + (isExample ? ' example-message' : '');
            messageDiv.dataset.id = message.id;
            
            const messageHeader = document.createElement('div');
            messageHeader.className = 'message-header';
            
            // 格式化显示名称为：姓名 - 班级
            const displayName = message.name || (message.userName && message.className ? 
                `${message.userName} - ${message.className}` : 
                message.userName || '匿名用户');
            
            // 确保专业信息正确显示
            const majorInfo = message.major ? `专业：${message.major}` : '';
            
            // 构建作者和日期信息
            const authorSpan = document.createElement('span');
            authorSpan.className = 'message-author';
            authorSpan.textContent = displayName;
            
            const dateSpan = document.createElement('span');
            dateSpan.className = 'message-date';
            dateSpan.textContent = formatDateTime(message.timestamp || message.createTime);
            
            // 构建留言内容
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.textContent = message.content || '无内容';
            
            // 将所有元素添加到messageHeader和messageDiv
            messageHeader.appendChild(authorSpan);
            
            // 添加专业信息
            if (majorInfo) {
                const majorSpan = document.createElement('span');
                majorSpan.className = 'message-major';
                majorSpan.textContent = majorInfo;
                messageHeader.appendChild(majorSpan);
            }
            
            messageHeader.appendChild(dateSpan);
            messageDiv.appendChild(messageHeader);
            messageDiv.appendChild(messageContent);
            
            return messageDiv;
        };
        
        // 保存留言到本地存储
        const saveMessage = function(message) {
            // 验证留言对象
            if (!message || typeof message !== 'object') {
                console.error('保存留言失败：无效的留言对象');
                return null;
            }
            
            // 获取现有留言
            const storedMessages = localStorage.getItem('forumMessages');
            const messages = storedMessages ? JSON.parse(storedMessages) : [];
            
            // 确保messages是数组
            if (!Array.isArray(messages)) {
                console.error('本地存储数据格式错误，重置为数组');
                messages = [];
            }
            
            // 为留言对象创建副本，避免直接修改传入的对象
            const newMessage = {...message};
            
            // 添加ID和时间戳
            newMessage.id = generateId();
            newMessage.timestamp = new Date().toISOString();
            
            // 添加新留言
            messages.unshift(newMessage); // 添加到开头
            
            // 最多保存指定数量的留言
            if (messages.length > config.maxMessages) {
                messages.splice(config.maxMessages);
            }
            
            try {
                // 保存回本地存储
                localStorage.setItem('forumMessages', JSON.stringify(messages));
                
                // 重新加载留言
                loadMessages();
                
                return newMessage.id;
            } catch (error) {
                console.error('保存留言到本地存储失败：', error);
                return null;
            }
        };
        

        
        // 渲染分页控件
        const renderPagination = function(messages) {
            const messagesContainer = document.querySelector('.forum-messages');
            if (!messagesContainer) return;
            
            // 移除旧的分页控件
            const oldPagination = document.querySelector('.pagination');
            if (oldPagination) {
                oldPagination.remove();
            }
            
            // 计算总页数
            const config = window.forumConfig || { messagesPerPage: 5 };
            const totalPages = Math.ceil(messages.length / config.messagesPerPage);
            
            // 如果只有一页，不需要分页
            if (totalPages <= 1) return;
            
            // 创建分页控件
            const pagination = document.createElement('div');
            pagination.className = 'pagination';
            
            // 添加上一页按钮
            const prevBtn = document.createElement('button');
            prevBtn.className = 'pagination-btn prev-btn';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> 上一页';
            prevBtn.disabled = window.forumCurrentPage === 1;
            prevBtn.addEventListener('click', function() {
                if (window.forumCurrentPage > 1) {
                    window.forumCurrentPage--;
                    showCurrentPageMessages(messages);
                    renderPagination(messages);
                }
            });
            pagination.appendChild(prevBtn);
            
            // 添加页码按钮
            const pageNumbers = document.createElement('div');
            pageNumbers.className = 'page-numbers';
            
            // 计算显示的页码范围
            let currentPage = window.forumCurrentPage || 1;
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            
            // 调整起始页码以确保显示5个页码
            if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4);
            }
            
            // 添加第一页按钮
            if (startPage > 1) {
                const firstPageBtn = createPageButton(1, messages);
                pageNumbers.appendChild(firstPageBtn);
                
                if (startPage > 2) {
                    const ellipsis = document.createElement('span');
                    ellipsis.className = 'pagination-ellipsis';
                    ellipsis.textContent = '...';
                    pageNumbers.appendChild(ellipsis);
                }
            }
            
            // 添加中间页码按钮
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = createPageButton(i, messages);
                pageNumbers.appendChild(pageBtn);
            }
            
            // 添加最后一页按钮
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    const ellipsis = document.createElement('span');
                    ellipsis.className = 'pagination-ellipsis';
                    ellipsis.textContent = '...';
                    pageNumbers.appendChild(ellipsis);
                }
                
                const lastPageBtn = createPageButton(totalPages, messages);
                pageNumbers.appendChild(lastPageBtn);
            }
            
            pagination.appendChild(pageNumbers);
            
            // 添加下一页按钮
            const nextBtn = document.createElement('button');
            nextBtn.className = 'pagination-btn next-btn';
            nextBtn.innerHTML = '下一页 <i class="fas fa-chevron-right"></i>';
            nextBtn.disabled = window.forumCurrentPage === totalPages;
            nextBtn.addEventListener('click', function() {
                if (window.forumCurrentPage < totalPages) {
                    window.forumCurrentPage++;
                    showCurrentPageMessages(messages);
                    renderPagination(messages);
                }
            });
            pagination.appendChild(nextBtn);
            
            // 添加到留言容器底部
            messagesContainer.appendChild(pagination);
        };
        
        // 创建页码按钮
        const createPageButton = function(pageNum, messages) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-btn page-btn' + (pageNum === window.forumCurrentPage ? ' active' : '');
            pageBtn.textContent = pageNum;
            pageBtn.addEventListener('click', function() {
                window.forumCurrentPage = pageNum;
                showCurrentPageMessages(messages);
                renderPagination(messages);
            });
            return pageBtn;
        };
        
        // 显示当前页的留言
        const showCurrentPageMessages = function(messages) {
            const messagesContainer = document.querySelector('.forum-messages');
            if (!messagesContainer) {
                console.error('找不到留言容器元素');
                return;
            }
            
            // 获取留言标题元素，如果没有则使用容器作为插入点
            let messagesHeading = messagesContainer.querySelector('h3');
            let insertPoint = messagesContainer.firstChild;
            
            // 移除所有现有留言（包括示例留言和之前加载的留言）
            const existingMessages = messagesContainer.querySelectorAll('.message-item');
            existingMessages.forEach(message => {
                message.remove();
            });
            
            // 移除空状态提示
            const emptyState = messagesContainer.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
            
            // 计算当前页的留言范围 - 使用配置中的每页留言数
              const pageSize = window.forumConfig?.messagesPerPage || 5;
              const currentPage = window.forumCurrentPage || 1;
              const startIndex = (currentPage - 1) * pageSize;
              const endIndex = Math.min(startIndex + pageSize, messages.length);
              const currentPageMessages = messages.slice(startIndex, endIndex);
            
            // 添加当前页的留言
            if (currentPageMessages.length > 0) {
                currentPageMessages.forEach(message => {
                    const messageElement = createMessageElement(message);
                    if (messagesHeading) {
                        messagesContainer.insertBefore(messageElement, messagesHeading.nextSibling);
                    } else {
                        messagesContainer.appendChild(messageElement);
                    }
                });
            } else {
                // 如果当前页没有留言，显示提示
                const noMessages = document.createElement('div');
                noMessages.className = 'empty-state';
                noMessages.innerHTML = `
                    <i class="fas fa-info-circle"></i>
                    <p>当前页暂无留言</p>
                `;
                if (messagesHeading) {
                    messagesContainer.insertBefore(noMessages, messagesHeading.nextSibling);
                } else {
                    messagesContainer.appendChild(noMessages);
                }
            }
            
            // 隐藏占位符提示
            const placeholderNotice = document.querySelector('.placeholder-notice');
            if (placeholderNotice) {
                placeholderNotice.style.display = 'none';
            }
        };
        
        // 生成唯一ID
        const generateId = function() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        };
        
        // 格式化日期时间
        const formatDateTime = function(timestamp) {
            const date = new Date(timestamp);
            const now = new Date();
            const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
            
            // 如果是今天，只显示时间
            if (date.toDateString() === now.toDateString()) {
                return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
            }
            
            // 如果是昨天，显示"昨天 时间"
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            if (date.toDateString() === yesterday.toDateString()) {
                return '昨天 ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
            }
            
            // 如果是今年，显示"月-日 时间"
            if (date.getFullYear() === now.getFullYear()) {
                return `${date.getMonth() + 1}-${date.getDate()} ${date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
            }
            
            // 其他情况，显示完整日期时间
            return date.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        };
        
        // 添加表单验证功能
        const addFormValidation = function() {
            const messageForm = document.getElementById('messageForm');
            if (!messageForm) return;
            
            // 移除原有的placeholder-notice
            const placeholderNotice = document.querySelector('.placeholder-notice');
            if (placeholderNotice) {
                placeholderNotice.remove();
            }
            
            // 添加表单验证
            messageForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 移除所有错误提示
                document.querySelectorAll('.error-message').forEach(el => el.remove());
                
                // 获取表单数据
                const name = document.getElementById('name').value.trim();
                const studentId = document.getElementById('studentId').value.trim();
                const major = document.getElementById('major').value.trim();
                const className = document.getElementById('class').value.trim();
                const content = document.getElementById('content').value.trim();
                
                let isValid = true;
                
                // 验证姓名
                if (!name) {
                    showError('name', '请输入您的姓名');
                    isValid = false;
                } else if (name.length > 20) {
                    showError('name', '姓名不能超过20个字符');
                    isValid = false;
                }
                
                // 验证学号
                if (!studentId) {
                    showError('studentId', '请输入您的学号');
                    isValid = false;
                } else if (studentId.length > 20) {
                    showError('studentId', '学号不能超过20个字符');
                    isValid = false;
                }
                
                // 验证专业
                if (!major) {
                    showError('major', '请输入您的专业');
                    isValid = false;
                } else if (major.length > 20) {
                    showError('major', '专业名称不能超过20个字符');
                    isValid = false;
                }
                
                // 验证班级
                if (!className) {
                    showError('class', '请输入您的班级');
                    isValid = false;
                } else if (className.length > 20) {
                    showError('class', '班级名称不能超过20个字符');
                    isValid = false;
                }
                
                // 验证留言内容
                if (!content) {
                    showError('content', '请输入您的留言内容');
                    isValid = false;
                } else if (content.length > 500) {
                    showError('content', '留言内容不能超过500个字符');
                    isValid = false;
                }
                
                // 如果验证通过，提交表单
                if (isValid) {
                    // 格式化为示例中的显示格式：姓名 - 班级
                    const displayName = `${name} - ${className}`;
                    
                    const newMessage = {
                        name: displayName,
                        studentId: studentId,
                        major: major,
                        className: className,
                        content: content
                    };","},{"old_str":"                    // 成功提示
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = '感谢您的留言！';
                    contactForm.prepend(successMessage);","new_str":"                    // 成功提示
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = '感谢您的留言！';
                    messageForm.prepend(successMessage);"},{"old_str":"                    // 重置表单
                    contactForm.reset();","new_str":"                    // 重置表单
                    messageForm.reset();"},{"old_str":
                    
                    // 保存留言
                    saveMessage(newMessage);
                    
                    // 成功提示
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = '感谢您的留言！';
                    messageForm.prepend(successMessage);
                    
                    // 5秒后移除成功提示
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                    
                    // 重置表单
                    messageForm.reset();
                }
            });
            
            // 显示错误信息
            const showError = function(fieldId, message) {
                const field = document.getElementById(fieldId);
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.textContent = message;
                
                // 将错误信息添加到字段后面
                field.parentNode.appendChild(errorElement);
                
                // 给字段添加错误样式
                field.classList.add('error');
                
                // 当用户开始输入时，移除错误提示
                field.addEventListener('input', function clearError() {
                    errorElement.remove();
                    field.classList.remove('error');
                    field.removeEventListener('input', clearError);
                }, { once: true });
            };
            
            // 添加表单输入监听，实时验证
            messageForm.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('blur', function() {
                    // 只验证非空字段
                    if (this.value.trim()) {
                        // 移除可能存在的错误提示
                        const existingError = this.parentNode.querySelector('.error-message');
                        if (existingError) {
                            existingError.remove();
                        }
                        this.classList.remove('error');
                    }
                });
            });
        };
        
        // 添加样式
        const addStyles = function() {
            const style = document.createElement('style');
            style.textContent = `
                /* 论坛表单样式 */
                .forum-form {
                    margin-bottom: 30px;
                }
                
                .form-group {
                    margin-bottom: 20px;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 12px;
                    border: 2px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    font-size: 14px;
                    transition: var(--transition-base);
                    outline: none;
                    background-color: var(--bg-primary);
                    color: var(--text-primary);
                }
                
                .form-group input:focus,
                .form-group textarea:focus {
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
                }
                
                .form-group textarea {
                    resize: vertical;
                    min-height: 120px;
                }
                
                .btn-submit {
                    padding: 12px 30px;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: var(--radius-sm);
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition-base);
                }
                
                .btn-submit:hover {
                    background-color: var(--hover-color);
                }
                
                /* 错误提示样式 */
                .error-message {
                    color: #e53e3e;
                    font-size: 12px;
                    margin-top: 5px;
                    display: flex;
                    align-items: center;
                }
                
                .error-message::before {
                    content: '\f071';
                    font-family: 'Font Awesome 6 Free';
                    font-weight: 900;
                    margin-right: 5px;
                }
                
                .form-group input.error,
                .form-group textarea.error {
                    border-color: #e53e3e;
                }
                
                /* 成功提示样式 */
                .success-message {
                    background-color: #48bb78;
                    color: white;
                    padding: 12px;
                    border-radius: var(--radius-sm);
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: 600;
                }
                
                /* 留言样式 */
                .forum-messages {
                    margin-top: 40px;
                }
                
                /* 专业信息样式 */
                .message-major {
                    font-size: 12px;
                    color: #666;
                    margin-left: 10px;
                    font-style: italic;
                }
                
                .message-item {
                    background-color: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    padding: 20px;
                    margin-bottom: 15px;
                    transition: var(--transition-base);
                    position: relative;
                }
                
                .message-item:hover {
                    box-shadow: var(--shadow-medium);
                    border-color: var(--primary-color);
                }
                
                .message-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }
                
                .message-author {
                    font-weight: 600;
                    color: var(--primary-color);
                }
                
                .message-date {
                    font-size: 12px;
                    color: var(--text-secondary);
                }
                
                .message-content {
                    line-height: 1.6;
                    color: var(--text-primary);
                }
                
                /* 留言操作按钮 */
                .message-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid var(--border-color);
                }
                
                .message-action-btn {
                    padding: 6px 12px;
                    border: none;
                    border-radius: var(--radius-sm);
                    font-size: 12px;
                    cursor: pointer;
                    transition: var(--transition-base);
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .edit-btn {
                    background-color: #f6ad55;
                    color: white;
                }
                
                .edit-btn:hover {
                    background-color: #ed8936;
                }
                
                .delete-btn {
                    background-color: #fc8181;
                    color: white;
                }
                
                .delete-btn:hover {
                    background-color: #f56565;
                }
                
                /* 编辑模态框样式 */
                .edit-modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: 2000;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                
                .modal-content {
                    background-color: var(--bg-primary);
                    border-radius: var(--radius-md);
                    max-width: 500px;
                    width: 100%;
                    animation: slideInUp 0.4s ease;
                }
                
                .modal-header {
                    padding: 20px;
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: var(--primary-color);
                }
                
                .close-modal {
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: var(--transition-base);
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }
                
                .close-modal:hover {
                    background-color: var(--bg-tertiary);
                    color: var(--text-primary);
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 20px;
                }
                
                .btn-primary {
                    padding: 10px 20px;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: var(--radius-sm);
                    font-size: 14px;
                    cursor: pointer;
                    transition: var(--transition-base);
                }
                
                .btn-primary:hover {
                    background-color: var(--hover-color);
                }
                
                .btn-secondary {
                    padding: 10px 20px;
                    background-color: var(--bg-tertiary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    font-size: 14px;
                    cursor: pointer;
                    transition: var(--transition-base);
                }
                
                .btn-secondary:hover {
                    background-color: var(--border-color);
                }
                
                /* 分页样式 */
                .pagination {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                    margin-top: 30px;
                    padding: 20px;
                    background-color: var(--bg-secondary);
                    border-radius: var(--radius-md);
                }
                
                .pagination-btn {
                    padding: 8px 16px;
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-sm);
                    background-color: var(--bg-primary);
                    color: var(--text-primary);
                    cursor: pointer;
                    transition: var(--transition-base);
                    font-size: 14px;
                }
                
                .pagination-btn:hover:not(:disabled) {
                    background-color: var(--primary-light);
                    border-color: var(--primary-color);
                    color: var(--primary-color);
                }
                
                .pagination-btn.active {
                    background-color: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                .pagination-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .page-numbers {
                    display: flex;
                    gap: 5px;
                }
                
                .pagination-ellipsis {
                    padding: 8px 10px;
                    color: var(--text-secondary);
                }
                
                /* 空状态样式 */
                .empty-state {
                    text-align: center;
                    padding: 60px 20px;
                    color: var(--text-secondary);
                }
                
                .empty-state i {
                    font-size: 48px;
                    margin-bottom: 15px;
                    opacity: 0.5;
                }
                
                /* 示例留言样式 */
                .example-message {
                    background-color: var(--bg-tertiary);
                    position: relative;
                }
                
                .example-message::after {
                    content: '示例';
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    padding: 2px 8px;
                    background-color: var(--primary-light);
                    color: var(--primary-color);
                    font-size: 12px;
                    border-radius: var(--radius-sm);
                }
                
                /* 响应式设计 */
                @media (max-width: 768px) {
                    .message-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 5px;
                    }
                    
                    .message-actions {
                        flex-wrap: wrap;
                    }
                    
                    .pagination {
                        flex-wrap: wrap;
                    }
                    
                    .page-numbers {
                        order: 3;
                        width: 100%;
                        justify-content: center;
                        margin-top: 10px;
                    }
                }
            `;
            document.head.appendChild(style);
        };
        
        // 初始化
        addFormValidation();
        addStyles();
        
        // 确保DOM加载完成后再加载留言
        if (document.readyState === 'complete' || document.readyState !== 'loading') {
            setTimeout(loadMessages, 100);
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                loadMessages();
            });
        }
        

    
    // 添加元素进入视口时的动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .objective-item, .class-item, .news-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 设置初始动画状态
    document.querySelectorAll('.about-content, .objective-item, .class-item, .news-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // 初始执行一次
    animateOnScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
    
    // 响应式处理
    const handleResize = function() {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    };
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 专业需求页面信息展示优化
    const optimizeRequirementsPage = function() {
        // 检查是否在专业需求页面
        if (!window.location.pathname.includes('requirements.html')) return;
        
        // 修复竞赛名称不完整的问题
        const competitionItems = document.querySelectorAll('.competition-item h5');
        competitionItems.forEach(item => {
            if (item.textContent === '全国大学生模') {
                item.textContent = '全国大学生模拟联合国';
            } else if (item.textContent === '全国大学生全') {
                item.textContent = '全国大学生全能挑战赛';
            }
        });
        
        // 1. 课程体系卡片式布局重新设计
        const courseCategories = document.querySelectorAll('.course-category');
        courseCategories.forEach(category => {
            const tagsContainer = category.querySelector('.course-tags');
            if (tagsContainer) {
                const tags = tagsContainer.querySelectorAll('span');
                const categoryTitle = category.querySelector('h4').textContent;
                
                // 创建网格布局的卡片容器
                const cardsContainer = document.createElement('div');
                cardsContainer.className = 'course-cards-grid';
                
                tags.forEach((tag, index) => {
                    const card = document.createElement('div');
                    card.className = 'course-card';
                    card.dataset.courseName = tag.textContent;
                    
                    // 添加课程卡片内容
                    card.innerHTML = `
                        <div class="course-card-number">${index + 1}</div>
                        <h5 class="course-card-title">${tag.textContent}</h5>
                        <div class="course-card-hover">
                            <span class="course-detail-btn">查看详情</span>
                        </div>
                    `;
                    
                    // 添加卡片点击效果
                    card.addEventListener('click', function() {
                        // 显示课程详情弹窗
                        showCourseDetail(tag.textContent);
                    });
                    
                    cardsContainer.appendChild(card);
                });
                
                // 替换标签容器为卡片容器
                tagsContainer.parentNode.replaceChild(cardsContainer, tagsContainer);
            }
        });
        
        // 2. 为不同的证书类型添加分类标签
        const certificationTags = document.querySelectorAll('.certification-tags span');
        certificationTags.forEach(tag => {
            // 根据证书名称判断类型
            let certType = '';
            let typeColor = '';
            
            if (tag.textContent.includes('国际')) {
                certType = '国际认证';
                typeColor = 'blue';
            } else if (tag.textContent.includes('专业')) {
                certType = '专业资格';
                typeColor = 'green';
            } else if (tag.textContent.includes('语言')) {
                certType = '语言能力';
                typeColor = 'purple';
            } else if (tag.textContent.includes('计算机')) {
                certType = '技术认证';
                typeColor = 'orange';
            } else {
                certType = '其他证书';
                typeColor = 'gray';
            }
            
            // 创建分类标签
            const typeBadge = document.createElement('span');
            typeBadge.className = `cert-type-badge type-${typeColor}`;
            typeBadge.textContent = certType;
            
            // 为标签添加点击展开详情功能
            const originalText = tag.textContent;
            tag.innerHTML = `
                <span class="cert-name">${originalText}</span>
                <span class="cert-detail-icon">+</span>
            `;
            tag.appendChild(typeBadge);
            
            // 添加点击事件
            tag.addEventListener('click', function() {
                showCertDetail(originalText, certType);
            });
        });
        
        // 3. 添加特定的搜索过滤功能
        addRequirementsSearch();
        
        // 4. 添加就业数据可视化
        addEmploymentDataVisualization();
        
        // 5. 添加更多交互元素和提示信息
        addInteractiveElements();
        
        // 保持原有的分类导航
        const requirementsContent = document.querySelector('.requirements-content');
        const requirementCategories = document.querySelectorAll('.requirement-category');
        
        if (requirementsContent && requirementCategories.length > 0) {
            const navContainer = document.createElement('div');
            navContainer.className = 'requirements-nav';
            
            const navList = document.createElement('ul');
            
            requirementCategories.forEach((category, index) => {
                const title = category.querySelector('h3').textContent;
                const cleanTitle = title.replace(/^\s*[\u2600-\u26FF\uF000-\uF8FF]\s*/, ''); // 移除图标
                
                // 为分类添加ID
                const categoryId = 'category-' + index;
                category.id = categoryId;
                
                const navItem = document.createElement('li');
                const navLink = document.createElement('a');
                navLink.href = '#' + categoryId;
                navLink.textContent = cleanTitle;
                
                navLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetElement = document.getElementById(categoryId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
                
                navItem.appendChild(navLink);
                navList.appendChild(navItem);
            });
            
            navContainer.appendChild(navList);
            
            // 将导航添加到内容区域顶部
            requirementsContent.parentNode.insertBefore(navContainer, requirementsContent);
        }
    };
    
    // 显示课程详情
    const showCourseDetail = function(courseName) {
        // 创建详情模态框
        let modal = document.getElementById('course-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'course-detail-modal';
            modal.className = 'detail-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="course-info">
                            <p class="course-description">加载中...</p>
                            <div class="course-details">
                                <p><strong>学分：</strong><span class="course-credits">3.0</span></p>
                                <p><strong>课时：</strong><span class="course-hours">48</span></p>
                                <p><strong>考核方式：</strong><span class="course-assessment">考试</span></p>
                                <p><strong>学习目标：</strong><span class="course-goal">掌握该课程的核心知识和技能</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // 添加关闭事件
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // 点击模态框外部关闭
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // 设置课程信息
        modal.querySelector('.modal-title').textContent = courseName;
        
        // 模拟不同课程的描述
        let description = '该课程是本专业的重要课程，涵盖了基础理论和实践应用。';
        if (courseName.includes('经济')) {
            description = '本课程主要介绍经济学的基本原理和分析方法，培养学生的经济思维能力和分析问题的能力。';
        } else if (courseName.includes('管理')) {
            description = '本课程系统讲解现代管理理论和方法，注重培养学生的管理技能和实践能力。';
        } else if (courseName.includes('贸易')) {
            description = '本课程全面介绍国际贸易的基本理论、政策和实务，是专业核心课程之一。';
        } else if (courseName.includes('法律')) {
            description = '本课程主要讲解国际贸易相关法律法规，培养学生的法律意识和合规经营能力。';
        }
        
        modal.querySelector('.course-description').textContent = description;
        
        // 显示模态框
        modal.style.display = 'flex';
    };
    
    // 显示证书详情
    const showCertDetail = function(certName, certType) {
        // 创建详情模态框
        let modal = document.getElementById('cert-detail-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'cert-detail-modal';
            modal.className = 'detail-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title"></h3>
                        <span class="close-modal">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="cert-info">
                            <p class="cert-type"></p>
                            <p class="cert-description">加载中...</p>
                            <div class="cert-preparation">
                                <h4>备考建议：</h4>
                                <ul>
                                    <li>提前6个月开始准备</li>
                                    <li>掌握考试大纲要求的知识点</li>
                                    <li>多做真题练习</li>
                                    <li>参加专业培训课程</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // 添加关闭事件
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
            
            // 点击模态框外部关闭
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
        
        // 设置证书信息
        modal.querySelector('.modal-title').textContent = certName;
        modal.querySelector('.cert-type').textContent = `证书类型：${certType}`;
        
        // 模拟证书描述
        let description = '该证书是行业认可的专业资格证书，对提升就业竞争力有重要作用。';
        if (certType === '国际认证') {
            description = '该证书在国际范围内得到广泛认可，是进入跨国企业的重要资质证明。';
        } else if (certType === '专业资格') {
            description = '该证书是本行业的核心资格证书，是从事相关工作的必备条件。';
        } else if (certType === '语言能力') {
            description = '该证书证明了你的语言能力水平，对于从事国际业务的工作尤为重要。';
        } else if (certType === '技术认证') {
            description = '该证书证明了你的专业技术能力，是展示个人专业水平的重要凭证。';
        }
        
        modal.querySelector('.cert-description').textContent = description;
        
        // 显示模态框
        modal.style.display = 'flex';
    };
    
    // 添加专业需求页面的搜索过滤功能
    const addRequirementsSearch = function() {
        // 创建搜索容器
        const searchContainer = document.createElement('div');
        searchContainer.className = 'requirements-search-container';
        searchContainer.innerHTML = `
            <div class="search-filters">
                <input type="text" id="requirements-search" placeholder="搜索课程、证书、技能...">
                <select id="search-category">
                    <option value="all">全部分类</option>
                    <option value="courses">课程</option>
                    <option value="certs">证书</option>
                    <option value="skills">技能</option>
                    <option value="careers">就业</option>
                </select>
                <button id="search-btn" class="btn-primary">搜索</button>
            </div>
            <div class="search-results-info">
                <span id="results-count">显示全部内容</span>
                <button id="clear-search" class="btn-secondary">清除搜索</button>
            </div>
        `;
        
        // 将搜索框添加到内容区域顶部
        const requirementsContent = document.querySelector('.requirements-content');
        if (requirementsContent) {
            requirementsContent.parentNode.insertBefore(searchContainer, requirementsContent);
        }
        
        // 获取搜索元素
        const searchInput = document.getElementById('requirements-search');
        const searchCategory = document.getElementById('search-category');
        const searchBtn = document.getElementById('search-btn');
        const clearSearchBtn = document.getElementById('clear-search');
        const resultsCount = document.getElementById('results-count');
        
        // 搜索功能
        const performSearch = function() {
            const query = searchInput.value.toLowerCase();
            const category = searchCategory.value;
            
            // 获取所有可搜索元素
            let elementsToSearch = [];
            
            if (category === 'all' || category === 'courses') {
                elementsToSearch = elementsToSearch.concat(Array.from(document.querySelectorAll('.course-card')));
            }
            if (category === 'all' || category === 'certs') {
                elementsToSearch = elementsToSearch.concat(Array.from(document.querySelectorAll('.certification-tags span')));
            }
            if (category === 'all' || category === 'skills') {
                elementsToSearch = elementsToSearch.concat(Array.from(document.querySelectorAll('.tool-tags span')));
            }
            if (category === 'all' || category === 'careers') {
                elementsToSearch = elementsToSearch.concat(Array.from(document.querySelectorAll('.career-tags span')));
            }
            
            // 存储所有匹配的元素
            const matchedElements = [];
            
            // 遍历并搜索
            elementsToSearch.forEach(element => {
                let text = '';
                if (element.dataset.courseName) {
                    text = element.dataset.courseName.toLowerCase();
                } else {
                    text = element.textContent.toLowerCase();
                }
                
                if (query === '' || text.includes(query)) {
                    // 显示匹配的元素
                    element.style.display = '';
                    // 如果是卡片，显示其父容器
                    if (element.closest('.course-cards-grid')) {
                        element.closest('.course-cards-grid').style.display = '';
                        element.closest('.course-category').style.display = '';
                    } else {
                        element.style.display = '';
                    }
                    matchedElements.push(element);
                } else {
                    // 隐藏不匹配的元素
                    element.style.display = 'none';
                }
            });
            
            // 更新搜索结果信息
            if (query === '') {
                resultsCount.textContent = '显示全部内容';
            } else {
                resultsCount.textContent = `找到 ${matchedElements.length} 个匹配项`;
            }
            
            // 检查并隐藏空的分类
            const courseCategories = document.querySelectorAll('.course-category');
            courseCategories.forEach(category => {
                const visibleCards = category.querySelectorAll('.course-card:not([style*="display: none"])');
                if (visibleCards.length === 0) {
                    category.style.display = 'none';
                }
            });
        };
        
        // 清除搜索
        const clearSearch = function() {
            searchInput.value = '';
            searchCategory.value = 'all';
            performSearch();
        };
        
        // 添加事件监听器
        searchBtn.addEventListener('click', performSearch);
        clearSearchBtn.addEventListener('click', clearSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        searchCategory.addEventListener('change', performSearch);
        
        // 添加搜索样式
        const style = document.createElement('style');
        style.textContent = `
            .requirements-search-container {
                margin-bottom: 30px;
                padding: 20px;
                background-color: var(--bg-primary);
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-medium);
            }
            
            .search-filters {
                display: flex;
                gap: 15px;
                margin-bottom: 15px;
                flex-wrap: wrap;
            }
            
            #requirements-search {
                flex: 1;
                min-width: 200px;
                padding: 12px 15px;
                border: 2px solid var(--border-color);
                border-radius: var(--radius-sm);
                font-size: 14px;
                transition: var(--transition-base);
                outline: none;
            }
            
            #requirements-search:focus {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
            }
            
            #search-category {
                padding: 12px 15px;
                border: 2px solid var(--border-color);
                border-radius: var(--radius-sm);
                font-size: 14px;
                background-color: var(--bg-primary);
                cursor: pointer;
                outline: none;
            }
            
            #search-btn {
                white-space: nowrap;
            }
            
            .search-results-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 10px;
                border-top: 1px solid var(--border-color);
            }
            
            #results-count {
                font-size: 14px;
                color: var(--text-secondary);
            }
            
            .btn-secondary {
                padding: 8px 16px;
                background-color: var(--bg-tertiary);
                color: var(--text-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                font-size: 14px;
                cursor: pointer;
                transition: var(--transition-base);
            }
            
            .btn-secondary:hover {
                background-color: var(--border-color);
            }
            
            @media (max-width: 768px) {
                .search-filters {
                    flex-direction: column;
                }
                
                #requirements-search,
                #search-category,
                #search-btn {
                    width: 100%;
                }
                
                .search-results-info {
                    flex-direction: column;
                    gap: 10px;
                    align-items: flex-start;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // 添加就业数据可视化
    const addEmploymentDataVisualization = function() {
        // 检查是否已加载Chart.js，如果没有则加载
        if (!window.Chart) {
            // 动态加载Chart.js库
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = function() {
                createEmploymentCharts();
            };
            document.head.appendChild(script);
        } else {
            createEmploymentCharts();
        }
        
        function createEmploymentCharts() {
            // 查找就业方向与发展部分
            const careerSection = document.querySelector('.career-section');
            if (!careerSection) return;
            
            // 创建图表容器
            const chartsContainer = document.createElement('div');
            chartsContainer.className = 'employment-charts';
            chartsContainer.innerHTML = `
                <h4>就业数据分析</h4>
                <div class="charts-grid">
                    <div class="chart-container">
                        <h5>就业行业分布</h5>
                        <canvas id="industryChart"></canvas>
                    </div>
                    <div class="chart-container">
                        <h5>薪资水平分布</h5>
                        <canvas id="salaryChart"></canvas>
                    </div>
                </div>
                <div class="employment-table-container">
                    <h5>近三年就业数据统计</h5>
                    <table class="employment-table">
                        <thead>
                            <tr>
                                <th>年份</th>
                                <th>就业率</th>
                                <th>平均起薪(元)</th>
                                <th>专业对口率</th>
                                <th>主要就业城市</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023</td>
                                <td>98.2%</td>
                                <td>6,500</td>
                                <td>85.7%</td>
                                <td>上海、杭州、宁波</td>
                            </tr>
                            <tr>
                                <td>2022</td>
                                <td>97.5%</td>
                                <td>6,200</td>
                                <td>83.2%</td>
                                <td>上海、杭州、宁波</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td>96.8%</td>
                                <td>5,800</td>
                                <td>81.5%</td>
                                <td>上海、杭州、宁波</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `;
            
            // 将图表添加到就业部分
            careerSection.appendChild(chartsContainer);
            
            // 创建就业行业分布饼图
            const industryCtx = document.getElementById('industryChart').getContext('2d');
            new Chart(industryCtx, {
                type: 'pie',
                data: {
                    labels: ['国际贸易', '跨境电商', '金融服务', '物流运输', '市场营销', '其他'],
                    datasets: [{
                        data: [35, 25, 15, 10, 10, 5],
                        backgroundColor: [
                            '#1e40af',
                            '#3b82f6',
                            '#60a5fa',
                            '#93c5fd',
                            '#bfdbfe',
                            '#dbeafe'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                usePointStyle: true,
                                padding: 15
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
            
            // 创建薪资水平分布柱状图
            const salaryCtx = document.getElementById('salaryChart').getContext('2d');
            new Chart(salaryCtx, {
                type: 'bar',
                data: {
                    labels: ['5K以下', '5K-7K', '7K-9K', '9K-12K', '12K以上'],
                    datasets: [{
                        label: '毕业生比例',
                        data: [15, 35, 25, 15, 10],
                        backgroundColor: '#1e40af',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.parsed.y + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            
            // 添加图表样式
            const style = document.createElement('style');
            style.textContent = `
                .employment-charts {
                    margin-top: 30px;
                    padding: 25px;
                    background-color: var(--bg-secondary);
                    border-radius: var(--radius-md);
                }
                
                .employment-charts h4 {
                    color: var(--primary-color);
                    margin-bottom: 20px;
                    font-size: 20px;
                    display: flex;
                    align-items: center;
                }
                
                .employment-charts h4 i {
                    margin-right: 10px;
                    color: var(--primary-color);
                }
                
                .charts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    margin-bottom: 30px;
                }
                
                .chart-container {
                    background-color: var(--bg-primary);
                    padding: 20px;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-medium);
                }
                
                .chart-container h5 {
                    color: var(--text-primary);
                    margin-bottom: 15px;
                    font-size: 16px;
                    text-align: center;
                }
                
                #industryChart,
                #salaryChart {
                    height: 300px !important;
                }
                
                .employment-table-container {
                    background-color: var(--bg-primary);
                    padding: 20px;
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-medium);
                    overflow-x: auto;
                }
                
                .employment-table-container h5 {
                    color: var(--text-primary);
                    margin-bottom: 15px;
                    font-size: 16px;
                }
                
                .employment-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .employment-table th,
                .employment-table td {
                    padding: 12px 15px;
                    text-align: left;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .employment-table th {
                    background-color: var(--primary-light);
                    color: var(--primary-color);
                    font-weight: 600;
                }
                
                .employment-table tr:hover {
                    background-color: var(--bg-secondary);
                }
                
                @media (max-width: 768px) {
                    .charts-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    #industryChart,
                    #salaryChart {
                        height: 250px !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // 添加更多交互元素和提示信息
    const addInteractiveElements = function() {
        // 为课程分类添加折叠/展开功能
        const courseCategoryHeaders = document.querySelectorAll('.course-category h4');
        courseCategoryHeaders.forEach(header => {
            header.style.cursor = 'pointer';
            header.style.userSelect = 'none';
            
            // 添加展开/折叠图标
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down toggle-icon';
            icon.style.marginLeft = '10px';
            icon.style.fontSize = '14px';
            header.appendChild(icon);
            
            // 获取卡片容器
            const cardsContainer = header.nextElementSibling;
            
            // 添加点击事件
            header.addEventListener('click', function() {
                if (cardsContainer.style.display === 'none') {
                    cardsContainer.style.display = 'grid';
                    icon.className = 'fas fa-chevron-down toggle-icon';
                } else {
                    cardsContainer.style.display = 'none';
                    icon.className = 'fas fa-chevron-right toggle-icon';
                }
            });
        });
        
        // 添加竞赛项目的悬停效果
        const competitionItems = document.querySelectorAll('.competition-item');
        competitionItems.forEach(item => {
            const originalHeight = item.style.height;
            
            // 添加悬停效果
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            });
            
            // 添加点击查看详情
            item.addEventListener('click', function() {
                const competitionName = item.querySelector('h5').textContent;
                alert(`竞赛详情：\n${competitionName}\n\n这是我校学生可以参加的重要学科竞赛，对于提升专业能力和竞争力有很大帮助。\n\n请关注学院通知获取最新参赛信息。`);
            });
        });
        
        // 添加信息渠道的交互效果
        const channelItems = document.querySelectorAll('.channel-item');
        channelItems.forEach(item => {
            const originalBgColor = item.style.backgroundColor;
            
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--primary-light)';
                this.style.transform = 'scale(1.03)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = originalBgColor;
                this.style.transform = 'scale(1)';
            });
        });
        
        // 添加返回顶部按钮快速导航
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // 添加课程卡片样式
        const style = document.createElement('style');
        style.textContent = `
            /* 课程卡片样式 */
            .course-cards-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .course-card {
                background-color: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-md);
                padding: 20px;
                text-align: center;
                position: relative;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
                min-height: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .course-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--shadow-hover);
                border-color: var(--primary-color);
            }
            
            .course-card-number {
                position: absolute;
                top: 10px;
                left: 10px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background-color: var(--primary-light);
                color: var(--primary-color);
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }
            
            .course-card-title {
                color: var(--text-primary);
                font-size: 14px;
                font-weight: 600;
                margin: 0;
                padding: 0 10px;
                line-height: 1.5;
            }
            
            .course-card-hover {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(30, 64, 175, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                color: white;
            }
            
            .course-card:hover .course-card-hover {
                opacity: 1;
            }
            
            .course-detail-btn {
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
            }
            
            /* 证书标签样式 */
            .certification-tags span {
                position: relative;
                display: inline-block;
                padding: 10px 18px 10px 18px;
                margin-bottom: 8px;
                transition: all 0.3s ease;
            }
            
            .cert-type-badge {
                position: absolute;
                top: -8px;
                right: -8px;
                font-size: 10px;
                padding: 3px 6px;
                border-radius: 3px;
                font-weight: bold;
                color: white;
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .certification-tags span:hover .cert-type-badge {
                opacity: 1;
                transform: scale(1);
            }
            
            .type-blue {
                background-color: #3b82f6;
            }
            
            .type-green {
                background-color: #10b981;
            }
            
            .type-purple {
                background-color: #8b5cf6;
            }
            
            .type-orange {
                background-color: #f97316;
            }
            
            .type-gray {
                background-color: #6b7280;
            }
            
            .cert-detail-icon {
                margin-left: 5px;
                font-size: 12px;
                transition: transform 0.3s ease;
            }
            
            .certification-tags span:hover .cert-detail-icon {
                transform: rotate(45deg);
            }
            
            /* 详情模态框样式 */
            .detail-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 2000;
                justify-content: center;
                align-items: center;
                padding: 20px;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background-color: var(--bg-primary);
                border-radius: var(--radius-md);
                max-width: 600px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideInUp 0.4s ease;
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid var(--border-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-title {
                color: var(--primary-color);
                margin: 0;
                font-size: 20px;
            }
            
            .close-modal {
                font-size: 24px;
                cursor: pointer;
                color: var(--text-secondary);
                transition: all 0.3s ease;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .close-modal:hover {
                background-color: var(--bg-tertiary);
                color: var(--text-primary);
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .course-info p,
            .cert-info p {
                margin-bottom: 15px;
                line-height: 1.6;
            }
            
            .course-details,
            .cert-preparation {
                background-color: var(--bg-secondary);
                padding: 15px;
                border-radius: var(--radius-sm);
                margin-top: 15px;
            }
            
            .course-details p,
            .cert-preparation p {
                margin-bottom: 8px;
                font-size: 14px;
            }
            
            .cert-preparation ul {
                margin: 10px 0 0 20px;
            }
            
            .cert-preparation li {
                margin-bottom: 5px;
                font-size: 14px;
            }
            
            .cert-type {
                font-weight: 600;
                color: var(--primary-color);
            }
            
            @media (max-width: 768px) {
                .course-cards-grid {
                    grid-template-columns: 1fr 1fr;
                }
                
                .modal-content {
                    margin: 20px;
                }
            }
            
            @media (max-width: 576px) {
                .course-cards-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // 5. 站内搜索功能
    const addSearchFunction = function() {
        // 创建搜索容器
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '搜索内容...';
        searchInput.id = 'site-search';
        
        const searchButton = document.createElement('button');
        searchButton.className = 'search-button';
        searchButton.innerHTML = '<i class="fas fa-search"></i>';
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchButton);
        
        // 将搜索框添加到导航栏
        const navbar = document.querySelector('.navbar .container');
        if (navbar) {
            navbar.appendChild(searchContainer);
        }
        
        // 搜索功能
        const searchFunction = function(query) {
            if (!query.trim()) {
                // 如果搜索框为空，移除所有高亮
                document.querySelectorAll('.search-highlight').forEach(el => {
                    el.replaceWith(...el.childNodes);
                });
                return;
            }
            
            // 移除之前的高亮
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.replaceWith(...el.childNodes);
            });
            
            // 获取页面中所有可搜索的文本内容
            const searchableElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span:not(.search-highlight)');
            const queryRegex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            let found = false;
            
            searchableElements.forEach(element => {
                if (element.innerHTML.includes('<script') || element.innerHTML.includes('<style')) return;
                
                const originalHTML = element.innerHTML;
                const newHTML = originalHTML.replace(queryRegex, '<span class="search-highlight">$1</span>');
                
                if (newHTML !== originalHTML) {
                    element.innerHTML = newHTML;
                    found = true;
                    
                    // 滚动到第一个匹配项
                    if (!document.querySelector('.search-highlight.visible')) {
                        const firstHighlight = document.querySelector('.search-highlight');
                        if (firstHighlight) {
                            firstHighlight.classList.add('visible');
                            window.scrollTo({
                                top: firstHighlight.offsetTop - 150,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            });
            
            // 如果没有找到结果
            if (!found) {
                alert(`没有找到与 "${query}" 相关的内容`);
            }
        };
        
        // 搜索按钮点击事件
        searchButton.addEventListener('click', function() {
            const query = searchInput.value;
            searchFunction(query);
        });
        
        // 回车键搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                searchFunction(query);
            }
        });
        
        // 添加搜索样式
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                display: flex;
                align-items: center;
                margin-left: auto;
            }
            
            #site-search {
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 20px 0 0 20px;
                outline: none;
                font-size: 14px;
                width: 200px;
                transition: width 0.3s ease;
            }
            
            #site-search:focus {
                width: 250px;
                border-color: #1e40af;
            }
            
            .search-button {
                padding: 8px 15px;
                background-color: #1e40af;
                color: white;
                border: none;
                border-radius: 0 20px 20px 0;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s ease;
            }
            
            .search-button:hover {
                background-color: #1e3a8a;
            }
            
            .search-highlight {
                background-color: #ffeb3b;
                padding: 2px 0;
                border-radius: 2px;
            }
            
            @media (max-width: 768px) {
                .search-container {
                    margin: 15px auto 0;
                    width: 100%;
                    order: 3;
                }
                
                #site-search {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // 6. 黑暗模式切换
    const addDarkModeToggle = function() {
        // 检查用户偏好
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        // 创建切换按钮
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = '切换黑暗模式';
        
        // 添加样式
        themeToggle.style.position = 'fixed';
        themeToggle.style.bottom = '30px';
        themeToggle.style.left = '30px';
        themeToggle.style.width = '50px';
        themeToggle.style.height = '50px';
        themeToggle.style.borderRadius = '50%';
        themeToggle.style.backgroundColor = '#1e40af';
        themeToggle.style.color = '#fff';
        themeToggle.style.border = 'none';
        themeToggle.style.fontSize = '20px';
        themeToggle.style.cursor = 'pointer';
        themeToggle.style.zIndex = '999';
        themeToggle.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        themeToggle.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(themeToggle);
        
        // 添加CSS变量
        const addCssVariables = function() {
            const style = document.createElement('style');
            style.id = 'theme-styles';
            style.textContent = `
                :root {
                    --bg-color: #ffffff;
                    --text-color: #333333;
                    --secondary-text: #666666;
                    --border-color: #dddddd;
                    --accent-color: #1e40af;
                    --hover-color: #1e3a8a;
                    --card-bg: #f9f9f9;
                    --navbar-bg: rgba(255, 255, 255, 0.95);
                    --footer-bg: #f8f9fa;
                }
                
                body.dark-mode {
                    --bg-color: #121212;
                    --text-color: #ffffff;
                    --secondary-text: #cccccc;
                    --border-color: #333333;
                    --accent-color: #3b82f6;
                    --hover-color: #2563eb;
                    --card-bg: #1e1e1e;
                    --navbar-bg: rgba(18, 18, 18, 0.95);
                    --footer-bg: #1e1e1e;
                }
                
                body {
                    background-color: var(--bg-color);
                    color: var(--text-color);
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                
                .navbar {
                    background-color: var(--navbar-bg);
                    transition: background-color 0.3s ease;
                }
                
                .footer {
                    background-color: var(--footer-bg);
                    transition: background-color 0.3s ease;
                }
                
                .category-card {
                    background-color: var(--card-bg);
                    border: 1px solid var(--border-color);
                    color: var(--text-color);
                    transition: all 0.3s ease;
                }
                
                .qr-code-content {
                    background-color: var(--bg-color);
                    color: var(--text-color);
                }
                
                a {
                    color: var(--accent-color);
                    transition: color 0.3s ease;
                }
                
                a:hover {
                    color: var(--hover-color);
                }
            `;
            document.head.appendChild(style);
        };
        
        addCssVariables();
        
        // 应用保存的主题或用户偏好
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // 切换主题
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    };
    
    // 7. 字体大小调整
    const addFontSizeAdjustment = function() {
        // 获取保存的字体大小
        const savedFontSize = localStorage.getItem('fontSize') || '16px';
        
        // 创建字体大小控制器
        const fontSizeControl = document.createElement('div');
        fontSizeControl.className = 'font-size-control';
        fontSizeControl.innerHTML = `
            <button class="font-decrease" title="减小字体"><i class="fas fa-font"></i><i class="fas fa-minus"></i></button>
            <span class="font-size-display">A</span>
            <button class="font-increase" title="增大字体"><i class="fas fa-font"></i><i class="fas fa-plus"></i></button>
        `;
        
        // 添加样式
        fontSizeControl.style.position = 'fixed';
        fontSizeControl.style.bottom = '30px';
        fontSizeControl.style.left = '90px';
        fontSizeControl.style.display = 'flex';
        fontSizeControl.style.alignItems = 'center';
        fontSizeControl.style.gap = '10px';
        
        const decreaseBtn = fontSizeControl.querySelector('.font-decrease');
        const increaseBtn = fontSizeControl.querySelector('.font-increase');
        const displayText = fontSizeControl.querySelector('.font-size-display');
        
        [decreaseBtn, increaseBtn].forEach(btn => {
            btn.style.width = '40px';
            btn.style.height = '40px';
            btn.style.borderRadius = '50%';
            btn.style.backgroundColor = '#1e40af';
            btn.style.color = '#fff';
            btn.style.border = 'none';
            btn.style.cursor = 'pointer';
            btn.style.zIndex = '999';
            btn.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            btn.style.transition = 'all 0.3s ease';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.fontSize = '14px';
        });
        
        displayText.style.fontSize = savedFontSize;
        displayText.style.color = '#1e40af';
        displayText.style.fontWeight = 'bold';
        
        document.body.appendChild(fontSizeControl);
        
        // 设置初始字体大小
        document.documentElement.style.fontSize = savedFontSize;
        
        // 增加字体大小
        increaseBtn.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const newSize = Math.min(currentSize + 1, 24); // 最大24px
            document.documentElement.style.fontSize = newSize + 'px';
            displayText.style.fontSize = newSize + 'px';
            localStorage.setItem('fontSize', newSize + 'px');
        });
        
        // 减小字体大小
        decreaseBtn.addEventListener('click', function() {
            const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const newSize = Math.max(currentSize - 1, 12); // 最小12px
            document.documentElement.style.fontSize = newSize + 'px';
            displayText.style.fontSize = newSize + 'px';
            localStorage.setItem('fontSize', newSize + 'px');
        });
    };
    
    // 8. 图片懒加载优化
    const lazyLoadImages = function() {
        // 添加懒加载样式
        const style = document.createElement('style');
        style.textContent = `
            img.lazy-load {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            img.lazy-load.loaded {
                opacity: 1;
            }
            
            .image-placeholder {
                background-color: #f0f0f0;
                position: relative;
                overflow: hidden;
            }
            
            .image-placeholder::after {
                content: '加载中...';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #999;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
        
        // 为所有图片添加懒加载类
        const images = document.querySelectorAll('img:not([data-src])');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('lazy-load', 'loaded');
            } else {
                img.classList.add('lazy-load');
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
            }
        });
        
        // 处理带有data-src的图片
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        // 创建IntersectionObserver
        let observer;
        
        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // 创建图片加载器
                        const tempImg = new Image();
                        tempImg.src = img.dataset.src;
                        
                        tempImg.onload = function() {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        };
                        
                        tempImg.onerror = function() {
                            // 加载失败时显示占位图
                            img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjNmMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Lqe5pu055So5LiKPC90ZXh0Pjwvc3ZnPg==';
                            img.classList.add('loaded');
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        };
                    }
                });
            }, {
                rootMargin: '300px 0px'
            });
            
            lazyImages.forEach(img => {
                observer.observe(img);
                img.classList.add('lazy-load');
            });
        } else {
            // 降级方案
            lazyImages.forEach(img => {
                img.classList.add('lazy-load');
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            });
        }
    };
    
    // 初始执行一次
    lazyLoadImages();
    
    // 监听滚动事件
    window.addEventListener('scroll', lazyLoadImages);
    
    // 9. 返回顶部按钮功能 - 确保只创建一个返回顶部按钮
    let backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.style.display = 'none';
        backToTopButton.style.position = 'fixed';
        backToTopButton.style.bottom = '30px';
        backToTopButton.style.right = '30px';
        backToTopButton.style.width = '50px';
        backToTopButton.style.height = '50px';
        backToTopButton.style.borderRadius = '50%';
        backToTopButton.style.backgroundColor = '#1e40af';
        backToTopButton.style.color = '#fff';
        backToTopButton.style.border = 'none';
        backToTopButton.style.fontSize = '20px';
        backToTopButton.style.cursor = 'pointer';
        backToTopButton.style.zIndex = '999';
        backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        backToTopButton.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(backToTopButton);
    }
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 微信图标点击事件 - 修复版
    const wechatIcon = document.querySelector('.footer-social a .fa-weixin')?.parentElement;
    if (wechatIcon) {
        wechatIcon.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = document.getElementById('wechat-modal');
            if (modal) {
                modal.style.display = 'flex';
            } else {
                // 如果模态框不存在，重新创建
                if (typeof createQrCodeModal === 'function') {
                    createQrCodeModal();
                    const newModal = document.getElementById('wechat-modal');
                    if (newModal) {
                        newModal.style.display = 'flex';
                    }
                }
            }
        });
    }
    
    // 导航链接高亮
    const highlightActiveLink = function() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id') || '';
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const itemHref = item.getAttribute('href');
            
            // 检查当前页面URL
            const currentUrl = window.location.pathname.split('/').pop();
            
            if (itemHref === currentUrl) {
                item.classList.add('active');
            } else if (itemHref === 'index.html' && (currentUrl === '' || currentUrl === 'about-section' || currentSection === '')) {
                item.classList.add('active');
            } else if (itemHref.includes(currentSection)) {
                item.classList.add('active');
            }
        });
    };
    
    // 初始化所有功能
    if (typeof optimizeRequirementsPage === 'function') optimizeRequirementsPage();
    if (typeof addSearchFunction === 'function') addSearchFunction();
    if (typeof addDarkModeToggle === 'function') addDarkModeToggle();
    if (typeof addFontSizeAdjustment === 'function') addFontSizeAdjustment();
    if (typeof lazyLoadImages === 'function') lazyLoadImages();
    if (typeof highlightActiveLink === 'function') highlightActiveLink();
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (typeof highlightActiveLink === 'function') highlightActiveLink();
        if (typeof animateOnScroll === 'function') animateOnScroll();
    });
});