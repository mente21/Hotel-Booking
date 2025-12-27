import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Hero = () => {
    const { navigate, getToken, axios, setSearchedCities } = useAppContext()
    const [destination, setDestination] = useState("")
    
    const onSearch = async (e) => {
        e.preventDefault()
        navigate(`/rooms?destination=${destination}`)
        await axios.post('/api/user/store-recent-search', {
            recentSearchedCity: destination
        }, { headers: { Authorization: `Bearer ${await getToken()}` } });

        setSearchedCities((prevSearchedCities) => {
            const updatedSearchedCities = [...prevSearchedCities, destination];
            if (updatedSearchedCities.length > 3) {
                updatedSearchedCities.shift();
            }
            return updatedSearchedCities;
        })
    }

    return (
        <div className='relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-midnight'>
            {/* Pro Mesh Background Layer */}
            <div className='absolute inset-0 z-0'>
                <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-iris/20 blur-[120px] rounded-full' />
                <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose/10 blur-[120px] rounded-full' />
                <img 
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop" 
                    className='w-full h-full object-cover opacity-40 mix-blend-overlay'
                    alt="Luxury Stays"
                />
            </div>

            {/* Content Over Background */}
            <div className='relative z-10 w-full max-w-7xl px-6 md:px-16 lg:px-24 flex flex-col items-center text-center'>
                <div className='animate-in fade-in slide-in-from-top-12 duration-1000 flex flex-col items-center'>
                    <div className='mb-8 px-6 py-2 rounded-full bg-iris/10 backdrop-blur-md border border-iris/20 text-iris text-[10px] font-black uppercase tracking-[0.4em]'>
                        The New Gold Standard
                    </div>
                    
                    <h1 className='text-6xl md:text-8xl lg:text-[11rem] font-black text-white tracking-tighter leading-[0.8] mb-12 flex flex-col'>
                        <span>STAY</span>
                        <span className='text-transparent' style={{ WebkitTextStroke: '1px rgba(99, 102, 241, 0.5)' }}>AUTHENTIC.</span>
                    </h1>
                    
                    <p className='text-slate-400 text-lg md:text-xl max-w-2xl font-medium tracking-tight mb-20 px-4'>
                        We curate the world's most exceptional boutique properties for the discerning traveler. Your journey, redefined.
                    </p>
                </div>

                {/* Pro Glass Search Bar */}
                <div className='w-full max-w-5xl animate-in fade-in zoom-in duration-1000 delay-500'>
                    <form onSubmit={onSearch} className='grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-[0_32px_120px_-15px_rgba(0,0,0,0.5)]'>
                        <div className='md:col-span-8 flex items-center px-10 py-6 gap-8 bg-slate-900/40 rounded-[3rem] border border-white/5'>
                            <img src={assets.locationIcon} alt="" className='h-7 invert opacity-50' />
                            <div className='flex flex-col items-start flex-1'>
                                <label className='text-[10px] uppercase font-black text-iris tracking-[0.2em] mb-2'>Destination</label>
                                <input 
                                    onChange={e => setDestination(e.target.value)} 
                                    value={destination} 
                                    list='destinations' 
                                    type="text" 
                                    className="w-full text-white font-black placeholder:text-slate-600 outline-none text-2xl bg-transparent" 
                                    placeholder="Where are you heading?" 
                                    required 
                                />
                                <datalist id='destinations'>
                                    {cities.map((city, index) => <option value={city} key={index} />)}
                                </datalist>
                            </div>
                        </div>
                        
                        <button className='md:col-span-4 h-full rounded-[3rem] bg-iris text-white font-black text-sm uppercase tracking-[0.3em] shadow-2xl shadow-iris/40 hover:bg-white hover:text-iris transition-all duration-500'>
                            Explore Collection
                        </button>
                    </form>
                </div>
            </div>

            {/* Floating Navigation Preview */}
            <div className='absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12'>
                <div className='flex items-center gap-4 text-white/30 hover:text-white transition-colors cursor-pointer group'>
                    <span className='w-8 h-[2px] bg-current group-hover:w-12 transition-all' />
                    <p className='text-[10px] font-black uppercase tracking-[0.4em]'>Scrolled Down</p>
                </div>
            </div>
        </div>
    )
}

export default Hero