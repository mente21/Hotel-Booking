import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets';
import StarRating from './StarRating';

const Testimonial = () => {
    return (
        <div className='section-padding bg-surface'>
            <div className='mb-20 text-center max-w-3xl mx-auto'>
                <h2 className='text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4'>Guest Experiences</h2>
                <h1 className='font-playfair text-4xl md:text-5xl font-bold text-primary mb-6'>Voices of Satisfaction</h1>
                <p className='text-gray-400 font-light leading-relaxed'>
                    Discover why discerning travelers consistently choose MenteStay for their exclusive and luxurious accommodations around the world.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className='luxury-card p-10 flex flex-col justify-between'>
                        <div>
                            <div className='flex items-center gap-1 mb-6 text-accent'>
                                <StarRating rating={testimonial.rating} />
                            </div>
                            <p className='text-primary/70 font-light italic text-xl leading-relaxed mb-8'>
                                "{testimonial.review}"
                            </p>
                        </div>
                        <div className='flex items-center gap-4 pt-6 border-t border-gray-50'>
                            <img className='w-14 h-14 rounded-full border-2 border-white shadow-lg' src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className='font-playfair text-lg font-bold text-primary'>{testimonial.name}</p>
                                <p className='text-accent text-[10px] uppercase font-bold tracking-widest'>{testimonial.address}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
