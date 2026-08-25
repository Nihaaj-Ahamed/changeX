import "./aboutPage.scss";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="wrapper">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <span className="badge">About ChangeX</span>
            <h1>The Future of Direct Peer-to-Peer Trading</h1>
            <p>
              We are just getting started. ChangeX is a rapidly growing, next-generation community-centric marketplace built exclusively for buyers and sellers. By cutting out the middleman, we make transactions faster, safer, and completely free.
            </p>
            <div className="hero-actions">
              <Link to="/list" className="cta-primary">
                Explore Listings
              </Link>
            </div>
          </div>
          <div className="hero-glow"></div>
        </section>

        {/* Live Growth Metrics Section */}
        <section className="metrics">
          <div className="section-header">
            <h2>Our Growing Platform</h2>
            <p>Direct connections, zero overhead, absolute transparency.</p>
          </div>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">0%</div>
              <h3>Developer Fees</h3>
              <p>No developer taxes, no listing fees, and absolutely zero hidden commissions. Keep 100% of your sale.</p>
            </div>
            <div className="metric-card">
              <div className="metric-icon">P2P</div>
              <h3>100% Direct Dealing</h3>
              <p>Communicate, negotiate, and transact directly with counterparties. Safe, fast, and personal.</p>
            </div>
            <div className="metric-card animate-glow">
              <div className="metric-icon">Live</div>
              <h3>Rapid Community Growth</h3>
              <p>Thousands of users listing items daily. Connecting local buyers and sellers instantly.</p>
            </div>
          </div>
        </section>

        {/* Key Advantages Grid */}
        <section className="advantages">
          <div className="section-header">
            <h2>Why Choose ChangeX?</h2>
          </div>
          <div className="advantages-grid">
            <div className="advantage-card">
              <div className="adv-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Zero Hidden Charges</h3>
              <p>Forget listing fees, sales cuts, and processing surcharges. We offer a completely transparent environment.</p>
            </div>

            <div className="advantage-card">
              <div className="adv-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Verified & Fast Listings</h3>
              <p>Create lists and upload details in minutes. Our interface is optimized for speed, so you get responses instantly.</p>
            </div>

            <div className="advantage-card">
              <div className="adv-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3>User-First Privacy</h3>
              <p>Your details are secure. Take control of your listings, communicate safely, and experience elite direct support.</p>
            </div>
          </div>
        </section>

        {/* Join Us CTA Banner */}
        <section className="cta-banner">
          <div className="banner-content">
            <h2>Ready to Join the Revolution?</h2>
            <p>Start listing your devices or search from thousands of verified listings in your area with zero fees.</p>
            <div className="banner-actions">
              <Link to="/list" className="cta-primary">
                View Marketplace
              </Link>
              <Link to="/add" className="cta-secondary">
                List a Device
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
