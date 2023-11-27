import React, { useState, createRef } from 'react'
import { getAuth, signOut, updateProfile } from "firebase/auth";
import {LiaHomeSolid} from 'react-icons/lia'
import {AiFillMessage} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {SlSettings} from 'react-icons/sl'
import {VscSignOut} from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom';
import {BiUpload} from 'react-icons/bi'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const data = useSelector(state=> state.userLoginInfo.userInfo)
  
  console.log(data, 'daaaaaataaaaaaaaa');
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  
  
  let [profileModal, setprofileModal] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()


 //profile img cropper
  const onChanger = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  let handleProfileModal=()=>{
    setprofileModal(true)
  }
  console.log(profileModal);

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      setTimeout(()=>{
        navigate('/login')
      },2000)
      
    }).catch((error) => {
      console.log(error.code)
    });  
  }

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          // setprofilePhoto(downloadURL)
          console.log(downloadURL,'DOWNLOADURL');
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(()=>{
            setprofileModal(false)
            setImage('');
            setCropData('')
          })
        });
      });
    }
  };

  return (

    <>
     
        <div className='bg-primary_color h-screen rounded-br-lg rounded-tr-lg pt-[38px]'>
          <div className='w-[96px] h-[96px] mx-auto rounded-full overflow-hidden group relative'>
            <img src={data.photoURL} alt="Profile Pic" className='w-full h-full' />
            <div onClick={handleProfileModal} className='w-0 h-full group-hover:w-full bg-[rgba(0,0,0,0.4)] absolute top-0 left-0 flex justify-center items-center'><BiUpload className='text-white' /></div>
          </div>
          <p className='text-white font-Osans text-[16px] font-semibold text-center mt-10'>{data.displayName}</p>
          <div className='mt-[78px] py-[20px] z-[1] relative after:absolute after:content-[""] after:top-0 after:left-[25px] after:bg-white after:w-full after:h-full after:z-[-1] after:rounded-l-xl overflow-hidden before:absolute before:[""] before:bg-primary_color before:top-0 before:right-0 before:w-[8px] before:h-full before:rounded-l-lg'>
            <LiaHomeSolid className='text-5xl mx-auto text-primary_color font-bold' />
          </div>
          <div className='mt-[60px]'>
            <AiFillMessage className='text-5xl mx-auto text-[#BAD1FF] font-bold' />
          </div>
          <div className='mt-[60px]'>
            <IoMdNotificationsOutline className='text-5xl mx-auto text-white font-bold' />
          </div>
          <div className='mt-[60px]'>
            <SlSettings className='text-5xl mx-auto text-white font-bold' />
          </div>
          <div className='mt-[210px]'>
            <VscSignOut onClick={handleSignOut} className='text-5xl mx-auto text-white font-bold' />
          </div>

        </div>
        {
          profileModal &&
          <div className='w-full h-screen bg-[rgba(0,0,0,0.4)] absolute flex justify-center items-center top-0 left-0 z-[1]'>
          <div className=' w-[500px] px-[10px] py-[10px] rounded bg-black  text-center'>
            <h1 className='text-xl mt-5 w-[400px] pb-2 mx-auto text-white font-Pops font-semibold border-b'>Upload your Profile Picture</h1>

            {
              image ?
            <div className='w-[150px] h-[150px] rounded-full overflow-hidden mx-auto my-4'>
            <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
            />
            </div>
            :
            <div className='w-[150px] h-[150px] rounded-full overflow-hidden mx-auto my-4'>
            <img src={data.photoURL} alt="" />
            </div>

            }
           
            {
              image &&
              <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
                />
              }
              <input onChange={onChanger} type="file" className='block mx-auto mt-[50px] w-[300px] py-3 px-2 bg-white rounded-full font-Nun'/>

            <button onClick={getCropData} className='bg-primary_color mt-10 mb-5 text-white py-3 px-4 rounded'>Upload</button>
            <button onClick={()=>setprofileModal(false)} className='bg-white mt-10 mb-5 ml-5 text-black py-3 px-4 rounded'>Cancel</button>
          </div>
        </div>
        }


    </>

  )
}

export default Sidebar
