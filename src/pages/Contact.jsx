import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

// Supabase client configuration

export default function Contact({ triggerToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Email format validator regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field, value) => {
    let errorMsg = '';
    
    if (!value.trim()) {
      errorMsg = 'This field is required.';
    } else if (field === 'email' && !emailRegex.test(value)) {
      errorMsg = 'Please enter a valid email address.';
    } else if (field === 'message' && value.length > 500) {
      errorMsg = 'Message cannot exceed 500 characters.';
    }

    setErrors(prev => ({
      ...prev,
      [field]: errorMsg
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Map element ids (senderName, senderEmail, etc.) to form state keys
    const stateKey = id.replace('sender', '').toLowerCase();
    
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }));

    // Real-time validation
    validateField(stateKey, value);
  };


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check all fields
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    if (Object.keys(newErrors).some(k => newErrors[k])) {
      setErrors(newErrors);
      triggerToast("Please fix the validation errors before sending.");
      return;
    }

    setSubmitting(true);

    let supabaseSuccess = false;
    let netlifySuccess = false;

    // 1. Attempt Supabase submission
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (!error) {
        supabaseSuccess = true;
      } else {
        console.warn("Supabase submission notice:", error.message || error);
      }
    } catch (supaErr) {
      console.warn("Supabase exception:", supaErr);
    }

    // 2. Attempt Netlify Forms submission
    const encode = (data) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...formData
        })
      });
      if (res.ok) {
        netlifySuccess = true;
      }
    } catch (netlifyErr) {
      console.warn("Netlify Forms submission error:", netlifyErr);
    }

    if (supabaseSuccess || netlifySuccess) {
      triggerToast("Thank you! Your message has been sent successfully.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } else {
      // Fallback to mailto so the user's message is never blocked or lost
      const mailtoUrl = `mailto:aashipndy1710@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
      triggerToast("Opening email client to send message to aashipndy1710@gmail.com...");
    }
    setSubmitting(false);
  };

  return (
    <main className="section-padding page-fade-in">
      <div className="container">
        {/* Contact Grid Wrap */}
        <div className="contact-grid-wrap" style={{ marginBottom: '4rem' }}>
          <div className="contact-left">
            <span className="section-subtitle">DIRECT CONNECT</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Let's Discuss Opportunities</h2>
            <p>Graduated B.Tech IT engineer actively seeking full-time and contract roles in <strong>Full Stack Development, Python Development, and Data Engineering</strong>.</p>

            <div className="contact-details-flex">
              <div className="c-row">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <span>Email Address</span>
                  <strong id="emailVal">aashipndy1710@gmail.com</strong>
                </div>
              </div>

              <div className="c-row">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <span>Location</span>
                  <strong>Indore, Madhya Pradesh, India</strong>
                </div>
              </div>

              <div className="c-row">
                <i className="fa-solid fa-briefcase"></i>
                <div>
                  <span>Availability</span>
                  <strong>Full-time Remote / Hybrid / On-site</strong>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <button className="btn btn-outline" onClick={copyEmail}><i className="fa-regular fa-copy"></i> Copy Email Address</button>
            </div>

            <div className="social-links-row">
              <a href="https://github.com/aashhii17" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
              <a href="https://www.linkedin.com/in/aashi-pandey-1324b025b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="mailto:aashipndy1710@gmail.com" aria-label="Email"><i className="fa-solid fa-envelope"></i></a>
            </div>
          </div>

          <div className="contact-right">
            {/* Supabase & Netlify Form */}
            <form 
              className="studio-form" 
              id="contactForm" 
              onSubmit={handleSubmit}
              data-netlify="true"
              name="contact"
            >
              {/* Form-name input for Netlify Form submissions and emails */}
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="form-2col" style={{ marginBottom: errors.name || errors.email ? '0.5rem' : '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input 
                    type="text" 
                    id="senderName" 
                    name="name"
                    placeholder="Your Name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className={errors.name ? 'form-input-error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input 
                    type="email" 
                    id="senderEmail" 
                    name="email"
                    placeholder="Your Email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className={errors.email ? 'form-input-error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: errors.subject ? '0.5rem' : '1.5rem' }}>
                <input 
                  type="text" 
                  id="senderSubject" 
                  name="subject"
                  placeholder="Subject / Job Opportunity" 
                  required 
                  value={formData.subject}
                  onChange={handleInputChange}
                  disabled={submitting}
                  className={errors.subject ? 'form-input-error' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5rem' }}>
                <textarea 
                  id="senderMessage" 
                  name="message"
                  rows="5" 
                  placeholder="Write your message..." 
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={submitting}
                  maxLength={500}
                  className={errors.message ? 'form-input-error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
                
                {/* Character Counter */}
                <span className="char-counter">
                  {formData.message.length} / 500 characters
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, minWidth: '150px' }} disabled={submitting}>
                  <i className="fa-solid fa-paper-plane"></i> {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Recruiter FAQ */}
        <div className="section-header-wrap">
          <span className="section-subtitle">QUICK RECRUITER FAQ</span>
          <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
        </div>

        <div className="cards-grid-3">
          <div className="studio-card">
            <h3>What roles are you targetting?</h3>
            <p>Full Stack Developer (MERN / React / Python), Software & Cloud Engineer (REST APIs, Docker, Kubernetes, Azure Services, PostgreSQL), and Data Engineering (PySpark & Databricks foundations).</p>
          </div>

          <div className="studio-card">
            <h3>What is your educational status?</h3>
            <p>Graduated B.Tech in Information Technology (2022–2026) with <strong>Grade A</strong> from Indore Institute of Science and Technology. Senior Secondary 82% & Secondary 80% at Jineshwar International School.</p>
          </div>

          <div className="studio-card">
            <h3>Are you open to relocation or remote?</h3>
            <p>Yes! I am fully available for Remote, Hybrid, or On-Site relocation roles.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
