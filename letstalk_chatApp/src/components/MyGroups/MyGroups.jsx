import React from 'react'
import {PiDotsThreeVerticalBold} from 'react-icons/pi'
import GrouppicOne from '../../assets/Profile Pic/G-1.png'
import GrouppicTwo from '../../assets/Profile Pic/G-2.png'
import GrouppicThree from '../../assets/Profile Pic/G-3.png'

const MyGroups = () => {
  return (
    <div className='h-[450px] mt-[40px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md'>
          <div className='flex justify-between'>
              <h3 className='font-Pops font-semibold text-[20px] pb-2'>My Groups</h3>
              <PiDotsThreeVerticalBold className='font-bold text-primary_color mt-[5px] text-xl' />
          </div>
          <div className='overflow-y-scroll h-[380px]'>

                  <div className='py-[17px] flex justify-between items-center border-b border-black border-opacity-25 '>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicOne} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Raghav</h3>
                          <p className='text-neutral-600 text-opacity-75 text-xs font-medium font-Pops'>Dinner?</p>
                      </div>
                      </div>
                      <p className='text-black text-opacity-50 text-[10px] font-medium font-Pops mr-[10px]'>Today, 8:56pm</p>
                  </div>

                  <div className='py-[17px] flex justify-between items-center border-b border-black border-opacity-25 '>
                      <div className='flex justify-between items-center'>
                      <img src={GrouppicTwo} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Swathi</h3>
                          <p className='text-neutral-600 text-opacity-75 text-xs font-medium font-Pops'>Sure!</p>
                      </div>
                      </div>
                      <p className='text-black text-opacity-50 text-[10px] font-medium font-Pops mr-[10px]'>Today, 8:56pm</p>
                  </div>
    
                  <div className='py-[17px] flex justify-between items-center border-b border-black border-opacity-25 '>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicThree} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Kiran</h3>
                          <p className='text-neutral-600 text-opacity-75 text-xs font-medium font-Pops'>Hi...!</p>
                      </div>
                      </div>
                      <p className='text-black text-opacity-50 text-[10px] font-medium font-Pops mr-[10px]'>Today, 8:56pm</p>
                  </div>

                
                
                 

          </div>


      </div>
  )
}

export default MyGroups
