// 新版留言板JavaScript逻辑 - 简化版（仅保留表单功能）
class NewGuestbookManager {
    constructor() {
        // 初始化属性
        this.isSubmitting = false;
        
        // 获取DOM元素
        this.form = document.getElementById('guestbookForm');
        this.formStatus = document.getElementById('formStatus');
        this.statusIcon = document.getElementById('statusIcon');
        this.statusMessage = document.getElementById('statusMessage');
        this.submitButton = document.getElementById('submitButton');
        
        // 表单验证规则
        this.validationRules = {
            name: { required: true, minLength: 2, maxLength: 20 },
            studentId: { required: true, pattern: /^[0-9]{8,12}$/ },
            major: { required: true, minLength: 2, maxLength: 50 },
            className: { required: true, minLength: 2, maxLength: 50 },
            phone: { required: true, pattern: /^1[3-9]\d{9}$/ },
            content: { required: true, minLength: 5, maxLength: 500 }
        };
    }
    
    // 初始化留言板
    init() {
        // 设置表单提交事件
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.setupFormValidation();
        }
    }
    
    // 设置表单验证
    setupFormValidation() {
        const formFields = this.form.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('input', this.validateField.bind(this, field));
            field.addEventListener('blur', this.validateField.bind(this, field));
        });
    }
    
    // 验证单个字段
    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = this.validationRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}Error`);
        
        let isValid = true;
        let errorMessage = '';
        
        // 清除之前的错误提示
        field.parentElement.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.classList.remove('visible');
        }
        
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
        
        // 显示错误提示或成功状态
        if (!isValid && errorElement) {
            field.parentElement.classList.add('error');
            errorElement.querySelector('span').textContent = errorMessage;
            errorElement.classList.add('visible');
        } else if (isValid) {
            field.parentElement.classList.add('success');
        }
        
        return isValid;
    }
    
    // 验证整个表单
    validateForm() {
        let isValid = true;
        const formFields = this.form.querySelectorAll('input, textarea');
        
        formFields.forEach(field => {
            const fieldValid = this.validateField(field);
            isValid = isValid && fieldValid;
        });
        
        return isValid;
    }
    
    // 处理表单提交
    handleSubmit(e) {
        e.preventDefault();
        
        // 防止重复提交
        if (this.isSubmitting) return;
        
        // 验证表单
        const isValid = this.validateForm();
        
        if (!isValid) {
            this.showFormStatus('error', '请检查表单中的错误并修正');
            return;
        }
        
        // 禁用提交按钮并显示加载状态
        this.isSubmitting = true;
        this.submitButton.disabled = true;
        this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';
        
        // 获取表单数据
        const formData = this.collectFormData();
        
        // 提交留言到服务器
        this.submitMessage(formData);
    }
    
    // 收集表单数据
    collectFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            studentId: document.getElementById('studentId').value.trim(),
            major: document.getElementById('major').value.trim(),
            className: document.getElementById('className').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            content: document.getElementById('content').value.trim()
        };
    }
    
    // 提交留言到服务器
    async submitMessage(data) {
        try {
            // 在实际环境中，这里应该使用axios发送到真实的服务器API
            // 这里使用setTimeout模拟网络请求延迟
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('留言提交成功:', data);
            
            // 显示成功消息
            this.showFormStatus('success', '留言提交成功！感谢您的反馈。');
            
            // 重置表单
            this.form.reset();
            
            // 清除表单中的错误提示和成功状态
            this.resetFormStyles();
        } catch (error) {
            console.error('提交失败:', error);
            this.showFormStatus('error', '提交失败，请稍后重试');
        } finally {
            // 恢复按钮状态
            this.isSubmitting = false;
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> 提交留言';
        }
        
        /* 真实环境中的代码示例
        try {
            const response = await axios.post('/api/guestbook/submit', data);
            console.log('提交成功:', response.data);
            this.showFormStatus('success', response.data.message || '留言提交成功！');
            this.form.reset();
            this.resetFormStyles();
        } catch (error) {
            console.error('提交失败:', error);
            const errorMsg = error.response?.data?.message || '提交失败，请稍后重试';
            this.showFormStatus('error', errorMsg);
        } finally {
            this.isSubmitting = false;
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> 提交留言';
        }
        */
    }
    
    // 重置表单样式
    resetFormStyles() {
        const formFields = this.form.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.parentElement.classList.remove('error', 'success');
            const errorElement = document.getElementById(`${field.name}Error`);
            if (errorElement) {
                errorElement.classList.remove('visible');
            }
        });
    }
    
    // 显示表单状态提示
    showFormStatus(type, message) {
        // 设置状态样式和内容
        this.formStatus.className = 'form-status';
        this.formStatus.classList.add(type);
        
        // 设置图标
        if (type === 'success') {
            this.statusIcon.className = 'fas fa-check-circle';
        } else if (type === 'error') {
            this.statusIcon.className = 'fas fa-exclamation-circle';
        }
        
        // 设置消息
        this.statusMessage.textContent = message;
        
        // 显示状态提示
        this.formStatus.classList.add('visible');
        
        // 5秒后自动隐藏
        setTimeout(() => {
            this.formStatus.classList.remove('visible');
        }, 5000);
    }
}

// 初始化函数
function initializeNewGuestbook() {
    try {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                const guestbookManager = new NewGuestbookManager();
                guestbookManager.init();
            });
        } else {
            // DOM已经加载完成，直接初始化
            const guestbookManager = new NewGuestbookManager();
            guestbookManager.init();
        }
    } catch (error) {
        console.error('初始化留言板失败:', error);
        // 显示错误消息给用户
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-status error visible';
        errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span>留言板初始化失败，请刷新页面重试</span>';
        document.body.appendChild(errorMessage);
        
        // 5秒后自动隐藏
        setTimeout(() => {
            errorMessage.classList.remove('visible');
        }, 5000);
    }
}

// 导出初始化函数，以便其他文件可以调用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeNewGuestbook };
}

// 自动初始化
if (typeof window !== 'undefined') {
    window.initializeNewGuestbook = initializeNewGuestbook;
    
    // 如果在浏览器环境中直接运行，自动初始化
    if (document.readyState === 'complete') {
        initializeNewGuestbook();
    } else {
        document.addEventListener('DOMContentLoaded', initializeNewGuestbook);
    }
}