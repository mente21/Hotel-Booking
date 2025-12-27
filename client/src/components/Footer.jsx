import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-24 pb-12 transition-all">
            <div className="section-padding !py-0 grid grid-cols-1 md:grid-cols-12 gap-16 border-b border-gray-100 pb-20">

                {/* Brand Presence */}
                <div className="md:col-span-4 max-w-sm">
                    <div className='mb-8'>
                        <img src={assets.logo} alt="MenteStay" className="h-12 w-auto" />
                    </div>
                    <p className="text-gray-400 font-light leading-relaxed mb-8">
                        Curating exceptional travel experiences through a handpicked portfolio of the world's most distinguished hotels and boutique resorts.
                    </p>
                    <div className="flex items-center gap-4">
                        {[assets.instagramIcon, assets.facebookIcon, assets.twitterIcon, assets.linkendinIcon].map((icon, i) => (
                            <a key={i} href="#" onClick={(e) => e.preventDefault()} className='p-3 rounded-full border border-gray-100 hover:border-accent hover:bg-accent-soft hover:-translate-y-1 transition-all group'>
                                <img src={icon} alt="" className='w-4 opacity-40 group-hover:opacity-100' />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Refined Navigation Grid */}
                <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                    <div>
                        <h4 className="font-playfair text-xl font-bold text-primary mb-8 tracking-tight">Portfolio</h4>
                        <ul className="space-y-4 text-sm font-light text-gray-500">
                            <li><Link to="/rooms" className='hover:text-accent transition-colors'>Luxury Resorts</Link></li>
                            <li><Link to="/rooms" className='hover:text-accent transition-colors'>Boutique Hotels</Link></li>
                            <li><Link to="/rooms" className='hover:text-accent transition-colors'>Private Villas</Link></li>
                            <li><Link to="/rooms" className='hover:text-accent transition-colors'>City Suites</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-playfair text-xl font-bold text-primary mb-8 tracking-tight">Concierge</h4>
                        <ul className="space-y-4 text-sm font-light text-gray-500">
                            <li><Link to="/contact" className='hover:text-accent transition-colors'>About MenteStay</Link></li>
                            <li><Link to="/rooms" className='hover:text-accent transition-colors'>Curated Guide</Link></li>
                            <li><Link to="/owner" className='hover:text-accent transition-colors'>Partner Program</Link></li>
                            <li><Link to="/contact" className='hover:text-accent transition-colors'>Member Services</Link></li>
                        </ul>
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                        <h4 className="font-playfair text-xl font-bold text-primary mb-8 tracking-tight">Headquarters</h4>
                        <p className='text-sm font-light text-gray-500 leading-relaxed mb-4'>
                            123 Luxury Avenue, <br />
                            Elite District, NY 10001
                        </p>
                        <p className='text-sm font-bold text-accent'>
                            concierge@mentestay.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Legal & Final Details */}
            <div className='section-padding !py-0 pt-12 flex flex-col md:flex-row gap-6 items-center justify-between'>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                    &copy; {new Date().getFullYear()} Mentesnot Debele. All rights reserved.
                </p>
                <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">
                    <Link to="/" className='hover:text-primary transition-colors'>Privacy</Link>
                    <Link to="/" className='hover:text-primary transition-colors'>Terms</Link>
                    <Link to="/" className='hover:text-primary transition-colors'>Cookies</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
