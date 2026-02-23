/* ─── State ──────────────────────────────────────────────────────────── */
let allTasks = [];
let currentFilter = 'all';
const API = '';

/* ─── Auth Guard ─────────────────────────────────────────────────────── */
const token = localStorage.getItem('tf_token');
const user = JSON.parse(localStorage.getItem('tf_user') || 'null');

if (!token || !user) {
    window.location.href = '/index.html';
}

/* ─── Init ───────────────────────────────────────────────────────────── */
document.getElementById('user-name').textContent = user?.name || 'User';

async function init() {
    await fetchTasks();
}

/* ─── API Helper ─────────────────────────────────────────────────────── */
async function apiFetch(url, options = {}) {
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
    });
    const data = await res.json();
    if (res.status === 401) {
        logout();
        return null;
    }
    return data;
}

/* ─── Fetch Tasks ────────────────────────────────────────────────────── */
async function fetchTasks() {
    const data = await apiFetch(`${API}/api/tasks`);
    if (!data) return;
    allTasks = data.tasks || [];
    renderTasks();
    updateStats();
}

/* ─── Render Tasks ───────────────────────────────────────────────────── */
function renderTasks() {
    const list = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');

    let filtered = allTasks;
    if (currentFilter === 'pending') filtered = allTasks.filter(t => !t.completed);
    if (currentFilter === 'completed') filtered = allTasks.filter(t => t.completed);

    // Clear existing task items (keep empty-state)
    [...list.querySelectorAll('.task-item')].forEach(el => el.remove());

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    filtered.forEach(task => {
        const el = createTaskElement(task);
        list.appendChild(el);
    });
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `task-item ${task.completed ? 'completed' : ''}`;
    div.dataset.id = task._id;

    const date = new Date(task.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    div.innerHTML = `
    <button class="task-check ${task.completed ? 'done' : ''}" 
            title="${task.completed ? 'Mark incomplete' : 'Mark complete'}"
            onclick="toggleTask('${task._id}', ${task.completed})"></button>
    <div class="task-body">
      <div class="task-title">${escapeHtml(task.title)}</div>
      ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ''}
      <div class="task-meta">
        <span class="priority-badge priority-${task.priority}">${task.priority}</span>
        <span class="task-date">${date}</span>
      </div>
    </div>
    <button class="task-delete" title="Delete task" onclick="deleteTask('${task._id}')">🗑</button>
  `;

    return div;
}

/* ─── Update Stats ───────────────────────────────────────────────────── */
function updateStats() {
    const total = allTasks.length;
    const done = allTasks.filter(t => t.completed).length;
    const pending = total - done;
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-done').textContent = done;
    document.getElementById('stat-pending').textContent = pending;
}

/* ─── Add Task ───────────────────────────────────────────────────────── */
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('task-title').value.trim();
    const description = document.getElementById('task-desc').value.trim();
    const priority = document.getElementById('task-priority').value;
    const alertEl = document.getElementById('task-alert');
    const addBtn = document.getElementById('add-btn');

    if (!title) {
        showTaskAlert('Please enter a task title.', 'error');
        return;
    }

    // Loading state
    addBtn.disabled = true;
    addBtn.querySelector('.btn-text').classList.add('hidden');
    addBtn.querySelector('.btn-loader').classList.remove('hidden');

    const data = await apiFetch(`${API}/api/tasks`, {
        method: 'POST',
        body: JSON.stringify({ title, description, priority }),
    });

    addBtn.disabled = false;
    addBtn.querySelector('.btn-text').classList.remove('hidden');
    addBtn.querySelector('.btn-loader').classList.add('hidden');

    if (!data || !data.success) {
        showTaskAlert(data?.message || 'Failed to add task.', 'error');
        return;
    }

    allTasks.unshift(data.task);
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-priority').value = 'medium';

    renderTasks();
    updateStats();

    showTaskAlert('Task added! ✓', 'success');
    setTimeout(() => hideTaskAlert(), 2000);
});

function showTaskAlert(msg, type) {
    const el = document.getElementById('task-alert');
    el.textContent = msg;
    el.className = `alert ${type}`;
}
function hideTaskAlert() {
    document.getElementById('task-alert').className = 'alert hidden';
}

/* ─── Toggle Complete ────────────────────────────────────────────────── */
async function toggleTask(id, currentlyCompleted) {
    const data = await apiFetch(`${API}/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !currentlyCompleted }),
    });

    if (data?.success) {
        const idx = allTasks.findIndex(t => t._id === id);
        if (idx !== -1) allTasks[idx] = data.task;
        renderTasks();
        updateStats();
    }
}

/* ─── Delete Task ────────────────────────────────────────────────────── */
async function deleteTask(id) {
    // Optimistic removal
    const item = document.querySelector(`.task-item[data-id="${id}"]`);
    if (item) {
        item.style.transition = 'opacity 0.2s, transform 0.2s';
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
    }

    const data = await apiFetch(`${API}/api/tasks/${id}`, { method: 'DELETE' });

    if (data?.success) {
        allTasks = allTasks.filter(t => t._id !== id);
        renderTasks();
        updateStats();
    } else {
        // Rollback
        if (item) { item.style.opacity = '1'; item.style.transform = 'none'; }
    }
}

/* ─── Filter ─────────────────────────────────────────────────────────── */
function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderTasks();
}

/* ─── Logout ─────────────────────────────────────────────────────────── */
function logout() {
    localStorage.removeItem('tf_token');
    localStorage.removeItem('tf_user');
    window.location.href = '/index.html';
}

/* ─── Utility ────────────────────────────────────────────────────────── */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ─── Start ───────────────────────────────────────────────────────────── */
init();
