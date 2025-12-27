import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';

const Dashboard = () => {

    const { currency, user, getToken, toast, axios } = useAppContext();

    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    });

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/bookings/hotel', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                setDashboardData(data.dashboardData);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    return (
        <div className='animate-in fade-in duration-1000'>
            <div className='mb-12'>
                <h2 className='text-iris font-black uppercase tracking-[0.4em] text-[10px] mb-4'>Operational Overview</h2>
                <h1 className='text-5xl font-black text-midnight tracking-tighter leading-none'>
                    Manager Console.
                </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-20'>
                {/* ----total booking---- */}
                <div className='p-8 rounded-[2.5rem] bg-indigo-deep text-white border border-white/5 relative overflow-hidden group'>
                    <div className='absolute top-0 right-0 w-32 h-32 bg-iris/20 blur-3xl rounded-full' />
                    <p className='text-[10px] font-black uppercase tracking-widest text-iris mb-4'>Total Volume</p>
                    <div className='flex items-baseline gap-2'>
                        <p className='text-5xl font-black tracking-tighter'>{dashboardData.totalBookings}</p>
                        <p className='text-iris font-black text-xs uppercase'>Bks</p>
                    </div>
                </div>

                {/* -------total revenue------ */}
                <div className='p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-midnight/5 flex flex-col justify-center'>
                    <p className='text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4'>Revenue Yield</p>
                    <div className='flex items-baseline gap-2'>
                        <p className='text-5xl font-black tracking-tighter text-midnight'>{currency}{dashboardData.totalRevenue}</p>
                        <p className='text-slate-400 font-black text-xs uppercase'>Net</p>
                    </div>
                </div>

                {/* -------Status Card------ */}
                <div className='p-8 rounded-[2.5rem] bg-bone border border-slate-100 flex flex-col justify-center'>
                    <p className='text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4'>System Status</p>
                    <div className='flex items-center gap-3'>
                        <div className='w-3 h-3 bg-green-500 rounded-full animate-pulse' />
                        <p className='text-2xl font-black tracking-tight text-midnight uppercase'>Active</p>
                    </div>
                </div>
            </div>

            {/* -----recent booking----- */}
            <div className='mb-8 flex items-center justify-between'>
                <h2 className='text-2xl font-black text-midnight tracking-tighter'>Recent Reservations.</h2>
                <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>Last 10 Activities</p>
            </div>

            <div className='w-full overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-2xl shadow-midnight/5'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-slate-50'>
                            <th className='py-6 px-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400'>Guest</th>
                            <th className='py-6 px-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 max-sm:hidden'>Suite Type</th>
                            <th className='py-6 px-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400'>Yield</th>
                            <th className='py-6 px-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400'>Status</th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-slate-50'>
                        {dashboardData.bookings.map((item, index) => (
                            <tr key={index} className='hover:bg-slate-50/50 transition-colors'>
                                <td className='py-6 px-8 font-black text-midnight tracking-tight'>
                                    {item.user?.username || 'Unknown User'}
                                </td>

                                <td className='py-6 px-8 text-slate-500 text-sm font-medium max-sm:hidden'>
                                    {item.room?.roomType || 'Deleted Room'}
                                </td>

                                <td className='py-6 px-8 text-center font-black text-midnight'>
                                    {currency}{item.totalPrice}
                                </td>

                                <td className='py-6 px-8 flex justify-center'>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${item.isPaid ? 'bg-green-500/10 text-green-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {item.isPaid ? 'Settled' : 'Unpaid'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default Dashboard;
