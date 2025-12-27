import React, { useState, useMemo } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { useNavigate, useSearchParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { useAppContext } from '../context/AppContext'

const CheckBox = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-4 items-center cursor-pointer group mb-4'>
            <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${selected ? 'bg-accent border-accent' : 'border-gray-200 group-hover:border-accent/40'}`}>
                {selected && <div className='w-2 h-2 bg-white rounded-full' />}
            </div>
            <input
                type="checkbox"
                className='hidden'
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
            />
            <span className={`text-xs font-black uppercase tracking-widest transition-all ${selected ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>{label}</span>
        </label>
    )
}

const RadioButton = ({ label, selected = false, onChange = () => { } }) => {
    return (
        <label className='flex gap-4 items-center cursor-pointer group mb-4'>
            <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${selected ? 'border-accent' : 'border-gray-200 group-hover:border-accent/40'}`}>
                {selected && <div className='w-2 h-2 bg-accent rounded-full' />}
            </div>
            <input
                type="radio"
                name='sortOption'
                className='hidden'
                checked={selected}
                onChange={() => onChange(label)}
            />
            <span className={`text-xs font-black uppercase tracking-widest transition-all ${selected ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>{label}</span>
        </label>
    )
}

const AllRooms = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const { rooms, currency } = useAppContext()

    const [openFilters, setOpenFilters] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState({
        roomType: [],
        priceRange: [],
    })

    const [selectedSort, setSelectedSort] = useState('')

    const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"]
    const priceRange = ["0 to 500", "500 to 1000", "1000 to 2000", "2000 to 3000"]
    const sortOption = ["Price Low to High", "Price High to Low", "Newest First"]

    const handleFilterChange = (checked, value, type) => {
        setSelectedFilters((prev) => {
            const updated = { ...prev }
            if (checked) { updated[type].push(value) } 
            else { updated[type] = updated[type].filter((item) => item !== value) }
            return updated
        })
    }

    const filteredRooms = useMemo(() => {
        return rooms
            .filter((room) => (
                (selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType)) &&
                (selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some((range) => {
                    const [min, max] = range.split(' to ').map(Number)
                    return room.pricePerNight >= min && room.pricePerNight <= max
                })) &&
                (!searchParams.get('destination') || room.hotel.city.toLowerCase().includes(searchParams.get('destination').toLowerCase()))
            ))
            .sort((a, b) => {
                if (selectedSort === 'Price Low to High') return a.pricePerNight - b.pricePerNight
                if (selectedSort === 'Price High to Low') return b.pricePerNight - a.pricePerNight
                if (selectedSort === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt)
                return 0
            })
    }, [rooms, selectedFilters, selectedSort, searchParams])

    const clearFilters = () => {
        setSelectedFilters({ roomType: [], priceRange: [] })
        setSelectedSort('')
        setSearchParams({})
    }

    return (
        <div className='section-padding pt-40'>
            <div className='flex flex-col lg:flex-row gap-20'>
                
                {/* ----- Sidebar Filter ----- */}
                <div className='w-full lg:w-80 shrink-0'>
                    <div className='sticky top-32'>
                        <div className='flex items-end justify-between mb-12'>
                            <h2 className='text-3xl font-black text-primary tracking-tighter'>Filters.</h2>
                            <button onClick={clearFilters} className='text-[10px] font-black uppercase tracking-widest text-accent hover:underline'>Reset</button>
                        </div>

                        <div className='space-y-12'>
                            <div>
                                <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6'>Accommodations</h3>
                                {roomTypes.map((type, i) => (
                                    <CheckBox key={i} label={type} selected={selectedFilters.roomType.includes(type)} onChange={(checked) => handleFilterChange(checked, type, 'roomType')} />
                                ))}
                            </div>

                            <div>
                                <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6'>Budget / Night</h3>
                                {priceRange.map((range, i) => (
                                    <CheckBox key={i} label={`${currency}${range}`} selected={selectedFilters.priceRange.includes(range)} onChange={(checked) => handleFilterChange(checked, range, 'priceRange')} />
                                ))}
                            </div>

                            <div>
                                <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-6'>Sort Experience</h3>
                                {sortOption.map((opt, i) => (
                                    <RadioButton key={i} label={opt} selected={selectedSort === opt} onChange={() => setSelectedSort(opt)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ----- Results ----- */}
                <div className='flex-1'>
                    <div className='mb-20'>
                        <span className='mb-4 inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest'>
                            {filteredRooms.length} Curated Stays Found
                        </span>
                        <h1 className='text-6xl md:text-8xl font-black text-primary tracking-tighter leading-none mb-6'>
                            Discover <br /> The Portfolio.
                        </h1>
                        <p className='text-gray-400 font-medium max-w-xl'>
                            Explore our handpicked collection of world-class accommodations, from serene mountain retreats to vibrant urban sanctuaries.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 gap-12'>
                        {filteredRooms.map((room) => (
                            <div 
                                key={room._id} 
                                className='group flex flex-col md:flex-row gap-10 p-4 border border-gray-50 rounded-[2.5rem] bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700'
                            >
                                <div className='md:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden relative'>
                                    <img src={room.images[0]} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000' alt="" />
                                    <div className='absolute top-6 left-6 flex flex-col gap-2'>
                                        <span className='bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl'>{room.hotel.city}</span>
                                    </div>
                                    <div className='absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center'>
                                        <button 
                                            onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }}
                                            className='w-20 h-20 bg-white rounded-full flex items-center justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500'
                                        >
                                            <img src={assets.arrowIcon} className='h-5 -rotate-45' alt="" />
                                        </button>
                                    </div>
                                </div>

                                <div className='md:w-1/2 flex flex-col justify-center pr-8'>
                                    <div className='flex items-center gap-2 mb-4'>
                                        <div className='flex items-center gap-1 text-accent font-black text-xs'>
                                            <img src={assets.starIconFilled} className='h-3' alt="" />
                                            4.9
                                        </div>
                                        <span className='w-1 h-1 bg-gray-200 rounded-full' />
                                        <p className='text-[10px] font-black uppercase underline tracking-widest text-gray-400'>240 Reviews</p>
                                    </div>

                                    <h2 className='text-4xl font-black text-primary tracking-tighter mb-4 group-hover:text-accent transition-colors'>
                                        {room.hotel.name}
                                    </h2>
                                    
                                    <p className='text-gray-400 text-sm font-medium mb-8 leading-relaxed max-w-sm'>
                                        {room.roomType} &bull; {room.hotel.address}
                                    </p>

                                    <div className='flex flex-wrap gap-2 mb-8'>
                                        {room.amenities.slice(0, 3).map((item, i) => (
                                            <div key={i} className='px-4 py-2 rounded-xl bg-muted text-[10px] font-black uppercase tracking-widest flex items-center gap-2'>
                                                <img src={facilityIcons[item]} className='h-3 opacity-60' alt="" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <div className='flex items-baseline gap-2'>
                                        <span className='text-3xl font-black text-primary'>{currency}{room.pricePerNight}</span>
                                        <span className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-300'>/ Experience</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllRooms;
