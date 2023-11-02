/* eslint-disable default-case */
import React, { useState } from 'react';
import { statuses } from "../utils/styles"
import { Spinner } from '../components';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { deleteObject , ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase.config"
import { useDispatch, useSelector } from 'react-redux';
import { alertDanger, alertNULL , alertSuccess } from '../context/actions/alertActions';
import { motion } from 'framer-motion';
import { buttonClick } from '../animations';
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";


const DBNewItems = () => {

  const [itemName, setItemName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [imgDownloadUrl, setImgDownloadUrl] = useState(null)

  const alert = useSelector((state) => state.alert)
  const dispatch = useDispatch();



  const uploadImg = (e) => {
    setIsLoading(true);
    const imgFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`error : ${error}`))
        setTimeout(() => {
          dispatch(alertNULL())
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgDownloadUrl(downloadURL);
          setIsLoading(false);
          setProgress(null);

          dispatch(alertSuccess("Image uploaded to Cloud Successfully...."))
            setTimeout(() => {
              dispatch(alertNULL())
            }, 3000);
          });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imgDownloadUrl);

    deleteObject(deleteRef).then(() => {
      setImgDownloadUrl(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image removed from the cloud"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  return (
    <div className=" flex flex-col justify-center items-center pt-6 px-24 w-full ">
      <div className="flex flex-col justify-center items-center w-full p-4 border border-gray-300 gap-4 rounded-md">
        <InputValueField
          type="text"
          placeholder="Add Item Here...."
          stateFunc={setItemName}
          stateValue={itemName}
        />
        <div className=" flex-wrap justify-around items-center w-full flex gap-4">
          {statuses && statuses?.map((data) => (
            <p
              key={data.id}
              onClick={() => setCategory(data.category)}
              className={`px-4 py-3 text-textColor border border-gray-200 font-semibold text-xl hover:shadow-md rounded-md backdrop-blur-md cursor-pointer ${data.category === category ? 'bg-red-400 text-white' : 'bg-transparent'}`}
            >{data.title}</p>
          ))}
        </div>
        <InputValueField
          type="number"
          placeholder="Set Price Here...."
          stateFunc={setPrice}
          stateValue={price}
        />
        <div className="shadow-md border-2 border-dotted h-370 w-full bg-card cursor-pointer backdrop-blur-md border-gray-200">
          {isLoading ?
            <>
              <div
                className="flex flex-col justify-center items-center w-full h-full px-24"
              >
                <Spinner />
                {progress}
              </div>
            </> :
            <>
              {!imgDownloadUrl ?
                <>
                  <label>
                    <div className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudDownloadAlt className=" rotate-0 " />
                        </p>
                        <p className=" text-lg text-textColor">Click to upload an Image</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-img"
                      accept="image/"
                      onChange={uploadImg}
                      className="w-0 h-0"
                    />
                  </label>
                </> : 
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imgDownloadUrl}
                      className=" w-full h-full object-cover"
                    />

                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imgDownloadUrl)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
                }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export const InputValueField = ({ type, placeholder, stateFunc, stateValue }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className=" w-full px-4 py-3 outline-none border-gray-200 hover:border-red-400 rounded-md shadow-md border bg-lightOverlay"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  )
}

export default DBNewItems
