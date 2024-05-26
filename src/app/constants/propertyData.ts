export interface PropertyData {
    images: string[];
    title: string;
    about: string;
    amenities: string[];
    tags: string[],
    owner: OwnerDetails;
    prices: number;
    location: string;
    area: number;
    builtYear: number;
    parkingSpaces: number;
}

export interface OwnerDetails {
    name: string;
    about: string;
    contact: string;
}

const propertyData: PropertyData = {
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
        name: "John Doe",
        about: "Real estate entrepreneur with over 10 years of experience.",
        contact: "johndoe@example.com | +1234567890"
    },
    tags: [
        "2 Bedrooms",
        "4 Beds",
        "2 Washrooms",
    ],
    prices: 5000,
    location: "Banglore, India",
    area: 5000,
    builtYear: 2020,
    parkingSpaces: 2
};

export default propertyData;


import { TbToolsKitchen3 } from 'react-icons/tb';
