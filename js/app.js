/**
 * ClientFlow Core Application State & Views Controller
 */

// Application State
window.appState = {
  currentRole: 'workspace', // 'workspace' or 'portal'
  activeView: 'dashboard',   // 'dashboard', 'clients', 'client-detail', 'projects', 'project-detail', 'proposals', 'proposal-detail', 'invoices', 'invoice-detail', 'messages'
  activeClientId: 'client-1',
  activeProjectId: 'proj-1',
  activeProposalId: 'prop-101',
  activeInvoiceId: 'INV-2024-002',
  searchQuery: '',
  filters: {
    projectHealth: 'All',
    invoiceStatus: 'All',
    proposalStatus: 'All'
  },
  charts: {} // Keep Chart.js instances for cleanup
};

// Toast Notification Engine
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto p-4 rounded-2xl shadow-xl flex items-start gap-3 border transition-all duration-300 transform translate-y-2 opacity-0 glass-card ${
    type === 'success' ? 'border-emerald-500/40 bg-slate-900/90' :
    type === 'error' ? 'border-rose-500/40 bg-slate-900/90' :
    'border-brand-500/40 bg-slate-900/90'
  }`;

  const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info';
  const iconColor = type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : 'text-brand-400';

  toast.innerHTML = `
    <div class="p-1 rounded-lg ${type === 'success' ? 'bg-emerald-500/10' : type === 'error' ? 'bg-rose-500/10' : 'bg-brand-500/10'} shrink-0">
      <i data-lucide="${iconName}" class="w-5 h-5 ${iconColor}"></i>
    </div>
    <div class="flex-1 pr-2">
      <h5 class="text-xs font-bold text-white">${title}</h5>
      <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">${message}</p>
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-500 hover:text-white p-1">
      <i data-lucide="x" class="w-4 h-4"></i>
    </button>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  // Auto dismiss
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Role Switcher Controller
function switchRole(role) {
  window.appState.currentRole = role;

  const btnWorkspace = document.getElementById('role-workspace-btn');
  const btnPortal = document.getElementById('role-portal-btn');
  const roleBadge = document.getElementById('role-badge');
  const contextTitle = document.getElementById('context-title');
  const contextSubtitle = document.getElementById('context-subtitle');
  const contextIconBg = document.getElementById('context-icon-bg');
  const contextIcon = document.getElementById('context-icon');
  const quickActionContainer = document.getElementById('quick-action-container');
  const userAvatar = document.getElementById('user-avatar');
  const userName = document.getElementById('user-name');
  const userRole = document.getElementById('user-role');

  if (role === 'workspace') {
    btnWorkspace.className = 'px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition bg-brand-600 text-white shadow-sm';
    btnPortal.className = 'px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition text-slate-400 hover:text-white';
    roleBadge.textContent = 'Workspace';
    roleBadge.className = 'text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30';

    contextTitle.textContent = window.mockData.agency.name;
    contextSubtitle.textContent = `${window.mockData.clients.length} Active Clients`;
    contextIconBg.className = 'w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 shrink-0';
    contextIcon.setAttribute('data-lucide', 'building-2');

    quickActionContainer.classList.remove('hidden');
    userAvatar.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
    userName.textContent = "Alex Rivera";
    userRole.textContent = "Studio Principal";

    // Set default workspace view
    window.appState.activeView = 'dashboard';
    showToast("Switched to Workspace Mode", "Viewing as Freelancer/Agency Manager", "info");
  } else {
    btnPortal.className = 'px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition bg-sky-600 text-white shadow-sm';
    btnWorkspace.className = 'px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition text-slate-400 hover:text-white';
    roleBadge.textContent = 'Client Portal';
    roleBadge.className = 'text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30';

    const client = window.mockData.clients.find(c => c.id === window.appState.activeClientId) || window.mockData.clients[0];
    contextTitle.textContent = client.name;
    contextSubtitle.textContent = `Portal Code: ${client.portalCode}`;
    contextIconBg.className = 'w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0';
    contextIcon.setAttribute('data-lucide', 'user-check');

    quickActionContainer.classList.add('hidden');
    userAvatar.src = client.avatar;
    userName.textContent = client.contactName;
    userRole.textContent = `${client.contactRole} (${client.name})`;

    // Set default client portal view
    window.appState.activeView = 'portal-home';
    showToast("Switched to Client Portal", `Simulating customer experience for ${client.name}`, "success");
  }

  renderSidebarNav();
  renderCurrentView();
  lucide.createIcons();
}

