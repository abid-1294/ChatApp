import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import GroupList from '../../components/GroupList/GroupList'
import Friends from '../../components/Friends/Friends'
import ProfilePic from '../../assets/Profile Pic/G-2.png'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { IoTriangle } from "react-icons/io5";
import ModalImage from "react-modal-image";
import { IoMdSend } from 'react-icons/io'
import { MdEmojiEmotions } from "react-icons/md";
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from 'firebase/database'
import moment from 'moment';
import { GrGallery } from "react-icons/gr";
import { getDownloadURL, getStorage, ref as sref, uploadBytes} from "firebase/storage";
const Message = () => {

  const storage = getStorage();
  const db = getDatabase();
  const activeData = useSelector((state) => state.activeChat.active)
  const data = useSelector(state => state.userLoginInfo.userInfo);
  console.log(activeData);
  const [msg, setMsg] = useState('')
  const [singleMsgChat, setsingleMsgChat] = useState ([])

  const handleSendMsg = () =>{
   if (activeData.status == 'single') {
    set(push(ref(db, 'friendChat/')),{     //create chat in real time dbs in firebase or write
      msg: msg,
      whosenderid: data.uid,
      whosendername: data.displayName,
      whoreceiverid: activeData.id,
      whoreceivername: activeData.name,
      date: `${new Date().getFullYear()} - ${new Date().getMonth() +1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`
    })
      setMsg('');
   }else{
    console.log('Group Msg'); //that part will be in groupChat
   }
  }

  useEffect(() => {                                             //to call data from firebase, we used useEffect
    const singleMsgref = ref(db, 'friendChat/');
    onValue(singleMsgref, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        
        if (
          (data.uid == item.val().whosenderid && item.val().whoreceiverid == activeData.id)
          ||
          (data.uid == item.val().whoreceiverid && item.val().whosenderid == activeData.id)
          ) {
            arr.push(item.val());
            }
      });
      setsingleMsgChat(arr);
    });
  }, [])

  const handleSendImg = (e)=>{
    console.log(e.target.files[0]);  //files[0] is exactly location for the selected file
    const storageRef = sref(storage, 'some-child');
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, 'friendChat/')),{     //create chat in real time dbs in firebase or write
          image: downloadURL,
          whosenderid: data.uid,
          whosendername: data.displayName,
          whoreceiverid: activeData.id,
          whoreceivername: activeData.name,
          date: `${new Date().getFullYear()} - ${new Date().getMonth() +1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`
        })
      });
    });
  }

  return (
    <div className='flex'>
      <div className='w-[186px]'><Sidebar active='message' /></div>
      <div className='w-[450px] mt-[34px] ml-[43px] mb-[35px] mr-[27px]'>
        <GroupList />
        <div className='mt-[43px]'>
          <Friends />
        </div>
      </div>
      <div className='w-[689px] h-[926px] mt-[34px] ml-[43px] mb-[35px] mr-[36px] shadow py-[25px] px-[30px]'>

      {/* Header part of Chat */}
        <div className='flex justify-between items-center pb-[24.5px]'>
          <div className='flex justify-between items-center'>
            <img src={ProfilePic} alt="" className='w-[75px] h-[75px] rounded-full' />
            <div className='ml-[33px]'>
              <h3 className='text-black text-2xl font-semibold font-Pops'>{activeData.name}</h3>
              <p className='text-black text-opacity-90 text-sm font-normal font-Pops'>Online</p>
            </div>
          </div>
          <div>
            <PiDotsThreeVerticalBold className='font-bold text-primary_color text-2xl' />
          </div>
        </div>
      {/* Header part of Chat */}

        {/* main chat part DIV start*/}
        <div className='h-[719px] py-[35px] border-b border-t border-black px-5 border-opacity-25 overflow-y-hidden overflow-x-hidden hover:overflow-y-scroll'>
          {
            singleMsgChat.map((item) => (
              item.whosenderid == data.uid ?

                item.image ?
                  <div className='text-right'>    {/* sender img */}
                    <div className='inline-block p-3 bg-primary_color rounded-lg'>
                      <ModalImage small={item.image} large={item.image} className='w-60' />
                    </div>
                  </div>
                  :
                  <div className='text-right w-[550px] mt-10'>           {/* sender Message */}
                    <div className='inline-block py-[13px] px-[20px] bg-primary_color rounded-lg relative'>
                      <IoTriangle className='w-[35.85px] h-[28px] text-primary_color absolute bottom-[-1.5px] right-[-13px] text-lg' />
                      <p className='items-center text-left text-white text-base font-medium font-Pops'>{item.msg}</p>
                    </div>
                    <div className='mt-3'>
                      <p className='text-black text-right text-opacity-70 text-[10px] font-medium font-Pops'>
                        {
                          moment(item.date, "YYYYMMDD hh:mm:ss").fromNow()
                        }
                      </p>
                    </div>
                  </div>

                :

                item.image ?         
                  <div>             {/* receiver image start */}
                    <div className='inline-block p-3 bg-[#F1F1F1] rounded-lg'>
                      <ModalImage small={item.image} large={item.image} className='w-60'
                      />
                    </div>
                  </div>
                  :
                  <div className='mt-10 w-[550px]'>    {/* receiver Message */}
                    <div className='inline-block py-[13px] px-[20px] bg-[#F1F1F1] rounded-lg relative'>
                      <IoTriangle className='w-[35.85px] h-[28px] text-[#F1F1F1] absolute bottom-0 left-[-13px] text-lg' />
                      <p className='items-center text-left text-black text-base font-medium font-Pops'>{item.msg}</p>
                    </div>
                    <div className='mt-3'>
                      <p className='text-black text-opacity-70 text-[10px] font-medium font-Pops text-left'>
                        {
                          moment(item.date, "YYYYMMDD hh:mm:ss").fromNow()
                        }
                      </p>
                    </div>
                  </div>
            ))
          }

          

        </div>
        {/* main chat part DIV end*/}


        {/* input text, image, emoji typing part */}
        <div className='flex justify-center items-center mt-[20px] pb-[10px]'>
          <div className='relative'>
            <input onChange={(e) => setMsg(e.target.value)} type="text" className='w-[537px] h-[45px] outline-blue-500 bg-zinc-100 rounded-[10px] pl-[20px] pr-[80px]' placeholder='Send message' />
            <MdEmojiEmotions className='w-[20px] h-[20px] text-[#707070] absolute right-[50px] top-[15px]' />
            <label>
              <input onChange={handleSendImg} type="file" className='hidden' />
              <GrGallery className='text-primary_color w-[18px] h-[18px] absolute right-[20px] top-[16px]' />
            </label>
          </div>
          <div onClick={handleSendMsg} className='w-[45px] h-[45px] bg-indigo-600 rounded-[10px] ml-[20px]'>
          <IoMdSend className='w-[20px] h-[20px] text-white mx-auto flex justify-between items-center mt-[13px]'/>
          </div>
        </div>

        {/* input text, image, emoji typing part */}

      </div>
    </div>
  )
}

export default Message

