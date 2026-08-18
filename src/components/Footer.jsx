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
        <a href="#top" onClick={scrollToTop} className="back-to-top">
          Back to top <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  );
}
