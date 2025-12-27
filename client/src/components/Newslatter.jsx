import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const Newslatter = () => {
    return (
        <div className="section-padding flex justify-center">
            <div className="relative w-full max-w-6xl overflow-hidden rounded-[2.5rem] bg-primary text-white p-12 md:p-24 text-center">
                {/* Decorative Elements */}
                <div className='absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full -mr-32 -mt-32' />
                <div className='absolute bottom-0 left-0 w-64 h-64 bg-primary-dull blur-[100px] rounded-full -ml-32 -mb-32' />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className='text-accent font-bold uppercase tracking-[0.2em] text-xs mb-6'>Join the Elite</h2>
                    <h1 className='font-playfair text-4xl md:text-5xl font-bold mb-6 italic'>Stay Inspired</h1>
                    <p className='text-white/60 font-light leading-relaxed mb-12'>
                        Subscribe to our private mailing list to receive hand-curated travel inspiration, early access to boutique openings, and exclusive member-only privileges.
                    </p>

                    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row items-center justify-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <input 
                            type="email" 
                            className="bg-transparent px-6 py-4 outline-none w-full text-white placeholder:text-white/30" 
                            placeholder="your@email.com" 
                        />
                        <button className="whitespace-nowrap bg-white text-primary px-10 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform hover:scale-105 active:scale-95">
                            Join Now
                        </button>
                    </form>
                    
                    <p className="text-white/20 mt-8 text-[10px] uppercase font-bold tracking-widest">
                        Privacy Guaranteed &bull; Unsubscribe Anytime
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Newslatter