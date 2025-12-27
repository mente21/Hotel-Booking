import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ListRoom = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const { axios, getToken, user, currency } = useAppContext();

    // Fetch Rooms of the Hotel Owner
    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms/owner/', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                setRooms(data.rooms)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // Toggle Availability of the Room
    const toggleAvailability = async (roomId) => {
        const { data } = await axios.post('/api/rooms/toggle-availability', { roomId },
            { headers: { Authorization: `Bearer ${await getToken()}` } });
        if (data.success) {
            toast.success(data.message)
            fetchRooms()
        }
        else {
            toast.error(data.message)
        }
    }

    // Delete Room
    const deleteRoom = async (roomId) => {
        if (!window.confirm("Are you sure you want to delete this room?")) return;
        try {
            const { data } = await axios.post('/api/rooms/delete', { roomId },
                { headers: { Authorization: `Bearer ${await getToken()}` } });
            if (data.success) {
                toast.success(data.message)
                fetchRooms()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchRooms()
        }
    }, [user])


    return (
        <div className='animate-in fade-in duration-1000'>
            <div className='mb-12'>
                <h2 className='text-iris font-black uppercase tracking-[0.4em] text-[10px] mb-4'>Portfolio Management</h2>
                <h1 className='text-5xl font-black text-midnight tracking-tighter leading-none'>
                    Property Listings.
                </h1>
            </div>

            <div className='mb-8 flex items-center justify-between'>
                <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>Global Inventory: {rooms.length}</p>
                <button onClick={() => navigate('/owner/add-room')} className='px-6 py-2 bg-iris text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-iris/20 transition-all'>
                    Add New Property
                </button>
            </div>

            <div className='w-full overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl shadow-midnight/5'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-slate-50'>
                            <th className='py-6 px-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400'>Property Type</th>
                            <th className='py-6 px-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 max-sm:hidden'>Amenities</th>
                            <th className='py-6 px-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400'>Yield / Night</th>
                            <th className='py-6 px-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400'>Availability</th>
                            <th className='py-6 px-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400'>Actions</th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-slate-50'>
                        {rooms.map((items, index) => (
                            <tr key={index} className='hover:bg-slate-50/50 transition-colors'>
                                <td className='py-6 px-8 font-black text-midnight tracking-tight'>
                                    {items.roomType}
                                </td>

                                <td className='py-6 px-8 text-slate-500 text-xs font-medium max-sm:hidden max-w-xs truncate'>
                                    {items.amenities.join(' • ')}
                                </td>

                                <td className='py-6 px-8 font-black text-midnight'>
                                    {currency}{items.pricePerNight}
                                </td>

                                <td className='py-6 px-8'>
                                    <div className='flex justify-center'>
                                        <label className='relative inline-flex items-center cursor-pointer'>
                                            <input
                                                type="checkbox"
                                                className='sr-only peer'
                                                checked={items.isAvailable}
                                                onChange={() => toggleAvailability(items._id)}
                                            />
                                            <div className='w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-iris transition-colors'></div>
                                            <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm'></span>
                                        </label>
                                    </div>
                                </td>

                                <td className='py-6 px-8'>
                                    <div className='flex items-center justify-center gap-6'>
                                        <button onClick={() => navigate(`/owner/edit-room/${items._id}`)} className='text-[10px] font-black uppercase tracking-widest text-iris hover:underline'>
                                            Edit
                                        </button>
                                        <button onClick={() => deleteRoom(items._id)} className='text-[10px] font-black uppercase tracking-widest text-rose-500 hover:underline'>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListRoom
