import React from 'react'
import { BsFillBellFill, BsToggles2 } from 'react-icons/bs';
import { MdSearch } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { buttonClick } from '../animations';
import { Avatar} from "../assets/index";
import { MdLogout } from "../assets/icons/index";
import { motion } from 'framer-motion';

import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import {setUserNull} from "../context/actions/userActions";
import { useNavigate } from "react-router-dom";


const DBHeader = () => {

    const user = useSelector( (state) => state.user);
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut = () => {
        firebaseAuth
        .signOut()
        .then(() => {
            dispatch(setUserNull())
        navigate("./login", { replace: true });
        })
        .catch((err) => console.log(err))
    };

  return (
    <div className=" w-full flex items-center justify-between gap-4">
      <p className=" text-headingColor text-3xl font-bold">
        Welcome to City
        { user?.name && <span className=" font-semibold text-base text-gray-500 block">{` Hello ${user?.name}...!`}</span> }
      </p>
      <div className=" flex justify-center items-center gap-4">
        <div className=" flex items-center justify-center bg-lightOverlay shadow-md backdrop-blur-md px-6 py-4 gap-3 rounded-full">
            <MdSearch className=" text-gray-500 text-2xl"/>
            <input className="border-none outline-none bg-transparent w-32 font-semibold text-textColor text-base" type="text" placeholder="Search Here..."/>
            <BsToggles2 className=" text-gray-500 text-2xl"/>
        </div>

        <motion.div 
            {...buttonClick}
            className="w-10 h-10 flex items-center justify-center rounded-md shadow-md backdrop-blur-md bg-lightOverlay cursor-pointer"
        >
            <BsFillBellFill className=" text-xl text-gray-500"/>
        </motion.div>
        <div className=" flex w-12 h-12 rounded-full shadow-md overflow-hidden items-center justify-center">
            <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user?.picture : Avatar}
                whileHover={{ scale: 1.15 }}
                referrerPolicy="no-referrer"
            />
        </div>
        <motion.div
            {...buttonClick}
            className=" group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-4"
            onClick={signOut}
        >
            <MdLogout className="text-xl text-textColor" />
            
        </motion.div>

      </div>
      
    </div>
  )
}

export default DBHeader
