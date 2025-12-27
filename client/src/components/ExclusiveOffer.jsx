import React from 'react'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffer = () => {
    return (
        <div className='section-padding bg-primary text-white'>
            <div className='flex flex-col md:flex-row items-end justify-between mb-16 gap-6'>
                <div className='max-w-2xl'>
                    <h2 className='text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4'>Member Benefits</h2>
                    <h1 className='font-playfair text-4xl md:text-6xl font-bold text-white leading-tight'>
                        Exclusive <span className='italic font-light'>Privileges</span>
                    </h1>
                </div>
                <button className='group flex items-center gap-4 px-8 py-3 rounded-full border border-white/30 hover:bg-white hover:text-primary transition-all'>
                    View All Invitations
                    <img src={assets.arrowIcon} alt='arrow-icon' className='group-hover:translate-x-1 transition-all invert group-hover:invert-0' />
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {exclusiveOffers.map((item) => (
                    <div key={item._id} className='group relative aspect-[9/11] rounded-3xl overflow-hidden shadow-2xl'>
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000' 
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent' />
                        
                        <div className='absolute inset-0 p-8 flex flex-col justify-end'>
                            <span className='w-fit px-4 py-1.5 bg-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 shadow-lg'>
                                {item.priceOff}% Privilege
                            </span>
                            <h3 className='font-playfair text-2xl md:text-3xl font-bold mb-2 group-hover:text-accent transition-colors'>
                                {item.title}
                            </h3>
                            <p className='text-white/60 text-sm font-light mb-6 line-clamp-2'>
                                {item.description}
                            </p>
                            <div className='flex items-center justify-between'>
                                <span className='text-[10px] uppercase font-bold tracking-widest text-white/40'>Valid until {item.expiryDate}</span>
                                <button className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent transition-all'>
                                    Details
                                    <img className='invert grayscale brightness-200 h-3 group-hover:translate-x-1 transition-all' src={assets.arrowIcon} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExclusiveOffer