/**
 * ClientFlow Mock Service Layer
 * Simulates asynchronous backend API calls with realistic latency and includes mandatory comments.
 */

window.apiService = {
  // Helper to simulate network latency
  _delay: (ms = 300) => new Promise(resolve => setTimeout(resolve, ms)),

  /**
   * Fetch projects for the active client context or workspace
   */
  async fetchProjects(clientId = null) {
    // BACKEND: Fetch authenticated client's projects
    await this._delay(200);
    if (clientId) {
      return window.mockData.projects.filter(p => p.clientId === clientId);
    }
    return window.mockData.projects;
  },

  /**
   * Upload project file
   */
  async uploadFile(projectId, fileData) {
    // BACKEND: Upload project files
    await this._delay(400);
    const project = window.mockData.projects.find(p => p.id === projectId);
    if (!project) throw new Error("Project not found");

    const newFile = {
      id: "f-" + Date.now(),
      name: fileData.name || "Uploaded_Document.pdf",
      size: fileData.size || "3.5 MB",
      uploadedBy: fileData.uploadedBy || "Alex Rivera",
      date: new Date().toISOString().split("T")[0],
      type: fileData.type || "file"
    };

    project.files.unshift(newFile);

    // Add activity log
    window.mockData.activityLog.unshift({
      id: "a-" + Date.now(),
      user: fileData.uploadedBy || "User",
      action: "uploaded file",
      target: newFile.name,
      time: "Just now",
      icon: "file-text"
    });

    return { success: true, file: newFile };
  },

  /**
   * Send client message
   */
  async sendMessage(clientId, messageText, isClient = false, senderName = "Alex Rivera") {
    // BACKEND: Send client message
    await this._delay(250);
    const newMsg = {
      id: "msg-" + Date.now(),
      clientId: clientId,
      senderName: senderName,
      senderAvatar: isClient
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      isClient: isClient,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageText
    };

    window.mockData.messages.push(newMsg);
    return { success: true, message: newMsg };
  },

  /**
   * Process invoice payment
   */
  async processPayment(invoiceId, paymentMethod = "Credit Card") {
    // BACKEND: Process invoice payment
    await this._delay(500);
    const invoice = window.mockData.invoices.find(i => i.id === invoiceId);
    if (!invoice) throw new Error("Invoice not found");

    invoice.status = "Paid";

    // Update client total spent & project paid amount
    const client = window.mockData.clients.find(c => c.id === invoice.clientId);
    if (client) {
      client.totalSpent += invoice.totalAmount;
    }

    // Add activity log
    window.mockData.activityLog.unshift({
      id: "a-" + Date.now(),
      user: invoice.clientName,
      action: "paid invoice",
      target: `${invoice.id} ($${invoice.totalAmount.toLocaleString()})`,
      time: "Just now",
      icon: "credit-card"
    });

    return { success: true, invoice };
  },

  /**
   * Persist project approval or feedback
   */
  async updateApproval(projectId, deliverableId, status, feedback = "") {
    // BACKEND: Persist project approval
    await this._delay(300);
    const project = window.mockData.projects.find(p => p.id === projectId);
    if (!project) throw new Error("Project not found");

    const deliverable = project.deliverables.find(d => d.id === deliverableId);
    if (!deliverable) throw new Error("Deliverable not found");

    deliverable.status = status; // "Approved" or "Revisions Requested"
    if (feedback) {
      deliverable.feedback = feedback;
    }

    // Add activity log
    window.mockData.activityLog.unshift({
      id: "a-" + Date.now(),
      user: "Client",
      action: status === "Approved" ? "approved deliverable" : "requested revisions for",
      target: deliverable.title,
      time: "Just now",
      icon: status === "Approved" ? "check-circle" : "alert-circle"
    });

    return { success: true, deliverable };
  },

  /**
   * Accept proposal simulation
   */
  async acceptProposal(proposalId, clientSignature = "") {
    // BACKEND: Accept proposal
    await this._delay(400);
    const proposal = window.mockData.proposals.find(p => p.id === proposalId);
    if (!proposal) throw new Error("Proposal not found");

    proposal.status = "Accepted";
    proposal.acceptedAt = new Date().toISOString();

    return { success: true, proposal };
  },

  /**
   * Add comment to project
   */
  async addComment(projectId, text, authorName = "Alex Rivera", isClient = false) {
    await this._delay(200);
    const project = window.mockData.projects.find(p => p.id === projectId);
    if (!project) throw new Error("Project not found");

    const newComment = {
      id: "c-" + Date.now(),
      author: authorName,
      authorRole: isClient ? "Client" : "Studio Team",
      avatar: isClient
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      timestamp: "Just now",
      text: text
    };

    project.comments.push(newComment);
    return { success: true, comment: newComment };
  }
};
