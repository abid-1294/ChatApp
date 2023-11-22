import React, { useState } from 'react'
import login from '../../assets/Login.jpeg'
import Googlelogo from '../../assets/GoogleLogo.png'
import {RiEyeFill,RiEyeCloseFill} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { userLoginInfo } from '../../slices/userSlice'
const Login = () => {
  
  const auth = getAuth();
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailerr, setEmailerr] = useState('');
  const [passworderr, setPassworderr] = useState('');
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }
 
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('')
  }
  const handleSubmit = () =>{
    if(!email){
      setEmailerr('Email is required*');
    }else{
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailerr('Email is not valid!')
      }
    }
    if(!password){
      setPassworderr('Shame! You have no privacy*');
    }
    if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success('Login successfully done...!');
          console.log(user.user);
          dispatch(userLoginInfo(user.user))
          localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
          setEmail('')
          setPassword('')
          setError('')
          setTimeout(() =>{
            navigate('/home')
            },1000)          
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if(errorCode.includes('auth/invalid-login-credentials')){
            setError('Please give the correct mail & password...!');
            setPassword('')
          }
        });
          }
  }
        const handleGoogleSignIn = () =>{
          signInWithPopup(auth, provider)
          .then(() => {
            toast.success('Login successfully done...!');
            setTimeout(() =>{
              navigate('/home')
              },1000) 
          }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
          });
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
          <div className='mt-[221px]'>
              <h1 className='mr-[215px] mb-[29px] font-bold text-[34px] text-[#03014C] font-Osans '>Login to your account!</h1>
              
              <div onClick={handleGoogleSignIn} className='flex w-[221px] h-[62px] cursor-pointer border-opacity-30 rounded-lg border border-indigo-950 py-[21px] px-[30px]'>
                <img className='w-[19.26px] h-[19.26px]' src={Googlelogo} alt="" />
                <p className='ml-[10px] font-semibold tracking-[0.267px] text-[13.338px] text-[#03014C] font-Osans'>Login with Google</p>
              </div>
              

{/* ******** For Email Input part in Login page************ */}
              <div className='relative mt-[40px]'>
                <p className='mt-[32px] text-[#03014C] tracking-[1.032px] font-normal text-[13.76px] font-Osans'>Email Address</p>
                <input onChange={handleEmail} value={email} className='text-[#03014C] text-[20px] font-Osans font-semibold w-[487px] border-b border-opacity-50 outline-none border-[#808080] py-[15px] pb-[16px] pr-[60px]' type="email" placeholder="Enter your mail" />
                {
                  emailerr &&
                  <p className='text-red-500 font-Nun font-black animate-pulse '>{emailerr}</p>
                }
              </div>
{/* ******** For Password Input part in Login page************ */}
              <div className='relative mt-[60px] w-[468px]'>
                <p className='mt-[32px] text-[#03014C] tracking-[1.032px] font-normal text-[13.76px] font-Osans'>Password</p>
                <input onChange={handlePassword} value={password} className='text-[#03014C] text-[20px] font-Osans font-semibold w-[487px] border-b border-opacity-50 outline-none border-[#808080] py-[15px] pb-[16px] pr-[60px]' type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
                {
                  showPassword ?
                  <RiEyeFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-10 right-3'/>
                  :
                  <RiEyeCloseFill onClick={()=> setShowPassword(!showPassword)} className='absolute top-10 right-3'/>
                }
                {
                  passworderr &&
                  <p className='text-red-500 w-[400px] font-Nun font-black animate-pulse '>{passworderr}</p>
                }
              </div>
              
              <p className='text-red-500 font-Nun font-black animate-pulse mt-[40px] '>{error}</p>

              <div className='w-[368px]'>
              <button onClick={handleSubmit} className='w-[405px] h-[81px] mt-[55px] mb-[35px] text-white font-Osans text-[20.90px] font-semibold bg-primary_color rounded-lg px-[110px] py-[10px] cursor-pointer'>Login to Continue</button>
              <p className='w-[220px] font-Osans font-normal text-[13.338px] color-[#03014C]'>Don't have an account ? <span className='text-[#EA6C00] font-bold'><a href=""><Link to="/">Sign up</Link></a></span></p>

              <p className='w-[220px] cursor-pointer font-Osans font-bold text-[13.338px] text-[#EA6C00]'><Link to="/forgotpassword">Forgot password?</Link></p>

              </div>
              </div>

      </div>



      <div className='w-1/2 '>
        <img className='h-screen w-full object-cover' src={login} alt=""/>
      </div>
    </div>
  )
}

export default Login
