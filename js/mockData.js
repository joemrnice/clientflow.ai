/**
 * ClientFlow Mock Data Store
 * Provides rich mock state for clients, projects, milestones, tasks, deliverables,
 * proposals, invoices, messages, and activity timeline logs.
 */

window.mockData = {
  // Current session agency/user details
  agency: {
    name: "Nexus Creative Studio",
    tagline: "High-Impact Digital Product & Brand Agency",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    email: "hello@nexuscreative.io",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace, Suite 400, San Francisco, CA 94107",
    taxId: "US-884920192",
    rating: 4.95,
    activeProjectsCount: 8,
    totalRevenueYear: 284500,
    monthlyRecurring: 34500,
  },

  // Clients
  clients: [
    {
      id: "client-1",
      name: "Apex Studio Labs",
      industry: "SaaS & AI Technology",
      contactName: "Elena Rostova",
      contactRole: "VP of Product",
      email: "elena@apexlabs.ai",
      phone: "+1 (555) 891-2345",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
      status: "Active",
      health: "On Track",
      totalSpent: 64500,
      activeProjectsCount: 2,
      joinedDate: "2023-08-15",
      portalCode: "APEX-8821",
      notes: "High value key account. Elena prefers weekly async updates on Slack and bi-weekly milestone reviews.",
      contracts: [
        { title: "Master Services Agreement (MSA)", date: "2023-08-15", size: "2.4 MB", status: "Signed" },
        { title: "SOW #2 - AI Dashboard Design & Frontend", date: "2024-01-10", size: "1.8 MB", status: "Active" }
      ]
    },
    {
      id: "client-2",
      name: "Acme Corp International",
      industry: "E-Commerce & Retail",
      contactName: "Marcus Vance",
      contactRole: "Chief Marketing Officer",
      email: "marcus.vance@acmecorp.com",
      phone: "+1 (555) 432-1098",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
      status: "Active",
      health: "At Risk",
      totalSpent: 42000,
      activeProjectsCount: 1,
      joinedDate: "2023-11-01",
      portalCode: "ACME-3391",
      notes: "Requires quick turnaround on marketing assets. Delay in API integrations on client side creating small bottleneck.",
      contracts: [
        { title: "E-Commerce Replatforming Contract", date: "2023-11-01", size: "3.1 MB", status: "Active" }
      ]
    },
    {
      id: "client-3",
      name: "Horizon Health Tech",
      industry: "Digital Health & Telemedicine",
      contactName: "Dr. Sarah Jenkins",
      contactRole: "Head of Digital Experience",
      email: "sjenkins@horizonhealth.org",
      phone: "+1 (555) 776-3210",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&auto=format&fit=crop&q=80",
      status: "Active",
      health: "On Track",
      totalSpent: 88000,
      activeProjectsCount: 2,
      joinedDate: "2023-04-10",
      portalCode: "HORIZON-9011",
      notes: "Strict HIPAA compliance required. All UI assets must pass AA WCAG accessibility standards.",
      contracts: [
        { title: "HIPAA Digital Experience Retainer", date: "2023-04-10", size: "4.0 MB", status: "Active" }
      ]
    },
    {
      id: "client-4",
      name: "Vanguard Mobility & Logistics",
      industry: "Automotive & Fleet Management",
      contactName: "David Sterling",
      contactRole: "Director of Innovation",
      email: "d.sterling@vanguardmob.com",
      phone: "+1 (555) 301-9988",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=100&auto=format&fit=crop&q=80",
      status: "Pending Lead",
      health: "Delayed",
      totalSpent: 18500,
      activeProjectsCount: 0,
      joinedDate: "2024-02-01",
      portalCode: "VANGUARD-102",
      notes: "Awaiting approval on proposed mobile fleet tablet app.",
      contracts: []
    }
  ],

  // Projects
  projects: [
    {
      id: "proj-1",
      clientId: "client-1",
      clientName: "Apex Studio Labs",
      title: "AI Analytics SaaS Platform Redesign",
      category: "Product Design & Frontend",
      budget: 38500,
      paidAmount: 20000,
      startDate: "2024-02-01",
      dueDate: "2024-04-30",
      progress: 68,
      health: "On Track", // "On Track", "At Risk", "Delayed"
      currentMilestoneStage: "Development", // Discovery, Design, Development, Review, Launch
      summary: "End-to-end UX architecture overhaul, interactive design system, and responsive React frontend component library for Apex's core AI analytics dashboard.",

      // Visual Pipeline Milestones
      milestones: [
        { id: "m1", name: "Discovery & UX Audit", status: "Completed", date: "Feb 10, 2024" },
        { id: "m2", name: "UI Design & Prototypes", status: "Completed", date: "Mar 01, 2024" },
        { id: "m3", name: "Frontend Development", status: "In Progress", date: "Mar 28, 2024" },
        { id: "m4", name: "Client Review & QA", status: "Upcoming", date: "Apr 15, 2024" },
        { id: "m5", name: "Final Deployment & Launch", status: "Upcoming", date: "Apr 30, 2024" }
      ],

      // Tasks
      tasks: [
        { id: "t1", name: "Competitor Benchmark & Wireframes", completed: true, assignee: "Alex R." },
        { id: "t2", name: "High-Fidelity Design System Tokens", completed: true, assignee: "Sophia C." },
        { id: "t3", name: "Interactive Figma Clickable Prototype", completed: true, assignee: "Alex R." },
        { id: "t4", name: "Dashboard Chart.js Integration", completed: true, assignee: "Dave K." },
        { id: "t5", name: "Client Portal & Workspace Role Toggle", completed: false, assignee: "Dave K." },
        { id: "t6", name: "Accessibility Audit (WCAG 2.1 AA)", completed: false, assignee: "Sophia C." }
      ],

      // Deliverables for Approval Workflow
      deliverables: [
        {
          id: "del-1",
          title: "Figma Interactive Design System v2.0",
          version: "v2.0",
          submittedDate: "2024-03-01",
          status: "Approved", // Approved, Pending Review, Revisions Requested
          previewUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=80",
          fileSize: "14.2 MB",
          description: "Complete UI component kit containing dark/light mode tokens, typography scale, chart primitives, and grid layouts.",
          feedback: "Approved by Elena Rostova on March 3rd. Exceeded expectations!"
        },
        {
          id: "del-2",
          title: "Analytics Dashboard React Frontend Spec",
          version: "v1.2",
          submittedDate: "2024-03-20",
          status: "Pending Review",
          previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
          fileSize: "8.5 MB",
          description: "Live interactive frontend preview showcasing revenue graphs, real-time filters, and client profile detail views.",
          feedback: "Under review by the Apex Engineering leadership team."
        }
      ],

      // Shared Project Files
      files: [
        { id: "f1", name: "Apex_Brand_Guidelines_2024.pdf", size: "12.4 MB", uploadedBy: "Elena Rostova", date: "2024-02-02", type: "pdf" },
        { id: "f2", name: "Analytics_User_Flow_Architecture.png", size: "4.1 MB", uploadedBy: "Alex Rivera", date: "2024-02-12", type: "image" },
        { id: "f3", name: "Component_Library_Specs.zip", size: "28.9 MB", uploadedBy: "Alex Rivera", date: "2024-03-02", type: "archive" },
        { id: "f4", name: "SaaS_Metrics_Data_Export.json", size: "1.2 MB", uploadedBy: "Elena Rostova", date: "2024-03-15", type: "code" }
      ],

      // Comments & Discussion Thread
      comments: [
        {
          id: "c1",
          author: "Elena Rostova",
          authorRole: "Client (Apex)",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
          timestamp: "Yesterday at 3:45 PM",
          text: "The new Chart.js revenue widgets in deliverable v1.2 look incredible! Could we ensure the mobile view defaults to weekly aggregation?"
        },
        {
          id: "c2",
          author: "Alex Rivera",
          authorRole: "Lead Designer",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          timestamp: "Yesterday at 4:10 PM",
          text: "Thanks Elena! Absolutely — we'll add responsive breakpoint toggles so it defaults to weekly on small screens automatically."
        }
      ]
    },

    {
      id: "proj-2",
      clientId: "client-2",
      clientName: "Acme Corp International",
      title: "Global E-Commerce Replatforming",
      category: "Full-Stack E-Commerce",
      budget: 42000,
      paidAmount: 21000,
      startDate: "2023-11-15",
      dueDate: "2024-04-15",
      progress: 45,
      health: "At Risk",
      currentMilestoneStage: "Development",
      summary: "Migrating Acme's legacy storefront to a high-speed headless commerce platform with Shopify Plus backend and custom Next.js storefront.",

      milestones: [
        { id: "m1", name: "Discovery & Data Migration Plan", status: "Completed", date: "Dec 01, 2023" },
        { id: "m2", name: "UX Design & Checkout Flow", status: "Completed", date: "Jan 15, 2024" },
        { id: "m3", name: "Headless Storefront Frontend", status: "In Progress", date: "Mar 30, 2024" },
        { id: "m4", name: "ERP & Inventory Sync", status: "At Risk", date: "Apr 05, 2024" },
        { id: "m5", name: "Go-Live & Switchover", status: "Upcoming", date: "Apr 15, 2024" }
      ],

      tasks: [
        { id: "t1", name: "Product Data CSV Schema Export", completed: true, assignee: "Marcus V." },
        { id: "t2", name: "Checkout Page UI Figma Prototype", completed: true, assignee: "Sophia C." },
        { id: "t3", name: "Stripe & PayPal Express Integration", completed: true, assignee: "Dave K." },
        { id: "t4", name: "NetSuite ERP API Webhook Connection", completed: false, assignee: "Dave K." }
      ],

      deliverables: [
        {
          id: "del-3",
          title: "Custom Checkout & One-Page Flow Figma",
          version: "v1.0",
          submittedDate: "2024-01-20",
          status: "Approved",
          previewUrl: "https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=800&auto=format&fit=crop&q=80",
          fileSize: "18.1 MB",
          description: "High-converting checkout experience with address auto-complete and 1-click Apple Pay simulation.",
          feedback: "Approved by Marcus Vance."
        }
      ],

      files: [
        { id: "f5", name: "Product_Catalog_2024.xlsx", size: "5.8 MB", uploadedBy: "Marcus Vance", date: "2023-11-20", type: "spreadsheet" },
        { id: "f6", name: "Checkout_UX_Wireframes.pdf", size: "8.2 MB", uploadedBy: "Alex Rivera", date: "2024-01-10", type: "pdf" }
      ],

      comments: [
        {
          id: "c3",
          author: "Marcus Vance",
          authorRole: "Client (Acme)",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80",
          timestamp: "3 days ago",
          text: "Our IT team is slightly delayed providing NetSuite API credentials. Expected by Friday!"
        }
      ]
    },

    {
      id: "proj-3",
      clientId: "client-3",
      clientName: "Horizon Health Tech",
      title: "Telehealth Mobile App & Patient Portal",
      category: "iOS & Android App",
      budget: 56000,
      paidAmount: 56000,
      startDate: "2023-09-01",
      dueDate: "2024-03-15",
      progress: 95,
      health: "On Track",
      currentMilestoneStage: "Review",
      summary: "Patient appointment scheduling, secure encrypted messaging, and video consultation interface for iOS & Android.",

      milestones: [
        { id: "m1", name: "HIPAA Security Architecture", status: "Completed", date: "Sep 30, 2023" },
        { id: "m2", name: "Patient Portal UI Design", status: "Completed", date: "Nov 15, 2023" },
        { id: "m3", name: "React Native Mobile Engine", status: "Completed", date: "Jan 30, 2024" },
        { id: "m4", name: "Security Audit & HIPAA Testing", status: "In Progress", date: "Mar 10, 2024" },
        { id: "m5", name: "App Store & Google Play Submission", status: "Upcoming", date: "Mar 25, 2024" }
      ],

      tasks: [
        { id: "t1", name: "End-to-End Encrypted Chat WebSockets", completed: true, assignee: "Dave K." },
        { id: "t2", name: "Biometric Auth (FaceID / Fingerprint)", completed: true, assignee: "Dave K." },
        { id: "t3", name: "HIPAA Compliance Penetration Test", completed: false, assignee: "External Auditor" }
      ],

      deliverables: [
        {
          id: "del-4",
          title: "iOS & Android TestFlight Build v0.9",
          version: "v0.9-rc2",
          submittedDate: "2024-03-05",
          status: "Pending Review",
          previewUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
          fileSize: "42.0 MB",
          description: "Release candidate build ready for clinical trial testing on TestFlight & Google Play Internal Testing.",
          feedback: "Dr. Sarah Jenkins is conducting internal physician walk-throughs."
        }
      ],

      files: [
        { id: "f7", name: "HIPAA_Compliance_Cert_2024.pdf", size: "3.4 MB", uploadedBy: "Dr. Sarah Jenkins", date: "2023-09-10", type: "pdf" }
      ],

      comments: []
    }
  ],

  // Proposals
  proposals: [
    {
      id: "prop-101",
      title: "AI Analytics SaaS Platform Redesign & Design System",
      clientId: "client-1",
      clientName: "Apex Studio Labs",
      clientContact: "Elena Rostova",
      createdDate: "2024-01-15",
      validUntil: "2024-02-15",
      status: "Accepted", // Draft, Sent, Accepted, Declined
      totalAmount: 38500,
      summary: "Nexus Creative Studio will overhaul Apex Studio's AI product suite, creating a cohesive design system and building responsive React component views.",
      services: [
        { description: "Discovery, UX Architecture & User Research Audit", amount: 6500 },
        { description: "Design System & Figma Interactive Token Library", amount: 12000 },
        { description: "Frontend React Component Architecture & Live Preview", amount: 16000 },
        { description: "QA Testing, Accessibility & Launch Support", amount: 4000 }
      ],
      timelineWeeks: "8 Weeks",
      terms: "50% upfront payment upon contract signing, 25% upon Milestone 3 (Development), and 25% upon final deployment launch.",
      acceptedAt: "2024-01-28 14:32:00"
    },
    {
      id: "prop-102",
      title: "Omnichannel E-Commerce Replatforming",
      clientId: "client-2",
      clientName: "Acme Corp International",
      clientContact: "Marcus Vance",
      createdDate: "2023-10-20",
      validUntil: "2023-11-15",
      status: "Accepted",
      totalAmount: 42000,
      services: [
        { description: "Data Migration Strategy & Product Catalog Import", amount: 8000 },
        { description: "Headless Shopify Storefront UI/UX Design", amount: 14000 },
        { description: "Next.js Custom Frontend & Payment Gateways", amount: 15000 },
        { description: "Performance Optimization & SEO Audit", amount: 5000 }
      ],
      timelineWeeks: "12 Weeks",
      terms: "50% deposit required upon commencement; balance split across 2 milestone stages.",
      acceptedAt: "2023-10-29 09:15:00"
    },
    {
      id: "prop-103",
      title: "Vanguard Fleet Operations Tablet App",
      clientId: "client-4",
      clientName: "Vanguard Mobility & Logistics",
      clientContact: "David Sterling",
      createdDate: "2024-02-28",
      validUntil: "2024-03-30",
      status: "Sent",
      totalAmount: 29500,
      services: [
        { description: "Driver Workflow & Route Optimization UX", amount: 7500 },
        { description: "Cross-platform iPad & Android Tablet App", amount: 18000 },
        { description: "Offline Sync Engine & GPS Tracking", amount: 4000 }
      ],
      timelineWeeks: "6 Weeks",
      terms: "Standard 30-day payment term post contract execution.",
      acceptedAt: null
    }
  ],

  // Invoices
  invoices: [
    {
      id: "INV-2024-001",
      proposalId: "prop-101",
      clientId: "client-1",
      clientName: "Apex Studio Labs",
      clientEmail: "elena@apexlabs.ai",
      issueDate: "2024-02-01",
      dueDate: "2024-02-15",
      status: "Paid", // Paid, Pending, Overdue
      lineItems: [
        { description: "AI Analytics SaaS Platform Redesign - Milestone 1 (Upfront 50%)", qty: 1, rate: 19250, total: 19250 },
        { description: "Figma Component Library Export Add-on", qty: 1, rate: 750, total: 750 }
      ],
      subtotal: 20000,
      taxRate: 0,
      taxAmount: 0,
      discount: 0,
      totalAmount: 20000,
      notes: "Thank you for your partnership! Payment received via Wire Transfer."
    },
    {
      id: "INV-2024-002",
      proposalId: "prop-101",
      clientId: "client-1",
      clientName: "Apex Studio Labs",
      clientEmail: "elena@apexlabs.ai",
      issueDate: "2024-03-15",
      dueDate: "2024-03-30",
      status: "Pending",
      lineItems: [
        { description: "AI Analytics SaaS Platform Redesign - Milestone 3 (Development 25%)", qty: 1, rate: 9625, total: 9625 }
      ],
      subtotal: 9625,
      taxRate: 5,
      taxAmount: 481.25,
      discount: 0,
      totalAmount: 10106.25,
      notes: "Milestone 3 progress achieved. Please process within 15 business days."
    },
    {
      id: "INV-2024-003",
      proposalId: "prop-102",
      clientId: "client-2",
      clientName: "Acme Corp International",
      clientEmail: "marcus.vance@acmecorp.com",
      issueDate: "2024-01-10",
      dueDate: "2024-01-25",
      status: "Paid",
      lineItems: [
        { description: "Global E-Commerce Replatforming - Initial Deposit (50%)", qty: 1, rate: 21000, total: 21000 }
      ],
      subtotal: 21000,
      taxRate: 0,
      taxAmount: 0,
      discount: 0,
      totalAmount: 21000,
      notes: "Payment processed via Corporate ACH."
    },
    {
      id: "INV-2024-004",
      proposalId: null,
      clientId: "client-2",
      clientName: "Acme Corp International",
      clientEmail: "marcus.vance@acmecorp.com",
      issueDate: "2024-02-20",
      dueDate: "2024-03-05",
      status: "Overdue",
      lineItems: [
        { description: "Custom Shopify Checkout Integration Sprint", qty: 1, rate: 4500, total: 4500 }
      ],
      subtotal: 4500,
      taxRate: 0,
      taxAmount: 0,
      discount: 250,
      totalAmount: 4250,
      notes: "Reminder: Invoice is past due date. Please arrange immediate settlement."
    }
  ],

  // Recent Messages / Chat Feed
  messages: [
    {
      id: "msg-1",
      clientId: "client-1",
      senderName: "Elena Rostova",
      senderAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      isClient: true,
      timestamp: "10:24 AM",
      text: "Hi Alex! Quick question: will the analytics component support dark mode toggle directly out of the box?"
    },
    {
      id: "msg-2",
      clientId: "client-1",
      senderName: "Alex Rivera",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      isClient: false,
      timestamp: "10:28 AM",
      text: "Hi Elena! Yes absolutely. We've built theme token support directly using Tailwind variables so dark mode is seamless."
    },
    {
      id: "msg-3",
      clientId: "client-2",
      senderName: "Marcus Vance",
      senderAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80",
      isClient: true,
      timestamp: "Yesterday",
      text: "Sent over the updated product catalog schema for the Shopify replatforming."
    }
  ],

  // System Notifications
  notifications: [
    { id: "n1", title: "Deliverable Approved", desc: "Elena approved 'Figma Interactive Design System v2.0'", time: "2 hours ago", unread: true },
    { id: "n2", title: "New Invoice Payment", desc: "Acme Corp paid INV-2024-003 ($21,000.00)", time: "1 day ago", unread: true },
    { id: "n3", title: "Milestone Deadline Approaching", desc: "Frontend Development due in 4 days for Apex Studio", time: "2 days ago", unread: false }
  ],

  // Activity Log
  activityLog: [
    { id: "a1", user: "Elena Rostova", action: "approved deliverable", target: "Figma Design System v2.0", time: "2 hours ago", icon: "check-circle" },
    { id: "a2", user: "Dave K.", action: "uploaded file", target: "Analytics_User_Flow_Architecture.png", time: "5 hours ago", icon: "file-text" },
    { id: "a3", user: "System", action: "generated invoice", target: "INV-2024-002 ($10,106.25)", time: "1 day ago", icon: "receipt" },
    { id: "a4", user: "Marcus Vance", action: "commented on", target: "Global E-Commerce Replatforming", time: "3 days ago", icon: "message-square" }
  ]
};
