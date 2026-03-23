import { Link } from 'react-router-dom';
import { Calendar, Users, Ticket, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Amazing Events Across India</h1>
          <p>Book tickets for cultural festivals, music concerts, food festivals, and more from Kashmir to Kanyakumari!</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started
              <ArrowRight size={20} />
            </Link>
            <Link to="/user" className="btn btn-secondary btn-lg">
              Browse Events
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800" alt="Events" />
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Calendar size={40} color="#ff6b35" />
              <h3>Wide Range of Events</h3>
              <p>From cultural festivals to modern concerts, find events that match your interests</p>
            </div>
            <div className="feature-card">
              <Ticket size={40} color="#004e89" />
              <h3>Easy Booking Process</h3>
              <p>Book your tickets in just a few clicks with our seamless booking system</p>
            </div>
            <div className="feature-card">
              <Users size={40} color="#2ecc71" />
              <h3>Free & Paid Events</h3>
              <p>Choose from free community events and premium experiences</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Experience Amazing Events?</h2>
          <p>Join thousands of people discovering and booking events across Andhra Pradesh</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create Free Account
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* Organizer Section */}
      <section className="organizer-cta">
        <div className="container">
          <h2>Are You an Event Organizer?</h2>
          <p>Create and manage events, reach thousands of attendees across India</p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Become an Organizer
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
