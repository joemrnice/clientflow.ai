/**
 * ClientFlow - Freelancer & Agency Workspace View Renderers
 */

// 1. Workspace Dashboard Renderer
function renderWorkspaceDashboard(container) {
  const agency = window.mockData.agency;
  const projects = window.mockData.projects;
  const clients = window.mockData.clients;
  const invoices = window.mockData.invoices;

  const totalOutstanding = invoices
    .filter(i => i.status === 'Pending' || i.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const activeProjects = projects.filter(p => p.progress < 100);
  const pendingApprovals = projects.flatMap(p => p.deliverables.filter(d => d.status === 'Pending Review'));

  container.innerHTML = `
    <!-- Dashboard Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Agency Overview</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Welcome back, Alex. Here is your agency operating status for today.</p>
      </div>
      <div class="flex items-center gap-3">
        <button onclick="openModal('quick-create-modal')" class="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-brand-600/30 transition flex items-center gap-2">
          <i data-lucide="plus-circle" class="w-4 h-4"></i>
          <span>New Client Project</span>
        </button>
      </div>
    </div>

    <!-- Revenue & Metrics Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Revenue -->
      <div class="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">YTD Revenue</span>
          <div class="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <i data-lucide="dollar-sign" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-extrabold text-white">$${agency.totalRevenueYear.toLocaleString()}</h2>
          <span class="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +18.4% vs last year
          </span>
        </div>
      </div>

      <!-- Active Clients -->
      <div class="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Active Clients</span>
          <div class="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <i data-lucide="users" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-extrabold text-white">${clients.length} Accounts</h2>
          <span class="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-semibold">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-400"></i> ${agency.activeProjectsCount} active deliverables
          </span>
        </div>
      </div>

      <!-- Outstanding Invoices -->
      <div class="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Outstanding Invoices</span>
          <div class="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-extrabold text-amber-400">$${totalOutstanding.toLocaleString()}</h2>
          <span class="text-[11px] text-slate-400 flex items-center gap-1 mt-1 font-semibold">
            ${invoices.filter(i => i.status === 'Pending').length} pending, ${invoices.filter(i => i.status === 'Overdue').length} overdue
          </span>
        </div>
      </div>

      <!-- Pending Client Approvals -->
      <div class="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400">Pending Approvals</span>
          <div class="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <i data-lucide="file-check" class="w-5 h-5"></i>
          </div>
        </div>
        <div class="mt-4">
          <h2 class="text-2xl font-extrabold text-white">${pendingApprovals.length} Items</h2>
          <span class="text-[11px] text-purple-300 flex items-center gap-1 mt-1 font-semibold">
            Awaiting client review
          </span>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue Trend Chart (2 Cols) -->
      <div class="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-base font-bold text-white">Monthly Revenue Trajectory</h3>
            <p class="text-xs text-slate-400">Track billed revenue and recurring retainers</p>
          </div>
          <span class="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">2024 Q1-Q2</span>
        </div>
        <div class="h-64">
          <canvas id="revenueChart"></canvas>
        </div>
      </div>

      <!-- Project Health Distribution Chart (1 Col) -->
      <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div>
          <h3 class="text-base font-bold text-white mb-1">Project Health Status</h3>
          <p class="text-xs text-slate-400 mb-4">Risk assessment across active client workspaces</p>
          <div class="h-48 relative flex items-center justify-center">
            <canvas id="healthChart"></canvas>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-slate-800 grid grid-cols-3 text-center text-xs">
          <div>
            <span class="block text-emerald-400 font-bold text-sm">65%</span>
            <span class="text-[10px] text-slate-400">On Track</span>
          </div>
          <div>
            <span class="block text-amber-400 font-bold text-sm">25%</span>
            <span class="text-[10px] text-slate-400">At Risk</span>
          </div>
          <div>
            <span class="block text-rose-400 font-bold text-sm">10%</span>
            <span class="text-[10px] text-slate-400">Delayed</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Projects & Pending Approvals Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Active Projects Grid (2 Cols) -->
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white">Active Client Projects</h3>
          <button onclick="navigateTo('projects')" class="text-xs text-brand-400 hover:underline font-semibold flex items-center gap-1">
            View All Projects <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <div class="space-y-3">
          ${projects.map(p => {
            const healthBadge = p.health === 'On Track'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : p.health === 'At Risk'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30';

            return `
              <div onclick="navigateTo('project-detail', '${p.id}')" class="glass-card p-5 rounded-2xl border border-slate-800/80 hover:border-brand-500/40 cursor-pointer transition group">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span class="text-[11px] font-semibold text-brand-400 uppercase tracking-wider">${p.clientName}</span>
                    <h4 class="text-sm sm:text-base font-bold text-white group-hover:text-brand-300 transition">${p.title}</h4>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-semibold px-2.5 py-1 rounded-full border ${healthBadge}">
                      ${p.health}
                    </span>
                    <span class="text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                      $${p.budget.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p class="text-xs text-slate-400 line-clamp-1 mb-4">${p.summary}</p>

                <!-- Milestone Pipeline Progress Bar -->
                <div>
                  <div class="flex justify-between items-center text-xs mb-1.5">
                    <span class="text-slate-400">Current Stage: <strong class="text-slate-200">${p.currentMilestoneStage}</strong></span>
                    <span class="font-bold text-brand-400">${p.progress}%</span>
                  </div>
                  <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div class="bg-gradient-to-r from-brand-500 to-sky-400 h-2 rounded-full transition-all duration-500" style="width: ${p.progress}%"></div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Pending Approvals & Upcoming Deadlines Sidebar (1 Col) -->
      <div class="space-y-6">

        <!-- Pending Approvals -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800">
          <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <i data-lucide="clock" class="w-4 h-4 text-purple-400"></i> Pending Client Approvals
            </h3>
            <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">${pendingApprovals.length}</span>
          </div>

          <div class="space-y-3">
            ${pendingApprovals.length === 0 ? '<p class="text-xs text-slate-500 italic py-2">No deliverables currently pending review.</p>' : ''}
            ${pendingApprovals.map(d => `
              <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div class="font-bold text-slate-200">${d.title}</div>
                <div class="text-[11px] text-slate-400 mt-0.5">Submitted: ${d.submittedDate}</div>
                <div class="mt-2.5 flex items-center justify-between">
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">${d.status}</span>
                  <button onclick="navigateTo('project-detail', 'proj-1')" class="text-[11px] text-brand-400 hover:underline font-semibold">
                    Review Item
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Upcoming Deadlines -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800">
          <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <i data-lucide="calendar" class="w-4 h-4 text-sky-400"></i> Upcoming Deadlines
            </h3>
          </div>

          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-white block">Frontend Development</span>
                <span class="text-[11px] text-slate-400">Apex Studio Labs</span>
              </div>
              <span class="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-1 rounded">Mar 28</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span class="font-bold text-white block">Headless Storefront Frontend</span>
                <span class="text-[11px] text-slate-400">Acme Corp International</span>
              </div>
              <span class="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-1 rounded">Mar 30</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;

  // Initialize Chart.js Graphs
  setTimeout(() => {
    initRevenueChart();
    initHealthChart();
  }, 100);
}

// Chart.js Revenue Line Chart
function initRevenueChart() {
  const ctx = document.getElementById('revenueChart')?.getContext('2d');
  if (!ctx) return;

  window.appState.charts.revenue = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Project Revenue ($)',
          data: [32000, 48000, 56000, 42000, 68000, 84000],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.15)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        },
        {
          label: 'Retainer Target ($)',
          data: [25000, 30000, 35000, 40000, 45000, 50000],
          borderColor: '#38bdf8',
          borderDash: [5, 5],
          fill: false,
          tension: 0.1,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94a3b8', font: { size: 11 } } }
      },
      scales: {
        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

// Chart.js Health Doughnut Chart
function initHealthChart() {
  const ctx = document.getElementById('healthChart')?.getContext('2d');
  if (!ctx) return;

  window.appState.charts.health = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['On Track', 'At Risk', 'Delayed'],
      datasets: [{
        data: [65, 25, 10],
        backgroundColor: ['#22c55e', '#f59e0b', '#f43f5e'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: { display: false }
      }
    }
  });
}


// 2. Clients List Renderer
function renderClientsList(container) {
  const clients = window.mockData.clients.filter(c =>
    c.name.toLowerCase().includes(window.appState.searchQuery) ||
    c.industry.toLowerCase().includes(window.appState.searchQuery)
  );

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Client Portfolio</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Manage client profiles, contracts, and payment histories.</p>
      </div>
      <button onclick="openModal('quick-create-modal')" class="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-brand-600/30 transition flex items-center gap-2 self-start sm:self-auto">
        <i data-lucide="user-plus" class="w-4 h-4"></i>
        <span>Add Client</span>
      </button>
    </div>

    <!-- Clients Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${clients.map(c => `
        <div onclick="navigateTo('client-detail', '${c.id}')" class="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/50 cursor-pointer transition group flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <img src="${c.avatar}" alt="${c.name}" class="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800 group-hover:ring-brand-500/50 transition">
                <div>
                  <h3 class="text-base font-bold text-white group-hover:text-brand-300 transition">${c.name}</h3>
                  <span class="text-xs text-slate-400">${c.industry}</span>
                </div>
              </div>
              <span class="text-[10px] font-semibold px-2.5 py-1 rounded-full border ${c.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}">
                ${c.status}
              </span>
            </div>

            <div class="space-y-2 py-3 border-y border-slate-800/80 text-xs text-slate-300">
              <div class="flex justify-between">
                <span class="text-slate-500">Contact Person:</span>
                <span class="font-semibold text-slate-200">${c.contactName}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Email:</span>
                <span class="font-mono text-slate-400">${c.email}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Portal Security Code:</span>
                <span class="font-mono text-brand-400">${c.portalCode}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 pt-3 flex items-center justify-between text-xs">
            <div>
              <span class="text-slate-500 block text-[10px]">Total Billed</span>
              <span class="font-bold text-white text-sm">$${c.totalSpent.toLocaleString()}</span>
            </div>
            <span class="text-xs text-brand-400 group-hover:translate-x-1 transition-transform font-semibold flex items-center gap-1">
              View Profile <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


// 3. Client Detail Renderer (With Tabs: Info, Contracts, Payments, Notes, Activity)
function renderClientDetail(container) {
  const client = window.mockData.clients.find(c => c.id === window.appState.activeClientId) || window.mockData.clients[0];
  const clientProjects = window.mockData.projects.filter(p => p.clientId === client.id);
  const clientInvoices = window.mockData.invoices.filter(i => i.clientId === client.id);

  container.innerHTML = `
    <!-- Header Back Navigation & Client Identity -->
    <div>
      <button onclick="navigateTo('clients')" class="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-4">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Clients
      </button>

      <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <img src="${client.avatar}" alt="${client.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500/30">
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-2xl font-extrabold text-white">${client.name}</h1>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">${client.status}</span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">${client.industry} • Joined ${client.joinedDate}</p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button onclick="switchRole('portal')" class="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 shadow-lg shadow-sky-600/20">
            <i data-lucide="eye" class="w-4 h-4"></i>
            <span>Impersonate Client Portal</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Client Detail Content Tabs Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Left Info Sidebar (1 Col) -->
      <div class="space-y-6">
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 class="text-sm font-bold text-white pb-2 border-b border-slate-800">Primary Contact</h3>
          <div class="space-y-3 text-xs">
            <div>
              <span class="text-slate-500 block">Contact Name</span>
              <span class="font-semibold text-white">${client.contactName} (${client.contactRole})</span>
            </div>
            <div>
              <span class="text-slate-500 block">Email Address</span>
              <span class="font-mono text-slate-300">${client.email}</span>
            </div>
            <div>
              <span class="text-slate-500 block">Phone</span>
              <span class="font-mono text-slate-300">${client.phone}</span>
            </div>
            <div>
              <span class="text-slate-500 block">Portal Security Code</span>
              <span class="font-mono text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">${client.portalCode}</span>
            </div>
          </div>
        </div>

        <!-- Notes Card -->
        <div class="glass-card p-5 rounded-2xl border border-slate-800">
          <h3 class="text-sm font-bold text-white pb-2 border-b border-slate-800 mb-3">Client Notes</h3>
          <p class="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
            ${client.notes}
          </p>
        </div>
      </div>

      <!-- Right Main Content Tabs (2 Cols) -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Active Client Projects -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h3 class="text-sm font-bold text-white mb-4">Client Projects</h3>
          <div class="space-y-3">
            ${clientProjects.map(p => `
              <div onclick="navigateTo('project-detail', '${p.id}')" class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-brand-500/40 cursor-pointer transition flex items-center justify-between text-xs">
                <div>
                  <h4 class="font-bold text-white">${p.title}</h4>
                  <span class="text-slate-400">Due: ${p.dueDate} • Budget: $${p.budget.toLocaleString()}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="font-mono font-bold text-brand-400">${p.progress}%</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500"></i>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Contracts & Agreements -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h3 class="text-sm font-bold text-white mb-4">Contracts & Legal Documents</h3>
          <div class="space-y-3">
            ${client.contracts.map(doc => `
              <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div class="flex items-center gap-3">
                  <i data-lucide="file-check-2" class="w-5 h-5 text-brand-400"></i>
                  <div>
                    <h5 class="font-bold text-white">${doc.title}</h5>
                    <span class="text-[11px] text-slate-400">${doc.date} • ${doc.size}</span>
                  </div>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold">${doc.status}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Payments & Invoices -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h3 class="text-sm font-bold text-white mb-4">Payment History & Invoices</h3>
          <div class="space-y-3">
            ${clientInvoices.map(inv => `
              <div onclick="navigateTo('invoice-detail', '${inv.id}')" class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 cursor-pointer transition flex items-center justify-between text-xs">
                <div>
                  <span class="font-mono font-bold text-white">${inv.id}</span>
                  <span class="text-slate-400 block text-[11px]">Due: ${inv.dueDate}</span>
                </div>
                <div class="text-right">
                  <span class="font-mono font-bold text-white text-sm block">$${inv.totalAmount.toLocaleString()}</span>
                  <span class="text-[10px] px-2 py-0.5 rounded font-semibold ${inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}">${inv.status}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}


// 4. Projects List Renderer
function renderProjectsList(container) {
  const projects = window.mockData.projects.filter(p =>
    p.title.toLowerCase().includes(window.appState.searchQuery) ||
    p.clientName.toLowerCase().includes(window.appState.searchQuery)
  );

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Client Projects</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Track deliverables, progress, and milestone health.</p>
      </div>
      <button onclick="openModal('quick-create-modal')" class="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-brand-600/30 transition flex items-center gap-2 self-start sm:self-auto">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Create Project</span>
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${projects.map(p => `
        <div onclick="navigateTo('project-detail', '${p.id}')" class="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/50 cursor-pointer transition group flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-brand-400 uppercase tracking-wider">${p.clientName}</span>
              <span class="text-[10px] font-semibold px-2.5 py-1 rounded-full border ${p.health === 'On Track' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'}">
                ${p.health}
              </span>
            </div>

            <h3 class="text-lg font-bold text-white group-hover:text-brand-300 transition mb-2">${p.title}</h3>
            <p class="text-xs text-slate-400 line-clamp-2 mb-6">${p.summary}</p>
          </div>

          <div>
            <div class="flex justify-between items-center text-xs mb-2">
              <span class="text-slate-400">Stage: <strong class="text-slate-200">${p.currentMilestoneStage}</strong></span>
              <span class="font-bold text-brand-400 font-mono">${p.progress}%</span>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div class="bg-gradient-to-r from-brand-500 to-sky-400 h-2 rounded-full" style="width: ${p.progress}%"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


// 5. Project Workspace Detail Renderer (With Milestone Visual Pipeline & File Upload Simulation)
function renderProjectDetail(container) {
  const project = window.mockData.projects.find(p => p.id === window.appState.activeProjectId) || window.mockData.projects[0];

  container.innerHTML = `
    <!-- Top Header & Health -->
    <div>
      <button onclick="navigateTo('projects')" class="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-4">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Projects
      </button>

      <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <span class="text-xs font-bold text-brand-400 uppercase tracking-wider">${project.clientName}</span>
            <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">${project.health}</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">${project.title}</h1>
          <p class="text-xs text-slate-400 mt-1 max-w-2xl">${project.summary}</p>
        </div>

        <div class="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6 shrink-0">
          <div>
            <span class="text-slate-500 text-[10px] uppercase block">Budget</span>
            <span class="font-mono font-extrabold text-white text-lg">$${project.budget.toLocaleString()}</span>
          </div>
          <div>
            <span class="text-slate-500 text-[10px] uppercase block">Due Date</span>
            <span class="font-mono font-semibold text-slate-300 text-sm">${project.dueDate}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Milestone Pipeline (Discovery → Design → Development → Review → Launch) -->
    <div class="glass-card p-6 rounded-2xl border border-slate-800">
      <h3 class="text-sm font-bold text-white mb-4">Project Milestone Pipeline</h3>
      <div class="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        ${project.milestones.map((m, idx) => {
          const isCompleted = m.status === 'Completed';
          const isInProgress = m.status === 'In Progress';
          const isAtRisk = m.status === 'At Risk';

          const badgeBg = isCompleted ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
            isInProgress ? 'bg-brand-500/20 text-brand-300 border-brand-500/40 ring-2 ring-brand-500/20' :
            isAtRisk ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
            'bg-slate-900 text-slate-500 border-slate-800';

          return `
            <div class="p-4 rounded-xl border ${badgeBg} relative flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                  <span>STEP 0${idx + 1}</span>
                  <i data-lucide="${isCompleted ? 'check-circle-2' : isInProgress ? 'clock' : 'circle'}" class="w-4 h-4"></i>
                </div>
                <h4 class="text-xs font-bold text-white leading-snug">${m.name}</h4>
              </div>
              <div class="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                <span class="font-semibold">${m.status}</span>
                <span class="font-mono text-slate-400">${m.date}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Project Deliverables, Tasks & Discussion Feed Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Left Column: Tasks & Deliverables (2 Cols) -->
      <div class="lg:col-span-2 space-y-6">

        <!-- Deliverables Review Cards -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 class="text-sm font-bold text-white flex items-center gap-2">
              <i data-lucide="package-check" class="w-4 h-4 text-brand-400"></i> Client Deliverables & Approvals
            </h3>
            <span class="text-xs text-slate-400">${project.deliverables.length} Deliverables</span>
          </div>

          <div class="space-y-4">
            ${project.deliverables.map(d => `
              <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row gap-4 items-start">
                <img src="${d.previewUrl}" alt="${d.title}" class="w-full sm:w-32 h-24 rounded-lg object-cover ring-1 ring-slate-800 shrink-0">
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-2">
                    <h4 class="text-sm font-bold text-white">${d.title}</h4>
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded ${d.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}">${d.status}</span>
                  </div>
                  <p class="text-xs text-slate-400 mt-1">${d.description}</p>
                  <div class="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Submitted: ${d.submittedDate} • ${d.fileSize}</span>
                    ${d.feedback ? `<span class="italic text-emerald-400 text-[11px]">${d.feedback}</span>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Task Checklist -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h3 class="text-sm font-bold text-white mb-4">Sprint Tasks & Checklist</h3>
          <div class="space-y-2">
            ${project.tasks.map(t => `
              <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs">
                <div class="flex items-center gap-3">
                  <input type="checkbox" ${t.completed ? 'checked' : ''} class="rounded border-slate-700 text-brand-600 focus:ring-brand-500 w-4 h-4 bg-slate-800">
                  <span class="${t.completed ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}">${t.name}</span>
                </div>
                <span class="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">${t.assignee}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Discussion Thread & Comments -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 class="text-sm font-bold text-white pb-3 border-b border-slate-800">Project Discussion</h3>

          <div id="project-comments-thread" class="space-y-3 max-h-60 overflow-y-auto pr-1">
            ${project.comments.map(c => `
              <div class="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-white flex items-center gap-2">
                    <img src="${c.avatar}" class="w-5 h-5 rounded-full object-cover">
                    ${c.author} <span class="text-[10px] text-brand-400">(${c.authorRole})</span>
                  </span>
                  <span class="text-[10px] text-slate-500">${c.timestamp}</span>
                </div>
                <p class="text-slate-300 leading-relaxed pt-1">${c.text}</p>
              </div>
            `).join('')}
          </div>

          <!-- Add Comment Input Box -->
          <div class="flex gap-2 pt-2 border-t border-slate-800">
            <input type="text" id="project-comment-input" placeholder="Post a comment or update for the client..." class="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500">
            <button onclick="submitProjectComment('${project.id}')" class="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition">
              Send
            </button>
          </div>
        </div>

      </div>

      <!-- Right Column: Project Files & Upload Simulation (1 Col) -->
      <div class="space-y-6">

        <!-- File Upload Drag & Drop Area -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h3 class="text-sm font-bold text-white mb-3">Upload Project File</h3>

          <div id="dropzone" onclick="simulateFileUpload('${project.id}')" class="border-2 border-dashed border-slate-800 hover:border-brand-500/50 bg-slate-900/50 rounded-xl p-6 text-center cursor-pointer transition">
            <i data-lucide="upload-cloud" class="w-8 h-8 mx-auto text-brand-400 mb-2"></i>
            <span class="text-xs font-bold text-white block">Click to Upload File</span>
            <span class="text-[10px] text-slate-500 block mt-1">Supports PDF, PNG, FIG, ZIP up to 50MB</span>
          </div>
        </div>

        <!-- Shared Files Gallery -->
        <div class="glass-card p-6 rounded-2xl border border-slate-800">
          <h3 class="text-sm font-bold text-white mb-4">Project Files (${project.files.length})</h3>

          <div class="space-y-3">
            ${project.files.map(f => `
              <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <div class="flex items-center gap-3 overflow-hidden">
                  <i data-lucide="file-text" class="w-4 h-4 text-brand-400 shrink-0"></i>
                  <div class="truncate">
                    <span class="font-bold text-white block truncate">${f.name}</span>
                    <span class="text-[10px] text-slate-500">${f.size} • ${f.date}</span>
                  </div>
                </div>
                <button onclick="downloadFileSimulation('${f.name}')" class="text-slate-400 hover:text-brand-400 p-1 shrink-0">
                  <i data-lucide="download" class="w-4 h-4"></i>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>
  `;
}

// Simulated file upload
async function simulateFileUpload(projectId) {
  const fileNames = ["Design_System_Spec_v2.pdf", "API_Endpoint_Schema.json", "User_Research_Video_Summary.mp4"];
  const selectedName = fileNames[Math.floor(Math.random() * fileNames.length)];

  showToast("Uploading File...", `Simulating upload for ${selectedName}`, "info");

  const result = await window.apiService.uploadFile(projectId, {
    name: selectedName,
    size: "8.4 MB",
    uploadedBy: "Alex Rivera",
    type: "pdf"
  });

  if (result.success) {
    showToast("File Uploaded Successfully", `${selectedName} is now shared with client.`, "success");
    renderCurrentView();
  }
}

// Download file simulation
function downloadFileSimulation(filename) {
  showToast("Downloading File", `Preparing download for ${filename}`, "info");
}

// Submit project comment
async function submitProjectComment(projectId) {
  const input = document.getElementById('project-comment-input');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  input.value = '';

  await window.apiService.addComment(projectId, text, "Alex Rivera", false);
  showToast("Comment Posted", "Notification dispatched to client.", "success");
  renderCurrentView();
}
