import React, { useEffect } from 'react';
import axios from 'axios';
import { User } from 'lucide-react';
import Search from './Search';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.persisted.user.userData);

  const logout = async () => {
    try {
    
      dispatch(clearUser(currentUser));
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  const AddVehicle  =async() => {
   navigate('/add-vehicle')
  }

  return (
    <section className='topbar bg-blue-300 fixed w-full'>
      <div className='flex flex-row justify-between py-1 px-5 gap-2'>
        <Link to="/" className='flex gap-3 items-center'>
          <span className='p-2'>Home</span>
        </Link>
        <div className='mt-2'>
          <Search />
        </div>
        <div className='flex gap-2 mt-1'>
          <button className="btn btn-secondary" onClick={AddVehicle}>
            Add-vehicle
          </button>
        </div>
        <div className='flex gap-2 mt-1'>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
