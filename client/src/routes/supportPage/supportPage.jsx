import { useState } from "react";
import { Link } from "react-router-dom";
import "./supportPage.scss";

function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ((prev) => (prev === index ? null : index));
  };

  const faqData = [
    {
      question: "Is ChangeX free to list products?",
      answer: "Yes, ChangeX is 100% free to list your products. There are absolutely no developer fees, hidden commissions, or listing surcharges. You keep 100% of your sales.",
    },
    {
      question: "How do I browse available items?",
      answer: "You can instantly browse items on our platform by visiting our marketplace list page. Click the button below to browse all available models, brands, and prices in real-time.",
      link: "/list",
      linkLabel: "View Marketplace",
    },
    {
      question: "How do I contact sellers directly?",
      answer: "Each single listing page contains a 'Send a Message' button. Clicking it instantly creates a private, real-time glass chat box where you can text the seller directly, ask questions, or negotiate deals.",
    },
  ];

  return (
    <div className="supportPage">
      <div className="wrapper">
        <section className="support-hero">
          <span className="badge">ChangeX Help Center</span>
          <h1>How Can We Help You Today?</h1>
          <p>Get in touch with our team, read frequently asked questions, or check out our upcoming service roadmap.</p>
        </section>

        <div className="support-layout">
          {/* Left Column: Form & Contact Details */}
          <div className="left-column">
            {/* Contact Details Grid */}
            <div className="contact-grid">
              <div className="contact-card">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3>Direct Email</h3>
                  <a href="mailto:nihaajahamed@gmail.com" className="contact-link">nihaajahamed@gmail.com</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3>WhatsApp & Phone</h3>
                  <a href="https://wa.me/94759896910" target="_blank" rel="noreferrer" className="contact-link">+94 75 989 6910</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3>Location</h3>
                  <span className="contact-text">Maruthamunai, Ampara, Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Interactive Portfolio Link Card */}
            <a 
              href="https://nihaaj-ahamed-portfolio3-0.vercel.app/" 
              target="_blank" 
              rel="noreferrer" 
              className="portfolio-card"
            >
              <div className="portfolio-content">
                <div className="sparkle">Dev Portfolio</div>
                <h3>Meet the Developer</h3>
                <p>Explore my other projects, technical details, and developer certifications on my interactive portfolio site.</p>
              </div>
              <div className="portfolio-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </a>

            {/* Future Roadmap & Live Chat Section */}
            <div className="roadmap-card">
              <div className="roadmap-header">
                <h3>Live Support & Ticketing</h3>
                <span className="roadmap-pill">In Development</span>
              </div>
              <p>We are actively building automated ticketing and instant live chat modules to connect you to our support staff within 30 seconds.</p>
            </div>
          </div>

          {/* Right Column: Support Form & FAQ */}
          <div className="right-column">
            {/* Contact Form */}
            <div className="form-container">
              <h2>Send us a Message</h2>
              <p>Have any questions or bug reports? Drop us a line directly.</p>
              {formSubmitted ? (
                <div className="form-success">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Message Sent Successfully! We will respond shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="John Doe" 
                        required 
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="john@example.com" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      placeholder="Feedback / Support Inquiry" 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={5} 
                      placeholder="Tell us what you need help with..." 
                      required 
                    />
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              )}
            </div>

            {/* Accordion FAQ Section */}
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="accordion">
                {faqData.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`accordion-item ${expandedFAQ === index ? "active" : ""}`}
                  >
                    <button 
                      className="accordion-header" 
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={expandedFAQ === index}
                    >
                      <span>{faq.question}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="accordion-content">
                      <div className="content-inner">
                        <p>{faq.answer}</p>
                        {faq.link && (
                          <Link to={faq.link} className="faq-action-link">
                            {faq.linkLabel} &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
