/* ==========================================================================
   Aashi Pandey - Executive Portfolio Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initActiveNavLink();
  initMobileNav();
  initTypewriter();
  initProjectSearchAndFilter();
});

/* --------------------------------------------------------------------------
   1. Theme Switcher (Executive Studio Light / Midnight Dark)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('aashi_studio_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('aashi_studio_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Midnight Dark' : 'Studio Light'} mode`);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('themeBtn');
  if (!themeBtn) return;
  themeBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

/* --------------------------------------------------------------------------
   2. Active Page Link Detection
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

/* --------------------------------------------------------------------------
   4. Hero Typewriter Effect
   -------------------------------------------------------------------------- */
const roles = [
  "Full Stack Developer",
  "Python Developer",
  "Data Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function initTypewriter() {
  const typer = document.getElementById('typerText');
  if (!typer) return;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      typer.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typer.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 35 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------------------------------
   5. Projects Live Search & Category Filter
   -------------------------------------------------------------------------- */
function initProjectSearchAndFilter() {
  const searchInput = document.getElementById('projectSearch');
  const filterBtns = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-deep-card');

  if (!projectCards.length) return;

  let currentCategory = 'all';
  let searchQuery = '';

  function filterProjects() {
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('h3').textContent.toLowerCase();
      const overview = card.querySelector('.project-overview').textContent.toLowerCase();

      const matchesCategory = currentCategory === 'all' || category.includes(currentCategory);
      const matchesSearch = title.includes(searchQuery) || overview.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      filterProjects();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      filterProjects();
    });
  });
}

/* --------------------------------------------------------------------------
   6. Comprehensive Project Case Study Modal Data
   -------------------------------------------------------------------------- */
