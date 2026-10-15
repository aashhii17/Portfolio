import React from 'react';

export default function Experience() {
  return (
    <main className="section-padding page-fade-in">
      <div className="container">
        <div className="section-header-wrap">
          <span className="section-subtitle">CAREER MILESTONES</span>
          <h2>Work <span className="gradient-text">Experience</span></h2>
        </div>

        <div className="timeline-flex">
          {/* Role 1: Eagle in Cloud - Software Engineer Trainee */}
          <div className="exp-card-studio">
            <div className="exp-icon-sq"><i className="fa-solid fa-laptop-code"></i></div>
            <div className="exp-body-wrap">
              <div className="exp-top-row">
                <div>
                  <h3 className="role-title">Software Engineer Trainee</h3>
                  <span className="company-title"><i className="fa-solid fa-building"></i> Eagle in Cloud · On-site (Indore, MP)</span>
                </div>
                <span className="date-badge"><i className="fa-solid fa-calendar-days"></i> Sep 2026 – Present</span>
              </div>
              <p className="exp-desc">
                Promoted to full-time Software Engineer Trainee upon successful completion of the developer internship in September. Designing and engineering scalable full-stack web applications, microservices, and high-throughput RESTful APIs using <strong>Python, Django, React.js, and PostgreSQL</strong>. Managing containerized production deployments with <strong>Docker & Kubernetes</strong> and streamlining cloud pipelines on <strong>Microsoft Azure</strong>.
              </p>
              <div className="tech-badges-wrap">
                <span className="tech-badge">Python & Django</span>
                <span className="tech-badge">React.js</span>
                <span className="tech-badge">PostgreSQL</span>
                <span className="tech-badge">RESTful APIs</span>
                <span className="tech-badge">Docker</span>
                <span className="tech-badge">Kubernetes</span>
                <span className="tech-badge">Microsoft Azure</span>
              </div>
            </div>
          </div>

          {/* Role 2: Eagle in Cloud - Python Developer Intern */}
          <div className="exp-card-studio">
            <div className="exp-icon-sq"><i className="fa-brands fa-python"></i></div>
            <div className="exp-body-wrap">
              <div className="exp-top-row">
                <div>
                  <h3 className="role-title">Python Developer Intern</h3>
                  <span className="company-title"><i className="fa-solid fa-building"></i> Eagle in Cloud · On-site (Indore, MP)</span>
                </div>
                <span className="date-badge"><i className="fa-solid fa-calendar-days"></i> Jun 2026 – Sep 2026 (Completed)</span>
              </div>
              <p className="exp-desc">
                Engineered full-stack web solutions and RESTful API backends using the <strong>MERN Stack (MongoDB, Express.js, React.js, Node.js)</strong> and <strong>PostgreSQL</strong>. Implemented containerization workflows with <strong>Docker and Kubernetes</strong>, managed cloud infrastructure on <strong>Microsoft Azure</strong>, and acquired foundational knowledge in <strong>Apache PySpark and Databricks</strong> for distributed data processing.
              </p>
              <div className="tech-badges-wrap">
                <span className="tech-badge">Python</span>
                <span className="tech-badge">MERN Stack</span>
                <span className="tech-badge">PostgreSQL</span>
                <span className="tech-badge">Docker</span>
                <span className="tech-badge">Kubernetes</span>
                <span className="tech-badge">Microsoft Azure</span>
                <span className="tech-badge">PySpark & Databricks</span>
              </div>
            </div>
          </div>

          {/* Role 3: Unified Mentor - Data Analyst Intern */}
          <div className="exp-card-studio">
            <div className="exp-icon-sq"><i className="fa-solid fa-chart-line"></i></div>
            <div className="exp-body-wrap">
              <div className="exp-top-row">
                <div>
                  <h3 className="role-title">Data Analyst Intern</h3>
                  <span className="company-title"><i className="fa-solid fa-building"></i> Unified Mentor Private Limited · Remote</span>
                </div>
                <span className="date-badge"><i className="fa-solid fa-calendar-days"></i> Jul 2025 – Sep 2025</span>
              </div>
              <p className="exp-desc">
                Developed practical expertise in data analytics by working with <strong>Python (Pandas, NumPy), SQL, Microsoft Excel, and Power BI</strong> to transform raw datasets into actionable insights. Conducted data cleaning, preprocessing, exploratory data analysis (EDA), and interactive dashboard creation for real-world projects.
              </p>
              <div className="tech-badges-wrap">
                <span className="tech-badge">Python (Pandas, NumPy)</span>
                <span className="tech-badge">SQL</span>
                <span className="tech-badge">Microsoft Power BI</span>
                <span className="tech-badge">Excel</span>
                <span className="tech-badge">EDA & Data Cleaning</span>
                <span className="tech-badge">Dashboard Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
