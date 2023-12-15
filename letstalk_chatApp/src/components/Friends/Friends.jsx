import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { getDatabase, ref, onValue, push, remove, set } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeChat } from '../../slices/activeChatSlice';

const Friends = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {                                             //to call data from firebase, we used useEffect
    const friendsRef = ref(db, 'friends/');
    onValue(friendsRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {

        if (item.val().receiverid == data.uid || item.val().senderid == data.uid) {

          arr.push({ ...item.val(), key: item.key });
        }
      })
      setFriends(arr);
    });
  }, [])


  const handleBlock = (item) => {
    if (data.uid == item.senderid) {
      set(push(ref(db, 'block/')), {     //create block in real time dbs in firebase or write
        block: item.receivername,
        blockid: item.receiverid,
        blockby: item.sendername,
        blockbyid: item.senderid
      }).then(() => {
        remove(ref(db, 'friends/' + item.key))
      })
    } else {
      set(push(ref(db, 'block/')), {     //create block in real time dbs in firebase or write
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid
      }).then(() => {
        remove(ref(db, 'friends/' + item.key))
      })
    }
  }

  const handleMessage = (item) => {
    console.log(item);
    if (data.uid == item.senderid) {
      dispatch(
        activeChat({
        status: 'single',
        id: item.receiverid,
        name: item.receivername,
      })
      );
    }else{
      dispatch(
        activeChat({
        status: 'single',
        id: item.senderid,
        name: item.sendername,
      })
      );
    }
  }
  return (

    <div className='h-[440px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md'>
      <div className='flex justify-between'>
        <h3 className='font-Pops font-semibold text-[20px] pb-2'>Friends</h3>
        <PiDotsThreeVerticalBold className='font-bold text-primary_color mt-[5px] text-xl' />
      </div>
      <div className='overflow-y-hidden hover:overflow-y-scroll h-[380px]'>

        {
          friends.length == 0
            ?
            <p className='text-black text-opacity-70 text-[10px] text-lg font-Pops text-center mt-[150px]'>No friends yet</p>
            :
            friends.map((item) => (
              <div onClick={() => handleMessage(item)} className='py-[17px] flex justify-between items-center border-b border-black border-opacity-25 '>
                <div className='flex justify-between items-center'>
                  <img src={item.profileImg} alt="" className='w-[54px] h-[54px] rounded-full' />
                  <div className='ml-[14px]'>
                    <h3 className='text-black text-sm font-semibold font-Pops'>
                      {item.receiverid == data.uid ? item.sendername : item.receivername}
                    </h3>
                    <p className='text-neutral-600 text-opacity-60 text-xs font-medium font-Pops'>Dinner?</p>
                    <div>
                      <p className='text-black text-opacity-70 text-[10px] font-medium font-Pops mr-[10px]'>Today, 8:56pm</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleBlock(item)} className="py-1 px-3 text-white bg-primary_color rounded-[5px] text-base font-semibold font-Pops mr-[20px]">Block</button>
              </div>
            ))
        }




      </div>


    </div>

  )
}

export default Friends
