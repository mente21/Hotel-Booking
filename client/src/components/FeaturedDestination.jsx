import React from 'react'
import HotelCard from './HotelCard'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'




const FeaturedDestination = () => {
    const { rooms, navigate } = useAppContext()

    return rooms.length > 0 && (
        <div className='section-padding bg-muted/30'>
            <div className='mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8'>
                <div className='max-w-3xl'>
                    <h2 className='text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6'>Explore the Globe</h2>
                    <h1 className='text-5xl md:text-7xl font-black text-primary tracking-tighter leading-none'>
                        Curated <br /> Destinations.
                    </h1>
                </div>
                <button 
                    onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}
                    className='modern-btn border-2 border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-4 w-fit'
                >
                    View All
                    <img src={assets.arrowIcon} alt="" className='h-3 group-hover:translate-x-1 transition-all' />
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {rooms.slice(0, 3).map((room, index) => (
                    <HotelCard key={room._id} room={room} index={index} />
                ))}
            </div>
        </div>
    )
}

export default FeaturedDestination
