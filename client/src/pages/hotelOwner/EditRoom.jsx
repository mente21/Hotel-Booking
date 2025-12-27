import React, { useState, useEffect } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'

const EditRoom = () => {
    const { axios, getToken, rooms } = useAppContext()
    const { id } = useParams()
    const navigate = useNavigate()

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [existingImages, setExistingImages] = useState([])

    const [input, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
            'City View': false,
            'Ocean View': false,
            'Mini Bar': false,
            'Kitchenette': false,
            'Fireplace': false,
            'Private Balcony': false,
            'Spa Tub': false,
            'TV': false,
            'Desk': false,
            'Gym': false,
            'Parking': false,
            'Air Conditioning': false,
            'Pet Friendly': false,
            'Bar': false,
            'Restaurant': false,
            'Concierge': false,
            'Valet Parking': false,
            'Laundry': false
        }
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const room = rooms.find(r => r._id === id)
        if (room) {
            const allAmenities = [
                'Free Wifi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access',
                'City View', 'Ocean View', 'Mini Bar', 'Kitchenette', 'Fireplace', 
                'Private Balcony', 'Spa Tub', 'TV', 'Desk', 'Gym', 'Parking', 
                'Air Conditioning', 'Pet Friendly', 'Bar', 'Restaurant', 
                'Concierge', 'Valet Parking', 'Laundry'
            ];
            const mappedAmenities = {};
            allAmenities.forEach(amenity => {
                mappedAmenities[amenity] = room.amenities.includes(amenity);
            });
            setInputs({
                roomType: room.roomType,
                pricePerNight: room.pricePerNight,
                amenities: mappedAmenities
            })
            setExistingImages(room.images)
        }
    }, [id, rooms])

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!input.roomType || !input.pricePerNight) {
            toast.error("Please fill in all the details");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData()
            formData.append('roomId', id)
            formData.append('roomType', input.roomType)
            formData.append('pricePerNight', input.pricePerNight)
            const amenities = Object.keys(input.amenities).filter((key) => input.amenities[key]);
            formData.append('amenities', JSON.stringify(amenities))

            // Adding Images to FormData
            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key])
            })
            
            const { data } = await axios.post('/api/rooms/update', formData, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                toast.success(data.message)
                navigate('/owner/list-room')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }


    return (
        <form onSubmit={onSubmitHandler}>
            <Title
                align='left'
                font='outfit'
                title='Edit Room'
                subTitle='Update the details of your room listing.'
            />

            <p className='text-gray-800 mt-10'>New Images (Keep empty to keep existing)</p>

            <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
                {Object.keys(images).map((key) => (
                    <label htmlFor={`roomImage${key}`} key={key}>
                        <img
                            className='max-h-13 cursor-pointer opacity-80 border border-gray-200'
                            src={images[key] ? URL.createObjectURL(images[key]) : (existingImages[key-1] || assets.uploadArea)}
                            alt=""
                        />
                        <input
                            type="file"
                            accept="image/*"
                            id={`roomImage${key}`}
                            hidden
                            onChange={e => setImages({ ...images, [key]: e.target.files[0] })}
                        />
                    </label>
                ))}
            </div>

            <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
                <div className='flex-1 max-w-48'>
                    <p className='text-gray-800 mt-4'>Room Type</p>
                    <select
                        value={input.roomType}
                        onChange={e => setInputs({ ...input, roomType: e.target.value })}
                        className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'
                    >
                        <option value="">Select Room Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Luxury Room">Luxury Room</option>
                        <option value="Family Suite">Family Suite</option>
                    </select>
                </div>

                <div>
                    <p className='mt-4 text-gray-800'>
                        Price<span className='text-xs'>/night</span>
                    </p>
                    <input
                        type="number"
                        placeholder='0'
                        className='border border-gray-300 mt-1 rounded p-2 w-24'
                        value={input.pricePerNight}
                        onChange={e => setInputs({ ...input, pricePerNight: e.target.value })}
                    />
                </div>
            </div>

            <p className='text-gray-800 mt-4'>Amenities</p>

            <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
                {Object.keys(input.amenities).map((amenity, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            id={`amenities${index + 1}`}
                            checked={input.amenities[amenity]}
                            onChange={() =>
                                setInputs({
                                    ...input,
                                    amenities: {
                                        ...input.amenities,
                                        [amenity]: !input.amenities[amenity]
                                    }
                                })
                            }
                        />
                        <label htmlFor={`amenities${index + 1}`}>{amenity}</label>
                    </div>
                ))}

                <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}>
                    {loading ? "Updating..." : "Update Room"}
                </button>
            </div>
        </form>
    )
}

export default EditRoom
