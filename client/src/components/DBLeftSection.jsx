import React from 'react';
import {  NavLink } from "react-router-dom";
import { Logo } from "../assets/index";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";


const DBLeftSection = () => {
  return (
    <div className=" flex flex-col bg-lightOverlay py-12 h-full backdrop-blur-md shadow-md min-w-210 w-300 gap-4">
        <NavLink to={"/"} className=" flex items-center justify-start px-6 gap-4">
            <img src={Logo} className="w-12" alt="" />
            <p className="text-3xl text-headingColor font-semibold">City</p>
        </NavLink>

        <hr/>

        <ul className="flex flex-col gap-4">
            <NavLink
                className={({ isActive }) =>
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` 
                : isNotActiveStyles
                }
                to={"/dashboard/home"}
            >
                Home
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                : isNotActiveStyles
                }
                to={"/dashboard/orders"}
            >
                Orders
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` 
                : isNotActiveStyles
                }
                to={"/dashboard/items"}
            >
                Items
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                : isNotActiveStyles
                }
                to={"/dashboard/addNewItems"}
            >
                Add New Items
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                isActive 
                ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
                : isNotActiveStyles
                }
                to={"/dashboard/users"}
            >
                Users
            </NavLink>
        </ul>

            <div className="flex mt-auto px-2 w-full h-225 items-center justify-center">
                <div className=" flex flex-col w-full h-full bg-red-500 justify-center items-center gap-3 px-3 rounded-md">
                    <div className=" w-12 h-12 border bg-white rounded-full items-center justify-center flex gap-3 px-3">
                        <p className="text-2xl text-red-500 font-semibold">?</p>
                    </div>
                    <p className="text-xl text-white font-bold">Help center</p>
                    <p className="text-base text-gray-200 text-center">Having trouble? Please contact us for more question</p>
                    <p className=" px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer ">Get in Touch</p>
                </div>
            </div>

    </div>
  )
}

export default DBLeftSection

