export interface PropertyData {
    _id: string,
    images: string[];
    title: string;
    about: string;
    amenities: string[];
    tags: string[],
    owner: OwnerDetails;
    price: number;
    totalReviews: number;
    averageReviews: number;
    location: string;
    area: number;
    builtYear: number;
    parkingSpaces: number;
}

export interface OwnerDetails {
    profilePhoto: string;
    name: string;
    about: string;
    contact: string;
}

const propertyData: PropertyData = {
    _id: '6671c9c2396c62900612be7a',
    images: [
        '/p1.jpg',
        '/p2.jpg',
        '/p3.jpg',
        '/p4.jpg',
        '/p5.jpg',
    ],
    title: "Modern Luxury Villa",
    about: "Experience luxury living in this modern villa with breathtaking views.",
    amenities: [
        "Swimming Pool",
        "Gym",
        "Kitchen",
        "Wifi",
        "Home Theater",
        "Parking",
        "Patio or balcony",
        "Pets Allowed",
        "Garden",
        "TV",
        "Smart Home Technology",
        "24/7 Security"
    ],
    owner: {
        profilePhoto: '/p1.jpg',
        name: "John Doe",
        about: "Real estate entrepreneur with over 10 years of experience.",
        contact: "johndoe@example.com | +1234567890"
    },
    tags: [
        "2 Bedrooms",
        "4 Beds",
        "2 Washrooms",
    ],
    price: 5000,
    totalReviews: 2,
    averageReviews: 4.3,
    location: "Banglore, India",
    area: 5000,
    builtYear: 2020,
    parkingSpaces: 2
};

export default propertyData;