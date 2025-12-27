import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";


const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
)
// Navbar Component
const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/rooms' },
        { name: 'Curated', path: '/curated' },
        { name: 'Contact', path: '/contact' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { openSignIn } = useClerk();
    const location = useLocation();
    const { user, navigate, isOwner, setShowHotelReg } = useAppContext()

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsScrolled(true);
            return;
        } else {
            setIsScrolled(false)
        }
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl flex items-center justify-between px-8 py-5 transition-all duration-700 z-50 rounded-[2rem] ${isScrolled ? "bg-white/90 backdrop-blur-2xl shadow-2xl shadow-primary/5 border border-gray-100" : "bg-transparent"}`}>
            
            {/* Elegant Logo */}
            <Link to='/' className='flex items-center'>
                <img src={assets.logo} alt="MenteStay" className={`h-8 w-auto transition-all ${isScrolled ? 'brightness-0' : 'invert'}`} />
            </Link>

            {/* Modern Navigation */}
            <div className="hidden lg:flex items-center gap-12">
                {navLinks.map((link, i) => (
                    <Link 
                        key={i} 
                        to={link.path} 
                        className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent ${isScrolled ? "text-primary/60" : "text-white/70 hover:text-white"}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <div className='hidden md:flex items-center gap-4'>
                    {user && (
                        <button 
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isScrolled ? 'bg-primary text-white hover:bg-accent' : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'}`} 
                            onClick={() => isOwner ? navigate('/owner') : setShowHotelReg(true)}
                        >
                            {isOwner ? 'Manager' : 'List Property'}
                        </button>
                    )}
                    
                    {!user && (
                        <button 
                            onClick={openSignIn} 
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isScrolled ? "bg-primary text-white" : "bg-white text-primary hover:bg-accent hover:text-white"}`}
                        >
                            Get Started
                        </button>
                    )}
                </div>

                {user && (
                    <div className='flex items-center'>
                        <UserButton afterSignOutUrl="/">
                            <UserButton.MenuItems>
                                <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                            </UserButton.MenuItems>
                        </UserButton>
                    </div>
                )}

                {/* Mobile Menu */}
                <button 
                    onClick={() => setIsMenuOpen(true)}
                    className={`lg:hidden p-2 rounded-xl transition-all ${isScrolled ? 'text-primary' : 'text-primary/60'}`}
                >
                    <div className='w-6 h-0.5 bg-current mb-1.5' />
                    <div className='w-4 h-0.5 bg-current' />
                </button>
            </div>

            {/* Mobile Drawer */}
            <div className={`fixed inset-0 bg-white z-[60] transition-all duration-700 flex flex-col p-12 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}>
                <button onClick={() => setIsMenuOpen(false)} className="self-end text-primary text-4xl font-light">&times;</button>
                
                <div className='flex flex-col gap-8 mt-12'>
                    {navLinks.map((link, i) => (
                        <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className='text-4xl font-black text-primary tracking-tighter hover:text-accent'>
                            {link.name}
                        </Link>
                    ))}
                    <button className='mt-12 w-full py-5 rounded-3xl bg-primary text-white font-black uppercase tracking-widest' onClick={() => { setIsMenuOpen(false); user ? (isOwner ? navigate('/owner') : setShowHotelReg(true)) : openSignIn(); }}>
                        {user ? (isOwner ? 'Dashboard' : 'Partner with Us') : 'Sign In'}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
