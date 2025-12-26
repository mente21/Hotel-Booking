import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="bg-[#F6F9FC] px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">

                {/* Left Logo + Text */}
                <div className="md:max-w-96 ">
                    <img alt="logo" className="mb-4 h-8 md:h-9 invert opacity-80" src={assets.logo} />
                    <p className="mt-6 text-sm">
                        Book your perfect stay with us. We offer seamless hotel reservations, trusted listings, and the best prices to make your travel experience smooth, comfortable, and memorable.
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                        <img src={assets.instagramIcon} alt="instagram-icon" className='w-6' />
                        <img src={assets.facebookIcon} alt="facebook-icon" className='w-6' />
                        <img src={assets.twitterIcon} alt="twitter-icon" className='w-6' />
                        <img src={assets.linkendinIcon} alt="linkendin-icon" className='w-6' />

                    </div>
                </div>

                {/* Columns */}
                <div className="flex-1 flex items-start md:justify-end gap-20">

                    {/* Company */}
                    <div>
                        <h2 className="font-playfair text-xl text-gray-800">COMPANY</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Partners</a></li>

                        </ul>
                    </div>

                    {/* New Column - Resources */}
                    <div>
                        <h2 className="font-playfair text-xl text-gray-800">RESOURCES</h2>
                        <ul className="mt-3 flex flex-col gap-2 text-sm">
                            <li><a href="#">Help</a></li>
                            <li><a href="#">Safety</a></li>
                            <li><a href="#">Cancel</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Access</a></li>
                        </ul>
                    </div>


                    {/* Newsletter */}
                    <div>
                        <h2 className="font-playfair text-xl text-gray-800">STAY UPDATED</h2>
                        <div className="text-sm space-y-2">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>

                            <div className="flex items-center gap-2 pt-4">
                                <input
                                    className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2"
                                    type="email"
                                    placeholder="Enter your email"
                                />

                                <button className="bg-black hover:bg-gray-900 transition-all duration-300 w-20 h-8 rounded-lg flex items-center justify-center shadow-md shadow-black/20">
                                    <img src={assets.arrowIcon} alt="arrow-icon" className="w-3.5 invert" />
                                </button>


                            </div>
                        </div>
                    </div>
                    <hr className='border-gray-300 mt-8' />
                </div>
            </div>

            {/* Bottom */}
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p className="pt-4 text-center text-xs md:text-sm pb-5">
                    Copyright ©{new Date().getFullYear()} - Mentesnot Debele .All rights reserved.
                </p>
                <ul className="flex items-center gap-4">
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>


        </footer>
    )
}

export default Footer
