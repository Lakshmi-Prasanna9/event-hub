import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, Calendar, MapPin, Ticket, CreditCard, CheckCircle, Users } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const { events, bookTicket, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const categories = ['All', 'Cultural', 'Music', 'Dance', 'Food', 'Sports', 'Religious', 'Festival', 'Exhibition', 'Adventure', 'Agriculture'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesFree = showFreeOnly ? event.isFree : true;
    
    return matchesSearch && matchesCategory && matchesFree;
  });

  const handleBookNow = (event) => {
    setSelectedEvent(event);
    setTicketCount(1);
    setShowPayment(false);
    setBookingConfirmed(false);
  };

  const handleProceedToPayment = () => {
    if (ticketCount > selectedEvent.availableTickets) {
      alert(`Only ${selectedEvent.availableTickets} tickets available!`);
      return;
    }
    setShowPayment(true);
  };

  const handleConfirmBooking = () => {
    // Validate payment details based on selected method
    if (paymentMethod === 'upi' && !paymentDetails.upiId) {
      alert('Please enter your UPI ID to complete payment');
      return;
    }
    
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.cvv || !paymentDetails.expiry || !paymentDetails.cardName) {
        alert('Please fill in all card details to complete payment');
        return;
      }
      if (paymentDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return;
      }
      if (paymentDetails.cvv.length !== 3) {
        alert('Please enter a valid 3-digit CVV');
        return;
      }
    }
    
    const totalPrice = selectedEvent.isFree ? 0 : selectedEvent.price * ticketCount;
    
    const result = bookTicket({
      userId: user.id,
      userName: user.name,
      eventId: selectedEvent.id,
      eventName: selectedEvent.title,
      tickets: ticketCount,
      totalPrice,
      userEmail: user.email,
      paymentMethod: paymentMethod,
      paymentId: 'PAY' + Date.now()
    });

    if (result.success) {
      setBookingDetails(result.booking);
      setBookingConfirmed(true);
      setShowPayment(false);
    }
  };

  const calculateTotal = () => {
    if (!selectedEvent) return 0;
    const basePrice = selectedEvent.isFree ? 0 : selectedEvent.price * ticketCount;
    const convenienceFee = selectedEvent.isFree ? 0 : 20 * ticketCount;
    const gst = selectedEvent.isFree ? 0 : Math.round(basePrice * 0.18);
    return basePrice + convenienceFee + gst;
  };

  return (
    <div className="user-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Discover Events</h1>
          <p>Find and book amazing events across Andhra Pradesh</p>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search events by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-options">
            <div className="filter-group">
              <Filter size={18} />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <label className="free-events-toggle">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
              />
              <span>Show Free Events Only</span>
            </label>
          </div>
        </div>

        <div className="events-grid-user">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card-user">
              <div className="event-image-container">
                <img src={event.image} alt={event.title} />
                {event.isFree && <div className="free-badge">FREE</div>}
              </div>
              
              <div className="event-details">
                <div className="event-category">{event.category}</div>
                <h3>{event.title}</h3>
                
                <div className="event-info">
                  <Calendar size={16} />
                  <span>{new Date(event.date).toLocaleDateString()} - {event.time}</span>
                </div>
                
                <div className="event-info">
                  <MapPin size={16} />
                  <span>{event.venue}, {event.city}</span>
                </div>
                
                <div className="event-info">
                  <Users size={16} />
                  <span>{event.organizer}</span>
                </div>

                <div className="event-footer">
                  <div className="event-price">
                    {event.isFree ? (
                      <span className="price-free">Free Entry</span>
                    ) : (
                      <>
                        <span className="price-label">From</span>
                        <span className="price-amount">₹{event.price}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="tickets-available">
                    <Ticket size={14} />
                    <span>{event.availableTickets} left</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => handleBookNow(event)}
                  disabled={event.availableTickets === 0}
                >
                  {event.availableTickets === 0 ? 'Sold Out' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Booking Modal */}
        {selectedEvent && !showPayment && !bookingConfirmed && (
          <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
            <div className="modal-content booking-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Book Tickets</h2>
                <button className="btn-close" onClick={() => setSelectedEvent(null)}>×</button>
              </div>

              <div className="booking-details">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="booking-event-image" />
                <div className="booking-event-info">
                  <h3>{selectedEvent.title}</h3>
                  <p className="event-date-time">
                    <Calendar size={16} />
                    {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                  </p>
                  <p className="event-venue-detail">
                    <MapPin size={16} />
                    {selectedEvent.venue}, {selectedEvent.city}
                  </p>
                </div>
              </div>

              <div className="ticket-selection">
                <label>Select Number of Tickets</label>
                <div className="ticket-counter">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    disabled={ticketCount <= 1}
                  >
                    -
                  </button>
                  <span className="ticket-count">{ticketCount}</span>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setTicketCount(Math.min(selectedEvent.availableTickets, ticketCount + 1))}
                    disabled={ticketCount >= selectedEvent.availableTickets}
                  >
                    +
                  </button>
                </div>
                <p className="max-tickets">Maximum {selectedEvent.availableTickets} tickets available</p>
              </div>

              <div className="price-breakdown">
                <h4>Price Details</h4>
                <div className="price-row">
                  <span>Ticket Price ({ticketCount} x ₹{selectedEvent.isFree ? 0 : selectedEvent.price})</span>
                  <span>₹{selectedEvent.isFree ? 0 : selectedEvent.price * ticketCount}</span>
                </div>
                {!selectedEvent.isFree && (
                  <>
                    <div className="price-row">
                      <span>Convenience Fee</span>
                      <span>₹{20 * ticketCount}</span>
                    </div>
                    <div className="price-row">
                      <span>GST (18%)</span>
                      <span>₹{Math.round(selectedEvent.price * ticketCount * 0.18)}</span>
                    </div>
                  </>
                )}
                <div className="price-row total">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setSelectedEvent(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleProceedToPayment}>
                  Proceed to Payment
                  <CreditCard size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPayment && (
          <div className="modal-overlay" onClick={() => setShowPayment(false)}>
            <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Payment Details</h2>
                <button className="btn-close" onClick={() => setShowPayment(false)}>×</button>
              </div>

              <div className="payment-summary">
                <h4>Order Summary</h4>
                <p>Event: <strong>{selectedEvent.title}</strong></p>
                <p>Tickets: <strong>{ticketCount}</strong></p>
                <p className="total-amount">Total: <strong>₹{calculateTotal()}</strong></p>
              </div>

              <div className="payment-methods">
                <h4>Select Payment Method</h4>
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="upi" 
                    name="payment" 
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <label htmlFor="upi">UPI / GPay / PhonePe</label>
                </div>
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="card" 
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <label htmlFor="card">Credit / Debit Card</label>
                </div>
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="netbanking" 
                    name="payment"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                  />
                  <label htmlFor="netbanking">Net Banking</label>
                </div>
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="wallet" 
                    name="payment"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                  />
                  <label htmlFor="wallet">Wallet</label>
                </div>
              </div>

              {/* UPI Payment Form */}
              {paymentMethod === 'upi' && (
                <div className="payment-form">
                  <div className="input-group">
                    <label>UPI ID <span style={{color: '#ff6b35'}}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="example@oksbi"
                      value={paymentDetails.upiId}
                      onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
                      required
                    />
                    <small style={{color: '#7f8c8d', fontSize: '12px'}}>Enter your UPI ID (e.g., mobile@oksbi, gpay, phonepe)</small>
                  </div>
                </div>
              )}

              {/* Card Payment Form */}
              {paymentMethod === 'card' && (
                <div className="payment-form">
                  <div className="input-group">
                    <label>Name on Card <span style={{color: '#ff6b35'}}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter card holder name"
                      value={paymentDetails.cardName}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Card Number <span style={{color: '#ff6b35'}}>*</span></label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456" 
                      maxLength="19"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label>Expiry <span style={{color: '#ff6b35'}}>*</span></label>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        maxLength="5"
                        value={paymentDetails.expiry}
                        onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>CVV <span style={{color: '#ff6b35'}}>*</span></label>
                      <input 
                        type="password" 
                        placeholder="123" 
                        maxLength="3"
                        value={paymentDetails.cvv}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking / Wallet Info */}
              {(paymentMethod === 'netbanking' || paymentMethod === 'wallet') && (
                <div className="payment-form">
                  <div className="alert alert-info" style={{
                    background: '#e3f2fd',
                    border: '1px solid #2196f3',
                    color: '#1976d2',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    <strong>ℹ️ You will be redirected to secure payment gateway</strong>
                    <p style={{margin: '8px 0 0 0', fontSize: '14px'}}>
                      For Net Banking: Select your bank and complete payment<br/>
                      For Wallet: Choose from Paytm, FreeCharge, or PhonePe
                    </p>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowPayment(false)}>
                  Back
                </button>
                <button className="btn btn-success" onClick={handleConfirmBooking}>
                  <CreditCard size={18} />
                  Pay ₹{calculateTotal()}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking Confirmation */}
        {bookingConfirmed && bookingDetails && (
          <div className="modal-overlay" onClick={() => setBookingConfirmed(false)}>
            <div className="modal-content confirmation-modal" onClick={(e) => e.stopPropagation()}>
              <div className="success-icon">
                <CheckCircle size={80} color="#2ecc71" />
              </div>
              <h2>Booking Confirmed!</h2>
              <p>Your tickets have been booked successfully</p>
              
              <div className="confirmation-details">
                <div className="detail-row">
                  <span>Booking ID:</span>
                  <strong>#{bookingDetails.id}</strong>
                </div>
                <div className="detail-row">
                  <span>Event:</span>
                  <strong>{bookingDetails.eventName}</strong>
                </div>
                <div className="detail-row">
                  <span>Tickets:</span>
                  <strong>{bookingDetails.tickets}</strong>
                </div>
                <div className="detail-row">
                  <span>Total Paid:</span>
                  <strong>₹{bookingDetails.totalPrice}</strong>
                </div>
              </div>

              <button className="btn btn-primary" onClick={() => setBookingConfirmed(false)}>
                Book More Events
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
