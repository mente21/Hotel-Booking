import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'




const HotelCard = ({ room, index }) => {
    return (
        <Link 
            to={'/rooms/' + room._id} 
            onClick={() => scrollTo(0, 0)} 
            key={room._id} 
            className='group block'
        >
            <div className='relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-6'>
                <img 
                    src={room.images[0]} 
                    alt={room.hotel.name} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000' 
                />
                <div className='absolute top-5 left-5 flex flex-col gap-2'>
                    <span className='w-fit bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-sm'>
                        {room.hotel.city || 'Exclusive'}
                    </span>
                </div>
                {/* Modern Hover Effect */}
                <div className='absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                    <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500'>
                        <img src={assets.arrowIcon} alt="" className='h-4 -rotate-45' />
                    </div>
                </div>
            </div>

            <div className='px-2'>
                <div className='flex items-start justify-between mb-2'>
                    <h3 className='text-xl md:text-2xl font-bold text-primary tracking-tight'>
                        {room.hotel.name}
                    </h3>
                    <div className='flex items-center gap-1.5 font-bold text-accent text-sm'>
                        <img src={assets.starIconFilled} alt="" className='h-3' />
                        4.9
                    </div>
                </div>
                
                <p className='text-gray-400 text-sm font-medium mb-4'>
                    {room.roomType} &bull; Premium Experience
                </p>
                
                <div className='flex items-baseline gap-1'>
                    <span className='text-2xl font-extrabold text-primary'>${room.pricePerNight}</span>
                    <span className='text-gray-400 text-xs font-bold uppercase tracking-widest'>/ Night</span>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard