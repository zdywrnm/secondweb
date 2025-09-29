// 基于Axios的留言板功能实现
class AxiosGuestbookManager {
    constructor() {
        // API基础URL
        this.apiBaseUrl = 'https://vodcyonnm5.hzh.sealos.run/messages';
        
        // 当前页码
        this.currentPage = 1;
        // 每页显示条数
        this.pageSize = 10;
        
        // 获取DOM元素
        this.form = document.getElementById('guestbookForm');
        this.formStatus = document.getElementById('formStatus');
        this.submitButton = this.form ? this.form.querySelector('button[type="submit"]') : null;
        
        // 创建留言列表容器
        this.createMessagesContainer();
        this.messagesList = document.getElementById('messagesList');
        this.pagination = document.getElementById('pagination');
        
        // 表单验证规则
        this.validationRules = {
            name: { required: true, minLength: 2, maxLength: 20 },
            studentId: { required: true, pattern: /^[0-9]{8,12}$/ },
            major: { required: true, minLength: 2, maxLength: 50 },
            className: { required: true, minLength: 2, maxLength: 50 },
            phone: { required: true, pattern: /^1[3-9]\d{9}$/ },
            content: { required: true, minLength: 5, maxLength: 500 }
        };
        
        this.init();
    }

    init() {
        if (!this.form || !this.formStatus || !this.submitButton) {
            console.warn('留言板表单元素未找到');
            return;
        }

        // 初始化表单事件监听
        this.setupEventListeners();
        
        // 加载留言列表
        this.loadMessages();
        
        console.log('基于Axios的留言板功能初始化完成');
    }

    createMessagesContainer() {
        // 在表单下方添加留言列表区域
        const guestbookSection = document.querySelector('.guestbook-section .container');
        if (guestbookSection) {
            const messagesContainerHTML = `
                <div id="messagesContainer" style="margin-top: 60px;">
                    <h3 style="text-align: center; margin-bottom: 30px; color: var(--primary-color);">留言列表</h3>
                    <div id="messagesList" style="max-width: 800px; margin: 0 auto;">
                        <!-- 留言列表将通过JS动态生成 -->
                    </div>
                    <div id="pagination" style="text-align: center; margin-top: 30px;">
                        <!-- 分页控件将通过JS动态生成 -->
                    </div>
                </div>
            `;
            guestbookSection.insertAdjacentHTML('beforeend', messagesContainerHTML);
        }
    }

