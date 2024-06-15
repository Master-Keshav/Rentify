'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdAddBusiness } from 'react-icons/md';

import LoaderModal from '@/app/components/loader/loaderModal';
import Navbar from '@/app/components/navbar/navbar';

import './page.scss';

const CreateProperty = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<any>({
        title: '',
        about: '',
        price: '',
        location: '',
        area: '',
        builtYear: '',
        parkingSpaces: '',
        bedrooms: '',
        beds: '',
        washrooms: '',
        amenities: [],
        images: []
    });

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

    const [loading, setLoading] = useState(false);

    const uploadImageToImgBB = async (imageFile: any) => {
        try {
            const IMG_BB_API_KEY: string = process.env.NEXT_PUBLIC_IMG_BB_API_KEY!;
            if (imageFile) {
                const formData = new FormData();
                formData.append('key', IMG_BB_API_KEY);
                formData.append('image', imageFile);

                const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    const imageUrl = response.data.data.url;
                    return imageUrl;
                } else {
                    console.error('ImgBB upload failed. Response:', response.data);
                }
            } else {
                console.error('No image file to upload.');
            }
        } catch (error) {
            console.error('Error uploading image to ImgBB:', error);
        }
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData((prevState: any) => ({
                ...prevState,
                amenities: checked
                    ? [...prevState.amenities, value]
                    : prevState.amenities.filter((amenity: any) => amenity !== value)
            }));
        } else if (type === 'file') {
            const imagesArray = files ? Array.from(files) : [];
            setFormData((prevState: any) => ({
                ...prevState,
                images: imagesArray
            }));
        } else {
            setFormData((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const imageURLs = await Promise.all(formData.images.map(uploadImageToImgBB));
            const propertyDataWithImages = { ...formData, images: imageURLs };
            console.log(propertyDataWithImages)
            const response = await axios.post("/api/properties/createProperty", { propertyData: propertyDataWithImages });
            console.log("Property created successfully:", response.data.newProperty);
            toast.success(response.data.message);
            router.push("/properties");
        } catch (error: any) {
            console.error("Error creating property:", error.message);
            toast.error(error?.response?.data?.message || "Failed to create property");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            {loading ? <LoaderModal isOpen={loading} /> : <></>}
            <div className='background'></div>
            <Navbar />
            <div className="create-property-container">
                <h2><span className='icon'><MdAddBusiness /></span> Add Your Own Property</h2>
                <form onSubmit={handleSubmit} className="create-property-form">
                    <div className="form-row">
                        <div className="form-input title">
                            <label>Title:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter property title" required />
                        </div>

                        <div className="form-input price">
                            <label>Price:</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Enter property price" required />
                        </div>

                        <div className="form-input houseType">
                            <label>House Type:</label>
                            <select name="houseType" onChange={handleChange} required>
                                <option value="">Select House Type</option>
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Cottage">Cottage</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Loft">Loft</option>
                                <option value="Discounted">Discounted</option>
                                <option value="Mansion">Mansion</option>
                                <option value="Condo">Condo</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-input about">
                        <label>About:</label>
                        <textarea name="about" value={formData.about} onChange={handleChange} placeholder="Describe the property" required />
                    </div>

                    <div className="form-row">
                        <div className="form-input location">
                            <label>Location:</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter property location" required />
                        </div>

                        <div className="form-input area">
                            <label>Area:</label>
                            <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Enter property area" required />
                        </div>

                        <div className="form-input builtYear">
                            <label>Built Year:</label>
                            <input type="text" name="builtYear" value={formData.builtYear} onChange={handleChange} placeholder="Enter built year" required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-input parkingSpaces">
                            <label>Parking Space:</label>
                            <input type="number" name="parkingSpaces" value={formData.parkingSpaces} onChange={handleChange} placeholder="Enter parking space" required />
                        </div>

                        <div className="form-input bedrooms">
                            <label>Bedrooms:</label>
                            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Enter number of bedrooms" required />
                        </div>

                        <div className="form-input beds">
                            <label>Beds:</label>
                            <input type="number" name="beds" value={formData.beds} onChange={handleChange} placeholder="Enter number of beds" required />
                        </div>

                        <div className="form-input washrooms">
                            <label>Washrooms:</label>
                            <input type="number" name="washrooms" value={formData.washrooms} onChange={handleChange} placeholder="Enter number of washrooms" required />
                        </div>
                    </div>

                    <div className="form-input amenities">
                        <label>Amenities:</label>
                        <br />
                        <div className="amenities-list">
                            {amenitiesList.map(amenity => (
                                <div key={amenity} className="amenity-item">
                                    <input
                                        type="checkbox"
                                        id={amenity}
                                        name="amenities"
                                        value={amenity}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={amenity}>{amenity}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-input images">
                            <label>Images:</label>
                            <input type="file" name="images" onChange={handleChange} multiple required />
                        </div>
                        <div className="form-input tags">
                            <label>Tag:</label>
                            <select name="tag" onChange={handleChange} required>
                                <option value="">Select Tag</option>
                                <option value="urgent">Urgent</option>
                                <option value="featured">Featured</option>
                                <option value="exclusive">Exclusive</option>
                                <option value="discounted">Discounted</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProperty;