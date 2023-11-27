import React, { useEffect, useState } from 'react'
import {PiDotsThreeVerticalBold} from 'react-icons/pi'
import GrouppicOne from '../../assets/Profile Pic/G-1.png'
import {IoMdAdd} from 'react-icons/io'
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';


const UserList = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo);
    console.log(data, 'uerlists dataaaa');
    const db = getDatabase();
    let [userlists, setuserlists] = useState([])

    useEffect(() => {
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            //onValue is a method where used for taking data from Firebase
            //data is stored in snapshot and it is showed as Object
            let arr = []
            snapshot.forEach(item => {
                if(item.key != data.uid){

                    arr.push({...item.val(), userid: item.key});   //here, object is converted into array. 
                                            //If want to map then object have to be array
                }
            })
            setuserlists(arr)
        });
    }, [])
    const handleFriendRequest = (item)=>{
        console.log('Okkk', 'item');
            set(push(ref(db, 'friendrequest/')), {
                sendername: data.displayName,
                senderid: data.uid,
                receivername: item.username,
                receiverid: item.userid
              });
    }

  return (
      <div className='h-[450px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md'>
          <div className='flex justify-between'>
              <h3 className='font-Pops font-semibold text-[20px] pb-2'>User List</h3>
              <PiDotsThreeVerticalBold className='font-bold text-primary_color mt-[5px] text-xl' />
          </div>
          <div className='overflow-y-scroll h-[380px]'>
          {
            userlists.map((item)=>(

              <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicOne} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>{item.username}</h3>
                          <p className='text-neutral-600 text-opacity-75 text-[11px] font-medium font-Pops'>{item.email}</p>
                      </div>
                  </div>
                  <button onClick={()=>handleFriendRequest(item)} className="w-[30px] h-[30px] bg-primary_color rounded-[5px] text-white font-Pops text-xl mr-[20px]"><IoMdAdd className='mx-auto font-semibold' /></button>
              </div>
            ))
          }


          </div>


      </div>
  )
}

export default UserList
