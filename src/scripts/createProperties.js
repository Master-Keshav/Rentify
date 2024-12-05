import mongoose from "mongoose";
import dotenv from "dotenv";
import Property from "../models/propertyModel";

dotenv.config();

// Check if MONGO_URI is loaded correctly
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined. Please check your .env.local file.");
    process.exit(1);
}

const amenitiesList = [
    "Swimming Pool",
    "Gym",
    "Kitchen",
    "Wifi",
    "Home Theater",
    "Parking",
    "Patio or Balcony",
    "Pets Allowed",
    "Garden",
    "TV",
    "Smart Home Technology",
    "24/7 Security",
    "Fireplace",
    "Laundry Room",
    "Office",
    "Storage Room"
];

const houseTypes = ["House", "Apartment", "Villa", "Cottage", "Penthouse", "Townhouse", "Loft", "Discounted", "Mansion", "Condo"];
const tags = ["urgent", "featured", "exclusive", "discounted"];
const owner = new mongoose.Types.ObjectId("66361d2cbc13959373476600");
const images = [
    'https://i.ibb.co/NK9hr4y/p5.jpg',
    'https://i.ibb.co/pw0V0g4/p4.jpg',
    'https://i.ibb.co/GRg4MwJ/p3.jpg',
    'https://i.ibb.co/hXfdyYL/p2.jpg',
    'https://i.ibb.co/QKfrN9Y/p1.jpg'
];

function getRandomItems(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

async function createProperties() {
    const properties = [
        {
            images,
            title: 'Modern Downtown Apartment',
            about: 'A luxurious apartment located in the heart of the city, featuring stunning views and modern amenities.',
            amenities: getRandomItems(amenitiesList, 7),
            houseType: getRandomItems(houseTypes, 1)[0],
            tag: getRandomItems(tags, 1)[0],
            owner,
            price: 5000,
            location: 'New York, NY',
            area: 1500,
            builtYear: 2018,
            parkingSpaces: 2
        },
        {
            images,
            title: 'Cozy Mountain Cottage',
            about: 'A charming cottage nestled in the mountains, perfect for a peaceful retreat with all the comforts of home.',
            amenities: getRandomItems(amenitiesList, 6),
            houseType: getRandomItems(houseTypes, 1)[0],
            tag: getRandomItems(tags, 1)[0],
            owner,
            price: 3000,
            location: 'Aspen, Colorado',
            area: 2000,
            builtYear: 2010,
            parkingSpaces: 1
        }
    ];

    try {
        await Property.insertMany(properties);
        console.log("Properties created successfully");
    } catch (error) {
        console.error("Error creating properties", error);
    } finally {
        mongoose.disconnect();
    }
}

async function main() {
    await connectToMongoDB();
    await createProperties();
}

main();
