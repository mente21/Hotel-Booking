import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
    return (
        <div className='section-padding pt-40 bg-bone min-h-screen'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col lg:flex-row gap-32 items-stretch'>
                    
                    {/* Left Side - Luxury Branding & Info */}
                    <div className='lg:w-1/2 flex flex-col'>
                        <div className='animate-in fade-in slide-in-from-left-10 duration-1000'>
                            <h2 className='text-iris font-black uppercase tracking-[0.4em] text-[10px] mb-8'>Global Concierge Desk</h2>
                            <h1 className='text-7xl md:text-9xl font-black text-midnight tracking-tighter leading-[0.8] mb-12'>
                                ALWAYS <br /> 
                                <span className='text-transparent' style={{ WebkitTextStroke: '1px #020617' }}>AVAILABLE.</span>
                            </h1>
                            
                            <p className='text-slate-500 font-medium text-lg max-w-md leading-relaxed mb-20'>
                                From bespoke trip planning to property partnerships, our elite team is here to assist your every need.
                            </p>
                        </div>
                        
                        <div className='space-y-12 mt-auto pb-10'>
                            <div className='p-8 rounded-[2.5rem] bg-indigo-deep text-white border border-white/5 relative overflow-hidden group'>
                                <div className='absolute top-0 right-0 w-32 h-32 bg-iris/20 blur-3xl rounded-full' />
                                <h3 className='text-[10px] font-black uppercase tracking-widest text-iris mb-4'>Inquiry Desk</h3>
                                <p className='text-2xl font-black tracking-tight mb-2'>concierge@mentestay.com</p>
                                <p className='text-white/40 text-xs font-medium'>Response time: &lt; 2 Hours</p>
                            </div>

                            <div className='p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-midnight/5 group hover:border-iris/20 transition-all'>
                                <h3 className='text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4'>Partnership Suite</h3>
                                <p className='text-2xl font-black tracking-tight text-midnight mb-2'>partners@mentestay.com</p>
                                <p className='text-slate-400 text-xs font-medium'>Portfolio Acquisition Team</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Modern Minimal Form */}
                    <div className='lg:w-1/2 w-full'>
                        <div className='h-full p-12 md:p-16 rounded-[4rem] bg-midnight border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col'>
                            <div className='mb-12'>
                                <h2 className='text-white text-3xl font-black tracking-tighter'>Send an Inquiry.</h2>
                                <p className='text-slate-500 text-sm mt-2'>Private & Encrypted communication.</p>
                            </div>
                            
                            <form className='space-y-8 flex-1'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500'>Full Name</label>
                                        <input type="text" className='bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-iris transition-colors font-bold text-white placeholder:text-slate-700' placeholder="Alexander M." />
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500'>Email Address</label>
                                        <input type="email" className='bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-iris transition-colors font-bold text-white placeholder:text-slate-700' placeholder="alex@gmail.com" />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500'>Subject</label>
                                    <select className='bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-iris transition-colors font-bold text-white appearance-none cursor-pointer'>
                                        <option>Trip Planning</option>
                                        <option>Support</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <label className='text-[10px] font-black uppercase tracking-[0.2em] text-slate-500'>Message</label>
                                    <textarea rows="5" className='bg-slate-900/50 border border-white/10 rounded-3xl p-6 outline-none focus:border-iris transition-colors font-bold text-white placeholder:text-slate-700 resize-none' placeholder="How can we assist you?"></textarea>
                                </div>

                                <button className='w-full py-6 bg-iris text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-iris shadow-2xl shadow-iris/20 hover:scale-[1.02] active:scale-95 transition-all mt-auto'>
                                    Engage Concierge
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contact
