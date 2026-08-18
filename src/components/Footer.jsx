import React from 'react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Aashi Pandey. All rights reserved.</p>
        <p className="footer-credits">
          <a href="https://www.flaticon.com/free-icons/professions-and-jobs" title="professions and jobs icons" target="_blank" rel="noopener noreferrer">Professions and jobs icons created by Magnific - Flaticon</a>
        </p>
        <a href="#top" onClick={scrollToTop} className="back-to-top">
          Back to top <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  );
}
