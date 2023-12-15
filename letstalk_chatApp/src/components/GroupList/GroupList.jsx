import React, { useEffect, useState } from 'react'
import GrouppicOne from '../../assets/Profile Pic/G-1.png'
import { IoIosPeople } from 'react-icons/io'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import AdminIcon from '../../assets/Adminicon.png'
const GroupList = () => {
  const db = getDatabase();
  const data = useSelector(state => state.userLoginInfo.userInfo);
  const [CreateGroupModal, setCreateGroupModal] = useState(false)
  const [Groupname, setGroupname] = useState('')
  const [GroupTagname, setGroupTagname] = useState('')
  const [GroupList, setGroupList] = useState('')

  const handleCreateGroupModal = () => {
    setCreateGroupModal(true);
    console.log('Create Group');
  }

  const handleCreateGroup = () => {
    console.log('Group has been created');
    set(push(ref(db, 'group/')),{
      adminid: data.uid,
      adminname: data.displayName,
      groupname: Groupname,
      grouptagname: GroupTagname
    }).then(()=>{
      setCreateGroupModal(false);
    })
  }

  useEffect(() => {                                             //to call data from firebase, we used useEffect
    const groupRef = ref(db, 'group/');
    onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item) => {
            if(item.val().adminid != data.uid) {
                arr.push(item.val());
            }
        })
        setGroupList(arr);
    });
}, [])

  return (
    <>
      {
        CreateGroupModal
          ?
          <div className='w-full h-screen bg-[rgba(0,0,0,0.4)] absolute flex justify-center items-center top-0 left-0 z-[1]'>
            <div className='w-[500px] px-[50px] py-[10px] rounded bg-black  text-center'>
              <h1 className='text-xl mt-5 w-[400px] pb-2 mx-auto text-white font-Pops font-bold border-b'>CREATE YOUR GROUP</h1>
              <div className='text-center mt-5'>
                <p className='text-white text-lg font font-semibold text-left'>Group Name</p>
                <div className='flex items-center'>
                  <IoIosPeople className='text-white w-[30px] h-[30px] mt-4 mr-5' />
                  <input type="text" onChange={(e)=>setGroupname(e.target.value)} className='outline-none w-[300px] text-base text-white font-medium rounded p-5 h-8 bg-[rgba(255,255,255,0.4)] z-[10] mt-3' />
                </div>
                <p className='text-white text-lg font font-semibold mt-5 text-left'>Group TagName</p>
                <div className='flex items-center'>
                  <p className='text-white text-2xl mr-[37px] mt-3'>#</p>
                  <input type="text" onChange={(e)=>setGroupTagname(e.target.value)} className='outline-none w-[300px] text-base text-white font-medium rounded p-5 h-8 bg-[rgba(255,255,255,0.4)] z-[10] mt-3' />
                </div>
              </div>
              <button onClick={() => setCreateGroupModal(false)} className='font-bold bg-none border border-white mt-8 text-xl text-white rounded-md px-10 pt-[5px] pb-[4px] items-center mb-5 hover:bg-white hover:text-primary_color'>Cancel</button>
              <button onClick={handleCreateGroup} className='font-bold bg-primary_color border border-primary_color mt-8 text-xl text-white rounded-md px-10 pt-[5px] pb-[4px] items-center mb-5 ml-5 hover:border-white'>Create</button>
            </div>
          </div>

          :
          GroupList.length == 0
          ?
          <p className='text-black text-opacity-70 text-[10px] text-lg font-Pops text-center mt-[150px]'>No block yet</p>
          :
          <div className='h-[450px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md'>
            <div className='flex justify-between'>
              <h3 className='font-Pops font-semibold text-[20px] pb-2'>Group List</h3>
              <button onClick={handleCreateGroupModal} className='font-bold bg-white border border-primary_color mt-[5px] text-xl text-primary_color rounded-md px-2 pt-[1px] pb-[3px] items-center'>Create Group</button>
            </div>
            <div className='overflow-y-hidden hover:overflow-y-scroll h-[380px]'>
            {
              GroupList.map((item)=>(
              <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
                <div className='flex justify-between items-center'>
                  <img src={GrouppicOne} alt="" className='w-[70px] h-[70px] rounded-full' />
                  <div className='ml-[14px]'>
                    <h3 className='text-black text-lg font-semibold font-Pops'>{item.groupname}</h3>
                    <div className='flex items-center'>
                      <img src={AdminIcon} alt="" className='w-[15px] h-[15px] mr-1'/>
                      <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops'>{item.adminname}</p>
                    </div>
                    <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops w-[50px]'>{item.grouptagname}</p>
                  </div>
                </div>
                <button className="w-[87px] h-[30px] text-white bg-primary_color rounded-[5px] text-xl font-semibold font-Pops mr-[20px]">Join</button>
              </div>

              ))
            }


            </div>


          </div>
      }
    </>
  )
}

export default GroupList
