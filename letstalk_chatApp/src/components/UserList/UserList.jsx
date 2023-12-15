import React, { useEffect, useState } from 'react'
import {PiDotsThreeVerticalBold} from 'react-icons/pi'
import GrouppicOne from '../../assets/Profile Pic/G-1.png'
import {IoMdAdd} from 'react-icons/io'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const UserList = () => {
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [FriendRequestList, setFriendRequestList] = useState([])
  const db = getDatabase();
  let [userlists, setuserlists] = useState([])

  useEffect(() => {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      //onValue is a method where used for taking data from Firebase
      //data is stored in snapshot and it is showed as Object
      let arr = []
      snapshot.forEach(item => {
        if (item.key != data.uid) {

          arr.push({ ...item.val(), userid: item.key });   //here, object is converted into array. And ... it is spread operator where call all property of 'item'
          //If want to map then object have to be array
        }
      })
      setuserlists(arr)
    });
  }, [])



  useEffect(() => {                                          //to call data from firebase, we used useEffect
    const friendRequestRef = ref(db, 'friendrequest/');
    onValue(friendRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        console.log(item.val());
        arr.push(item.val().receiverid + item.val().senderid);
      })
      setFriendRequestList(arr)
    });
  }, [])
  console.log(FriendRequestList);

  const handleFriendRequest = (item) => {
    set(push(ref(db, 'friendrequest/')), {
      sendername: data.displayName,
      senderid: data.uid,
      receivername: item.username,
      receiverid: item.userid
    });
  }

  const [friendslist, setFriendslist] = useState([])     //after friends part that will be set
  useEffect(() => {                          //to call data from firebase, we used useEffect
    const friendsRef = ref(db, 'friends/');
    onValue(friendsRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push(item.val().receiverid + item.val().senderid);
      })
      setFriendslist(arr);
    });
  }, [])

  const [blocklist, setblocklists] = useState([])
  useEffect(() => {
    const blocklistsRef = ref(db, 'block/');
    onValue(blocklistsRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        console.log(item.val());
        arr.push(item.val().blockid + item.val().blockbyid);
      })
      setblocklists(arr)
    });
  }, [])




  return (
      <div className='h-[450px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md'>
          <div className='flex justify-between'>
              <h3 className='font-Pops font-semibold text-[20px] pb-2'>User List</h3>
              <PiDotsThreeVerticalBold className='font-bold text-primary_color mt-[5px] text-xl' />
          </div>
          <div className='overflow-y-hidden hover:overflow-y-scroll h-[380px]'>
          { 
            userlists.length == 0
            ?
            <p className='text-black text-opacity-70 text-[10px] text-lg font-Pops text-center mt-[150px]'>No users here</p>
            :
            userlists.map((item)=>(

              <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
                  <div className='flex justify-between items-center'>
                      <img src={item.profileImg} alt="" className='w-[54px] h-[54px] rounded-full' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>{item.username}</h3>
                          <p className='text-neutral-600 text-opacity-75 text-[11px] font-medium font-Pops'>{item.email}</p>
                      </div>
                  </div>
                  { 
                    blocklist.includes(data.uid+item.userid) ||
                    blocklist.includes(item.userid+data.uid)
                    ?
                    <p className=" bg-white border-red-500 rounded-[5px] py-[2px] px-[3px] text-red-500 font-Pops text-md font-semibold mr-[20px]">Blocked</p>
                    :
                    friendslist.includes(data.uid+item.userid) ||
                    friendslist.includes(item.userid+data.uid)
                    ?
                    <button className=" bg-primary_color rounded-[5px] py-[2px] px-[3px] text-white font-Pops text-md mr-[20px]">Friends</button>
                    :
                    FriendRequestList.includes(data.uid+item.userid) ||
                    FriendRequestList.includes(item.userid+data.uid)
                    ?
                    <button className=" bg-primary_color rounded-[5px] py-[2px] px-[3px] text-white font-Pops text-md mr-[20px]">Pending</button>
                    :
                    <button onClick={()=>handleFriendRequest(item)} className="w-[30px] h-[30px] bg-primary_color rounded-[5px] text-white font-Pops text-xl mr-[20px]"><IoMdAdd className='mx-auto font-semibold' /></button>
                  }
              </div>
            ))
          }


          </div>


      </div>
  )
}

export default UserList
