import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2, Calendar, Users, DollarSign } from 'lucide-react';
import './Dashboard.css';

const OrganizerDashboard = () => {
  const { events, user, addEvent, updateEvent, deleteEvent, bookings } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    city: '',
    state: '',
    category: '',
    price: '',
    isFree: false,
    image: '',
    totalTickets: ''
  });

  // Filter events created by this organizer (in real app, would check organizer ID)
  const organizerEvents = events; // For now, showing all events as organizer can manage all

  const myBookings = bookings.filter(b => 
    organizerEvents.find(e => e.id === b.eventId)
  );

  const stats = [
    { icon: Calendar, label: 'My Events', value: organizerEvents.length, color: '#ff6b35' },
    { icon: Users, label: 'Total Attendees', value: myBookings.reduce((sum, b) => sum + b.tickets, 0), color: '#004e89' },
    { icon: DollarSign, label: 'Total Revenue', value: `₹${myBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)}`, color: '#f39c12' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      price: formData.isFree ? 0 : parseFloat(formData.price),
      totalTickets: parseInt(formData.totalTickets),
      organizer: user.name
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }

    resetForm();
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      city: event.city,
      state: event.state || '',
      category: event.category,
      price: event.price.toString(),
      isFree: event.isFree,
      image: event.image,
      totalTickets: event.totalTickets.toString()
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      city: '',
      state: '',
      category: '',
      price: '',
      isFree: false,
      image: '',
      totalTickets: ''
    });
    setEditingEvent(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Organizer Dashboard</h1>
          <p>Manage your events and track bookings</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                <stat.icon size={32} color={stat.color} />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>My Events</h2>
            <button className="btn btn-primary" onClick={openAddModal}>
              <Plus size={20} />
              Create Event
            </button>
          </div>

          <div className="events-grid">
            {organizerEvents.map((event) => (
              <div key={event.id} className="event-card-admin">
                <img src={event.image} alt={event.title} />
                <div className="event-card-body">
                  <div className="event-badge">{event.isFree ? 'FREE' : `₹${event.price}`}</div>
                  <h3>{event.title}</h3>
                  <p className="event-date">
                    <Calendar size={16} />
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <p className="event-venue">{event.venue}, {event.city}</p>
                  <p className="event-tickets">
                    Booked: {event.totalTickets - event.availableTickets}/{event.totalTickets}
                  </p>
                  <div className="event-actions">
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(event)}>
                      <Edit size={16} />
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(event.id)}>
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
                <button className="btn-close" onClick={() => setShowModal(false)}>×</button>
              </div>
              
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="input-group">
                  <label>Event Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Venue</label>
                    <input
                      type="text"
                      value={formData.venue}
                      onChange={(e) => setFormData({...formData, venue: e.target.value})}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>State</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Goa">Goa</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Assam">Assam</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="Haryana">Haryana</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Music">Music</option>
                      <option value="Dance">Dance</option>
                      <option value="Food">Food</option>
                      <option value="Sports">Sports</option>
                      <option value="Religious">Religious</option>
                      <option value="Festival">Festival</option>
                      <option value="Exhibition">Exhibition</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Agriculture">Agriculture</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Total Tickets</label>
                    <input
                      type="number"
                      value={formData.totalTickets}
                      onChange={(e) => setFormData({...formData, totalTickets: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      disabled={formData.isFree}
                      min="0"
                      step="50"
                    />
                  </div>

                  <div className="input-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.isFree}
                        onChange={(e) => setFormData({...formData, isFree: e.target.checked})}
                      />
                      This is a Free Event
                    </label>
                  </div>
                </div>

                <div className="input-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