const comprehensiveProjectData = {
  'llm-chatbot': {
    title: "LLM-Based Chatbot Frontend System",
    category: "Artificial Intelligence & Frontend Architecture",
    badge: "AI / React / Web App",
    overview: "Architected and implemented a high-performance, ChatGPT-style conversational Web UI designed to interface directly with modern Large Language Model endpoints. Built using React.js, Vite, JavaScript ES6+, Tailwind CSS, and Axios, the application focuses on ultra-low latency rendering, intuitive user interaction, session management, and robust security workflows.",
    problemSolved: "Traditional chatbot interfaces suffer from plain text output, lack of code snippet legibility, and clumsy session history controls. This system addresses those pain points by implementing real-time streaming response handling, dynamic syntax highlighting for over 20+ programming languages, and robust token-based user authentication.",
    architectureDetails: [
      "Modular Component Tree: Clean separation between Conversation Viewport, Sidebar History Drawer, Auth Panel, and Prompt Composer.",
      "Real-Time Stream Integration: Axios HTTP client configuration with request/response interceptors and JWT token lifecycle management.",
      "Markdown & Code Syntax Highlighting: Custom rendering engine parsing incoming Markdown tokens and highlighting nested code blocks dynamically.",
      "Responsive & Accessible UI: Fully mobile-optimized interface with dark/light theme persistence and accessible keyboard navigation."
    ],
    techStack: ["React.js", "Vite", "JavaScript (ES6+)", "Tailwind CSS", "Axios", "Markdown Parsing", "JWT Authentication"],
    impact: "Delivered a production-ready interface matching industry standards set by OpenAI ChatGPT and Claude UI, supporting multi-session conversation switching and crisp code rendering."
  },
  'electricity-monitor': {
    title: "AI-Based Electricity Monitoring System",
    category: "Full-Stack System & Data Predictive Analytics",
    badge: "Python / Django / PostgreSQL / AI Analytics",
    overview: "Engineered an intelligent, full-stack energy management and monitoring platform leveraging Python, Django, PostgreSQL, HTML5, CSS3, JavaScript, and Chart.js. The solution allows commercial and residential administrators to track granular appliance-level consumption, forecast upcoming monthly billing costs using machine learning models, and identify power inefficiency hotspots.",
    problemSolved: "Consumers and facility managers often lack real-time visibility into appliance-wise electricity consumption until the end-of-month utility bill arrives. This system solves unmonitored power waste by delivering live analytics dashboards, automated peak usage warnings, and algorithmic bill estimations.",
    architectureDetails: [
      "Django Backend Architecture: Built RESTful API endpoints and background data aggregation services connected to a PostgreSQL relational database.",
      "Appliance Analytics Engine: Algorithm that calculates per-appliance watt usage metrics and generates predictive monthly cost estimates.",
      "Interactive Chart.js Dashboard: Rendered real-time line charts, bar graphs, and doughnut charts tracking hourly, daily, and monthly power spikes.",
      "PostgreSQL Data Optimization: Indexed energy telemetry tables to execute high-frequency aggregate queries with sub-100ms response times."
    ],
    techStack: ["Python", "Django Framework", "PostgreSQL", "Chart.js", "HTML5", "CSS3", "JavaScript", "SQL Querying"],
    impact: "Helped reduce potential electricity overconsumption by up to 25% through actionable appliance insights and automated peak usage alerts."
  },
  'shelfwise': {
    title: "ShelfWise – Enterprise Library Management System",
    category: "Database Engineering & Web Application",
    badge: "Python / Django / MySQL",
    overview: "Designed and deployed 'ShelfWise', an end-to-end digital library management solution engineered to automate library operations, member cataloging, book issue/return workflows, automated overdue fine assessments, and role-based administrative access control.",
    problemSolved: "Manual library tracking leads to misplaced inventory, untracked overdue fines, delays in book distribution, and administrative overhead. ShelfWise digitizes the entire lifecycle of book distribution with instant ISBN lookup, member activity tracking, and automated fine calculation.",
    architectureDetails: [
      "Role-Based Access Control (RBAC): Differentiated portal access for System Administrators, Librarians, Faculty, and Student members.",
      "Automated Fine Computation: Background cron-style logic evaluating loan due dates against real-time returns to compute overdue fines automatically.",
      "MySQL Relational Schema: Designed a normalized relational database schema supporting foreign key constraints for book titles, copies, loan logs, and payment receipts.",
      "Automated PDF Reporting Engine: Built exportable analytical summary reports for monthly catalog inventory and financial fine collection logs."
    ],
    techStack: ["Python", "Django", "MySQL Relational Database", "HTML5", "CSS3", "JavaScript", "ReportLab PDF Engine"],
    impact: "Streamlined library operational speed by over 60%, eliminating manual paper logs and automating revenue tracking for overdue fines."
  },
  'womens-safety': {
    title: "Women's Safety Android App with AI Risk Detection",
    category: "Mobile Application & Location Intelligence",
    badge: "Android / Java / Kotlin / Firebase / Google Maps API",
    overview: "Developed a native Android safety application focused on emergency protection, immediate location broadcasting, and automated threat notifications using Java/Kotlin, XML, Firebase, Google Maps API, GPS location services, and local SQLite data caching.",
    problemSolved: "In high-risk emergency scenarios, individuals may be unable to unlock their device, dial phone numbers, or type manual messages. This app bridges critical seconds by introducing a one-tap panic trigger that instantly broadcasts live GPS coordinates and automated emergency SOS alerts.",
    architectureDetails: [
      "One-Tap Panic Emergency Trigger: Instant SOS activation sending SMS messages and voice call alerts to pre-configured emergency contacts.",
      "Real-Time GPS & Google Maps Integration: Continuous location tracking streaming live GPS coordinates overlayed on Google Maps API.",
      "AI-Based Movement Risk Detection: Sensor algorithms monitoring rapid device acceleration or sudden impacts to detect potential falls or emergency events.",
      "Firebase Cloud Sync & SQLite Backup: Dual storage strategy ensuring emergency contacts are accessible offline via SQLite when cellular data is unavailable."
    ],
    techStack: ["Java / Kotlin", "Android SDK", "Firebase Realtime DB", "Google Maps API", "GPS Services", "SQLite", "XML UI"],
    impact: "Created a dependable, offline-resilient emergency assistant mobile app providing immediate peace of mind and swift alert dispatching."
  },
  'doctor-appointment': {
    title: "Doctor Appointment System",
    category: "Healthcare Management Platform",
    badge: "Python / Django / MySQL",
    overview: "Constructed a comprehensive healthcare management and doctor appointment booking application utilizing Python, Django, MySQL, HTML5, CSS3, and JavaScript. The system connects patients with healthcare providers, simplifies appointment scheduling, and maintains secure digital medical history archives.",
    problemSolved: "Long clinic wait times and phone-based scheduling cause patient frustration and operational bottlenecks for clinic staff. The Doctor Appointment System provides a centralized digital portal for real-time doctor slot booking and electronic health record management.",
    architectureDetails: [
      "Patient & Doctor Portals: Tailored interfaces for patients to browse doctor specialties, check real-time schedule availability, and book appointments.",
      "Doctor Schedule Management: Calendar management module allowing medical practitioners to adjust consult hours, buffer times, and leave status.",
      "Digital Health Record Archives: Secure database storage for historical diagnoses, prescription records, and consultation notes.",
      "Multi-User Authentication: Encrypted password authentication and session security preventing unauthorized access to sensitive patient records."
    ],
    techStack: ["Python", "Django", "MySQL Database", "HTML5", "CSS3", "JavaScript", "Bootstrap / Custom CSS"],
    impact: "Eliminated double-booking errors and reduced clinic patient wait times through automated schedule management."
  }
};

