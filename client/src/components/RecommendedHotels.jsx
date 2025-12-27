import React, { useState, useEffect } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const RecommendedHotels = () => {
    const { rooms, searchedCities } = useAppContext()
    const [recommended, setRecommended] = useState([])

    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter((room) =>
            searchedCities.includes(room.hotel.city)
        )
        setRecommended(filteredHotels)
    }

    useEffect(() => {
        filterHotels()
    }, [rooms, searchedCities])

    return recommended.length > 0 && (
        <div className='section-padding bg-white'>
            <div className='mb-24'>
                <h2 className='text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6'>Recommended for you</h2>
                <h1 className='text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none'>
                    Your Next <br /> Perfect Stay.
                </h1>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
                {recommended.slice(0, 4).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>
        </div>
    )
}

export default RecommendedHotels
