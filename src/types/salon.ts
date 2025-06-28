export interface Salon {
    id: number;
    name: string;
    ownerName: string;
    services: Service[];
    location: string;
    phone: string;
    email: string;
    website: string;
    description: string;
    longitude: string;
    latitude: string;
    reviews: Review[];
}

export interface Service {
    serviceId: number;
    categories: Category[];
    name: string;
    price: number;
    duration: number;
}

export interface Category {
    categoryId: number;
    name: string;
}

export interface Review {
    reviewId: number;
    rating: number;
    comment: string;
    createdAt: string;
    user: User;
}

export interface User {
    firstName: string;
    lastName: string;
}
