import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import SideBar from '../../components/hotelOwner/SideBar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const LayOut = () => {
    const { isOwner, navigate } = useAppContext()

    useEffect(() => {
        if (!isOwner) {
            navigate('/')
        }
    }, [isOwner])
    return (
        <div className="flex flex-col h-screen">

            <Navbar />

            <div className="flex flex-1 overflow-hidden">

                <SideBar />

                <div className="flex-1 p-12 md:px-20 overflow-y-auto bg-bone">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default LayOut
