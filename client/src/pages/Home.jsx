import React from 'react'
import Hero from '../components/Hero'
import FeaturedDestination from '../components/FeaturedDestination'
import ExclusiveOffer from '../components/ExclusiveOffer'
import Testimonial from '../components/Testimonial'
import Newslatter from '../components/Newslatter'
import RecommendedHotels from '../components/RecommendedHotels'

const Home = () => {
    return (
        <>
            <Hero />
            <RecommendedHotels />
            <FeaturedDestination />
            <ExclusiveOffer />
            <Testimonial />
            <Newslatter />

        </>
    )
}

export default Home