import React from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import HotelCard from '../components/HotelCard'

const Curated = () => {
    const { rooms } = useAppContext()
    
    // Pick 3 high-end feeling items for the "Curated" collection
    const featuredItems = rooms.slice(0, 3)

    return (
        <div className='section-padding pt-40 bg-zinc-50'>
            <div className='max-w-7xl mx-auto'>
                {/* Editorial Header */}
                <div className='mb-32 text-center md:text-left'>
                    <h2 className='text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-8'>MenteStay Editorial</h2>
                    <h1 className='text-6xl md:text-9xl font-black text-primary tracking-tighter leading-[0.85] mb-12'>
                        The Winter <br /> 
                        <span className='text-transparent' style={{ WebkitTextStroke: '2px #111827' }}>Edition.</span>
                    </h1>
                    <p className='text-gray-400 text-xl max-w-2xl font-medium tracking-tight leading-relaxed italic border-l-4 border-accent pl-8 ml-2'>
                        "Our handpicked selection of stays that define the season. From minimalist snowy retreats to opulent city hideaways, these are the destinations currently inspiring our collective."
                    </p>
                </div>

                {/* Magazine Layout */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40'>
                    <div className='relative group overflow-hidden rounded-[3rem] aspect-[3/4]'>
                        <img src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1000&auto=format&fit=crop" className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] brightness-75' alt="" />
                        <div className='absolute inset-0 p-12 flex flex-col justify-end text-white bg-gradient-to-t from-primary/80 to-transparent'>
                            <p className='text-[10px] font-black uppercase tracking-widest mb-4'>Volume 01</p>
                            <h2 className='text-5xl font-black tracking-tighter mb-6'>Alpine Serenity.</h2>
                            <p className='text-white/60 mb-8 max-w-xs'>Discover the architecture of silence in our most secluded mountain lodges.</p>
                            <button className='w-fit modern-btn bg-white text-primary hover:bg-accent hover:text-white'>Read Article</button>
                        </div>
                    </div>
                    
                    <div className='space-y-20 flex flex-col justify-center'>
                        <div className='border-t border-gray-200 pt-12 max-w-md'>
                            <h3 className='text-2xl font-black text-primary tracking-tight mb-4'>01. Minimalist Urbanism</h3>
                            <p className='text-gray-400 text-sm leading-relaxed mb-6'>We explore the rise of brutalist architecture in boutique hotel design across Tokyo and Berlin.</p>
                            <span className='text-accent font-black text-[10px] uppercase tracking-widest cursor-pointer hover:underline'>View Collection</span>
                        </div>
                        <div className='border-t border-gray-200 pt-12 max-w-md'>
                            <h3 className='text-2xl font-black text-primary tracking-tight mb-4'>02. Coastal Brutalism</h3>
                            <p className='text-gray-400 text-sm leading-relaxed mb-6'>The raw beauty of concrete meets the endless blue of the Mediterranean. A study in contrast.</p>
                            <span className='text-accent font-black text-[10px] uppercase tracking-widest cursor-pointer hover:underline'>View Collection</span>
                        </div>
                    </div>
                </div>

                {/* Featured Items Grid */}
                <div className='pt-20 border-t border-gray-200'>
                    <div className='flex items-end justify-between mb-16'>
                        <h2 className='text-4xl font-black text-primary tracking-tighter'>Featured Stays.</h2>
                        <p className='text-gray-400 text-[10px] font-black uppercase tracking-widest'>Currently Browsing: 03</p>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
                        {featuredItems.map((room, index) => (
                            <HotelCard key={room._id} room={room} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Curated
