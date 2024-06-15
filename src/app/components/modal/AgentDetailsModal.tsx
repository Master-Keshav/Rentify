import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import LoaderModal from '../loader/loaderModal';

import './styles.scss';

interface UserDetailsInterface {
    username?: string;
    name?: string;
    email?: string;
    phonenumber?: string | number;
    experience?: string | number;
    about?: string;
    imageUrl?: string;
}

interface AgentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userDetails: UserDetailsInterface;
}

const AgentDetailsModal: React.FC<AgentDetailsModalProps> = ({ isOpen, onClose, userDetails }) => {
    const [updatedUserDetails, setUpdatedUserDetails] = useState<UserDetailsInterface>({
        username: '',
        name: '',
        email: '',
        phonenumber: '',
        experience: '',
        about: '',
        imageUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isOpen && userDetails) {
            setUpdatedUserDetails({ ...userDetails });
        }
    }, [isOpen, userDetails]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const imageFile = e.target.files?.[0];
            if (imageFile) {
                setLoading(true);
                const uploadedImageUrl = await uploadImageToImgBB(imageFile);
                setUpdatedUserDetails(prevDetails => ({
                    ...prevDetails,
                    imageUrl: uploadedImageUrl,
                }));
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image.');
        } finally {
            setLoading(false);
        }
    };

    const uploadImageToImgBB = async (imageFile: File) => {
        try {
            const IMG_BB_API_KEY: string = process.env.NEXT_PUBLIC_IMG_BB_API_KEY!;
            const formData = new FormData();
            formData.append('key', IMG_BB_API_KEY);
            formData.append('image', imageFile);

            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                return response.data.data.url;
            } else {
                console.error('ImgBB upload failed. Response:', response.data);
                toast.error('ImgBB upload failed.');
            }
        } catch (error) {
            console.error('Error uploading image to ImgBB:', error);
            toast.error('Error uploading image.');
        }
        return '';
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('/api/users/update', updatedUserDetails);
            if (response.status === 200) {
                toast.success('User Details Updated');
                router.push('/properties/create');
            } else {
                toast.error('Failed to update user details.');
            }
        } catch (error) {
            console.error('Failed to update user details:', error);
            toast.error('Failed to update user details.');
        } finally {
            setLoading(false);
        }
    };

    const formFields = [
        { name: 'username', label: 'Username', type: 'text', disabled: !!userDetails?.username },
        { name: 'name', label: 'Name', type: 'text', disabled: !!userDetails?.name },
        { name: 'email', label: 'Email', type: 'email', disabled: !!userDetails?.email },
        { name: 'phonenumber', label: 'Phone Number', type: 'text', disabled: !!userDetails?.phonenumber },
        { name: 'experience', label: 'Experience (Yrs)', type: 'number', disabled: !!userDetails?.experience },
        { name: 'about', label: 'About', type: 'textarea', disabled: !!userDetails?.about },
    ];

    if (!isOpen) return null;

    return (
        <div className="modal">
            {loading && <LoaderModal isOpen={loading} />}
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Agent Details</h2>
                <form onSubmit={onSubmit}>
                    <div className="form">
                        {formFields.map((field, index) => (
                            <div className="form-group" key={index}>
                                <label>{field.label}:</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        value={updatedUserDetails[field.name as keyof UserDetailsInterface]}
                                        disabled={field.disabled}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={updatedUserDetails[field.name as keyof UserDetailsInterface]}
                                        disabled={field.disabled}
                                        onChange={handleInputChange}
                                        required
                                    />
                                )}
                            </div>
                        ))}
                        <div className="form-group">
                            <label>Upload Image:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                required={!userDetails?.imageUrl}
                            />
                        </div>
                        {updatedUserDetails.imageUrl && (
                            <div className="form-group">
                                <Image
                                    src={updatedUserDetails.imageUrl}
                                    alt="Uploaded"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )}
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentDetailsModal;