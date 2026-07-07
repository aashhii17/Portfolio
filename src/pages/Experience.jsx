import React from 'react';

export default function Experience() {
  return (
    <main className="section-padding page-fade-in">
      <div className="container">
        <div className="timeline-flex">
          {/* Role 1: Eagle in Cloud */}
          <div className="exp-card-studio">
            <div className="exp-icon-sq"><i className="fa-brands fa-python"></i></div>
            <div className="exp-body-wrap">
              <div className="exp-top-row">
                <div>
                  <h3 className="role-title">Python Developer Intern</h3>
                  <span className="company-title"><i className="fa-solid fa-building"></i> Eagle in Cloud · On-site (Indore, MP)</span>
                </div>
                <span className="date-badge"><i className="fa-solid fa-calendar-days"></i> Jun 2026 – Present</span>
              </div>
              <p className="exp-desc">
                Building a strong foundation in Python programming, object-oriented programming, data structures, and algorithms through practical software projects. Expanding core expertise in Data Engineering by leveraging <strong>Apache PySpark, Databricks, and AWS</strong> to construct distributed data processing workflows, scalable ETL pipelines, and cloud data solutions.
              </p>
              <div className="tech-badges-wrap">
                <span className="tech-badge">Python</span>
                <span className="tech-badge">Django</span>
                <span className="tech-badge">Apache PySpark</span>
                <span className="tech-badge">Databricks</span>
                <span className="tech-badge">AWS Cloud</span>
                <span className="tech-badge">ETL Pipelines</span>
                <span className="tech-badge">Data Structures</span>
              </div>
            </div>
          </div>

          {/* Role 2: WideVista */}
          <div className="exp-card-studio">
            <div className="exp-icon-sq"><i className="fa-solid fa-briefcase"></i></div>
            <div className="exp-body-wrap">
              <div className="exp-top-row">
                <div>
                  <h3 className="role-title">Executive Intern</h3>
                  <span className="company-title"><i className="fa-solid fa-building"></i> WideVista · On-site (Indore, MP)</span>
                </div>
                <span className="date-badge"><i className="fa-solid fa-calendar-days"></i> Apr 2026 – Jun 2026</span>
              </div>
              <p className="exp-desc">
                Managed customer datasets and business records using CRM applications. Coordinated with cross-functional teams to support insurance operations and client onboarding processes. Generated operational reports, ensured data accuracy for executive decision-making, and maintained corporate compliance standards.
              </p>
              <div className="tech-badges-wrap">
                <span className="tech-badge">CRM Management</span>
                <span className="tech-badge">Data Operations</span>
                <span className="tech-badge">Corporate Communications</span>
                <span className="tech-badge">Executive Reporting</span>
                <span className="tech-badge">Client Onboarding</span>
              </div>
            </div>
          </div>

          {/* Role 3: Unified Mentor */}
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
