import React, { useEffect, useState } from 'react'
import {PiDotsThreeVerticalBold} from 'react-icons/pi'
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [FriendRequest, setFriendRequest] = useState([])

  useEffect(() => {                                             //to call data from firebase, we used useEffect
    const friendRequestRef = ref(db, 'friendrequest/');
    onValue(friendRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if(item.val().receiverid == data.uid){      //I am login, other user is receiver. my info is in data which is in Redux;
          arr.push({...item.val(), id: item.key});
        }
      })
      setFriendRequest(arr)
    });
  }, [])

  const handleAccept = (item) =>{      
  set(push(ref(db, 'friends/')), {      //create friends in real time dbs in firebase
      ...item
    }).then(()=>{
      remove(ref(db, 'friendrequest/'))
    })
  }


  return (
    <div className='h-[450px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md mt-[40px]'>
          <div className='flex justify-between'>
              <h3 className='font-Pops font-semibold text-[20px] pb-2'>Friend Request</h3>
              <PiDotsThreeVerticalBold className='font-bold text-primary_color mt-[5px] text-xl' />
          </div>
          <div className='overflow-y-hidden hover:overflow-y-scroll h-[380px]'>
          { 
            FriendRequest.length == 0
            ?
            <p className='text-black text-opacity-70 text-[10px] text-lg font-Pops text-center mt-[150px]'>No friend request yet</p>
            :
            FriendRequest.map((item)=>(
              <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
              <div className='flex justify-between items-center'>
                <img src={item.profileImg} alt="" className='w-[70px] h-[70px] rounded-full' />
                <div className='ml-[14px]'>
                    <h3 className='text-black text-lg font-semibold font-Pops'>{item.sendername}</h3>
                    <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops'></p>
                </div>
              </div>
                <button onClick={() => handleAccept(item)} className="w-[87px] h-[38px] text-white bg-primary_color rounded-[5px] text-xl font-semibold font-Pops mr-[20px]">Accept</button>
            </div>
            ))
          }
          </div>


      </div>
  )
}

export default FriendRequest
