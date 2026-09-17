/**
 * ClientFlow - Customer Client Portal View Renderers & Interactive Workflows
 */

// 1. Client Portal Overview / Home View
function renderClientPortalHome(container) {
  const client = window.mockData.clients.find(c => c.id === window.appState.activeClientId) || window.mockData.clients[0];
  const clientProjects = window.mockData.projects.filter(p => p.clientId === client.id);
  const pendingDeliverables = clientProjects.flatMap(p => p.deliverables.filter(d => d.status === 'Pending Review'));
  const unpaidInvoices = window.mockData.invoices.filter(i => i.clientId === client.id && i.status !== 'Paid');

  container.innerHTML = `
    <!-- Portal Welcome Banner -->
    <div class="glass-card p-6 sm:p-8 rounded-3xl border border-sky-500/20 bg-gradient-to-r from-slate-900 via-slate-900/90 to-sky-950/30 relative overflow-hidden">
      <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span class="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
            <span class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span> Client Operating System
          </span>
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome to your Client Portal, <span class="gradient-portal-text">${client.contactName}</span>
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
            Track real-time project progress, review deliverables, download shared assets, and communicate directly with the team at ${window.mockData.agency.name}.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button onclick="navigateTo('portal-deliverables')" class="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-sky-500/25 transition flex items-center gap-2">
            <i data-lucide="check-square" class="w-4 h-4"></i>
            <span>Pending Approvals (${pendingDeliverables.length})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Active Projects Progress Visualization -->
    <div class="space-y-6">
      <h2 class="text-lg font-bold text-white flex items-center gap-2">
        <i data-lucide="activity" class="w-5 h-5 text-sky-400"></i> Active Project Progress
      </h2>

      ${clientProjects.map(p => `
        <div class="glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span class="text-xs text-sky-400 font-semibold uppercase tracking-wider">${p.category}</span>
              <h3 class="text-xl font-bold text-white mt-0.5">${p.title}</h3>
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <span class="text-[10px] text-slate-400 uppercase block">Overall Progress</span>
                <span class="font-mono font-extrabold text-sky-400 text-lg">${p.progress}%</span>
              </div>
              <div class="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center font-bold text-sky-300 text-sm">
                ${p.progress}%
              </div>
            </div>
          </div>

          <!-- Highly Visible Progress Step Tracker -->
          <div>
            <h4 class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Project Roadmap & Milestones</h4>
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
              ${p.milestones.map((m, idx) => {
                const isDone = m.status === 'Completed';
                const isCurrent = m.status === 'In Progress';

                const cardStyle = isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : isCurrent
                  ? 'bg-sky-500/20 border-sky-500/50 text-white ring-2 ring-sky-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-500';

                return `
                  <div class="p-3.5 rounded-xl border ${cardStyle} flex flex-col justify-between">
                    <div>
                      <div class="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>STAGE 0${idx + 1}</span>
                        <i data-lucide="${isDone ? 'check-circle-2' : isCurrent ? 'loader-2' : 'clock'}" class="w-3.5 h-3.5 ${isDone ? 'text-emerald-400' : isCurrent ? 'text-sky-400 animate-spin' : ''}"></i>
                      </div>
                      <span class="text-xs font-bold block leading-snug">${m.name}</span>
                    </div>
                    <span class="text-[10px] font-mono text-slate-400 block mt-3">${m.date}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Quick Action Cards Grid (Pending Deliverables & Unpaid Invoices) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Deliverables Needing Approval -->
      <div class="glass-card p-6 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <i data-lucide="check-square" class="w-5 h-5 text-sky-400"></i> Deliverables Ready for Review
          </h3>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">${pendingDeliverables.length}</span>
        </div>

        <div class="space-y-3">
          ${pendingDeliverables.length === 0 ? '<p class="text-xs text-slate-400 italic py-2">All deliverables have been reviewed!</p>' : ''}
          ${pendingDeliverables.map(d => `
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="text-sm font-bold text-white">${d.title}</h4>
                  <p class="text-xs text-slate-400 mt-0.5">${d.description}</p>
                </div>
                <span class="text-[10px] font-mono bg-sky-500/10 text-sky-300 px-2 py-0.5 rounded border border-sky-500/20">${d.version}</span>
              </div>

              <div class="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <span class="text-[11px] text-slate-400">Submitted: ${d.submittedDate}</span>
                <button onclick="navigateTo('portal-deliverables')" class="text-xs text-sky-400 hover:underline font-semibold flex items-center gap-1">
                  Review & Approve <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Invoices Summary -->
      <div class="glass-card p-6 rounded-2xl border border-slate-800">
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <i data-lucide="receipt" class="w-5 h-5 text-emerald-400"></i> Open Invoices
          </h3>
          <span class="text-xs text-slate-400">${unpaidInvoices.length} Unpaid</span>
        </div>

        <div class="space-y-3">
          ${unpaidInvoices.length === 0 ? '<p class="text-xs text-slate-400 italic py-2">All invoices are up to date. Thank you!</p>' : ''}
          ${unpaidInvoices.map(inv => `
            <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span class="font-mono font-bold text-white text-xs block">${inv.id}</span>
                <span class="text-[11px] text-slate-400">Due Date: ${inv.dueDate}</span>
              </div>
              <div class="text-right flex items-center gap-3">
                <span class="font-mono font-extrabold text-white text-sm">$${inv.totalAmount.toLocaleString()}</span>
                <button onclick="payInvoiceModal('${inv.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition">
                  Pay Now
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}


// 2. Client Portal Deliverables & Approvals Workflow
function renderClientPortalDeliverables(container) {
  const client = window.mockData.clients.find(c => c.id === window.appState.activeClientId) || window.mockData.clients[0];
  const clientProjects = window.mockData.projects.filter(p => p.clientId === client.id);
  const deliverables = clientProjects.flatMap(p => p.deliverables.map(d => ({ ...d, projectId: p.id, projectTitle: p.title })));

  container.innerHTML = `
    <div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Deliverables & Approvals</h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">Review work submitted by the agency, leave feedback, and provide official approval.</p>
    </div>

    <div class="space-y-6">
      ${deliverables.map(d => {
        const isApproved = d.status === 'Approved';
        const isPending = d.status === 'Pending Review';

        return `
          <div class="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-6 items-start">
            <img src="${d.previewUrl}" alt="${d.title}" class="w-full md:w-64 h-44 rounded-xl object-cover ring-1 ring-slate-800 shrink-0">

            <div class="flex-1 space-y-4 w-full">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">${d.projectTitle}</span>
                  <h3 class="text-lg font-bold text-white mt-0.5">${d.title}</h3>
                </div>
                <span class="text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto ${isApproved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'}">
                  ${d.status}
                </span>
              </div>

              <p class="text-xs text-slate-300 leading-relaxed">${d.description}</p>

              <div class="flex items-center gap-4 text-xs text-slate-400 font-mono py-2 border-y border-slate-800">
                <span>Version: ${d.version}</span>
                <span>Submitted: ${d.submittedDate}</span>
                <span>Size: ${d.fileSize}</span>
              </div>

              ${d.feedback ? `
                <div class="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <span class="text-slate-500 block text-[10px]">Client Feedback:</span>
                  <span class="text-emerald-400 italic">${d.feedback}</span>
                </div>
              ` : ''}

              <!-- Approval Actions -->
              ${isPending ? `
                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button onclick="approveDeliverableAction('${d.projectId}', '${d.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/20">
                    <i data-lucide="check-circle" class="w-4 h-4"></i>
                    <span>Approve Deliverable</span>
                  </button>

                  <button onclick="requestRevisionsModal('${d.projectId}', '${d.id}')" class="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5">
                    <i data-lucide="message-square" class="w-4 h-4"></i>
                    <span>Request Changes</span>
                  </button>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Approve deliverable action
async function approveDeliverableAction(projectId, deliverableId) {
  showToast("Persisting Approval...", "Updating deliverable status", "info");

  const result = await window.apiService.updateApproval(
    projectId,
    deliverableId,
    "Approved",
    `Approved by ${window.mockData.clients[0].contactName} on ${new Date().toLocaleDateString()}`
  );

  if (result.success) {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
    showToast("Deliverable Approved!", "Agency has been notified of your sign-off.", "success");
    renderCurrentView();
  }
}

// Request revisions modal prompt
function requestRevisionsModal(projectId, deliverableId) {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="glass-card max-w-md w-full p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 class="text-base font-bold text-white">Request Revisions</h3>
        <p class="text-xs text-slate-400">Describe the changes or updates you would like the design team to make.</p>

        <textarea id="revision-text" rows="4" placeholder="Enter specific feedback or adjustments requested..." class="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"></textarea>

        <div class="flex justify-end gap-3 pt-2">
          <button onclick="closeModal()" class="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white">Cancel</button>
          <button onclick="submitRevisionRequest('${projectId}', '${deliverableId}')" class="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl text-xs font-semibold">Submit Feedback</button>
        </div>
      </div>
    </div>
  `;
}

async function submitRevisionRequest(projectId, deliverableId) {
  const text = document.getElementById('revision-text')?.value || "Revisions requested by client.";
  closeModal();

  await window.apiService.updateApproval(projectId, deliverableId, "Revisions Requested", text);
  showToast("Revisions Submitted", "Feedback sent to agency lead.", "info");
  renderCurrentView();
}


// 3. Client Portal Shared Files Renderer
function renderClientPortalFiles(container) {
  const client = window.mockData.clients.find(c => c.id === window.appState.activeClientId) || window.mockData.clients[0];
  const clientProjects = window.mockData.projects.filter(p => p.clientId === client.id);
  const files = clientProjects.flatMap(p => p.files);

  container.innerHTML = `
    <div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Shared Project Files</h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">Access and download all brand assets, specifications, and project exports.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      ${files.map(f => `
        <div class="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between hover:border-sky-500/40 transition">
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
              <i data-lucide="file-text" class="w-5 h-5"></i>
            </div>
            <div class="truncate">
              <h4 class="text-xs font-bold text-white truncate">${f.name}</h4>
              <span class="text-[10px] text-slate-400 block mt-0.5">${f.size} • ${f.date}</span>
            </div>
          </div>
          <button onclick="downloadFileSimulation('${f.name}')" class="p-2 text-slate-400 hover:text-sky-300 hover:bg-slate-800 rounded-xl transition shrink-0">
            <i data-lucide="download" class="w-4 h-4"></i>
          </button>
        </div>
      `).join('')}
    </div>
  `;
}


// 4. Client Portal Invoices Renderer
function renderClientPortalInvoices(container) {
  const client = window.mockData.clients.find(c => c.id === window.appState.activeClientId) || window.mockData.clients[0];
  const invoices = window.mockData.invoices.filter(i => i.clientId === client.id);

  container.innerHTML = `
    <div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Invoices & Billing</h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">Review outstanding statements and process payments online.</p>
    </div>

    <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
            <tr>
              <th class="px-6 py-3.5">Invoice #</th>
              <th class="px-6 py-3.5">Issue Date</th>
              <th class="px-6 py-3.5">Due Date</th>
              <th class="px-6 py-3.5">Amount</th>
              <th class="px-6 py-3.5">Status</th>
              <th class="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            ${invoices.map(i => `
              <tr class="hover:bg-slate-900/50 transition">
                <td class="px-6 py-4 font-mono font-bold text-white">${i.id}</td>
                <td class="px-6 py-4">${i.issueDate}</td>
                <td class="px-6 py-4">${i.dueDate}</td>
                <td class="px-6 py-4 font-mono font-bold text-white">$${i.totalAmount.toLocaleString()}</td>
                <td class="px-6 py-4">
                  <span class="text-[10px] font-semibold px-2.5 py-1 rounded-full ${i.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}">
                    ${i.status}
                  </span>
                </td>
                <td class="px-6 py-4 text-right flex items-center justify-end gap-2">
                  <button onclick="navigateTo('invoice-detail', '${i.id}')" class="text-xs text-sky-400 hover:underline font-semibold">View PDF</button>
                  ${i.status !== 'Paid' ? `
                    <button onclick="payInvoiceModal('${i.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">Pay</button>
                  ` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Payment Simulation Modal
function payInvoiceModal(invoiceId) {
  const invoice = window.mockData.invoices.find(i => i.id === invoiceId);
  if (!invoice) return;

  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="glass-card max-w-md w-full p-6 rounded-2xl border border-slate-800 space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="text-base font-bold text-white">Process Payment</h3>
          <span class="font-mono text-xs text-emerald-400 font-bold">${invoice.id}</span>
        </div>

        <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
          <span class="text-xs text-slate-400">Total Amount Due:</span>
          <span class="text-xl font-extrabold text-white font-mono">$${invoice.totalAmount.toLocaleString()}</span>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="text-slate-400 block mb-1">Cardholder Name</label>
            <input type="text" value="${invoice.clientName}" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white">
          </div>
          <div>
            <label class="text-slate-400 block mb-1">Card Number (Simulated)</label>
            <input type="text" value="•••• •••• •••• 4242" class="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono">
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button onclick="closeModal()" class="px-4 py-2 rounded-xl text-xs text-slate-400">Cancel</button>
          <button onclick="executePaymentProcess('${invoice.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20">
            Pay $${invoice.totalAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  `;
}

async function executePaymentProcess(invoiceId) {
  closeModal();
  showToast("Processing Payment...", "Connecting to payment gateway", "info");

  const result = await window.apiService.processPayment(invoiceId, "Credit Card");

  if (result.success) {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    showToast("Payment Successful!", `Invoice ${invoiceId} marked as Paid. Receipt emailed.`, "success");
    renderCurrentView();
  }
}

function closeModal() {
  const container = document.getElementById('modal-container');
  if (container) container.innerHTML = '';
}
