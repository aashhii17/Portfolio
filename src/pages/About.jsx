import React, { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('all');

  const skillsData = [
    { name: "Python & Django Framework", category: "backend" },
    { name: "JavaScript (ES6+) & React.js", category: "frontend" },
    { name: "MERN Full-Stack (MongoDB, Express, React, Node.js)", category: "frontend" },
    { name: "HTML5, CSS3 & Tailwind CSS", category: "frontend" },
    { name: "Java / Kotlin", category: "backend" },
    { name: "RESTful API Architecture", category: "backend" },
    { name: "Apache PySpark", category: "data" },
    { name: "Databricks", category: "data" },
    { name: "AWS Cloud Infrastructure", category: "data" },
    { name: "Scalable ETL Pipelines", category: "data" },
    { name: "SQL, PostgreSQL & MySQL", category: "data" },
    { name: "Pandas & NumPy", category: "tools" },
    { name: "Microsoft Power BI", category: "tools" },
    { name: "Chart.js Analytics", category: "tools" },
    { name: "Exploratory Data Analysis (EDA)", category: "tools" },
    { name: "Git, GitHub & Firebase", category: "tools" }
  ];

  const filteredSkills = activeTab === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeTab);

  return (
    <main className="section-padding page-fade-in">
      <div className="container">
        {/* Bio Summary */}
        <div className="studio-card" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1rem' }}>
            <i className="fa-solid fa-user-gear" style={{ color: 'var(--accent-primary)', marginRight: '0.5rem' }}></i> 
            Professional Biography
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem' }}>
            I am a <strong>B.Tech Information Technology Graduate (2022–2026)</strong> from <strong>Indore Institute of Science and Technology (IIST)</strong>. I specialize in bridging the gap between full-stack web applications, backend system logic, and cloud data engineering pipelines. Through multiple hands-on internships across Python development, ETL pipelines, and data analytics, I have developed strong software engineering practices, database optimization techniques, and responsive user interface design.
          </p>
        </div>

        {/* Technical Skills Matrix */}
        <div className="section-header-wrap">
          <span className="section-subtitle">TECHNICAL MATRIX</span>
          <h2>Skills & <span className="gradient-text">Tooling</span></h2>
        </div>

        {/* Skills Tab Filters */}
        <div className="skills-tab-header">
          <button 
            className={`skills-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Skills
          </button>
          <button 
            className={`skills-tab-btn ${activeTab === 'frontend' ? 'active' : ''}`}
            onClick={() => setActiveTab('frontend')}
          >
            Frontend UI
          </button>
          <button 
            className={`skills-tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
            onClick={() => setActiveTab('backend')}
          >
            Backend & Python
          </button>
          <button 
            className={`skills-tab-btn ${activeTab === 'data' ? 'active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            Data & Cloud
          </button>
          <button 
            className={`skills-tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            Tools & Analytics
          </button>
        </div>

        {/* Filtered Skills Grid */}
        <div className="cards-grid-3" style={{ marginBottom: '4rem', minHeight: '180px' }}>
          {filteredSkills.map((skill, index) => (
            <div 
              key={`${skill.name}-${activeTab}`}
              className="studio-card skill-card-animate" 
              style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--border-color)' }}
            >
              <div 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '8px', 
                  background: 'var(--accent-subtle)', 
                  color: 'var(--accent-primary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0
                }}
              >
                <i className={
                  skill.category === 'frontend' ? 'fa-brands fa-react' :
                  skill.category === 'backend' ? 'fa-brands fa-python' :
                  skill.category === 'data' ? 'fa-solid fa-database' : 'fa-solid fa-screwdriver-wrench'
                }></i>
              </div>
              <div>
                <h3 style={{ fontSize: '0.98rem', margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)' }}>{skill.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {skill.category === 'frontend' ? 'Frontend Development' :
                   skill.category === 'backend' ? 'Backend & Python' :
                   skill.category === 'data' ? 'Data Engineering' : 'Analytics & Tools'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="section-header-wrap">
          <span className="section-subtitle">ACADEMIC BACKGROUND</span>
          <h2>My <span className="gradient-text">Education</span></h2>
        </div>

        <div className="education-flex">
          {/* B.Tech */}
          <div className="edu-card-studio">
            <div className="edu-badge-column">
              <span className="edu-status-tag">Graduated (2022–2026) · Grade A</span>
              <div className="edu-icon-box"><i className="fa-solid fa-graduation-cap"></i></div>
            </div>
            <div className="edu-details">
              <h3>Bachelor of Technology (B.Tech) in IT</h3>
              <p className="inst-title">Indore Institute of Science and Technology (IIST)</p>
              <p>Completed B.Tech degree in Information Technology with strong performance across Software Engineering, Database Management Systems, Data Structures & Algorithms, and Web Systems, graduating with <strong>Grade A</strong>.</p>
            </div>
          </div>

          {/* 12th */}
          <div className="edu-card-studio">
            <div className="edu-badge-column">
              <span className="edu-status-tag">82% Score</span>
              <div className="edu-icon-box"><i className="fa-solid fa-school"></i></div>
            </div>
            <div className="edu-details">
              <h3>Class 12th (Senior Secondary)</h3>
              <p className="inst-title">Jineshwar International School</p>
              <p>Completed higher secondary education focusing on Mathematics, Physics, Chemistry, and Computer Science.</p>
            </div>
          </div>

          {/* 10th */}
          <div className="edu-card-studio">
            <div className="edu-badge-column">
              <span className="edu-status-tag">80% Score</span>
              <div className="edu-icon-box"><i className="fa-solid fa-award"></i></div>
            </div>
            <div className="edu-details">
              <h3>Class 10th (Secondary)</h3>
              <p className="inst-title">Jineshwar International School</p>
              <p>Completed secondary school education with high academic performance across foundational subjects.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
