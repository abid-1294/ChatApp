import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from '../../components/Sidebar/Sidebar';
import GroupList from '../../components/GroupList/GroupList';
import Friends from '../../components/Friends/Friends';
import UserList from '../../components/UserList/UserList';
import FriendRequest from '../../components/FriendRequest/FriendRequest';
import MyGroups from '../../components/MyGroups/MyGroups';
import BlockedUser from '../../components/BlockedUser/BlockedUser';
import { userLoginInfo } from '../../slices/userSlice';


const Home = () => {
  const auth = getAuth();
  const navigate =useNavigate()
  const data = useSelector (state=> state.userLoginInfo.userInfo)
  const [verify, setVerify] = useState(false)
  const [loaded, setloaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])
  onAuthStateChanged(auth, (user) => {
  console.log(user, 'Weeeeee');
  if(user.emailVerified){
    setVerify(true)
    dispatch(userLoginInfo(user))
    localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
  }
  setloaded(true)
});

console.log(verify);

  return (
    <div className='overflow-y-hidden h-[100vh]'>
      {loaded && <div>
      {
        verify ?
        <div className='flex'>
          <div className='w-[186px]'><Sidebar active='home'/></div>
          <div className='w-[450px] mt-[33px] ml-[43px] mb-[43px] mr-[33px]'><GroupList/><FriendRequest/></div>
          <div className='w-[420px] mt-[33px] ml-[43px] mb-[43px] mr-[33px]'><Friends/><MyGroups/></div>
          <div className='w-[420px] mt-[33px] ml-[43px] mb-[43px] mr-[33px]'><UserList/><BlockedUser/></div>
        </div>
        :
        <div className='h-screen w-full bg-primary_color flex justify-center items-center'>
          <div className='bg-white rounded p-[20px] w-[800px]'>
            <h1 className='text-center border-2 border-red-500 font-bold text-[26px] text-[#03014C] font-Osans mt-[10px]'><a href="https://mail.google.com/mail" target='_blank'>Please Verify your email</a></h1>
            <button className='block mx-auto w-[200px] h-[40px] mt-[55px] mb-[35px] text-white font-Osans text-[16px] font-semibold bg-primary_color rounded-lg px-[10px] py-[10px] cursor-pointer'>
              <Link to="/login">Back to Login</Link>
            </button>
          </div>
        </div>
      }
    </div>}

    </div>

    
  )
}

export default Home
