import React, { useState } from 'react'
import registration from '../../assets/Registration.jpeg'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import DefaultProfile from '../../assets/Profile Pic/DefaultProfilePic.png'
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const [emailerr, setEmailerr] = useState('');
  const [fullNameerr, setFullNameerr] = useState('');
  const [passworderr, setPassworderr] = useState('');

  const [showPassword, setShowPassword] = useState(false)


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }
  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameerr('')
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('')
  }
  const handleSubmit = () => {
    if (!email) {
      setEmailerr('Email is required*');
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr('Email is not valid!')
      }
    }
    if (!fullName) {
      setFullNameerr('Your Name is required*');
    }
    if (!password) {
      setPassworderr('Shame! You have no privacy*');
    } else if (!/^(?=.*[a-z])/.test(password)) {
      setPassworderr('The string must contain at least 1 lowercase alphabetical character')
    } else if (!/^(?=.*[A-Z])/.test(password)) {
      setPassworderr('The string must contain at least 1 uppercase alphabetical character')
    } else if (!/^(?=.*[0-9])/.test(password)) {
      setPassworderr('The string must contain at least 1 numeric character')
    } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
      setPassworderr('The string must contain at least one special character')
    } else if (!/^(?=.{8,})/.test(password)) {
      setPassworderr('The string must be eight characters or longe')
    }
    if (email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])/.test(password) && /^(?=.*[A-Z])/.test(password) && /^(?=.*[0-9])/.test(password) && /^(?=.*[!@#$%^&*])/.test(password) && /^(?=.{8,})/.test(password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: DefaultProfile
          }).then(() => {
            sendEmailVerification(auth.currentUser)
            console.log(user, 'user');
            toast.success('Registration is done & verify your account by your gmail');
            setEmail('')
            setFullName('')
            setPassword('')
            setTimeout(() => {
              navigate('/login')
            }, 1000)

          }).then(() => {
            set(ref(db, 'users/' + user.user.uid), {
              username: user.user.displayName,
              email: user.user.email,
            });
          })
        })

        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes('auth/email-already-in-use')) {
            setEmailerr('This email has already registered');
            setPassword('')
          }
        });
    }
  }

  return (
    <div className='flex'>
      <div className='w-1/2 flex justify-end mr-[69px]'>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className='mt-[225px]'>
          <h1 className='font-bold  text-[34.401px] text-[#11175D] font-Nun '>Get Started with easily register</h1>
          <p className='mt-[13px] font-normal font-Nun text-[20.641px] text-[#000000] opacity-50 mb-[53px]'>Free register <span className='text-[#808080]'>and</span> you can enjoy it</p>

          <div className='relative mt-[40px]'>
            <input onChange={handleEmail} value={email} className='w-[368px] border border-opacity-50 outline-none rounded-lg border-[#808080] py-[26px] pl-[52px] pr-[60px]' type="email" placeholder="Enter your mail" />
            <p className='text-[#11175D] tracking-[1.032px] font-semibold text-[13.76px] font-Nun px-[18px] absolute top-[-10px] left-[34px] bg-white'>Email Address</p>
            {
              emailerr &&
              <p className='text-red-500 font-Nun font-black animate-pulse '>{emailerr}</p>
            }
          </div>

          <div className='relative mt-[40px]'>
            <input onChange={handleFullName} value={fullName} className='w-[368px] border border-opacity-50 outline-none rounded-lg border-[#808080] py-[26px] pl-[52px] pr-[60px]' type="text" placeholder="Enter your name" />
            <p className='text-[#11175D] tracking-[1.032px] font-semibold text-[13.76px] font-Nun px-[18px] absolute top-[-10px] left-[34px] bg-white'>Full Name</p>
            {
              fullNameerr &&
              <p className='text-red-500 font-Nun font-black animate-pulse '>{fullNameerr}</p>
            }
          </div>

          <div className='relative mt-[40px] w-[368px]'>
            <input onChange={handlePassword} value={password} className='w-[368px] border border-opacity-50 outline-none rounded-lg border-[#808080] py-[26px] pl-[52px] pr-[60px]' type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
            <p className='text-[#11175D] tracking-[1.032px] font-semibold text-[13.76px] font-Nun px-[18px] absolute top-[-10px] left-[34px] bg-white'>Password</p>
            {
              showPassword ?
                <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-8 right-3' />
                :
                <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} className='absolute top-8 right-3' />
            }
            {
              passworderr &&
              <p className='text-red-500 w-[400px] font-Nun font-black animate-pulse '>{passworderr}</p>
            }
          </div>

          <div className='w-[368px]'>
            <button onClick={handleSubmit} className='w-[368px] h-[68px] mt-[50px] mb-[35px] text-white font-Nun text-[20.641px] font-semibold bg-primary_color rounded-full cursor-pointer'>Sign up</button>
            <p className='w-[220px] m-auto font-Osans font-normal text-[13.338px] color-[#03014C]'>Already  have an account ? <span className='text-[#EA6C00] font-bold'><a href=""><Link to='/login'>Sign In</Link></a></span></p>

          </div>

        </div>

      </div>



      <div className='w-1/2 '>
        <img className='h-screen w-full object-cover' src={registration} alt="" />
      </div>
    </div>
  )
}

export default Registration
