import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddRoom = () => {
    const { axios, getToken } = useAppContext()

    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    })

    const [input, setInputs] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
        }
    })

    const [loading, setLoading] = useState(false)
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Check if all inputs are filled
        if (!input.roomType || !input.pricePerNight || !input.amenities ||
            !Object.values(images).some((image) => image)) {
            toast.error("Please fill in all the details");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData()
            formData.append('roomType', input.roomType)
            formData.append('pricePerNight', input.pricePerNight)
            // Converting Amenities to Array & keeping only enabled Amenities
            const amenities = Object.keys(input.amenities).filter((key) => input.amenities[key]);
            formData.append('amenities', JSON.stringify(amenities))

            // Adding Images to FormData
            Object.keys(images).forEach((key) => {
                images[key] && formData.append('images', images[key])
            })
            const { data } = await axios.post('/api/rooms/', formData, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                toast.success(data.message)
                setInputs({
                    roomType: '',
                    pricePerNight: 0,
                    amenities: {
                        'Free Wifi': false,
                        'Free Breakfast': false,
                        'Room Service': false,
                        'Mountain View': false,
                        'Pool Access': false
                    }
                })
                setImages({ 1: null, 2: null, 3: null, 4: null })
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
        <form onSubmit={onSubmitHandler} className='animate-in fade-in duration-1000'>
            <div className='mb-12'>
                <h2 className='text-iris font-black uppercase tracking-[0.4em] text-[10px] mb-4'>Inventory Expansion</h2>
                <h1 className='text-5xl font-black text-midnight tracking-tighter leading-none'>
                    Onboard <span className='text-transparent' style={{ WebkitTextStroke: '1px #020617' }}>Property.</span>
                </h1>
            </div>

            <div className='max-w-4xl p-12 md:p-16 rounded-[4rem] bg-white border border-slate-100 shadow-2xl shadow-midnight/5'>
                {/* Images Section */}
                <div className='mb-12'>
                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 block'>Visual Assets Gallery</label>
                    <div className='flex gap-4 overflow-x-auto pb-4'>
                        {Object.keys(images).map((key) => (
                            <label htmlFor={`roomImage${key}`} key={key} className='shrink-0'>
                                <div className='w-32 h-32 rounded-3xl border-2 border-dashed border-slate-100 flex items-center justify-center cursor-pointer hover:border-iris/40 transition-all overflow-hidden relative group'>
                                    {images[key] ? (
                                        <img src={URL.createObjectURL(images[key])} className='w-full h-full object-cover' alt="" />
                                    ) : (
                                        <div className='flex flex-col items-center gap-2'>
                                            <img src={assets.uploadArea} className='h-6 opacity-20' alt="" />
                                            <span className='text-[8px] font-black uppercase tracking-widest text-slate-300'>Slot {key}</span>
                                        </div>
                                    )}
                                    <div className='absolute inset-0 bg-iris/10 opacity-0 group-hover:opacity-100 transition-opacity' />
                                </div>
                                <input type="file" accept="image/*" id={`roomImage${key}`} hidden onChange={e => setImages({ ...images, [key]: e.target.files[0] })} />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Form Fields */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-12'>
                    <div className='flex flex-col gap-3'>
                        <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500'>Accommodation Type</label>
                        <select
                            value={input.roomType}
                            onChange={e => setInputs({ ...input, roomType: e.target.value })}
                            className='bg-bone border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-iris transition-colors font-bold text-midnight'
                        >
                            <option value="">Choose Suite...</option>
                            <option value="Single Bed">Single Designer Bed</option>
                            <option value="Double Bed">Executive Double Bed</option>
                            <option value="Luxury Room">Presidential Luxury</option>
                            <option value="Family Suite">Grand Family Suite</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500'>Yield Per Night (Net)</label>
                        <div className='relative'>
                            <span className='absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300'>$</span>
                            <input
                                type="number"
                                className='w-full bg-bone border border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-iris transition-colors font-bold text-midnight'
                                placeholder='0.00'
                                value={input.pricePerNight}
                                onChange={e => setInputs({ ...input, pricePerNight: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className='mb-12'>
                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6 block'>Curated Facility Suite</label>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                        {Object.keys(input.amenities).map((amenity, index) => (
                            <label key={index} className='flex items-center gap-4 cursor-pointer group'>
                                <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${input.amenities[amenity] ? 'bg-iris border-iris shadow-lg shadow-iris/20' : 'border-slate-100 group-hover:border-iris/20'}`}>
                                    {input.amenities[amenity] && <div className='w-2 h-2 bg-white rounded-full' />}
                                </div>
                                <input
                                    type="checkbox"
                                    className='hidden'
                                    checked={input.amenities[amenity]}
                                    onChange={() => setInputs({ ...input, amenities: { ...input.amenities, [amenity]: !input.amenities[amenity] } })}
                                />
                                <span className={`text-[11px] font-black uppercase tracking-widest ${input.amenities[amenity] ? 'text-midnight' : 'text-slate-400'}`}>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button 
                    className='w-full py-6 bg-midnight text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-iris shadow-2xl shadow-midnight/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50' 
                    disabled={loading}
                >
                    {loading ? "Onboarding Protocol Active..." : "Finalize Property Listing"}
                </button>
            </div>
        </form>
    )
}

export default AddRoom
