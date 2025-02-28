export interface Salon {
    _id: string;
    salonName: string;
    ownerName: string;
    location: Location;
    contactInfo: ContactInfo;
    category: Category[];
    workingHours: WorkingHours;
    rating: number;
    reviews: Review[];
    createdAt: string;
  }
  
  export interface Location {
    address: string;
    city: string;
    country: string;
    postalCode: string;
  }
  
  export interface ContactInfo {
    phone: string;
    email: string;
  }
  
  export interface Category {
    name: string;
    services: Service[];
  }
  
  export interface Service {
    serviceName: string;
    price: number;
    durationMinutes: number;
  }
  
  export interface WorkingHours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  }
  
  export interface Review {
    customerName: string;
    rating: number;
    reviewText: string;
  }