import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const SideBar = () => {

    const sidebarLinks = [
        { name: "Overview", path: "/owner", icon: assets.dashboardIcon },
        { name: "Add Property", path: "/owner/add-room", icon: assets.addIcon },
        { name: "Listings", path: "/owner/list-room", icon: assets.listIcon },
    ]

    return (
        <div className='md:w-72 w-20 bg-white border-r border-slate-100 h-full pt-10 flex flex-col'>
            <div className='flex flex-col gap-2 px-4'>
                {sidebarLinks.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        end
                        className={({ isActive }) =>
                            `flex items-center py-4 px-6 gap-4 rounded-2xl transition-all duration-300 group ${isActive
                                ? "bg-iris text-white shadow-xl shadow-iris/20"
                                : "text-slate-500 hover:bg-slate-50 hover:text-midnight"}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <img src={item.icon} alt={item.name} className={`h-5 w-5 transition-all ${isActive ? 'brightness-0 invert' : ''}`} />
                                <p className='md:block hidden text-xs font-black uppercase tracking-widest'>{item.name}</p>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
            
            <div className='mt-auto p-8'>
                <div className='p-6 rounded-3xl bg-iris/5 border border-iris/10'>
                    <p className='text-[10px] font-black text-iris uppercase tracking-widest mb-2'>Partner Support</p>
                    <p className='text-slate-500 text-[10px] leading-relaxed'>Dedicated assistance for our property managers.</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar
