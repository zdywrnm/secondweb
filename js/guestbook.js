// 留言板功能实现
class GuestbookManager {
    constructor() {
        this.form = document.getElementById('guestbookForm');
        this.formStatus = document.getElementById('formStatus');
        this.submitButton = this.form ? this.form.querySelector('button[type="submit"]') : null;
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
        
        console.log('留言板功能初始化完成');
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

    validateForm() {
        let isValid = true;
        const formFields = this.form.querySelectorAll('input, textarea');
        
        formFields.forEach(field => {
            const fieldValid = this.validateField(field);
            isValid = isValid && fieldValid;
        });

        return isValid;
    }

    showError(field, message) {
        // 检查是否已存在错误提示元素
        let errorElement = field.parentElement.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #dc2626;
                font-size: 0.875rem;
                margin-top: 5px;
                display: flex;
                align-items: center;
                gap: 4px;
            `;
            
            field.parentElement.appendChild(errorElement);
        }
        
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // 添加输入框错误样式
        field.style.borderColor = '#dc2626';
        field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    }

    clearError(field) {
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        // 恢复输入框默认样式
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }

    handleSubmit() {
        // 验证表单
        const isValid = this.validateForm();
        
        if (!isValid) {
            this.showFormStatus('error', '请检查表单中的错误并修正');
            return;
        }

        // 禁用提交按钮
        this.submitButton.disabled = true;
        
        // 获取表单数据
        const formData = this.getFormData();
        console.log('准备提交的表单数据:', formData);

        // 显示加载状态
        this.showFormStatus('loading', '正在提交您的留言，请稍候...');

        // 模拟提交到服务器
        this.submitToServer(formData);
    }

    getFormData() {
        const formData = {};
        const formFields = this.form.querySelectorAll('input, textarea');
        
        formFields.forEach(field => {
            formData[field.name] = field.value.trim();
        });
        
        return formData;
    }

    submitToServer(data) {
        // 在实际项目中，这里应该使用axios发送到真实的服务器API
        // 这里使用setTimeout模拟网络请求延迟
        setTimeout(() => {
            console.log('模拟提交成功，表单数据:', data);
            
            // 显示成功消息
            this.showFormStatus('success', '留言提交成功！感谢您的反馈。');
            
            // 重置表单
            this.form.reset();
            
            // 恢复按钮状态
            this.submitButton.disabled = false;
            
            // 5秒后隐藏成功提示
            setTimeout(() => {
                this.formStatus.style.display = 'none';
            }, 5000);
            
            // 添加成功动画效果
            this.formStatus.classList.add('animate-bounce');
            setTimeout(() => {
                this.formStatus.classList.remove('animate-bounce');
            }, 1000);
            
        }, 1500);
        
        /* 真实环境中的代码示例
        axios.post('/api/guestbook/submit', data)
            .then(response => {
                console.log('提交成功:', response.data);
                this.showFormStatus('success', response.data.message || '留言提交成功！');
                this.form.reset();
            })
            .catch(error => {
                console.error('提交失败:', error);
                const errorMsg = error.response?.data?.message || '提交失败，请稍后重试';
                this.showFormStatus('error', errorMsg);
            })
            .finally(() => {
                this.submitButton.disabled = false;
            });
        */
    }

    showFormStatus(type, message) {
        this.formStatus.innerHTML = '';
        this.formStatus.style.display = 'block';
        
        // 移除之前的类
        this.formStatus.className = 'form-status';
        
        // 添加新类和图标
        let icon = '';
        
        switch (type) {
            case 'success':
                this.formStatus.classList.add('success');
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                this.formStatus.classList.add('error');
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'loading':
                this.formStatus.classList.add('loading');
                icon = '<i class="fas fa-spinner fa-spin"></i>';
                break;
        }
        
        this.formStatus.innerHTML = `${icon} ${message}`;
    }
}

// 页面加载完成后初始化留言板
function initializeGuestbook() {
    try {
        // 检查DOM是否已加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new GuestbookManager();
            });
        } else {
            new GuestbookManager();
        }
    } catch (error) {
        console.error('留言板初始化出错:', error);
    }
}

// 导出初始化函数，便于其他脚本调用
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { initializeGuestbook };
} else {
    window.initializeGuestbook = initializeGuestbook;
}

// 自动初始化
initializeGuestbook();