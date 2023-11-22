import React from 'react'
import {PiDotsThreeVerticalBold} from 'react-icons/pi'
import GrouppicOne from '../../assets/Profile Pic/G-1.png'
import GrouppicTwo from '../../assets/Profile Pic/G-2.png'
import GrouppicThree from '../../assets/Profile Pic/G-3.png'
import {IoMdAdd} from 'react-icons/io'

const UserList = () => {
  return (
      <div className='h-[450px] pt-[13px] pl-[20px] pr-[10px] pb-[20px] bg-white rounded-[20px] shadow-md'>
          <div className='flex justify-between'>
              <h3 className='font-Pops font-semibold text-[20px] pb-2'>User List</h3>
              <PiDotsThreeVerticalBold className='font-bold text-primary_color mt-[5px] text-xl' />
          </div>
          <div className='overflow-y-scroll h-[380px]'>

              <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicOne} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Raghav</h3>
                          <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops'>Hi Guys, Wassup!</p>
                      </div>
                  </div>
                  <button className="w-[30px] h-[30px] bg-primary_color rounded-[5px] text-white font-Pops text-xl mr-[20px]"><IoMdAdd className='mx-auto font-semibold' /></button>
              </div>

              <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicTwo} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Raghav</h3>
                          <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops'>Good to see you.</p>
                      </div>
                  </div>
                  <button className="w-[30px] h-[30px] bg-primary_color rounded-[5px] text-white font-Pops text-xl mr-[20px]"><IoMdAdd className='mx-auto font-semibold' /></button>
              </div>

              <div className='py-[17px] flex justify-between items-center border-b border-black border-opacity-25 '>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicThree} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Raghav</h3>
                          <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops'>What plans today?</p>
                      </div>
                  </div>
                  <button className="w-[30px] h-[30px] bg-primary_color rounded-[5px] text-white font-Pops text-xl mr-[20px]"><IoMdAdd className='mx-auto font-semibold' /></button>
              </div>

              <div className='py-[17px] flex items-center border-b border-black border-opacity-25 justify-between'>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicTwo} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Raghav</h3>
                          <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops'>What plans today?</p>
                      </div>
                  </div>
                  <button className="w-[30px] h-[30px] bg-primary_color rounded-[5px] text-white font-Pops text-xl mr-[20px]"><IoMdAdd className='mx-auto font-semibold' /></button>
              </div>

              <div className='py-[17px] flex justify-between items-center border-b border-black border-opacity-25 '>
                  <div className='flex justify-between items-center'>
                      <img src={GrouppicOne} alt="" className='w-[54px] h-[54px]' />
                      <div className='ml-[14px]'>
                          <h3 className='text-black text-sm font-semibold font-Pops'>Raghav</h3>
                          <p className='text-neutral-600 text-opacity-75 text-sm font-medium font-Pops'>Hi Guys, Wassup!</p>
                      </div>
                  </div>
                  <button className="w-[30px] h-[30px] bg-primary_color rounded-[5px] text-white font-Pops text-xl mr-[20px]"><IoMdAdd className='mx-auto font-semibold' /></button>
              </div>


          </div>


      </div>
  )
}

export default UserList