    setupEventListeners() {
        // 表单提交事件
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // 输入字段实时验证
        const formFields = this.form.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', () => this.validateField(field));
            field.addEventListener('blur', () => this.validateField(field));
        });

        // 移动端优化 - 输入时自动滚动到表单
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                setTimeout(() => {
                    this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            });
        });
    }

    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = this.validationRules[fieldName];
        let isValid = true;
        let errorMessage = '';

        if (!rules) return true;

        // 清除之前的错误提示
        this.clearError(field);

        // 验证必填
        if (rules.required && fieldValue === '') {
            isValid = false;
            errorMessage = '此字段不能为空';
        }
        // 验证最小长度
        else if (rules.minLength && fieldValue.length < rules.minLength) {
            isValid = false;
            errorMessage = `至少需要${rules.minLength}个字符`;
        }
        // 验证最大长度
        else if (rules.maxLength && fieldValue.length > rules.maxLength) {
            isValid = false;
            errorMessage = `最多只能输入${rules.maxLength}个字符`;
        }
        // 验证正则表达式
        else if (rules.pattern && !rules.pattern.test(fieldValue)) {
            isValid = false;
            switch (fieldName) {
                case 'studentId':
                    errorMessage = '请输入8-12位数字学号';
                    break;
                case 'phone':
                    errorMessage = '请输入正确的11位手机号码';
                    break;
                default:
                    errorMessage = '输入格式不正确';
            }
        }

        // 显示错误提示
        if (!isValid) {
            this.showError(field, errorMessage);
        }

        return isValid;
    }

    showError(field, message) {
        // 清除之前的错误提示
        this.clearError(field);
        
        // 创建新的错误提示元素
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#dc2626';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        // 添加到字段下方
        field.parentElement.appendChild(errorElement);
        
        // 添加错误样式
        field.style.borderColor = '#dc2626';
    }

    clearError(field) {
        // 移除错误提示
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        // 恢复正常样式
        field.style.borderColor = '';
    }

    async handleSubmit() {
        // 验证所有字段
        const formFields = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        formFields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showStatus('请检查并修正表单中的错误', 'error');
            return;
        }
        
        // 显示加载状态
        this.showStatus('正在提交留言...', 'loading');
        this.submitButton.disabled = true;
        
        try {
            // 获取表单数据并转换为API需要的格式
            const formData = new FormData(this.form);
            const messageData = {
                name: String(formData.get('name') || '').trim(),
                studentId: String(formData.get('studentId') || '').trim(),
                major: String(formData.get('major') || '').trim(),
                className: String(formData.get('className') || '').trim(),
                phone: String(formData.get('phone') || '').trim(),
                content: String(formData.get('content') || '').trim()
            };
            
            // 发送POST请求到服务器
            const response = await axios.post(this.apiBaseUrl, messageData);
            
            if (response.data && response.data.ok) {
                this.showStatus(response.data.msg || '留言提交成功！', 'success');
                
                // 重置表单
                this.form.reset();
                
                // 重新加载留言列表
                this.loadMessages();
            } else {
                this.showStatus(response.data?.error || '留言提交失败，请稍后重试', 'error');
            }
        } catch (error) {
            console.error('提交留言出错:', error);
            this.showStatus('网络错误，请检查网络连接后重试', 'error');
        } finally {
            // 恢复按钮状态
            setTimeout(() => {
                this.submitButton.disabled = false;
                this.hideStatus();
            }, 3000);
        }
    }

    async loadMessages(page = 1) {
        this.currentPage = page;
        
        try {
            // 显示加载状态
            if (this.messagesList) {
                this.messagesList.innerHTML = '<div style="text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin mr-2"></i> 正在加载留言...</div>';
            }
            
            // 发送GET请求获取留言列表
            const response = await axios.get(this.apiBaseUrl, {
                params: {
                    page: this.currentPage,
                    size: this.pageSize
                }
            });
            
            if (response.data && response.data.ok && response.data.data) {
                const { list, total, pages } = response.data.data;
                this.renderMessages(list);
                this.renderPagination(total, pages);
            } else {
                if (this.messagesList) {
                    this.messagesList.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">暂无留言数据</div>';
                }
            }
        } catch (error) {
            console.error('加载留言出错:', error);
            if (this.messagesList) {
                this.messagesList.innerHTML = '<div style="text-align: center; padding: 40px; color: #dc2626;">加载留言失败，请稍后重试</div>';
            }
        }
    }

    renderMessages(messages) {
        if (!this.messagesList) return;
        
        if (!messages || messages.length === 0) {
            this.messagesList.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">暂无留言，快来发布第一条留言吧！</div>';
            return;
        }
        
        let html = '';
        
        messages.forEach(message => {
            // 格式化时间
            const formattedTime = this.formatDateTime(message.createTime);
            
            // 构建留言HTML
            html += `
                <div style="background: var(--bg-primary); border-radius: var(--radius-lg); padding: 20px; margin-bottom: 20px; box-shadow: var(--shadow-sm); transition: transform 0.2s, box-shadow 0.2s;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <div style="display: flex; align-items: center;">
                            <div style="width: 40px; height: 40px; background: var(--primary-color); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <h4 style="margin: 0; font-size: 1.1rem; color: var(--text-primary);">${this.escapeHtml((message.name || '匿名') + (message.className ? ' - ' + message.className : ''))}</h4>
                                <p style="margin: 0; font-size: 0.875rem; color: var(--text-secondary);">${formattedTime}</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 15px;">
                            <button class="like-btn" data-id="${message._id}" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; display: flex; align-items: center;">
                                <i class="far fa-thumbs-up mr-1"></i>
                                <span>${message.likeCount || 0}</span>
                            </button>
                        </div>
                    </div>
                    <div style="padding-left: 52px;">
                        <p style="margin: 0; line-height: 1.6; color: var(--text-primary);">${this.escapeHtml(message.content).replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    ${message.replies && message.replies.length > 0 ? `
                        <div style="margin-top: 15px; padding-left: 52px;">
                            <h5 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 10px;">回复 (${message.replies.length})</h5>
                            ${message.replies.map(reply => `
                                <div style="background: var(--bg-secondary); padding: 10px; border-radius: var(--radius-md); margin-bottom: 8px;">
                                    <p style="font-size: 0.875rem; color: var(--text-primary); margin: 0;">
                                        <strong>${this.escapeHtml(reply.replyUser || '管理员')}:</strong> ${this.escapeHtml(reply.content)}
                                    </p>
                                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin: 5px 0 0 0;">${this.formatDateTime(reply.replyTime)}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        this.messagesList.innerHTML = html;
        
        // 添加点赞事件监听
        this.addLikeEventListeners();
    }

    renderPagination(total, pages) {
        if (!this.pagination || pages <= 1) {
            if (this.pagination) {
                this.pagination.innerHTML = '';
            }
            return;
        }
        
        let html = '<div style="display: flex; justify-content: center; align-items: center; gap: 5px;">';
        
        // 上一页按钮
        html += `
            <button class="page-btn" data-page="${this.currentPage - 1}" ${this.currentPage === 1 ? 'disabled' : ''} style="padding: 8px 12px; background: ${this.currentPage === 1 ? 'var(--bg-secondary)' : 'var(--primary-color)'};
                color: ${this.currentPage === 1 ? 'var(--text-secondary)' : 'white'}; border: none; border-radius: var(--radius-md); cursor: ${this.currentPage === 1 ? 'not-allowed' : 'pointer'};">
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // 页码按钮
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(pages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            html += `<button class="page-btn" data-page="1" style="padding: 8px 12px; background: var(--bg-secondary); color: var(--text-primary); border: none; border-radius: var(--radius-md); cursor: pointer;">1</button>`;
            if (startPage > 2) {
                html += `<span style="padding: 8px; color: var(--text-secondary);">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            html += `
                <button class="page-btn" data-page="${i}" ${this.currentPage === i ? 'disabled' : ''} style="padding: 8px 12px; background: ${this.currentPage === i ? 'var(--primary-color)' : 'var(--bg-secondary)'};
                    color: ${this.currentPage === i ? 'white' : 'var(--text-primary)'};
                    border: none; border-radius: var(--radius-md); cursor: ${this.currentPage === i ? 'not-allowed' : 'pointer'};">
                    ${i}
                </button>
            `;
        }
        
        if (endPage < pages) {
            if (endPage < pages - 1) {
                html += `<span style="padding: 8px; color: var(--text-secondary);">...</span>`;
            }
            html += `<button class="page-btn" data-page="${pages}" style="padding: 8px 12px; background: var(--bg-secondary); color: var(--text-primary); border: none; border-radius: var(--radius-md); cursor: pointer;">${pages}</button>`;
        }
        
        // 下一页按钮
        html += `
            <button class="page-btn" data-page="${this.currentPage + 1}" ${this.currentPage === pages ? 'disabled' : ''} style="padding: 8px 12px; background: ${this.currentPage === pages ? 'var(--bg-secondary)' : 'var(--primary-color)'};
                color: ${this.currentPage === pages ? 'var(--text-secondary)' : 'white'}; border: none; border-radius: var(--radius-md); cursor: ${this.currentPage === pages ? 'not-allowed' : 'pointer'};">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        html += '</div>';
        
        this.pagination.innerHTML = html;
        
        // 添加分页按钮事件监听
        this.addPaginationEventListeners();
    }

    addLikeEventListeners() {
        const likeButtons = document.querySelectorAll('.like-btn');
        likeButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const messageId = e.currentTarget.dataset.id;
                try {
                    // 发送PUT请求进行点赞
                    await axios.put(this.apiBaseUrl, {
                        id: messageId,
                        action: 'like'
                    });
                    
                    // 重新加载当前页留言
                    this.loadMessages(this.currentPage);
                } catch (error) {
                    console.error('点赞失败:', error);
                    alert('点赞失败，请稍后重试');
                }
            });
        });
    }

    addPaginationEventListeners() {
        const pageButtons = document.querySelectorAll('.page-btn:not(:disabled)');
        pageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const page = parseInt(e.currentTarget.dataset.page);
                if (!isNaN(page)) {
                    this.loadMessages(page);
                }
            });
        });
    }

    showStatus(message, type = 'info') {
        if (!this.formStatus) return;
        
        this.formStatus.textContent = message;
        this.formStatus.className = 'form-status';
        this.formStatus.classList.add(type);
    }

    hideStatus() {
        if (!this.formStatus) return;
        
        this.formStatus.className = 'form-status';
        this.formStatus.textContent = '';
    }

    formatDateTime(timestamp) {
        if (!timestamp) return '';
        
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
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 当DOM加载完成后初始化留言板
document.addEventListener('DOMContentLoaded', function() {
    // 创建留言板管理器实例
    const guestbookManager = new AxiosGuestbookManager();
});