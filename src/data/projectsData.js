export const projectsData = [
  {
    id: "aistudio",
    title: "Alaski AI – Multi-LLM Chatbot Platform",
    category: "ai fullstack",
    badgeLabel: "AI / MERN Stack / OpenRouter",
    categoryLabel: "AI / MERN Stack / Full-Stack",
    iconClass: "fa-solid fa-brain",
    repoUrl: "https://github.com/aashhii17/AIStudio",
    overview: "Developed a full-stack, AI-powered conversational chatbot platform using the MERN (MongoDB, Express.js, React.js, Node.js) stack and the OpenRouter API. Built to support secure user authentication, real-time message streaming, conversation history database storage, and a responsive interface enabling interactions with multiple advanced Large Language Models.",
    problemSolved: "Centralizing access to multiple LLMs requires secure authentication, low-latency streaming responses, and reliable session persistence. Alaski AI integrates these into a unified, responsive interface that eliminates chat fragmentation.",
    architectureDetails: [
      "MERN Stack Integration: Utilized React.js for the dynamic front-end client and Node.js/Express.js for the server-side logic and API layer.",
      "OpenRouter API: Integrated OpenRouter API to allow real-time selection and execution of queries across diverse LLMs.",
      "Secure Authentication: Implemented JWT-based secure user log-in, registration, and token management systems.",
      "Conversation History Database: Designed MongoDB database models to store user accounts, chat metadata, and historical conversational data securely.",
      "Real-Time Response Streams: Handled chunk-based Axios message streams for seamless real-time response rendering and styling."
    ],
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "OpenRouter API", "JWT Authentication", "Axios", "CSS3 / Tailwind"],
    impact: "Provides a reliable, fully authenticated alternative to proprietary AI portals, allowing users to compare and leverage different LLMs with zero friction.",
    featuresList: [
      "Multi-LLM integration leveraging the OpenRouter API for runtime model switching",
      "Secure JWT token-based authentication UI and session storage management",
      "Real-time streaming response UI with Markdown parsing and dynamic code syntax highlighting",
      "Persistent database storage mapping user account history and past conversations"
    ]
  },
  {
    id: "electricity-monitor",
    title: "EcoWatt – AI Electricity Monitoring System",
    category: "fullstack ai",
    badgeLabel: "Python / Django / PostgreSQL / AI Analytics",
    categoryLabel: "Python / Django / PostgreSQL / AI",
    iconClass: "fa-solid fa-bolt",
    repoUrl: "https://github.com/aashhii17/EcoWatt",
    liveUrl: "https://ecowatt-29k4.onrender.com/",
    overview: "Engineered an intelligent, full-stack energy management and monitoring platform leveraging Python, Django, PostgreSQL, HTML5, CSS3, JavaScript, and Chart.js. The solution allows commercial and residential administrators to track granular appliance-level consumption, forecast upcoming monthly billing costs using machine learning models, and identify power inefficiency hotspots.",
    problemSolved: "Consumers and facility managers often lack real-time visibility into appliance-wise electricity consumption until the end-of-month utility bill arrives. This system solves unmonitored power waste by delivering live analytics dashboards, automated peak usage warnings, and algorithmic bill estimations.",
    architectureDetails: [
      "Django Backend Architecture: Built RESTful API endpoints and background data aggregation services connected to a PostgreSQL relational database.",
      "Appliance Analytics Engine: Algorithm that calculates per-appliance watt usage metrics and generates predictive monthly cost estimates.",
      "Interactive Chart.js Dashboard: Rendered real-time line charts, bar graphs, and doughnut charts tracking hourly, daily, and monthly power spikes.",
      "PostgreSQL Data Optimization: Indexed energy telemetry tables to execute high-frequency aggregate queries with sub-100ms response times."
    ],
    techStack: ["Python", "Django Framework", "PostgreSQL", "Chart.js", "HTML5", "CSS3", "JavaScript", "SQL Querying"],
    impact: "Helped reduce potential electricity overconsumption by up to 25% through actionable appliance insights and automated peak usage alerts.",
    featuresList: [
      "Real-time Chart.js telemetry dashboards for hourly and daily power spikes",
      "Appliance-level power breakdown and energy audit tracking logs",
      "Predictive algorithm model forecasting monthly electricity bills",
      "PostgreSQL indexed data queries with sub-100ms analytics loading"
    ]
  },
  {
    id: "shelfwise",
    title: "ShelfWise – Enterprise Library Management System",
    category: "fullstack",
    badgeLabel: "Python / Django / MySQL",
    categoryLabel: "Python / Django / MySQL",
    iconClass: "fa-solid fa-book-open",
    repoUrl: "https://github.com/aashhii17/ShelfWise",
    liveUrl: "https://shelfwise-xm8q.onrender.com/",
    overview: "Designed and deployed 'ShelfWise', an end-to-end digital library management solution engineered to automate library operations, member cataloging, book issue/return workflows, automated overdue fine assessments, and role-based administrative access control.",
    problemSolved: "Manual library tracking leads to misplaced inventory, untracked overdue fines, delays in book distribution, and administrative overhead. ShelfWise digitizes the entire lifecycle of book distribution with instant ISBN lookup, member activity tracking, and automated fine calculation.",
    architectureDetails: [
      "Role-Based Access Control (RBAC): Differentiated portal access for System Administrators, Librarians, Faculty, and Student members.",
      "Automated Fine Computation: Background cron-style logic evaluating loan due dates against real-time returns to compute overdue fines automatically.",
      "MySQL Relational Schema: Designed a normalized relational database schema supporting foreign key constraints for book titles, copies, loan logs, and payment receipts.",
      "Automated PDF Reporting Engine: Built exportable analytical summary reports for monthly catalog inventory and financial fine collection logs."
    ],
    techStack: ["Python", "Django", "MySQL Relational Database", "HTML5", "CSS3", "JavaScript", "ReportLab PDF Engine"],
    impact: "Streamlined library operational speed by over 60%, eliminating manual paper logs and automating revenue tracking for overdue fines.",
    featuresList: [
      "Book cataloging, issue, return, and renewal tracking workflows",
      "Automated overdue fine computation and payment record keeping",
      "Role-based access control (Admin, Librarian, Faculty, Student)",
      "Automated PDF inventory summary and financial report generator"
    ]
  },
  {
    id: "womens-safety",
    title: "GuardianAI – Women's Safety App with AI Threat Detection",
    category: "mobile ai",
    badgeLabel: "Android / Firebase / Google Maps API",
    categoryLabel: "Android / Firebase / Location Services",
    iconClass: "fa-solid fa-shield-cat",
    repoUrl: "https://github.com/aashhii17/GuardianAI",
    overview: "Developed a native Android safety application focused on emergency protection, immediate location broadcasting, and automated threat notifications using Android SDK, XML, Firebase, Google Maps API, GPS location services, and local SQLite data caching.",
    problemSolved: "In high-risk emergency scenarios, individuals may be unable to unlock their device, dial phone numbers, or type manual messages. This app bridges critical seconds by introducing a one-tap panic trigger that instantly broadcasts live GPS coordinates and automated emergency SOS alerts.",
    architectureDetails: [
      "One-Tap Panic Emergency Trigger: Instant SOS activation sending SMS messages and voice call alerts to pre-configured emergency contacts.",
      "Real-Time GPS & Google Maps Integration: Continuous location tracking streaming live GPS coordinates overlayed on Google Maps API.",
      "AI-Based Movement Risk Detection: Sensor algorithms monitoring rapid device acceleration or sudden impacts to detect potential falls or emergency events.",
      "Firebase Cloud Sync & SQLite Backup: Dual storage strategy ensuring emergency contacts are accessible offline via SQLite when cellular data is unavailable."
    ],
    techStack: ["Android SDK", "Firebase Realtime DB", "Google Maps API", "GPS Services", "SQLite", "XML UI"],
    impact: "Created a dependable, offline-resilient emergency assistant mobile app providing immediate peace of mind and swift alert dispatching.",
    featuresList: [
      "One-tap panic SOS trigger executing instant emergency contact SMS/calls",
      "Live GPS coordinate tracking overlayed on Google Maps API",
      "AI-based sensor movement risk & fall detection algorithms",
      "Firebase real-time sync + SQLite local storage for offline reliability"
    ]
  },
  {
    id: "doctor-appointment",
    title: "Medislot – Healthcare Scheduling & Appointment System",
    category: "fullstack",
    badgeLabel: "Python / Django / MySQL",
    categoryLabel: "Python / Django / MySQL",
    iconClass: "fa-solid fa-user-doctor",
    repoUrl: "https://github.com/aashhii17/Medislot",
    liveUrl: "https://medislot-1-rjv9.onrender.com",
    overview: "Constructed a comprehensive healthcare management and doctor appointment booking application utilizing Python, Django, MySQL, HTML5, CSS3, and JavaScript. The system connects patients with healthcare providers, simplifies appointment scheduling, and maintains secure digital medical history archives.",
    problemSolved: "Long clinic wait times and phone-based scheduling cause patient frustration and operational bottlenecks for clinic staff. The Doctor Appointment System provides a centralized digital portal for real-time doctor slot booking and electronic health record management.",
    architectureDetails: [
      "Patient & Doctor Portals: Tailored interfaces for patients to browse doctor specialties, check real-time schedule availability, and book appointments.",
      "Doctor Schedule Management: Calendar management module allowing medical practitioners to adjust consult hours, buffer times, and leave status.",
      "Digital Health Record Archives: Secure database storage for historical diagnoses, prescription records, and consultation notes.",
      "Multi-User Authentication: Encrypted password authentication and session security preventing unauthorized access to sensitive patient records."
    ],
    techStack: ["Python", "Django", "MySQL Database", "HTML5", "CSS3", "JavaScript", "Bootstrap / Custom CSS"],
    impact: "Eliminated double-booking errors and reduced clinic patient wait times through automated schedule management.",
    featuresList: [
      "Patient registration portal with medical history records",
      "Doctor schedule management calendar and slot reservation system",
      "Role-based authentication for Doctors, Patients, and Clinic Staff",
      "Responsive UI tailored for desktop browsers and clinic kiosks"
    ]
  }
];
