import { Calendar, Mail, Phone, MapPin, Github, Linkedin, Twitter, Heart, Users, Award } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const teamMembers = [
    {
      name: 'Yuva TPT',
      role: 'Lead Developer & Designer',
      email: 'yuva.tpt@example.com',
      github: 'https://github.com/yuvatpt',
      linkedin: 'https://linkedin.com/in/yuvatpt',
      image: 'https://ui-avatars.com/api/?name=Yuva+TPT&background=ff6b35&color=fff&size=128'
    },
    {
      name: 'Event Management Team',
      role: 'Event Coordinators',
      email: 'events@eventbooking.com',
      image: 'https://ui-avatars.com/api/?name=Event+Team&background=004e89&color=fff&size=128'
    }
  ];

  const organizers = [
    { name: 'AP Tourism', type: 'Government', events: '50+' },
    { name: 'Telangana Tourism', type: 'Government', events: '40+' },
    { name: 'Kerala Tourism', type: 'Government', events: '60+' },
    { name: 'Tamil Nadu Tourism', type: 'Government', events: '55+' },
    { name: 'Karnataka Tourism', type: 'Government', events: '45+' },
    { name: 'Rajasthan Tourism', type: 'Government', events: '70+' },
    { name: 'Maharashtra Tourism', type: 'Government', events: '65+' },
    { name: 'Gujarat Tourism', type: 'Government', events: '50+' },
    { name: 'Bollywood Live Events', type: 'Private', events: '25+' },
    { name: 'Sunburn Events', type: 'Private', events: '15+' },
    { name: 'TTD', type: 'Religious', events: '30+' },
    { name: 'SGPC', type: 'Religious', events: '35+' }
  ];

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Browse Events', url: '/user' },
    { name: 'Login', url: '/login' },
    { name: 'Signup', url: '/signup' }
  ];

  const categories = [
    'Cultural', 'Music', 'Dance', 'Food', 'Sports',
    'Religious', 'Festival', 'Exhibition', 'Adventure'
  ];

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="container footer-grid">
          
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Calendar size={36} color="#ff6b35" />
              <h2>EventHub India</h2>
            </div>
            <p className="footer-tagline">
              Discover and book amazing events across India. From cultural festivals to modern concerts, 
              experience the diversity of Indian celebrations from Kashmir to Kanyakumari.
            </p>
            <div className="footer-stats">
              <div className="stat-item">
                <Users size={24} color="#ff6b35" />
                <div>
                  <strong>10,000+</strong>
                  <span>Happy Users</span>
                </div>
              </div>
              <div className="stat-item">
                <Award size={24} color="#ff6b35" />
                <div>
                  <strong>50+</strong>
                  <span>Events Monthly</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
            
            <h3 className="categories-title">Popular Categories</h3>
            <div className="category-tags">
              {categories.map((cat, index) => (
                <span key={index} className="category-tag">{cat}</span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={20} color="#ff6b35" />
                <span>Kalikiri, Andhra Pradesh, India</span>
              </div>
              <div className="contact-item">
                <Mail size={20} color="#ff6b35" />
                <span>projectgroup7@gmail.com</span>
              </div>
              <div className="contact-item">
                <Phone size={20} color="#ff6b35" />
                <span>+91 8143100703</span>
              </div>
            </div>

            <h3 className="social-title">Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Team Members */}
          <div className="footer-section team-section">
            <h3>Our Team</h3>
            <div className="team-members">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <img src={member.image} alt={member.name} className="team-avatar" />
                  <div className="team-info">
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                    {member.email && <span className="team-email">{member.email}</span>}
                    <div className="team-social">
                      {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Organizers Section */}
      <div className="organizers-section">
        <div className="container">
          <h3>Our Partner Organizers</h3>
          <div className="organizers-grid">
            {organizers.map((org, index) => (
              <div key={index} className="organizer-card">
                <h4>{org.name}</h4>
                <span className={`organizer-type ${org.type.toLowerCase()}`}>{org.type}</span>
                <span className="organizer-events">{org.events} Events</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright-content">
            <p>
              &copy; {currentYear} <strong>Event Ticket Booking System</strong>. All rights reserved.
            </p>
            <p className="made-with">
              Made with <Heart size={16} color="#e74c3c" fill="#e74c3c" /> in India
            </p>
          </div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
