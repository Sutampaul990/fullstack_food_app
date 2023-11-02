import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets/index";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations/index";
import { MdLogout, MdShoppingCart } from "../assets/icons/index";

import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import {setUserNull} from "../context/actions/userActions";

const Header = () => {
  const user = useSelector((state) => state.user);

  const [isMenu, setIsMenu] = useState(false);
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
    <header className=" fixed backdrop-blur-md items-center justify-between flex z-50 inset-x-0 top-0 px-12 py-6 md:px-20 ">
      <NavLink to={"/"} className=" flex items-center justify-center gap-4">
        <img src={Logo} className="w-12" alt="" />
        <p className="text-3xl text-headingColor font-semibold">City</p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className=" hidden md:flex items-center justify-center gap-16">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/services"}
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <motion.div {...buttonClick} className="relative cursor-pointer">
          <MdShoppingCart className=" text-3xl text-textColor cursor-pointer" />
          <div className="flex bg-red-500 rounded-full w-6 h-6 items-center justify-center absolute -top-4 -right-4">
            <p className=" text-primary text-base font-semibold">2</p>
          </div>
        </motion.div>

        {user ? (
          <>
            <div
              className=" relative cursor-pointer"
              onMouseEnter={() => setIsMenu(true)}
            >
              <div className=" flex w-12 h-12 rounded-full shadow-md overflow-hidden items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : Avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className=" flex flex-col px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md top-12 right-0 gap-4 absolute"
                >
                  <Link
                    className=" hover:text-red-500 text-xl text-textColor"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                  <Link
                    className=" hover:text-red-500 text-xl text-textColor"
                    to={"/profile"}
                  >
                    My Profile
                  </Link>
                  <Link
                    className=" hover:text-red-500 text-xl text-textColor"
                    to={"/user-orders"}
                  >
                    Orders
                  </Link>

                  <hr />

                  <motion.div
                    {...buttonClick}
                    className=" group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-4"
                    onClick={signOut}
                  >
                    <MdLogout className="text-xl text-textColor group-hover::text-headingColor" />
                    <p className="text-xl text-textColor group-hover::text-headingColor">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <motion.button
                {...buttonClick}
                className="px-4 py-2 rounded-md shadow-md border bg-lightOverlay border-red-300 cursor-pointer text-xl text-textColor hover:bg-red-500 hover:text-primary"
              >
                login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
