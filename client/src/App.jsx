import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetail from './pages/RoomDetail'
import MyBookings from './pages/MyBookings'
import HotelReg from './components/HotelReg'
import LayOut from './pages/hotelOwner/LayOut'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'
import EditRoom from './pages/hotelOwner/EditRoom'
import Curated from './pages/Curated'
import Contact from './pages/Contact'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import Loader from './components/Loader'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}

      {showHotelReg && <HotelReg />}

      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetail />} />
          <Route path='/curated' element={<Curated />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/loader/:nextUrl' element={<Loader />} />

          <Route path='/owner' element={<LayOut />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='edit-room/:id' element={<EditRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>

        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
