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
    { text: "Type 'help' to view all available commands (including easter egg 'matrix'!).", type: "system" },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Matrix falling rain animation effect
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Match dimensions to display size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight || 260;

    const columns = Math.floor(canvas.width / 14) || 20;
    const yPositions = Array(columns).fill(0);

    let animationFrameId;
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 12, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981'; // Sleek green instead of generic green
      ctx.font = '13px Courier New, monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const char = String.fromCharCode(33 + Math.floor(Math.random() * 93));
        const x = i * 14;
        const y = yPositions[i];
        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 14;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [matrixActive]);

  // Escape key handler to close Matrix mode
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape' && matrixActive) {
        setMatrixActive(false);
        setTerminalHistory(prev => [
          ...prev,
          { text: "Matrix mode deactivated. Welcome back.", type: "system" }
        ]);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [matrixActive]);

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const input = terminalInput.trim().toLowerCase();
      if (!input) return;
      const commands = ['help', 'about', 'skills', 'projects', 'clear', 'matrix'];
      const matches = commands.filter(c => c.startsWith(input));
      if (matches.length === 1) {
        setTerminalInput(matches[0]);
      } else if (matches.length > 1) {
        setTerminalHistory(prev => [
          ...prev,
          { text: `visitor@aashi-portfolio:~$ ${terminalInput}`, type: 'command' },
          { text: `Matches: ${matches.join(', ')}`, type: 'system' }
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setTerminalInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    const cleanCmd = cmd.toLowerCase();
    if (!cleanCmd) return;

    // Track command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (cleanCmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    }

    if (cleanCmd === 'matrix') {
      setMatrixActive(true);
      setTerminalInput('');
      setTerminalHistory(prev => [
        ...prev,
        { text: `visitor@aashi-portfolio:~$ ${cmd}`, type: 'command' },
        { text: "Entering Matrix Digital Rain Mode... Click terminal or press ESC to exit.", type: "system" }
      ]);
      return;
    }

    let response = [];
    let isJsx = false;
    let jsxContent = null;

    switch (cleanCmd) {
      case 'help':
        response = [
          "Available Commands:",
          "  about    - Display Aashi's background overview",
          "  skills   - List technical competencies",
          "  projects - Summarize core systems with interactive links",
          "  matrix   - Launch developer terminal easter egg",
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
        isJsx = true;
        jsxContent = (
          <div style={{ marginTop: '0.4rem', marginBottom: '0.4rem', fontFamily: 'monospace', lineHeight: '1.5' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Core Projects Catalog:</span>
            <div style={{ paddingLeft: '0.5rem', marginTop: '0.2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <div>
                • <strong style={{ color: '#fff' }}>Alaski AI</strong>: Multi-LLM chatbot platform. 
                <a href="https://github.com/aashhii17/AIStudio" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[GitHub]</a>
              </div>
              <div>
                • <strong style={{ color: '#fff' }}>EcoWatt</strong>: AI energy monitoring system.
                <a href="https://github.com/aashhii17/EcoWatt" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[GitHub]</a>
                <a href="https://ecowatt-29k4.onrender.com/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.6rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[Live Site]</a>
              </div>
              <div>
                • <strong style={{ color: '#fff' }}>ShelfWise</strong>: Library management platform.
                <a href="https://github.com/aashhii17/ShelfWise" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[GitHub]</a>
                <a href="https://shelfwise-xm8q.onrender.com/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.6rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[Live Site]</a>
              </div>
              <div>
                • <strong style={{ color: '#fff' }}>GuardianAI</strong>: Women safety mobile client.
                <a href="https://github.com/aashhii17/GuardianAI" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[GitHub]</a>
              </div>
              <div>
                • <strong style={{ color: '#fff' }}>Medislot</strong>: Medical scheduling system.
                <a href="https://github.com/aashhii17/Medislot" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.8rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[GitHub]</a>
                <a href="https://medislot-1-rjv9.onrender.com" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.6rem', color: 'var(--accent-primary)', textDecoration: 'underline' }}>[Live Site]</a>
              </div>
            </div>
          </div>
        );
        break;
      default:
        response = [`Command not found: '${cleanCmd}'. Type 'help' for options.`];
    }

    setTerminalHistory(prev => [
      ...prev,
      { text: `visitor@aashi-portfolio:~$ ${cmd}`, type: 'command' },
      ...(isJsx 
        ? [{ jsx: jsxContent, type: 'output' }] 
        : response.map(line => ({ text: line, type: 'output' })))
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
            <div className="cli-terminal" style={{ margin: 0, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span className="terminal-title">aashi-developer-console</span>
              </div>
              <div className="terminal-body" style={{ flex: 1, minHeight: '260px', position: 'relative', overflowY: 'auto' }}>
                {matrixActive && (
                  <div 
                    onClick={() => {
                      setMatrixActive(false);
                      setTerminalHistory(prev => [
                        ...prev,
                        { text: "Matrix mode deactivated. Welcome back.", type: "system" }
                      ]);
                    }} 
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#0a0a0c', zIndex: 10, cursor: 'pointer' }}
                  >
                    <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'var(--accent-primary)', fontSize: '0.8rem', fontFamily: 'monospace', zIndex: 11, background: 'rgba(24,21,20,0.85)', padding: '4px 8px', borderRadius: '4px', border: '1px solid #38322E' }}>
                      Matrix Mode Active. Press ESC or click terminal to exit.
                    </div>
                  </div>
                )}
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="terminal-line" style={{ color: line.type === 'command' ? 'var(--accent-primary)' : line.type === 'system' ? '#E5A84B' : '#F7F3ED', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                    {line.jsx ? line.jsx : line.text}
                  </div>
                ))}
                <form onSubmit={handleTerminalSubmit} className="terminal-input-row" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginRight: '0.4rem' }}>visitor@aashi-portfolio:~$</span>
                  <input 
                    type="text" 
                    className="terminal-input" 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    aria-label="Terminal input"
                    style={{ flex: 1, background: 'transparent', border: 'none', color: '#F7F3ED', outline: 'none', fontFamily: 'monospace', fontSize: '0.85rem' }}
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
