# Event Ticket Booking System - Test Guide

## 🎯 Application Status: ✅ WORKING

**Access URL:** http://localhost:5173

---

## 📋 Step-by-Step Testing Instructions

### 1️⃣ **First Time Setup (Signup as New User)**

**Option A: Sign Up as Regular User**
1. Click "Get Started" or go to `/signup`
2. Fill in the form:
   - Name: Your name
   - Email: yourname@example.com
   - Password: any password (min 6 chars)
   - Confirm Password: same as above
   - Role: **User (Attend Events)**
3. Click "Create Account"
4. You'll be redirected to login page
5. Login with your credentials

**Option B: Quick Test with Admin Account**
1. Go to `/login`
2. Use demo credentials:
   - Email: `admin@eventbooking.com`
   - Password: `admin123`
3. Click "Login"

---

### 2️⃣ **Testing User Module (Browse & Book Events)**

Once logged in as a User:

1. **Navigate to User Dashboard**
   - Click "Dashboard" in navbar OR
   - Go directly to: http://localhost:5173/user

2. **Browse Events**
   - You should see **12 pre-loaded Andhra Pradesh events**
   - Events include: Visakha Utsav, Tirumala Brahmotsavam, Kuchipudi Dance Festival, etc.

3. **Use Filters**
   - 🔍 **Search Bar**: Type event names like "Visakha", "Tirupati", "Food"
   - 📂 **Category Filter**: Select from dropdown (Music, Food, Cultural, etc.)
   - ✅ **Free Events Toggle**: Check "Show Free Events Only" to see only FREE events

4. **Book Tickets**
   - Click "Book Now" on any available event
   - Select number of tickets using +/- buttons
   - View price breakdown:
     - Base ticket price
     - Convenience fee (₹20 per ticket)
     - GST (18%)
     - **Total amount**
   - Click "Proceed to Payment"

5. **Payment Process**
   - Choose payment method:
     - UPI / GPay / PhonePe
     - Credit / Debit Card
     - Net Banking
     - Wallet
   - Fill dummy card details (not validated in demo)
   - Click "Pay ₹[amount]"

6. **Confirmation**
   - Success screen appears with:
     - ✅ Green checkmark
     - Booking ID
     - Event name
     - Number of tickets
     - Total paid
   - Click "Book More Events" to continue

---

### 3️⃣ **Testing Organizer Module (Create Events)**

**Sign Up as Organizer:**
1. Logout from current account
2. Go to `/signup`
3. Create account with role: **Organizer (Create Events)**
4. Login with new credentials

**As Organizer:**
1. Navigate to `/organizer`
2. Click "Create Event"
3. Fill event details:
   - Title, Description
   - Date, Time
   - Venue, City
   - Category (dropdown)
   - Total Tickets
   - Price OR check "This is a Free Event"
   - Image URL (use Unsplash or any image link)
4. Click "Create Event"
5. Event appears in dashboard
6. Use Edit/Delete buttons to manage events

---

### 4️⃣ **Testing Admin Module (Full Control)**

**Login as Admin:**
- Email: `admin@eventbooking.com`
- Password: `admin123`

**Admin Features:**
1. Navigate to `/admin`
2. View dashboard statistics:
   - Total Events
   - Total Users
   - Total Bookings
   - Total Revenue
3. Switch between tabs:
   - **All Events**: CRUD operations
   - **Users**: View registered users
   - **Bookings**: Monitor all bookings
4. Add/Edit/Delete events
5. Manage entire system

---

## 🎫 **Pre-loaded FREE Events** (Perfect for Middle-Class Families)

These events are **100% FREE** - no payment required:

1. ✅ **Visakha Utsav** - Visakhapatnam (Cultural)
2. ✅ **Vijayadashami Celebrations** - Vijayawada (Festival)
3. ✅ **Andhra Food Festival** - Guntur (Food)
4. ✅ **Araku Valley Music Fest** - Araku (Music)
5. ✅ **Ponduru Khadi Mela** - Srikakulam (Exhibition)
6. ✅ **Ongole Cattle Show** - Ongole (Agriculture)

---

## 🎫 **Paid Events** (With Payment Gateway)

1. 💰 **Tirumala Brahmotsavam** - ₹500
2. 💰 **Kuchipudi Dance Festival** - ₹800
3. 💰 **Konaseema Boat Festival** - ₹1200
4. 💰 **Lambasingi Winter Carnival** - ₹300
5. 💰 **Nellore Sea Food Festival** - ₹600
6. 💰 **Kurnool Flower Show** - ₹50

---

## 🔧 **Troubleshooting**

### Issue: User module not loading
**Solution:** 
1. Clear browser cache (Ctrl + Shift + Delete)
2. Hard refresh (Ctrl + F5)
3. Check browser console (F12) for errors
4. Ensure you're logged in with correct role

### Issue: Can't book tickets
**Solution:**
1. Check if event has available tickets
2. Ensure you selected ticket count
3. Try with free event first (no payment needed)

### Issue: Payment not working
**Note:** This is a demo app - payment is simulated. Just fill any dummy details and click pay.

### Issue: No events showing
**Solution:**
1. Reset filters (uncheck "Free Events Only", set category to "All")
2. Clear search term
3. Refresh page

---

## 🌐 **Quick Access Links**

- **Home Page**: http://localhost:5173/
- **Login**: http://localhost:5173/login
- **Signup**: http://localhost:5173/signup
- **User Dashboard**: http://localhost:5173/user
- **Organizer Dashboard**: http://localhost:5173/organizer
- **Admin Dashboard**: http://localhost:5173/admin

---

## ✨ **Key Features Implemented**

✅ Responsive design (mobile & desktop)
✅ Beautiful animations and transitions
✅ Role-based access control
✅ Advanced filtering and search
✅ Real-time ticket availability
✅ Payment gateway simulation
✅ Free events option
✅ Booking confirmation
✅ Local storage persistence
✅ 12+ pre-loaded Andhra Pradesh events

---

## 📱 **Test on Mobile**

The app is fully responsive! Open http://localhost:5173 on your phone (if on same network) or use browser DevTools mobile view.

---

## 🎉 **Ready to Use!**

Your Event Ticket Booking System is **fully functional** and ready to browse events!

Start by clicking the preview button above or visit: **http://localhost:5173**
