import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import GrouppicOne from '../../assets/Profile Pic/G-1.png'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {
    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo);
    const [blocklist, setBlocklist] = useState([])
    useEffect(() => {                               //to call data from firebase, we used useEffect
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid,
                    })
                } else {
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid,
                    })
                }
            })
            setBlocklist(arr);
        });
    }, [])

    const handleUnblock = (item) =>{ 
        console.log(item);
        set(push(ref(db, 'friends/')), {      //create friends in real time dbs in firebase
            sendername: item.block,         //here, blocked user is sender
            senderid: item.blockid,
            receivername: data.displayName,
            receiverid: data.uid
          }).then(()=>{
            remove(ref(db, 'block/' + item.id))
          })     
        
        }

    return (
        <div className='h-[450px] mt-[40px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md'>
            <div className='flex justify-between'>
                <h3 className='font-Pops font-semibold text-[20px] pb-2'>Blocked User</h3>
                <PiDotsThreeVerticalBold className='font-bold text-primary_color mt-[5px] text-xl' />
            </div>
            <div className='overflow-y-hidden hover:overflow-y-scroll h-[380px]'>

                {   
                    blocklist.length == 0
                    ?
                    <p className='text-black text-opacity-70 text-[10px] text-lg font-Pops text-center mt-[150px]'>No block yet</p>
                    :
                    blocklist.map((item) => (
                        <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
                            <div className='flex justify-between items-center'>
                                <img src={item.profileImg} alt="" className='w-[54px] h-[54px] rounded-full' />
                                <div className='ml-[14px]'>
                                    <h3 className='text-black text-sm font-semibold font-Pops'>{item.block}</h3>
                                    <h3 className='text-black text-sm font-semibold font-Pops'>{item.blockby}</h3>

                                    {
                                        !item.blockbyid
                                            ?
                                            <p className='text-red-500 text-opacity-85 text-xs font-medium font-Pops'>Do you want to unblock?</p>
                                            :
                                            <p className='text-red-500 text-opacity-85 text-xs font-medium font-Pops'>Blocked you...!</p>
                                    }
                                </div>
                            </div>
                            {
                                !item.blockbyid &&
                                <button onClick={() => handleUnblock(item)} className="w-[100px] h-[30px] text-white bg-primary_color rounded-[5px] text-xl font-semibold font-Pops mr-[20px]">Unblock</button>
                            }
                        </div>

                    ))
                }

            </div>


        </div>
    )
}

export default BlockedUser