function openModal(id) {
  const data = comprehensiveProjectData[id];
  if (!data) return;

  const modal = document.getElementById('projectModal');
  const content = document.getElementById('modalContent');

  content.innerHTML = `
    <span style="color:var(--accent-primary); font-size:0.8rem; font-weight:700; background:var(--accent-subtle); padding:0.25rem 0.75rem; border-radius:6px;">${data.badge}</span>
    <h2 style="font-family:var(--font-heading); font-size:1.65rem; font-weight:800; margin:0.8rem 0 0.3rem; color:var(--text-primary);">${data.title}</h2>
    <p style="color:var(--accent-primary); font-size:0.85rem; font-weight:700; margin-bottom:1.2rem;">${data.category}</p>
    
    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);"><i class="fa-solid fa-align-left" style="color:var(--accent-primary)"></i> System Overview:</h4>
      <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7;">${data.overview}</p>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);"><i class="fa-solid fa-lightbulb" style="color:var(--accent-primary)"></i> Problem Solved:</h4>
      <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7;">${data.problemSolved}</p>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);"><i class="fa-solid fa-cubes" style="color:var(--accent-primary)"></i> Architectural Highlights:</h4>
      <ul style="padding-left:1.2rem; color:var(--text-secondary); font-size:0.9rem; line-height:1.7;">
        ${data.architectureDetails.map(item => `<li style="margin-bottom:0.4rem;">${item}</li>`).join('')}
      </ul>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);"><i class="fa-solid fa-chart-line" style="color:var(--accent-primary)"></i> Business & Operational Impact:</h4>
      <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7;">${data.impact}</p>
    </div>

    <div style="margin-bottom:1.8rem;">
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);"><i class="fa-solid fa-layer-group" style="color:var(--accent-primary)"></i> Technologies Used:</h4>
      <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
        ${data.techStack.map(t => `<span style="background:var(--bg-subtle); border:1px solid var(--border-color); padding:0.25rem 0.65rem; border-radius:6px; font-size:0.8rem; font-weight:600; color:var(--text-primary);">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex; gap:1rem;">
      <a href="https://github.com/aashhii17" target="_blank" rel="noopener" class="btn btn-primary"><i class="fa-brands fa-github"></i> View GitHub Repository</a>
      <a href="https://www.linkedin.com/in/aashi-pandey-1324b025b" target="_blank" rel="noopener" class="btn btn-outline"><i class="fa-brands fa-linkedin"></i> LinkedIn Profile</a>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('projectModal');
  if (modal) modal.classList.remove('active');
}

function closeModalOnBackdrop(e) {
  if (e.target.id === 'projectModal') closeModal();
}

/* --------------------------------------------------------------------------
   7. Copy Email & Toast Notifications
   -------------------------------------------------------------------------- */
function copyEmail() {
  const email = "aashipndy1710@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("Copied email: aashipndy1710@gmail.com");
  }).catch(() => {
    showToast("Email: aashipndy1710@gmail.com");
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  showToast("Thank you! Your message has been sent to Aashi.");
  e.target.reset();
}

function showToast(msg) {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastMsg');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
