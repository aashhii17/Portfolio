import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/projectsData';

export default function Projects({ triggerToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [layoutMode, setLayoutMode] = useState('grid');

  // Handle URL deep linking on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    if (projectId) {
      const matchedProject = projectsData.find(p => p.id === projectId);
      if (matchedProject) {
        setSelectedProject(matchedProject);
      }
    }
  }, []);

  // Lock background scroll and reset modal scroll to top when opened
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        const modalBody = document.querySelector('.modal-studio-card');
        if (modalBody) {
          modalBody.scrollTop = 0;
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    // Push project ID to URL history without page reload
    const newUrl = `${window.location.pathname}?id=${project.id}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  const closeModal = () => {
    setSelectedProject(null);
    // Clear URL parameters
    window.history.pushState({ path: window.location.pathname }, '', window.location.pathname);
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-overlay active') {
      closeModal();
    }
  };

  const copyProjectLink = (projectId) => {
    const shareUrl = `${window.location.origin}/projects?id=${projectId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        triggerToast("Direct project case-study link copied to clipboard!");
      })
      .catch(() => {
        triggerToast("Error copying link.");
      });
  };

  // Filter projects based on search query and category pill
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category.includes(activeCategory);
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const renderArchitectureDiagram = (projectId) => {
    switch (projectId) {
      case 'aistudio':
        return (
          <div className="arch-diagram-section">
            <h4 className="arch-diagram-title">
              <i className="fa-solid fa-diagram-project" style={{ color: 'var(--accent-primary)' }}></i> System & API Architecture Flow
            </h4>
            <div className="arch-diagram-box">
              <div className="arch-flow-row">
                <div className="arch-step-node">
                  <strong>User Client</strong>
                  <span>React.js / Axios</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>API Gateway</strong>
                  <span>Express.js / JWT Auth</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Router / Controller</strong>
                  <span>Node.js / OpenRouter API</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Database / LLM</strong>
                  <span>MongoDB (History) / 8+ LLMs</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'electricity-monitor':
        return (
          <div className="arch-diagram-section">
            <h4 className="arch-diagram-title">
              <i className="fa-solid fa-diagram-project" style={{ color: 'var(--accent-primary)' }}></i> Data Pipeline & Forecast Flow
            </h4>
            <div className="arch-diagram-box">
              <div className="arch-flow-row">
                <div className="arch-step-node">
                  <strong>Usage Logs</strong>
                  <span>10K+ Telemetry Records</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>ETL Parser</strong>
                  <span>Django background tasks</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Aggregated DB</strong>
                  <span>PostgreSQL (25+ Tables)</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Predictive UI</strong>
                  <span>ML bill estimation / Chart.js</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'shelfwise':
        return (
          <div className="arch-diagram-section">
            <h4 className="arch-diagram-title">
              <i className="fa-solid fa-diagram-project" style={{ color: 'var(--accent-primary)' }}></i> RBAC System Architecture Flow
            </h4>
            <div className="arch-diagram-box">
              <div className="arch-flow-row">
                <div className="arch-step-node">
                  <strong>Member UI Portal</strong>
                  <span>500+ Active Accounts</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Access Guard</strong>
                  <span>Django Role RBAC</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Relational Schema</strong>
                  <span>MySQL (Foreign Key Constraints)</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Action Engines</strong>
                  <span>Cron Fines / ReportLab PDFs</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'womens-safety':
        return (
          <div className="arch-diagram-section">
            <h4 className="arch-diagram-title">
              <i className="fa-solid fa-diagram-project" style={{ color: 'var(--accent-primary)' }}></i> SOS Dispatch Flow
            </h4>
            <div className="arch-diagram-box">
              <div className="arch-flow-row">
                <div className="arch-step-node">
                  <strong>Emergency Input</strong>
                  <span>One-Tap Trigger / Accelerometer</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>SOS Dispatcher</strong>
                  <span>GPS location sync under 2s</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Maps Display</strong>
                  <span>Google Maps SDK integration</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Dual Cache</strong>
                  <span>Firebase / SQLite Offline Backup</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'doctor-appointment':
        return (
          <div className="arch-diagram-section">
            <h4 className="arch-diagram-title">
              <i className="fa-solid fa-diagram-project" style={{ color: 'var(--accent-primary)' }}></i> Real-Time Scheduling Flow
            </h4>
            <div className="arch-diagram-box">
              <div className="arch-flow-row">
                <div className="arch-step-node">
                  <strong>Patient UI</strong>
                  <span>Specialists slot booking portal</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Conflict Resolver</strong>
                  <span>Django concurrency handler</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Schedule Database</strong>
                  <span>MySQL (12+ doctors schedule)</span>
                </div>
                <div className="arch-step-arrow"><i className="fa-solid fa-arrow-right"></i></div>
                <div className="arch-step-node">
                  <strong>Live Updates</strong>
                  <span>Dynamic slot rendering under 200ms</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <main className="section-padding page-fade-in">
        <div className="container">
          {/* Search & Filter Controls */}
          <div className="project-search-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <input 
              type="text" 
              className="search-field" 
              id="projectSearch" 
              placeholder="🔍 Search projects by title, technology, or keyword..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ flex: '1', minWidth: '260px' }}
            />
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="filter-group">
                <button 
                  className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('all')}
                >
                  All Projects
                </button>
                <button 
                  className={`filter-pill ${activeCategory === 'fullstack' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('fullstack')}
                >
                  Full-Stack & Python
                </button>
                <button 
                  className={`filter-pill ${activeCategory === 'ai' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('ai')}
                >
                  AI & LLM
                </button>
                <button 
                  className={`filter-pill ${activeCategory === 'mobile' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('mobile')}
                >
                  Mobile & Data
                </button>
              </div>

              {/* Layout Toggle Widget */}
              <div className="layout-toggle-group" style={{ display: 'flex', gap: '0.2rem', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.25rem', background: 'var(--bg-surface)' }}>
                <button 
                  className={`filter-pill ${layoutMode === 'grid' ? 'active' : ''}`} 
                  style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', margin: 0, fontSize: '0.8rem', cursor: 'pointer' }}
                  onClick={() => setLayoutMode('grid')} 
                  aria-label="Grid View"
                >
                  <i className="fa-solid fa-table-cells" style={{ marginRight: '0.3rem' }}></i> Grid
                </button>
                <button 
                  className={`filter-pill ${layoutMode === 'list' ? 'active' : ''}`} 
                  style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: 'none', margin: 0, fontSize: '0.8rem', cursor: 'pointer' }}
                  onClick={() => setLayoutMode('list')} 
                  aria-label="List View"
                >
                  <i className="fa-solid fa-list" style={{ marginRight: '0.3rem' }}></i> List
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid / List container */}
          <div className={layoutMode === 'grid' ? 'cards-grid-3' : 'projects-list-layout'} id="projectsGrid" style={{ marginTop: '1.5rem' }}>
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-deep-card">
                <div className="project-banner-studio">
                  <span className="badge-category">{project.categoryLabel}</span>
                  <i className={`${project.iconClass} banner-icon`}></i>
                </div>
                <div className="project-content-deep">
                  <h3>{project.title}</h3>
                  <p className="project-overview">
                    {project.overview}
                  </p>
                  <ul className="project-features-list">
                    {project.featuresList.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <div className="tech-badges-wrap">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem' }}>
                    <button className="btn-details" onClick={() => openModal(project)}>
                      Read Technical Case Study <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                      <button 
                        onClick={() => copyProjectLink(project.id)} 
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1.1rem' }} 
                        title="Copy Share Link"
                      >
                        <i className="fa-regular fa-share-from-square"></i>
                      </button>
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="GitHub Repo" 
                        style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}
                      >
                        <i className="fa-brands fa-github"></i>
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          title="Live Demo" 
                          style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}
                        >
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <h3>No projects found matching your search.</h3>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal Overlay is direct sibling to main to prevent stacking context clipping */}
      {selectedProject && (
        <div className="modal-overlay active" id="projectModal" onClick={handleBackdropClick}>
          <div className="modal-studio-card">
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <div id="modalContent">
              <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 700, background: 'var(--accent-subtle)', padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                {selectedProject.badgeLabel}
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.65rem', fontWeight: 800, margin: '0.8rem 0 0.3rem', color: 'var(--text-primary)' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                {selectedProject.categoryLabel}
              </p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  <i className="fa-solid fa-align-left" style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}></i> System Overview:
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  {selectedProject.overview}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  <i className="fa-solid fa-lightbulb" style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}></i> Problem Solved:
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  {selectedProject.problemSolved}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  <i className="fa-solid fa-cubes" style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}></i> Architectural Highlights:
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  {selectedProject.architectureDetails.map((item, index) => (
                    <li key={index} style={{ marginBottom: '0.4rem' }}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  <i className="fa-solid fa-chart-line" style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}></i> Business & Operational Impact:
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                  {selectedProject.impact}
                </p>
              </div>

              {renderArchitectureDiagram(selectedProject.id)}

              <div style={{ marginBottom: '1.8rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  <i className="fa-solid fa-layer-group" style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}></i> Technologies Used:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', padding: '0.25rem 0.65rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

               <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, #10b981 100%)', border: 'none' }}>
                    <i className="fa-solid fa-earth-americas"></i> Visit Live Project
                  </a>
                )}
                <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer" className={selectedProject.liveUrl ? "btn btn-outline" : "btn btn-primary"}>
                  <i className="fa-brands fa-github"></i> View Repository on GitHub
                </a>
                <button onClick={() => copyProjectLink(selectedProject.id)} className="btn btn-outline">
                  <i className="fa-regular fa-copy"></i> Copy Share Link
                </button>
                <a href="https://www.linkedin.com/in/aashi-pandey-1324b025b" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <i className="fa-brands fa-linkedin"></i> LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