// Navigation Handler
function navigateTo(view, id = null) {
  window.appState.activeView = view;
  if (view === 'client-detail' && id) window.appState.activeClientId = id;
  if (view === 'project-detail' && id) window.appState.activeProjectId = id;
  if (view === 'proposal-detail' && id) window.appState.activeProposalId = id;
  if (view === 'invoice-detail' && id) window.appState.activeInvoiceId = id;

  renderSidebarNav();
  renderCurrentView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sidebar Navigation Renderer
function renderSidebarNav() {
  const container = document.getElementById('main-nav-links');
  if (!container) return;

  const role = window.appState.currentRole;
  const currentView = window.appState.activeView;

  if (role === 'workspace') {
    container.innerHTML = `
      <button onclick="navigateTo('dashboard')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'dashboard' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
        <span>Dashboard</span>
      </button>
      <button onclick="navigateTo('clients')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'clients' || currentView === 'client-detail' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="users" class="w-4 h-4"></i>
        <span>Clients</span>
        <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">${window.mockData.clients.length}</span>
      </button>
      <button onclick="navigateTo('projects')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'projects' || currentView === 'project-detail' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="folder-kanban" class="w-4 h-4"></i>
        <span>Projects</span>
        <span class="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">${window.mockData.projects.length}</span>
      </button>
      <button onclick="navigateTo('proposals')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'proposals' || currentView === 'proposal-detail' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="file-signature" class="w-4 h-4"></i>
        <span>Proposals</span>
      </button>
      <button onclick="navigateTo('invoices')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'invoices' || currentView === 'invoice-detail' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="receipt" class="w-4 h-4"></i>
        <span>Invoices</span>
      </button>
      <button onclick="navigateTo('messages')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'messages' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="message-square" class="w-4 h-4"></i>
        <span>Messages</span>
      </button>
    `;
  } else {
    // Client Portal Nav
    container.innerHTML = `
      <button onclick="navigateTo('portal-home')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'portal-home' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="home" class="w-4 h-4"></i>
        <span>Portal Overview</span>
      </button>
      <button onclick="navigateTo('portal-deliverables')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'portal-deliverables' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="check-square" class="w-4 h-4"></i>
        <span>Deliverables & Approvals</span>
      </button>
      <button onclick="navigateTo('portal-files')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'portal-files' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="file-text" class="w-4 h-4"></i>
        <span>Shared Files</span>
      </button>
      <button onclick="navigateTo('portal-invoices')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'portal-invoices' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="credit-card" class="w-4 h-4"></i>
        <span>Invoices & Billing</span>
      </button>
      <button onclick="navigateTo('messages')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${currentView === 'messages' ? 'bg-sky-600/20 text-sky-300 border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}">
        <i data-lucide="message-square" class="w-4 h-4"></i>
        <span>Message Agency</span>
      </button>
    `;
  }
  lucide.createIcons();
}

// Notifications toggle
function toggleNotifications() {
  const dropdown = document.getElementById('notifications-dropdown');
  dropdown.classList.toggle('hidden');
  renderNotificationsList();
}

function renderNotificationsList() {
  const list = document.getElementById('notifications-list');
  if (!list) return;

  list.innerHTML = window.mockData.notifications.map(n => `
    <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex items-start gap-3">
      <div class="w-2 h-2 rounded-full ${n.unread ? 'bg-brand-500' : 'bg-slate-700'} mt-1.5 shrink-0"></div>
      <div>
        <h5 class="text-xs font-semibold text-white">${n.title}</h5>
        <p class="text-[11px] text-slate-400">${n.desc}</p>
        <span class="text-[10px] text-slate-500 mt-1 block">${n.time}</span>
      </div>
    </div>
  `).join('');
}

function markAllNotificationsRead() {
  window.mockData.notifications.forEach(n => n.unread = false);
  renderNotificationsList();
  showToast("Notifications Cleared", "All notifications marked as read.", "info");
}

// Global search handling
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('global-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      window.appState.searchQuery = e.target.value.toLowerCase();
      renderCurrentView();
    });
  }

  // Keyboard shortcut for Cmd+K search focus
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  // Mobile navigation drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
      sidebar.classList.toggle('fixed');
      sidebar.classList.toggle('inset-y-0');
      sidebar.classList.toggle('left-0');
      sidebar.classList.toggle('z-50');
    });
  }

  // Initial load setup
  switchRole('workspace');
});

// Primary Dispatch Router
function renderCurrentView() {
  const main = document.getElementById('main-content');
  if (!main) return;

  // Cleanup old charts
  Object.values(window.appState.charts).forEach(chart => {
    if (chart && typeof chart.destroy === 'function') chart.destroy();
  });
  window.appState.charts = {};

  const view = window.appState.activeView;

  if (view === 'dashboard') renderWorkspaceDashboard(main);
  else if (view === 'clients') renderClientsList(main);
  else if (view === 'client-detail') renderClientDetail(main);
  else if (view === 'projects') renderProjectsList(main);
  else if (view === 'project-detail') renderProjectDetail(main);
  else if (view === 'proposals') renderProposalsList(main);
  else if (view === 'proposal-detail') renderProposalDetail(main);
  else if (view === 'invoices') renderInvoicesList(main);
  else if (view === 'invoice-detail') renderInvoiceDetail(main);
  else if (view === 'messages') renderMessagesView(main);
  else if (view === 'portal-home') renderClientPortalHome(main);
  else if (view === 'portal-deliverables') renderClientPortalDeliverables(main);
  else if (view === 'portal-files') renderClientPortalFiles(main);
  else if (view === 'portal-invoices') renderClientPortalInvoices(main);

  lucide.createIcons();
}
