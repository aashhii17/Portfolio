import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

export default function Home({ triggerToast }) {
  // Typewriter effect
  const roles = ["Full Stack Developer", "Python Developer", "Data Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeRole = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        const nextText = activeRole.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        if (nextText === activeRole) {
          setIsDeleting(true);
        }
      } else {
        const nextText = activeRole.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const delay = isDeleting 
      ? 35 
      : (currentText === activeRole ? 2200 : 80);

    timer = setTimeout(handleType, delay);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const copyEmail = () => {
    const email = "aashipndy1710@gmail.com";
    navigator.clipboard.writeText(email)
      .then(() => {
        triggerToast("Copied email: aashipndy1710@gmail.com");
      })
      .catch(() => {
        triggerToast("Email: aashipndy1710@gmail.com");
      });
  };

  // Live activity states
  const activities = [
    "Refining EcoWatt telemetry dashboard",
    "Connecting AIStudio to OpenRouter models",
    "Optimizing ShelfWise library queries",
    "Updating GuardianAI location broadcast logs",
    "Reviewing PySpark ETL cloud jobs",
    "Configuring Databricks workspace tasks",
    "Writing high-performance React code"
  ];
  const [liveActivity, setLiveActivity] = useState(activities[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveActivity(prev => {
        const remaining = activities.filter(a => a !== prev);
        const rand = Math.floor(Math.random() * remaining.length);
        return remaining[rand];
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // CLI Terminal states & logic
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "Welcome to Aashi's Developer Console v1.0.0.", type: "system" },
    { text: "Type 'help' to view all available commands.", type: "system" },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = [];
    switch (cmd) {
      case 'help':
        response = [
          "Available Commands:",
          "  about    - Display Aashi's background overview",
          "  skills   - List technical competencies",
          "  projects - Summarize core projects & systems",
          "  clear    - Clear console logs"
        ];
        break;
      case 'about':
        response = [
          "Aashi Pandey | Full Stack & Data Engineer",
          "Education: B.Tech in IT (IIST, 2022-2026)",
          "Focus: Bridging web architecture and distributed data processing.",
          "Availability: Seeking Remote/Hybrid/On-site opportunities."
        ];
        break;
      case 'skills':
        response = [
          "Languages: Python, JavaScript (ES6+), Java, SQL",
          "Backend/ETL: Django, Apache PySpark, Databricks, REST APIs",
          "Frontend: React.js, Tailwind CSS, HTML5/CSS3",
          "Cloud/Tools: AWS Cloud, Firebase, Power BI, Git"
        ];
        break;
      case 'projects':
        response = [
          "Core Projects:",
          "  • AIStudio: Multi-LLM MERN chatbot with API streaming",
          "  • EcoWatt: Django energy forecast analytics platform",
          "  • ShelfWise: Normalized MySQL library issue tracker",
          "  • GuardianAI: Android offline-resilient SOS assistant",
          "  • Medislot: Multi-user doctor schedule booker"
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        response = [`Command not found: '${cmd}'. Type 'help' for options.`];
    }

    setTerminalHistory(prev => [
      ...prev,
      { text: `visitor@aashi-portfolio:~$ ${terminalInput}`, type: 'command' },
      ...response.map(line => ({ text: line, type: 'output' }))
    ]);
    setTerminalInput('');
  };

  // Get first 3 projects for preview
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <main className="page-fade-in">
      {/* Hero Section */}
      <section className="hero-home">
        <div className="container hero-grid">
          <div className="hero-text-block">
            <div className="badge-status">
              <span className="dot-green"></span> Open to Full Stack, Python & Data Engineering Roles
            </div>

            <h1 className="hero-title">
              Architecting robust web systems & <span className="gradient-text">data pipelines.</span>
            </h1>

            <div className="typer-wrap">
              <span>I'm <strong>Aashi Pandey</strong> — </span>
              <span className="typer-text" id="typerText">{currentText}</span>
              <span className="cursor">|</span>
            </div>

            <p className="hero-bio">
              <strong>B.Tech Information Technology Graduate (2022–2026)</strong> specializing in building full-stack web applications with <strong>Python, Django, React.js</strong>, and distributed data processing pipelines using <strong>Apache PySpark, Databricks, AWS, and SQL</strong>.
            </p>

            <div className="hero-cta-flex">
              <Link to="/projects" className="btn btn-primary"><i className="fa-solid fa-rocket"></i> View Case Studies</Link>
              <Link to="/experience" className="btn btn-outline"><i className="fa-solid fa-briefcase"></i> Work Experience</Link>
              <button className="btn btn-outline" onClick={copyEmail}><i className="fa-regular fa-copy"></i> Copy Email</button>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
              <a href="https://github.com/aashhii17" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}><i className="fa-brands fa-github"></i> GitHub</a>
              <a href="https://www.linkedin.com/in/aashi-pandey-1324b025b" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
            </div>
          </div>

          <div className="hero-card-side">
            <div className="profile-card-studio">
              <div className="card-top">
                <span className="file-tag">aashi_pandey.py</span>
                <span className="active-pill"><i className="fa-solid fa-circle-check"></i> Available</span>
              </div>

              <div className="profile-header">
                <div className="avatar-sq">AP</div>
                <div className="profile-info">
                  <h3>Aashi Pandey</h3>
                  <p>Full Stack & Data Engineer</p>
                  <span className="loc-text"><i className="fa-solid fa-location-dot"></i> Indore, MP, India</span>
                </div>
              </div>

              <div className="chips-row">
                <span className="chip-tag"><i className="fa-brands fa-python"></i> Python</span>
                <span className="chip-tag"><i className="fa-solid fa-cubes"></i> Django</span>
                <span className="chip-tag"><i className="fa-brands fa-react"></i> React.js</span>
                <span className="chip-tag"><i className="fa-solid fa-layer-group"></i> MERN Stack</span>
                <span className="chip-tag"><i className="fa-solid fa-fire"></i> PySpark</span>
                <span className="chip-tag"><i className="fa-brands fa-aws"></i> AWS</span>
                <span className="chip-tag"><i className="fa-solid fa-database"></i> SQL</span>
              </div>

              <div className="code-box-studio">
                <div className="code-line"><span className="kw">class</span> <span className="cls">AashiPandey</span>:</div>
                <div className="code-line indent-1">degree = <span className="str">"B.Tech in IT (Graduated 2022-2026) · Grade A"</span></div>
                <div className="code-line indent-1">email = <span className="str">"aashipndy1710@gmail.com"</span></div>
                <div className="code-line indent-1">github = <span className="str">"github.com/aashhii17"</span></div>
                <div className="code-line indent-1">linkedin = <span className="str">"linkedin.com/in/aashi-pandey-1324b025b"</span></div>
              </div>

              <div className="live-status-bar" style={{ marginTop: '1.2rem', padding: '0.75rem 1rem', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="live-dot"></span>
                <span className="live-indicator">
                  Active task: <strong style={{ color: 'var(--accent-primary)', marginLeft: '0.2rem' }}>{liveActivity}</strong>
                </span>
              </div>
            </div>

            {/* CLI Developer Terminal */}
            <div className="cli-terminal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">aashi-developer-console</span>
              </div>
              <div className="terminal-body">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="terminal-line" style={{ color: line.type === 'command' ? '#10b981' : line.type === 'system' ? '#f59e0b' : '#38bdf8' }}>
                    {line.text}
                  </div>
                ))}
                <form onSubmit={handleTerminalSubmit} className="terminal-input-row">
                  <span>visitor@aashi-portfolio:~$</span>
                  <input 
                    type="text" 
                    className="terminal-input" 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    autoComplete="off"
                    aria-label="Terminal input"
                  />
                </form>
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header-wrap">
            <span className="section-subtitle">CORE COMPETENCIES</span>
            <h2>What I <span className="gradient-text">Deliver</span></h2>
          </div>

          <div className="cards-grid-3">
            <div className="studio-card">
              <div className="studio-card-icon"><i class="fa-solid fa-layer-group"></i></div>
              <h3>Full-Stack Web Development</h3>
              <p>Architecting full-stack web applications with Python & Django backend RESTful services, combined with high-performance React.js frontends and database models.</p>
            </div>

            <div className="studio-card">
              <div className="studio-card-icon"><i class="fa-solid fa-network-wired"></i></div>
              <h3>Data Engineering & Cloud</h3>
              <p>Designing scalable ETL pipelines, processing large-scale datasets with Apache PySpark, Databricks, and AWS to automate cloud data workflows.</p>
            </div>

            <div className="studio-card">
              <div className="studio-card-icon"><i class="fa-solid fa-chart-pie"></i></div>
              <h3>Data Analytics & Insights</h3>
              <p>Performing statistical data cleaning, SQL relational database querying, exploratory data analysis (EDA), and interactive dashboard creation using Power BI and Chart.js.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header-wrap">
            <span className="section-subtitle">FEATURED CASE STUDIES</span>
            <h2>Highlighted <span className="gradient-text">Projects</span></h2>
          </div>

          <div className="cards-grid-3">
            {featuredProjects.map((project) => (
              <div key={project.id} className="studio-card">
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.6rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                  {project.overview.length > 200 ? project.overview.slice(0, 197) + '...' : project.overview}
                </p>
                <Link to="/projects" className="btn-details">
                  View Full Case Study <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="section-padding">
        <div className="container">
          <div className="studio-card text-center" style={{ padding: '3.5rem 2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '0.8rem' }}>Ready to collaborate or discuss an opportunity?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 2rem' }}>
              Review my complete career timeline, deep-dive into project technical architectures, or connect directly with me.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-primary"><i className="fa-solid fa-user"></i> Read Full Biography</Link>
              <Link to="/projects" className="btn btn-outline"><i className="fa-solid fa-diagram-project"></i> View All 5 Case Studies</Link>
              <Link to="/contact" className="btn btn-outline"><i className="fa-solid fa-envelope"></i> Contact Aashi</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
