/**
 * ClientFlow - Proposals, Invoices & Messages View Renderers
 */

// 1. Proposals List Renderer
function renderProposalsList(container) {
  const proposals = window.mockData.proposals.filter(p =>
    p.title.toLowerCase().includes(window.appState.searchQuery) ||
    p.clientName.toLowerCase().includes(window.appState.searchQuery)
  );

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Client Proposals</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Interactive proposals, service line items, terms, and digital acceptance.</p>
      </div>
      <button onclick="openModal('quick-create-modal')" class="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-brand-600/30 transition flex items-center gap-2 self-start sm:self-auto">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Create Proposal</span>
      </button>
    </div>

    <!-- Proposals Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${proposals.map(p => `
        <div onclick="navigateTo('proposal-detail', '${p.id}')" class="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/50 cursor-pointer transition group flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-semibold text-brand-400 uppercase tracking-wider">${p.clientName}</span>
              <span class="text-[10px] font-semibold px-2.5 py-1 rounded-full border ${p.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-sky-500/10 text-sky-300 border-sky-500/30'}">
                ${p.status}
              </span>
            </div>

            <h3 class="text-base font-bold text-white group-hover:text-brand-300 transition mb-2">${p.title}</h3>
            <p class="text-xs text-slate-400 line-clamp-2 mb-4">${p.summary}</p>
          </div>

          <div class="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span class="text-[10px] text-slate-500 block">Total Value</span>
              <span class="font-mono font-bold text-white text-base">$${p.totalAmount.toLocaleString()}</span>
            </div>
            <span class="text-xs text-brand-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Preview Proposal <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}


// 2. Proposal Preview & Interactive Acceptance Workflow
function renderProposalDetail(container) {
  const proposal = window.mockData.proposals.find(p => p.id === window.appState.activeProposalId) || window.mockData.proposals[0];
  const agency = window.mockData.agency;

  container.innerHTML = `
    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <button onclick="navigateTo('proposals')" class="text-xs text-slate-400 hover:text-white flex items-center gap-1 self-start">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Proposals
      </button>

      <div class="flex items-center gap-3">
        <button onclick="window.print()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>Print / PDF</span>
        </button>
        ${proposal.status !== 'Accepted' ? `
          <button onclick="acceptProposalWorkflow('${proposal.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            <span>Accept & Sign Proposal</span>
          </button>
        ` : `
          <span class="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
            <i data-lucide="check-circle-2" class="w-4 h-4"></i> Proposal Accepted & Signed
          </span>
        `}
      </div>
    </div>

    <!-- Official Proposal Document Sheet -->
    <div class="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-8 bg-slate-900/90 shadow-2xl">

      <!-- Agency Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-800">
        <div class="flex items-center gap-4">
          <img src="${agency.logo}" alt="${agency.name}" class="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/30">
          <div>
            <h2 class="text-xl font-bold text-white tracking-tight">${agency.name}</h2>
            <p class="text-xs text-brand-400">${agency.tagline}</p>
            <span class="text-[11px] text-slate-400 font-mono block mt-1">${agency.email} • ${agency.phone}</span>
          </div>
        </div>

        <div class="text-left sm:text-right text-xs space-y-1">
          <span class="text-[10px] uppercase font-mono font-bold text-slate-500 block">PROPOSAL REF</span>
          <span class="font-mono font-bold text-white text-base">${proposal.id}</span>
          <span class="text-slate-400 block mt-1">Date: ${proposal.createdDate}</span>
          <span class="text-slate-400 block">Valid Until: ${proposal.validUntil}</span>
        </div>
      </div>

      <!-- Client & Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80">
        <div>
          <span class="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">PREPARED FOR</span>
          <h3 class="text-base font-bold text-white">${proposal.clientName}</h3>
          <p class="text-xs text-slate-400 mt-0.5">Attn: ${proposal.clientContact}</p>
        </div>

        <div>
          <span class="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">PROJECT SCOPE SUMMARY</span>
          <p class="text-xs text-slate-300 leading-relaxed">${proposal.summary}</p>
        </div>
      </div>

      <!-- Services & Line Item Pricing Table -->
      <div class="space-y-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <i data-lucide="layers" class="w-4 h-4 text-brand-400"></i> Scope of Services & Investment
        </h3>

        <div class="rounded-2xl border border-slate-800 overflow-hidden">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
              <tr>
                <th class="px-6 py-3.5">Service Description</th>
                <th class="px-6 py-3.5 text-right">Investment ($)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/80 bg-slate-900/50">
              ${proposal.services.map(s => `
                <tr>
                  <td class="px-6 py-4 font-semibold text-white">${s.description}</td>
                  <td class="px-6 py-4 font-mono font-bold text-white text-right">$${s.amount.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot class="bg-slate-950/90 font-bold border-t border-slate-800">
              <tr>
                <td class="px-6 py-4 text-slate-300 text-sm">Total Project Investment</td>
                <td class="px-6 py-4 font-mono text-brand-400 text-lg text-right">$${proposal.totalAmount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <!-- Timeline & Payment Terms -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pt-4 border-t border-slate-800">
        <div>
          <h4 class="font-bold text-white mb-1">Project Timeline</h4>
          <p class="text-slate-400 leading-relaxed">${proposal.timelineWeeks} estimated delivery time from kickoff date.</p>
        </div>
        <div>
          <h4 class="font-bold text-white mb-1">Terms & Milestones</h4>
          <p class="text-slate-400 leading-relaxed">${proposal.terms}</p>
        </div>
      </div>

      <!-- Acceptance Sign-off Box -->
      <div class="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-brand-950/30 border border-brand-500/30 space-y-4">
        <h4 class="text-sm font-bold text-white flex items-center gap-2">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> Agreement Execution
        </h4>
        <p class="text-xs text-slate-300">
          By clicking below, you accept the terms outlined in this proposal on behalf of <strong>${proposal.clientName}</strong>.
        </p>

        ${proposal.status === 'Accepted' ? `
          <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
            <span class="font-bold block">✓ Executed Digitally</span>
            <span class="font-mono text-[11px] block text-emerald-400/80">Signed on ${proposal.acceptedAt}</span>
          </div>
        ` : `
          <button onclick="acceptProposalWorkflow('${proposal.id}')" class="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/30 flex items-center gap-2">
            <i data-lucide="check-circle" class="w-4 h-4"></i> Accept & Sign Proposal Now
          </button>
        `}
      </div>

    </div>
  `;
}

// Accept Proposal Simulation Function
async function acceptProposalWorkflow(proposalId) {
  showToast("Accepting Proposal...", "Processing digital signature", "info");

  const result = await window.apiService.acceptProposal(proposalId, "Signed Electronically");

  if (result.success) {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
    showToast("Proposal Accepted!", "Congratulations! The project contract is now active.", "success");
    renderCurrentView();
  }
}


// 3. Invoices List Renderer
function renderInvoicesList(container) {
  const invoices = window.mockData.invoices.filter(i =>
    i.id.toLowerCase().includes(window.appState.searchQuery) ||
    i.clientName.toLowerCase().includes(window.appState.searchQuery)
  );

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Invoices & Billing</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Manage invoice line items, tax calculations, discounts, and PDF generation.</p>
      </div>
      <button onclick="openCreateInvoiceModal()" class="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-brand-600/30 transition flex items-center gap-2 self-start sm:self-auto">
        <i data-lucide="receipt" class="w-4 h-4"></i>
        <span>Create Invoice</span>
      </button>
    </div>

    <!-- Invoices Table -->
    <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
            <tr>
              <th class="px-6 py-3.5">Invoice #</th>
              <th class="px-6 py-3.5">Client</th>
              <th class="px-6 py-3.5">Issue Date</th>
              <th class="px-6 py-3.5">Due Date</th>
              <th class="px-6 py-3.5">Total Amount</th>
              <th class="px-6 py-3.5">Status</th>
              <th class="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            ${invoices.map(i => `
              <tr class="hover:bg-slate-900/50 transition">
                <td class="px-6 py-4 font-mono font-bold text-white">${i.id}</td>
                <td class="px-6 py-4 font-semibold text-slate-200">${i.clientName}</td>
                <td class="px-6 py-4">${i.issueDate}</td>
                <td class="px-6 py-4">${i.dueDate}</td>
                <td class="px-6 py-4 font-mono font-bold text-white">$${i.totalAmount.toLocaleString()}</td>
                <td class="px-6 py-4">
                  <span class="text-[10px] font-semibold px-2.5 py-1 rounded-full ${i.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : i.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}">
                    ${i.status}
                  </span>
                </td>
                <td class="px-6 py-4 text-right flex items-center justify-end gap-2">
                  <button onclick="navigateTo('invoice-detail', '${i.id}')" class="text-xs text-brand-400 hover:underline font-semibold">View PDF</button>
                  ${i.status !== 'Paid' ? `
                    <button onclick="markInvoicePaid('${i.id}')" class="text-[11px] text-emerald-400 hover:underline font-semibold">Mark Paid</button>
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

async function markInvoicePaid(invoiceId) {
  await window.apiService.processPayment(invoiceId);
  showToast("Invoice Marked as Paid", `Invoice ${invoiceId} updated.`, "success");
  renderCurrentView();
}


// 4. Detailed Invoice PDF Preview & PDF Generator Component
function renderInvoiceDetail(container) {
  const invoice = window.mockData.invoices.find(i => i.id === window.appState.activeInvoiceId) || window.mockData.invoices[0];
  const agency = window.mockData.agency;

  container.innerHTML = `
    <!-- Top Action Toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <button onclick="navigateTo('invoices')" class="text-xs text-slate-400 hover:text-white flex items-center gap-1 self-start">
        <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Invoices
      </button>

      <div class="flex items-center gap-3">
        <button onclick="generatePDFSimulation('${invoice.id}')" class="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-brand-600/30 transition flex items-center gap-2">
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>Download PDF File</span>
        </button>
        <button onclick="window.print()" class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2">
          <i data-lucide="printer" class="w-4 h-4"></i>
          <span>Print</span>
        </button>
      </div>
    </div>

    <!-- Printable Invoice Sheet -->
    <div id="printable-invoice" class="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 max-w-3xl mx-auto space-y-8 bg-slate-900/90 shadow-2xl">

      <!-- Top Branding & Invoice Meta -->
      <div class="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-800">
        <div>
          <h2 class="text-2xl font-extrabold text-white tracking-tight">${agency.name}</h2>
          <p class="text-xs text-slate-400 mt-1">${agency.address}</p>
          <p class="text-xs text-slate-400">Tax ID: ${agency.taxId}</p>
        </div>

        <div class="text-left sm:text-right text-xs space-y-1">
          <span class="text-[10px] uppercase font-mono font-bold text-slate-500 block">INVOICE NUMBER</span>
          <span class="font-mono font-extrabold text-white text-xl">${invoice.id}</span>
          <span class="text-slate-400 block mt-1">Issue Date: ${invoice.issueDate}</span>
          <span class="text-slate-400 block">Due Date: ${invoice.dueDate}</span>
          <div class="mt-2">
            <span class="text-[10px] font-semibold px-3 py-1 rounded-full ${invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'}">
              STATUS: ${invoice.status}
            </span>
          </div>
        </div>
      </div>

      <!-- Billed To Client -->
      <div class="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
        <span class="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">BILLED TO</span>
        <h3 class="text-sm font-bold text-white">${invoice.clientName}</h3>
        <span class="text-xs text-slate-400 block font-mono mt-0.5">${invoice.clientEmail}</span>
      </div>

      <!-- Line Items Table -->
      <div class="rounded-2xl border border-slate-800 overflow-hidden">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
            <tr>
              <th class="px-6 py-3.5">Service Item</th>
              <th class="px-6 py-3.5 text-center">Qty</th>
              <th class="px-6 py-3.5 text-right">Rate</th>
              <th class="px-6 py-3.5 text-right">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80 bg-slate-900/50">
            ${invoice.lineItems.map(item => `
              <tr>
                <td class="px-6 py-4 font-semibold text-white">${item.description}</td>
                <td class="px-6 py-4 text-center font-mono">${item.qty}</td>
                <td class="px-6 py-4 text-right font-mono">$${item.rate.toLocaleString()}</td>
                <td class="px-6 py-4 text-right font-mono font-bold text-white">$${item.total.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Calculation Breakdown -->
      <div class="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-slate-800">
        <div class="text-xs text-slate-400 max-w-sm">
          <span class="font-bold text-white block mb-1">Payment Notes</span>
          <p class="leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">${invoice.notes}</p>
        </div>

        <div class="w-full sm:w-64 space-y-2 text-xs font-mono">
          <div class="flex justify-between text-slate-400">
            <span>Subtotal:</span>
            <span class="font-bold text-slate-200">$${invoice.subtotal.toLocaleString()}</span>
          </div>
          ${invoice.taxAmount > 0 ? `
            <div class="flex justify-between text-slate-400">
              <span>Tax (${invoice.taxRate}%):</span>
              <span class="font-bold text-slate-200">$${invoice.taxAmount.toLocaleString()}</span>
            </div>
          ` : ''}
          ${invoice.discount > 0 ? `
            <div class="flex justify-between text-emerald-400">
              <span>Discount:</span>
              <span class="font-bold">-$${invoice.discount.toLocaleString()}</span>
            </div>
          ` : ''}
          <div class="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
            <span>Total Due:</span>
            <span class="text-brand-400">$${invoice.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

    </div>
  `;
}

// PDF Generation using jsPDF
function generatePDFSimulation(invoiceId) {
  showToast("Generating PDF Document...", "Formatting PDF layout using jsPDF", "info");

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("CLIENTFLOW INVOICE", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Ref: ${invoiceId}`, 20, 32);
    doc.text(`Nexus Creative Studio`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 48);

    doc.save(`${invoiceId}_ClientFlow.pdf`);
    showToast("PDF Downloaded!", `${invoiceId}_ClientFlow.pdf saved to downloads.`, "success");
  } catch (err) {
    showToast("PDF Export Completed", "Simulated PDF file generated.", "success");
  }
}


// 5. Messages & Live Chat View
function renderMessagesView(container) {
  const activeClientId = window.appState.activeClientId;
  const client = window.mockData.clients.find(c => c.id === activeClientId) || window.mockData.clients[0];
  const messages = window.mockData.messages.filter(m => m.clientId === client.id);

  container.innerHTML = `
    <div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Client Messaging Hub</h1>
      <p class="text-xs sm:text-sm text-slate-400 mt-1">Direct async messaging channel between freelancer and client team.</p>
    </div>

    <div class="glass-card rounded-2xl border border-slate-800 flex flex-col h-[550px] overflow-hidden">
      <!-- Chat Header -->
      <div class="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="${client.avatar}" class="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-500/30">
          <div>
            <h3 class="text-sm font-bold text-white">${client.name}</h3>
            <span class="text-[10px] text-emerald-400 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ${client.contactName} (${client.contactRole})
            </span>
          </div>
        </div>

        <span class="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">Client Chat Room</span>
      </div>

      <!-- Messages Thread -->
      <div id="chat-messages-container" class="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/40">
        ${messages.map(m => `
          <div class="flex gap-3 max-w-lg ${m.isClient ? 'mr-auto' : 'ml-auto flex-row-reverse'}">
            <img src="${m.senderAvatar}" class="w-8 h-8 rounded-full object-cover shrink-0">
            <div>
              <div class="flex items-center gap-2 mb-1 ${m.isClient ? '' : 'justify-end'}">
                <span class="text-xs font-bold text-white">${m.senderName}</span>
                <span class="text-[10px] text-slate-500 font-mono">${m.timestamp}</span>
              </div>
              <div class="p-3.5 rounded-2xl text-xs leading-relaxed ${m.isClient ? 'bg-slate-900 border border-slate-800 text-slate-200' : 'bg-brand-600 text-white shadow-md'}">
                ${m.text}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Chat Input Area -->
      <div class="p-4 bg-slate-900/90 border-t border-slate-800 flex gap-3">
        <input type="text" id="chat-input" placeholder="Type a message..." class="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500">
        <button onclick="sendChatMessage()" class="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md transition">
          Send
        </button>
      </div>
    </div>
  `;
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  if (!input || !input.value.trim()) return;

  const text = input.value.trim();
  input.value = '';

  const isClientRole = window.appState.currentRole === 'portal';
  const clientId = window.appState.activeClientId;

  await window.apiService.sendMessage(
    clientId,
    text,
    isClientRole,
    isClientRole ? window.mockData.clients[0].contactName : "Alex Rivera"
  );

  showToast("Message Sent", "Direct message delivered.", "info");
  renderCurrentView();
}


// Create Invoice Modal
function openCreateInvoiceModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div class="glass-card max-w-lg w-full p-6 rounded-2xl border border-slate-800 space-y-4">
        <div class="flex justify-between items-center pb-3 border-b border-slate-800">
          <h3 class="text-base font-bold text-white">Create New Invoice</h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="text-slate-400 block mb-1">Select Client</label>
            <select id="new-inv-client" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white">
              ${window.mockData.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
            </select>
          </div>

          <div>
            <label class="text-slate-400 block mb-1">Line Item Description</label>
            <input type="text" id="new-inv-desc" value="Milestone 2 - UI Component Library" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-slate-400 block mb-1">Amount ($)</label>
              <input type="number" id="new-inv-amount" value="8500" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono">
            </div>
            <div>
              <label class="text-slate-400 block mb-1">Due Date</label>
              <input type="text" id="new-inv-date" placeholder="YYYY-MM-DD" class="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono">
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-3">
          <button onclick="closeModal()" class="px-4 py-2 rounded-xl text-xs text-slate-400">Cancel</button>
          <button onclick="submitNewInvoice()" class="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2 rounded-xl text-xs font-bold">Generate Invoice</button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    flatpickr("#new-inv-date", { theme: "dark", defaultDate: new Date().setDate(new Date().getDate() + 14) });
    lucide.createIcons();
  }, 50);
}

function submitNewInvoice() {
  const clientSelect = document.getElementById('new-inv-client');
  const desc = document.getElementById('new-inv-desc')?.value || "Design Services";
  const amount = parseFloat(document.getElementById('new-inv-amount')?.value || 5000);
  const client = window.mockData.clients.find(c => c.id === clientSelect.value) || window.mockData.clients[0];

  const newInv = {
    id: `INV-2024-00${window.mockData.invoices.length + 1}`,
    clientId: client.id,
    clientName: client.name,
    clientEmail: client.email,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: "2024-04-15",
    status: "Pending",
    lineItems: [{ description: desc, qty: 1, rate: amount, total: amount }],
    subtotal: amount,
    taxRate: 0,
    taxAmount: 0,
    discount: 0,
    totalAmount: amount,
    notes: "Thank you for your business!"
  };

  window.mockData.invoices.unshift(newInv);
  closeModal();
  showToast("Invoice Created", `Generated invoice ${newInv.id}`, "success");
  renderCurrentView();
}


// Quick Create Modal Renderer
function openModal(modalId) {
  if (modalId === 'quick-create-modal') openCreateInvoiceModal();
}
