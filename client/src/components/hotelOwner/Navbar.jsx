import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-8 py-5 bg-white border-b border-slate-100'>
            <Link to='/' className='flex items-center gap-3 group'>
                <img src={assets.logo} alt="MenteStay" className='h-10 w-auto transition-transform group-hover:scale-105' />
                <span className='px-3 py-1 rounded-lg bg-iris/10 border border-iris/20 text-iris text-[10px] font-black uppercase tracking-widest'>Manager Panel</span>
            </Link>
            
            <div className='flex items-center gap-6'>
                <UserButton appearance={{ baseTheme: 'light' }} />
            </div>
        </div>
    )
}

export default Navbar
