// 简单的管理员查询页面脚本
(function () {
  const API_BASE = 'https://vodcyonnm5.hzh.sealos.run/messages-admin';

  const els = {
    password: document.getElementById('password'),
    keyword: document.getElementById('keyword'),
    queryBtn: document.getElementById('queryBtn'),
    status: document.getElementById('status'),
    list: document.getElementById('list'),
    pagination: document.getElementById('pagination'),
  };

  let state = { page: 1, size: 10, pages: 1, keyword: '' };

  function setStatus(text, type = 'info') {
    if (!els.status) return;
    els.status.textContent = text || '';
    els.status.style.color = type === 'error' ? '#dc2626' : 'var(--text-secondary)';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = String(text || '');
    return div.innerHTML;
  }

  function formatDateTime(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleString('zh-CN', { hour12: false });
  }

  function renderList(list) {
    if (!els.list) return;
    if (!list || list.length === 0) {
      els.list.innerHTML = '<div style="text-align:center;color:var(--text-secondary);padding:20px;">暂无数据</div>';
      return;
    }
    let html = '';
    list.forEach(item => {
      html += `
        <div class="item">
          <div class="meta">
            <span>${escapeHtml(item.nickname)}</span>
            <span>${formatDateTime(item.createTime)} | 状态:${item.status}</span>
          </div>
          <div class="content">${escapeHtml(item.content)}</div>
        </div>
      `;
    });
    els.list.innerHTML = html;
  }

  function renderPagination(total, pages) {
    state.pages = pages || 1;
    if (!els.pagination) return;
    if (state.pages <= 1) { els.pagination.innerHTML = ''; return; }

    let html = '';
    const disabledPrev = state.page <= 1 ? 'disabled' : '';
    const disabledNext = state.page >= state.pages ? 'disabled' : '';
    html += `<button data-act="prev" ${disabledPrev}>上一页</button>`;
    html += `<span style="padding:6px 8px;">${state.page}/${state.pages}</span>`;
    html += `<button data-act="next" ${disabledNext}>下一页</button>`;
    els.pagination.innerHTML = html;

    els.pagination.querySelectorAll('button[data-act]').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.getAttribute('data-act');
        if (act === 'prev' && state.page > 1) {
          state.page -= 1;
          query();
        } else if (act === 'next' && state.page < state.pages) {
          state.page += 1;
          query();
        }
      });
    });
  }

  async function query() {
    const password = (els.password && els.password.value) || '';
    state.keyword = (els.keyword && els.keyword.value) || '';

    if (!password) { setStatus('请输入密码', 'error'); return; }

    setStatus('查询中...');
    els.list.innerHTML = '';

    try {
      const resp = await axios.get(API_BASE, {
        params: { page: state.page, size: state.size, keyword: state.keyword, password }
      });
      const data = resp.data || {};
      if (!data.ok) {
        setStatus(data.error || '查询失败', 'error');
        els.list.innerHTML = '';
        els.pagination.innerHTML = '';
        return;
      }

      const body = data.data || { list: [], total: 0, pages: 1 };
      renderList(body.list);
      renderPagination(body.total, body.pages);
      setStatus(`共 ${body.total} 条，当前第 ${body.page}/${body.pages} 页`);
    } catch (err) {
      console.error(err);
      setStatus('网络错误或服务器不可用', 'error');
    }
  }

  if (els.queryBtn) {
    els.queryBtn.addEventListener('click', () => { state.page = 1; query(); });
  }
})();



