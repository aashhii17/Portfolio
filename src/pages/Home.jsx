import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const roles = ["Full Stack Developer", "Python Developer", "Data Engineer"];

export default function Home({ triggerToast }) {
  // Typewriter effect
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

  // Live activity state (statically set to the Alaski AI task)
  const liveActivity = "Connecting Alaski AI to OpenRouter models";

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
          "Languages: Python, JavaScript (ES6+), SQL",
          "Backend/Database: Django, Supabase, REST APIs",
          "Data/ETL: Apache PySpark, Databricks, SQL Databases",
          "Frontend: React.js, Tailwind CSS, HTML5/CSS3",
          "Cloud/Tools: AWS Cloud, Firebase, Power BI, Git"
        ];
        break;
      case 'projects':
        response = [
          "Core Projects:",
          "  • Alaski AI: Multi-LLM MERN chatbot with API streaming",
          "  • EcoWatt: Django energy forecast platform with 10K+ logs",
          "  • ShelfWise: MySQL library tracker (10K+ book entries)",
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

  // Get highlighted projects for preview (Alaski AI, EcoWatt, Medislot)
  const highlightedIds = ["aistudio", "electricity-monitor", "doctor-appointment"];
  const featuredProjects = projectsData.filter(p => highlightedIds.includes(p.id));

  return (
    <main className="page-fade-in">
      {/* Hero Section - Simplified & Cleaned Up */}
      <section className="hero-home">
        <div className="container hero-grid">
          <div className="hero-text-block">
            <div className="badge-status">
              <span className="dot-green"></span> Building AI Apps & Web Platforms
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
              <strong>B.Tech Information Technology Graduate (2022–2026)</strong> specializing in building full-stack web applications with <strong>Python, Django, React.js, Supabase</strong>, and distributed data processing pipelines using <strong>Apache PySpark, Databricks, AWS, and SQL</strong>.
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
            {/* Minimal Code Mockup Visual - Clean Landing */}
            <div className="profile-card-studio" style={{ margin: 0 }}>
              <div className="card-top">
                <span className="file-tag">aashi_pandey.py</span>
                <span className="active-pill"><i className="fa-solid fa-code-branch"></i> Open to Opportunities</span>
              </div>

              <div className="code-box-studio" style={{ marginTop: '1.5rem' }}>
                <div className="code-line"><span className="kw">class</span> <span className="cls">AashiPandey</span>:</div>
                <div className="code-line indent-1">focus = <span className="str">["MERN Developer", "Full Stack Development", "Python", "Data Engineering"]</span></div>
                <div className="code-line indent-1">degree = <span className="str">"B.Tech in IT (Graduated 2026) · Grade A"</span></div>
                <div className="code-line indent-1">publications = <span className="str">"Panic Button for Women Safety Using IoT & GPS"</span></div>
                <div className="code-line indent-1">email = <span className="str">"aashipndy1710@gmail.com"</span></div>
                <div className="code-line indent-1">github = <span className="str">"github.com/aashhii17"</span></div>
                <div className="code-line indent-1">linkedin = <span className="str">"linkedin.com/in/aashi-pandey-1324b025b"</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Console & Insights Section - Revealed as User Scrolls */}
      <section className="section-padding" style={{ borderBottom: '1px solid var(--border-color)', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-header-wrap">
            <span className="section-subtitle">INTERACTIVE PORTAL</span>
            <h2>Developer <span className="gradient-text">Console & Insights</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start', marginTop: '2.5rem' }}>
            {/* Detailed Profile Summary */}
            <div className="profile-card-studio" style={{ margin: 0, height: '100%' }}>
              <div className="card-top">
                <span className="file-tag">developer_stats.json</span>
                <span className="active-pill" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)' }}><i className="fa-solid fa-circle-nodes"></i> Building AI Applications</span>
              </div>

              <div className="profile-header" style={{ marginTop: '1.2rem' }}>
                <div className="avatar-sq">AP</div>
                <div className="profile-info">
                  <h3>Aashi Pandey</h3>
                  <p>Full Stack & Data Engineer</p>
                  <span className="loc-text"><i className="fa-solid fa-location-dot"></i> Indore, MP, India</span>
                </div>
              </div>

              <div className="chips-row" style={{ marginTop: '1.5rem' }}>
                <span className="chip-tag"><i className="fa-brands fa-python"></i> Python</span>
                <span className="chip-tag"><i className="fa-solid fa-cubes"></i> Django</span>
                <span className="chip-tag"><i className="fa-brands fa-react"></i> React.js</span>
                <span className="chip-tag"><i className="fa-solid fa-server"></i> Supabase</span>
                <span className="chip-tag"><i className="fa-solid fa-layer-group"></i> MERN Stack</span>
                <span className="chip-tag"><i className="fa-solid fa-fire"></i> PySpark</span>
                <span className="chip-tag"><i className="fa-brands fa-aws"></i> AWS</span>
                <span className="chip-tag"><i className="fa-solid fa-database"></i> SQL</span>
              </div>

              <div className="live-status-bar" style={{ marginTop: '2rem', padding: '0.75rem 1rem', background: 'var(--bg-subtle)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="live-dot"></span>
                <span className="live-indicator">
                  Current activity: <strong style={{ color: 'var(--accent-primary)', marginLeft: '0.2rem' }}>{liveActivity}</strong>
                </span>
              </div>
            </div>

            {/* CLI Developer Terminal */}
            <div className="cli-terminal" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">aashi-developer-console</span>
              </div>
              <div className="terminal-body" style={{ flex: 1, minHeight: '260px' }}>
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="terminal-line" style={{ color: line.type === 'command' ? '#10b981' : line.type === 'system' ? '#f59e0b' : '#38bdf8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                    {line.text}
                  </div>
                ))}
                <form onSubmit={handleTerminalSubmit} className="terminal-input-row" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#10b981', marginRight: '0.4rem' }}>visitor@aashi-portfolio:~$</span>
                  <input 
                    type="text" 
                    className="terminal-input" 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    autoComplete="off"
                    aria-label="Terminal input"
                    style={{ flex: 1, background: 'transparent', border: 'none', color: '#38bdf8', outline: 'none', fontFamily: 'monospace', fontSize: '0.85rem' }}
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
              <div className="studio-card-icon"><i className="fa-solid fa-layer-group"></i></div>
              <h3>Full-Stack Web Development</h3>
              <p>Architecting full-stack web applications with Python & Django backend RESTful services, combined with high-performance React.js frontends and database models.</p>
            </div>

            <div className="studio-card">
              <div className="studio-card-icon"><i className="fa-solid fa-network-wired"></i></div>
              <h3>Data Engineering & Cloud</h3>
              <p>Designing scalable ETL pipelines, processing large-scale datasets with Apache PySpark, Databricks, and AWS to automate cloud data workflows.</p>
            </div>

            <div className="studio-card">
              <div className="studio-card-icon"><i className="fa-solid fa-chart-pie"></i></div>
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
              <div key={project.id} className="studio-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem', lineHeight: '1.6' }}>
                    {project.overview.length > 200 ? project.overview.slice(0, 197) + '...' : project.overview}
                  </p>
                </div>
                <Link to={`/projects?id=${project.id}`} className="btn-details" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  View Full Case Study <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Publications Section */}
      <section className="section-padding" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header-wrap">
            <span className="section-subtitle">SCHOLARLY WORK</span>
            <h2>Research & <span className="gradient-text">Publications</span></h2>
          </div>

          <div className="studio-card" style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', border: '1px solid var(--border-color)', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="file-tag" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-primary)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700 }}>
                  IJCOPE Journal (May 2026)
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, margin: '0.8rem 0 0.4rem', color: 'var(--text-primary)' }}>
                  Panic Button for Women Safety Using IoT and GPS
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
                  Co-authors: Kavya K.B, Deepshikha Sajankar, Aashi Pandey, Reeta Koranga | Advisor: Asst. Prof. Rakesh Jain
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  ISSN: 3108-1754
                </span>
                <span style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Impact Factor: 3.5
                </span>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: '1.8', margin: 0 }}>
              Published in the <strong>International Journal of Creative and Open Research in Engineering and Management (IJCOPE)</strong>. The research introduces an intelligent IoT safety system powered by GPS, an ESP32 microcontroller, and a custom Android client. The system transmits emergency SOS alerts and real-time location metrics to trusted contacts in under 2 seconds during critical situations.
            </p>

            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href="https://ijcope.org/article/panic-button-for-women-safety-using-iot-and-gps/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline" 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <i className="fa-solid fa-arrow-up-right-from-square"></i> Visit IJCOPE Journal Portal
              </a>
              <Link 
                to="/about" 
                className="btn btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
              >
                <i className="fa-solid fa-user"></i> View Academic Background
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Callout */}
      <section className="section-padding">
        <div className="container">
          <div className="studio-card text-center" style={{ padding: '3.5rem 2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Ready to collaborate or discuss an opportunity?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
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
