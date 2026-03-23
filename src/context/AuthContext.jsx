import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      return JSON.parse(savedEvents);
    }
    // All India Events - 25 diverse events
    return [
      // ANDHRA PRADESH & TELANGANA
      {
        id: 1,
        title: 'Visakha Utsav',
        description: 'Annual cultural festival of Visakhapatnam showcasing Andhra culture, arts, and cuisine.',
        date: '2026-04-15',
        time: '10:00 AM',
        venue: 'RK Beach, Visakhapatnam',
        city: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d5a49?w=800',
        organizer: 'AP Tourism',
        totalTickets: 1000,
        availableTickets: 850
      },
      {
        id: 2,
        title: 'Tirumala Brahmotsavam',
        description: 'Sacred temple festival with traditional rituals and processions.',
        date: '2026-05-20',
        time: '6:00 AM',
        venue: 'Tirumala Temple',
        city: 'Tirupati',
        state: 'Andhra Pradesh',
        category: 'Religious',
        price: 500,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'TTD',
        totalTickets: 500,
        availableTickets: 320
      },
      {
        id: 3,
        title: 'Bathukamma Festival',
        description: 'Vibrant floral festival celebrated by women of Telangana with traditional songs and dances.',
        date: '2026-10-05',
        time: '4:00 PM',
        venue: 'Tank Bund, Hyderabad',
        city: 'Hyderabad',
        state: 'Telangana',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1601121141461-6d6e371eeabe?w=800',
        organizer: 'Telangana Tourism',
        totalTickets: 1500,
        availableTickets: 1200
      },
      // TAMIL NADU
      {
        id: 4,
        title: 'Pongal Celebration',
        description: 'Traditional harvest festival of Tamil Nadu with jallikattu and rangoli competitions.',
        date: '2026-01-14',
        time: '7:00 AM',
        venue: 'Marina Beach, Chennai',
        city: 'Chennai',
        state: 'Tamil Nadu',
        category: 'Festival',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1596700095816-1e9a4c05e4d8?w=800',
        organizer: 'Tamil Nadu Tourism',
        totalTickets: 2000,
        availableTickets: 1650
      },
      {
        id: 5,
        title: 'Bharatanatyam Dance Festival',
        description: 'Classical Bharatanatyam performances by renowned artists at ancient temples.',
        date: '2026-02-15',
        time: '6:00 PM',
        venue: 'Brihadeeswarar Temple',
        city: 'Thanjavur',
        state: 'Tamil Nadu',
        category: 'Dance',
        price: 600,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800',
        organizer: 'Tamil Nadu Arts Council',
        totalTickets: 400,
        availableTickets: 280
      },
      // KERALA
      {
        id: 6,
        title: 'Onam Festival',
        description: 'Grand harvest festival with snake boat races, Kathakali performances, and Onam sadhya.',
        date: '2026-09-01',
        time: '9:00 AM',
        venue: 'Nehru Trophy Boat Race Course',
        city: 'Alappuzha',
        state: 'Kerala',
        category: 'Festival',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
        organizer: 'Kerala Tourism',
        totalTickets: 3000,
        availableTickets: 2400
      },
      {
        id: 7,
        title: 'Kathakali Performance',
        description: 'Traditional Kerala dance-drama with elaborate makeup and costumes.',
        date: '2026-03-20',
        time: '5:30 PM',
        venue: 'Kerala Kathakali Centre',
        city: 'Kochi',
        state: 'Kerala',
        category: 'Dance',
        price: 450,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1535905557558-afc487950a98?w=800',
        organizer: 'Kerala Cultural Academy',
        totalTickets: 250,
        availableTickets: 180
      },
      // KARNATAKA
      {
        id: 8,
        title: 'Mysuru Dasara',
        description: 'Magnificent 10-day festival celebrating Goddess Chamundeshwari with grand procession.',
        date: '2026-10-15',
        time: '3:00 PM',
        venue: 'Mysore Palace',
        city: 'Mysuru',
        state: 'Karnataka',
        category: 'Festival',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1605218427306-635ba2439af2?w=800',
        organizer: 'Karnataka Tourism',
        totalTickets: 5000,
        availableTickets: 4200
      },
      {
        id: 9,
        title: 'Yakshagana Night',
        description: 'Traditional coastal Karnataka theater art with music and dance.',
        date: '2026-04-10',
        time: '7:00 PM',
        venue: 'Gokarna Beach',
        city: 'Gokarna',
        state: 'Karnataka',
        category: 'Cultural',
        price: 300,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800',
        organizer: 'Coastal Arts Society',
        totalTickets: 350,
        availableTickets: 290
      },
      // MAHARASHTRA
      {
        id: 10,
        title: 'Ganesh Chaturthi Festival',
        description: 'Grand 10-day celebration of Lord Ganesha with immersion processions.',
        date: '2026-09-15',
        time: '8:00 AM',
        venue: 'Chowpatty Beach, Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1567591414240-e4487d7a5a75?w=800',
        organizer: 'Mumbai Ganesh Utsav Committee',
        totalTickets: 10000,
        availableTickets: 8500
      },
      {
        id: 11,
        title: 'Bollywood Music Concert',
        description: 'Live performance by Bollywood playback singers with orchestra.',
        date: '2026-05-25',
        time: '7:00 PM',
        venue: 'NSCI Dome, Worli',
        city: 'Mumbai',
        state: 'Maharashtra',
        category: 'Music',
        price: 1500,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1459749411177-287ce38e8b5f?w=800',
        organizer: 'Bollywood Live Events',
        totalTickets: 800,
        availableTickets: 520
      },
      // RAJASTHAN
      {
        id: 12,
        title: 'Pushkar Camel Fair',
        description: 'World-famous cattle fair with camel trading, cultural performances, and hot air balloon rides.',
        date: '2026-11-10',
        time: '6:00 AM',
        venue: 'Pushkar Grounds',
        city: 'Pushkar',
        state: 'Rajasthan',
        category: 'Exhibition',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
        organizer: 'Rajasthan Tourism',
        totalTickets: 2000,
        availableTickets: 1650
      },
      {
        id: 13,
        title: 'Rajasthani Folk Music Festival',
        description: 'Traditional Kalbelia and Manganiyar folk music under desert stars.',
        date: '2026-12-05',
        time: '6:30 PM',
        venue: 'Sam Sand Dunes',
        city: 'Jaisalmer',
        state: 'Rajasthan',
        category: 'Music',
        price: 800,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1545648640-9961091dad62?w=800',
        organizer: 'Desert Cultural Centre',
        totalTickets: 500,
        availableTickets: 380
      },
      // WEST BENGAL
      {
        id: 14,
        title: 'Durga Puja Celebrations',
        description: 'Grand 5-day festival celebrating Goddess Durga with artistic pandals and cultural programs.',
        date: '2026-10-20',
        time: '7:00 AM',
        venue: 'Salt Lake Stadium',
        city: 'Kolkata',
        state: 'West Bengal',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1570155395978-193dd71a5d8f?w=800',
        organizer: 'Kolkata Durga Puja Committee',
        totalTickets: 8000,
        availableTickets: 6800
      },
      {
        id: 15,
        title: 'Rabindra Sangeet Evening',
        description: 'Soulful Renditions of Tagore songs by classical vocalists.',
        date: '2026-06-08',
        time: '5:00 PM',
        venue: 'Rabindra Sadan',
        city: 'Kolkata',
        state: 'West Bengal',
        category: 'Music',
        price: 400,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?w=800',
        organizer: 'West Bengal Music Academy',
        totalTickets: 600,
        availableTickets: 450
      },
      // GUJARAT
      {
        id: 16,
        title: 'Navratri Garba Festival',
        description: 'Nine nights of energetic Garba and Dandiya Raas celebrations.',
        date: '2026-10-03',
        time: '8:00 PM',
        venue: 'Sabarmati Riverfront',
        city: 'Ahmedabad',
        state: 'Gujarat',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d5a49?w=800',
        organizer: 'Gujarat Tourism',
        totalTickets: 5000,
        availableTickets: 4100
      },
      {
        id: 17,
        title: 'Rann Utsav',
        description: 'Desert festival in white salt desert with cultural shows, adventure activities, and stargazing.',
        date: '2026-11-20',
        time: '4:00 PM',
        venue: 'Dhordo Village, Great Rann of Kutch',
        city: 'Kutch',
        state: 'Gujarat',
        category: 'Adventure',
        price: 1200,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
        organizer: 'Gujarat Tourism',
        totalTickets: 1000,
        availableTickets: 720
      },
      // GOA
      {
        id: 18,
        title: 'Sunburn Electronic Music Festival',
        description: 'Asias biggest electronic dance music festival with international DJs.',
        date: '2026-12-28',
        time: '2:00 PM',
        venue: 'Vagator Beach',
        city: 'Goa',
        state: 'Goa',
        category: 'Music',
        price: 2500,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1459749411177-287ce38e8b5f?w=800',
        organizer: 'Sunburn Events',
        totalTickets: 3000,
        availableTickets: 2100
      },
      {
        id: 19,
        title: 'Goan Carnival',
        description: 'Colorful Portuguese-era carnival with parades, floats, and street dancing.',
        date: '2026-02-21',
        time: '11:00 AM',
        venue: 'Panaji Streets',
        city: 'Panaji',
        state: 'Goa',
        category: 'Festival',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800',
        organizer: 'Goa Tourism',
        totalTickets: 2000,
        availableTickets: 1650
      },
      // DELHI
      {
        id: 20,
        title: 'India International Trade Fair',
        description: 'Massive exhibition featuring products from all Indian states and international pavilions.',
        date: '2026-11-14',
        time: '10:00 AM',
        venue: 'Pragati Maidan',
        city: 'New Delhi',
        state: 'Delhi',
        category: 'Exhibition',
        price: 50,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1605218427306-635ba2439af2?w=800',
        organizer: 'ITPO',
        totalTickets: 15000,
        availableTickets: 12000
      },
      {
        id: 21,
        title: 'Qutub Festival',
        description: 'Classical music and dance festival at the historic Qutub Minar complex.',
        date: '2026-11-25',
        time: '6:00 PM',
        venue: 'Qutub Minar Complex',
        city: 'New Delhi',
        state: 'Delhi',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
        organizer: 'Delhi Tourism',
        totalTickets: 1000,
        availableTickets: 850
      },
      // PUNJAB
      {
        id: 22,
        title: 'Baisakhi Harvest Festival',
        description: 'Traditional Punjabi harvest festival with bhangra, gidda, and langar.',
        date: '2026-04-13',
        time: '6:00 AM',
        venue: 'Golden Temple Complex',
        city: 'Amritsar',
        state: 'Punjab',
        category: 'Festival',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'SGPC',
        totalTickets: 5000,
        availableTickets: 4200
      },
      {
        id: 23,
        title: 'Punjabi Virsa Music Night',
        description: 'Live performance by famous Punjabi singers with traditional dhol beats.',
        date: '2026-07-15',
        time: '7:00 PM',
        venue: 'Ranjit Avenue Stadium',
        city: 'Amritsar',
        state: 'Punjab',
        category: 'Music',
        price: 700,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1459749411177-287ce38e8b5f?w=800',
        organizer: 'Punjab Arts Council',
        totalTickets: 1500,
        availableTickets: 1100
      },
      // HIMACHAL PRADESH
      {
        id: 24,
        title: 'Kullu Dussehra',
        description: 'Week-long international famous Dussehra celebration with deities procession.',
        date: '2026-10-18',
        time: '9:00 AM',
        venue: 'Dussehra Grounds',
        city: 'Kullu',
        state: 'Himachal Pradesh',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800',
        organizer: 'HP Tourism',
        totalTickets: 3000,
        availableTickets: 2500
      },
      {
        id: 25,
        title: 'Winter Carnival Manali',
        description: 'Snow sports, ice sculpture competition, and cultural performances in Himalayas.',
        date: '2026-01-10',
        time: '10:00 AM',
        venue: 'Mall Road, Manali',
        city: 'Manali',
        state: 'Himachal Pradesh',
        category: 'Sports',
        price: 500,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
        organizer: 'Manali Tourism',
        totalTickets: 800,
        availableTickets: 620
      },
      // MORE EVENTS FROM ACROSS INDIA (50+ Total)
      // UTTAR PRADESH
      {
        id: 26,
        title: 'Taj Mahotsav',
        description: 'Cultural festival celebrating Indian arts, crafts, and cuisine at the shadow of Taj Mahal.',
        date: '2026-02-18',
        time: '10:00 AM',
        venue: 'Shilpgram, Near Taj Mahal',
        city: 'Agra',
        state: 'Uttar Pradesh',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
        organizer: 'UP Tourism',
        totalTickets: 3000,
        availableTickets: 2500
      },
      {
        id: 27,
        title: 'Dev Deepawali Varanasi',
        description: 'Divine festival of lights on the banks of holy Ganges with millions of diyas.',
        date: '2026-11-25',
        time: '6:00 PM',
        venue: 'Dashashwamedh Ghat',
        city: 'Varanasi',
        state: 'Uttar Pradesh',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
        organizer: 'Varanasi Temple Committee',
        totalTickets: 5000,
        availableTickets: 4200
      },
      // MADHYA PRADESH
      {
        id: 28,
        title: 'Khajuraho Dance Festival',
        description: 'Classical dance performances against the backdrop of ancient UNESCO world heritage temples.',
        date: '2026-02-20',
        time: '6:30 PM',
        venue: 'Khajuraho Temples',
        city: 'Khajuraho',
        state: 'Madhya Pradesh',
        category: 'Dance',
        price: 600,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'MP Tourism',
        totalTickets: 500,
        availableTickets: 380
      },
      {
        id: 29,
        title: 'Tansen Music Festival',
        description: 'Classical music festival honoring the legendary musician Tansen.',
        date: '2026-12-15',
        time: '5:00 PM',
        venue: 'Tansen Tomb Complex',
        city: 'Gwalior',
        state: 'Madhya Pradesh',
        category: 'Music',
        price: 400,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?w=800',
        organizer: 'MP Arts Council',
        totalTickets: 700,
        availableTickets: 550
      },
      // ODHISHA
      {
        id: 30,
        title: 'Konark Dance Festival',
        description: 'Odissi and other classical dances performed at the iconic Sun Temple.',
        date: '2026-12-01',
        time: '6:00 PM',
        venue: 'Konark Sun Temple',
        city: 'Konark',
        state: 'Odisha',
        category: 'Dance',
        price: 500,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800',
        organizer: 'Odisha Tourism',
        totalTickets: 600,
        availableTickets: 480
      },
      {
        id: 31,
        title: 'Rath Yatra Puri',
        description: 'Grand chariot festival of Lord Jagannath with millions of devotees.',
        date: '2026-07-07',
        time: '8:00 AM',
        venue: 'Jagannath Temple Road',
        city: 'Puri',
        state: 'Odisha',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'Puri Temple Committee',
        totalTickets: 10000,
        availableTickets: 8500
      },
      // ASSAM & NORTHEAST
      {
        id: 32,
        title: 'Bihu Festival',
        description: 'Traditional Assamese harvest festival with Bihu dance and music.',
        date: '2026-04-14',
        time: '7:00 AM',
        venue: 'Saraswati Kshetra',
        city: 'Guwahati',
        state: 'Assam',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d5a49?w=800',
        organizer: 'Assam Tourism',
        totalTickets: 2000,
        availableTickets: 1650
      },
      {
        id: 33,
        title: 'Hornbill Festival',
        description: 'Festival of festivals showcasing Naga tribal culture and traditions.',
        date: '2026-12-01',
        time: '10:00 AM',
        venue: 'Kisama Heritage Village',
        city: 'Kohima',
        state: 'Nagaland',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800',
        organizer: 'Nagaland Tourism',
        totalTickets: 1500,
        availableTickets: 1200
      },
      // JAMMU & KASHMIR
      {
        id: 34,
        title: 'Tulip Festival',
        description: 'Asias largest tulip garden blooms with millions of colorful flowers.',
        date: '2026-04-01',
        time: '9:00 AM',
        venue: 'Indira Gandhi Memorial Tulip Garden',
        city: 'Srinagar',
        state: 'Jammu and Kashmir',
        category: 'Exhibition',
        price: 50,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1490750967868-bcdf92dd213e?w=800',
        organizer: 'J&K Tourism',
        totalTickets: 5000,
        availableTickets: 4200
      },
      {
        id: 35,
        title: 'Hemis Festival',
        description: 'Buddhist monastery festival with masked Cham dances and rituals.',
        date: '2026-07-15',
        time: '6:00 AM',
        venue: 'Hemis Monastery',
        city: 'Leh',
        state: 'Ladakh',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'Hemis Monastery',
        totalTickets: 800,
        availableTickets: 650
      },
      // CHHATTISGARH
      {
        id: 36,
        title: 'Rajim Kumbh Mela',
        description: 'Sacred Hindu pilgrimage with holy dip and spiritual discourses.',
        date: '2026-02-10',
        time: '5:00 AM',
        venue: 'Rajim Sangam',
        city: 'Rajim',
        state: 'Chhattisgarh',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'CG Tourism',
        totalTickets: 8000,
        availableTickets: 6800
      },
      // JHARKHAND
      {
        id: 37,
        title: 'Sarhul Festival',
        description: 'Tribal festival celebrating nature worship with traditional dances.',
        date: '2026-04-20',
        time: '8:00 AM',
        venue: 'Sarna Sthal',
        city: 'Ranchi',
        state: 'Jharkhand',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d5a49?w=800',
        organizer: 'Jharkhand Tourism',
        totalTickets: 1500,
        availableTickets: 1250
      },
      // UTTARAKHAND
      {
        id: 38,
        title: 'Kumbh Mela Haridwar',
        description: 'Largest human gathering on Earth for sacred bath at Ganges.',
        date: '2027-04-10',
        time: '4:00 AM',
        venue: 'Har Ki Pauri',
        city: 'Haridwar',
        state: 'Uttarakhand',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'Uttarakhand Tourism',
        totalTickets: 50000,
        availableTickets: 45000
      },
      {
        id: 39,
        title: 'Nanda Devi Mela',
        description: 'Ancient fair dedicated to Goddess Nanda Devi with cultural programs.',
        date: '2026-09-05',
        time: '7:00 AM',
        venue: 'Almora Ground',
        city: 'Almora',
        state: 'Uttarakhand',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800',
        organizer: 'Almora Temple Trust',
        totalTickets: 2000,
        availableTickets: 1700
      },
      // HARYANA
      {
        id: 40,
        title: 'Surajkund Crafts Mela',
        description: 'International crafts fair showcasing artisans from across India and world.',
        date: '2026-02-01',
        time: '10:00 AM',
        venue: 'Surajkund Lake',
        city: 'Faridabad',
        state: 'Haryana',
        category: 'Exhibition',
        price: 100,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1605218427306-635ba2439af2?w=800',
        organizer: 'Haryana Tourism',
        totalTickets: 10000,
        availableTickets: 8500
      },
      // BIHAR
      {
        id: 41,
        title: 'Sonepur Cattle Fair',
        description: 'Asias largest cattle fair with trading and cultural events.',
        date: '2026-11-20',
        time: '6:00 AM',
        venue: 'Gandak River Banks',
        city: 'Sonepur',
        state: 'Bihar',
        category: 'Agriculture',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1545648640-9961091dad62?w=800',
        organizer: 'Bihar Tourism',
        totalTickets: 5000,
        availableTickets: 4300
      },
      // RAJASTHAN (Additional)
      {
        id: 42,
        title: 'Desert Storm Festival',
        description: 'Adventure sports, music, and camping in Thar desert.',
        date: '2026-01-25',
        time: '3:00 PM',
        venue: 'Sam Sand Dunes',
        city: 'Jaisalmer',
        state: 'Rajasthan',
        category: 'Adventure',
        price: 1500,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
        organizer: 'Desert Adventures',
        totalTickets: 500,
        availableTickets: 380
      },
      // MAHARASHTRA (Additional)
      {
        id: 43,
        title: 'Ellora Ajanta Festival',
        description: 'Classical music and dance at UNESCO cave temples.',
        date: '2026-03-01',
        time: '6:00 PM',
        venue: 'Ellora Caves',
        city: 'Aurangabad',
        state: 'Maharashtra',
        category: 'Cultural',
        price: 700,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'Maharashtra Arts Council',
        totalTickets: 400,
        availableTickets: 320
      },
      // KARNATAKA (Additional)
      {
        id: 44,
        title: 'Hampi Utsav',
        description: 'Cultural festival at ancient Vijayanagara ruins with music and dance.',
        date: '2026-11-02',
        time: '5:00 PM',
        venue: 'Hampi Ruins',
        city: 'Hampi',
        state: 'Karnataka',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
        organizer: 'Karnataka Tourism',
        totalTickets: 2000,
        availableTickets: 1650
      },
      // TELANGANA (Additional)
      {
        id: 45,
        title: 'Warangal Kakatiya Festival',
        description: 'Celebrating Kakatiya dynasty heritage with cultural programs.',
        date: '2026-02-15',
        time: '4:00 PM',
        venue: 'Warangal Fort',
        city: 'Warangal',
        state: 'Telangana',
        category: 'Cultural',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d5a49?w=800',
        organizer: 'Telangana Tourism',
        totalTickets: 1500,
        availableTickets: 1280
      },
      // TAMIL NADU (Additional)
      {
        id: 46,
        title: 'Madurai Meenakshi Thirukalyanam',
        description: 'Divine wedding ceremony of Goddess Meenakshi with grand celebrations.',
        date: '2026-04-28',
        time: '6:00 AM',
        venue: 'Meenakshi Temple',
        city: 'Madurai',
        state: 'Tamil Nadu',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'Madurai Temple Trust',
        totalTickets: 8000,
        availableTickets: 6800
      },
      // KERALA (Additional)
      {
        id: 47,
        title: 'Thrissur Pooram',
        description: 'Spectacular temple festival with decorated elephants and fireworks.',
        date: '2026-05-01',
        time: '7:00 AM',
        venue: 'Vadakkunnathan Temple',
        city: 'Thrissur',
        state: 'Kerala',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?w=800',
        organizer: 'Thrissur Temple Committee',
        totalTickets: 10000,
        availableTickets: 8500
      },
      // ANDHRA PRADESH (Additional)
      {
        id: 48,
        title: 'Amaravathi Buddhist Festival',
        description: 'Celebrating Buddhist heritage with prayers and cultural events.',
        date: '2026-01-15',
        time: '9:00 AM',
        venue: 'Amaravathi Stupa',
        city: 'Amaravathi',
        state: 'Andhra Pradesh',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'AP Buddhism Society',
        totalTickets: 2000,
        availableTickets: 1700
      },
      // GOA (Additional)
      {
        id: 49,
        title: 'Goa Spice Festival',
        description: 'Celebration of Goan spices, cuisine, and farming traditions.',
        date: '2026-10-10',
        time: '11:00 AM',
        venue: 'Farmers Field',
        city: 'Ponda',
        state: 'Goa',
        category: 'Food',
        price: 300,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        organizer: 'Goa Agriculture Dept',
        totalTickets: 1000,
        availableTickets: 820
      },
      // DELHI (Additional)
      {
        id: 50,
        title: 'Literature Live Delhi',
        description: 'Meet renowned authors, poets, and literary personalities.',
        date: '2026-12-08',
        time: '10:00 AM',
        venue: 'India Habitat Centre',
        city: 'New Delhi',
        state: 'Delhi',
        category: 'Exhibition',
        price: 500,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1465847899078-b413929f7120?w=800',
        organizer: 'Delhi Literary Society',
        totalTickets: 600,
        availableTickets: 480
      },
      // PUNJAB (Additional)
      {
        id: 51,
        title: 'Hola Mohalla',
        description: 'Sikh warrior tradition display with martial arts and processions.',
        date: '2026-03-14',
        time: '6:00 AM',
        venue: 'Anandpur Sahib',
        city: 'Anandpur Sahib',
        state: 'Punjab',
        category: 'Religious',
        price: 0,
        isFree: true,
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
        organizer: 'SGPC',
        totalTickets: 6000,
        availableTickets: 5200
      },
      // GUJARAT (Additional)
      {
        id: 52,
        title: 'Modhera Dance Festival',
        description: 'Classical dance performances at ancient Sun Temple.',
        date: '2026-01-20',
        time: '6:30 PM',
        venue: 'Modhera Sun Temple',
        city: 'Modhera',
        state: 'Gujarat',
        category: 'Dance',
        price: 400,
        isFree: false,
        image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800',
        organizer: 'Gujarat Arts Council',
        totalTickets: 500,
        availableTickets: 420
      }
    ];
  });

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signup = (email, password, name, role) => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name,
      role,
      createdAt: new Date().toISOString()
    };

    setUsers([...users, newUser]);
    return { success: true, message: 'Registration successful! Please login.' };
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      // Check for default admin
      if (email === 'admin@eventbooking.com' && password === 'admin123') {
        const adminUser = {
          id: 1,
          email: email,
          name: 'Admin',
          role: 'admin'
        };
        setUser(adminUser);
        return { success: true, user: adminUser, message: 'Login successful!' };
      }
      return { success: false, message: 'Invalid credentials' };
    }

    const userData = { ...foundUser };
    delete userData.password;
    setUser(userData);
    return { success: true, user: userData, message: 'Login successful!' };
  };

  const logout = () => {
    setUser(null);
  };

  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      totalTickets: eventData.totalTickets || 100,
      availableTickets: eventData.totalTickets || 100
    };
    setEvents([newEvent, ...events]);
    return { success: true, message: 'Event added successfully!' };
  };

  const updateEvent = (id, updatedData) => {
    const updatedEvents = events.map(event => 
      event.id === id ? { ...event, ...updatedData } : event
    );
    setEvents(updatedEvents);
    return { success: true, message: 'Event updated successfully!' };
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    return { success: true, message: 'Event deleted successfully!' };
  };

  const bookTicket = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now(),
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      emailSent: false
    };
    
    // Update available tickets
    const updatedEvents = events.map(event => {
      if (event.id === bookingData.eventId) {
        return {
          ...event,
          availableTickets: event.availableTickets - bookingData.tickets
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    setBookings([...bookings, newBooking]);
    
    // Send email confirmation
    sendBookingEmail(newBooking);
    
    return { success: true, message: 'Ticket booked successfully!', booking: newBooking };
  };

  // Email simulation function
  const sendBookingEmail = (booking) => {
    // Simulate sending email - in production, this would call a backend API
    console.log('=== BOOKING CONFIRMATION EMAIL ===');
    console.log(`To: ${booking.userEmail}`);
    console.log(`Subject: Booking Confirmation - ${booking.eventName}`);
    console.log(`Dear ${booking.userName},`);
    console.log('');
    console.log(`Your ticket has been confirmed for ${booking.eventName}!`);
    console.log(`Booking ID: #${booking.id}`);
    console.log(`Number of Tickets: ${booking.tickets}`);
    console.log(`Total Amount Paid: ₹${booking.totalPrice}`);
    console.log('');
    console.log('A confirmation email has been sent to your registered email address.');
    console.log('=====================================');
    
    // Mark email as sent
    setTimeout(() => {
      const updatedBookings = bookings.map(b => 
        b.id === booking.id ? { ...b, emailSent: true } : b
      );
      setBookings(updatedBookings);
    }, 1000);
  };

  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      events,
      bookings,
      signup,
      login,
      logout,
      addEvent,
      updateEvent,
      deleteEvent,
      bookTicket,
      getUserBookings,
      sendBookingEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};
