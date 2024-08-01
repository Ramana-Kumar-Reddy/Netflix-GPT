import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validates';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Background_IMG, USER_AVATHAR } from '../utils/constants';


const Login = () => {

  const [isSignInForm , setIsSignInForm] = useState(true);

  const [errorMessage , setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const name = useRef(null);//I need to write the for that in validate
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick=()=>{
   const message = checkValidData(email.current.value,password.current.value); 
   setErrorMessage(message);

   if(message) return;

  

   if(!isSignInForm){
   
    createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: {USER_AVATHAR}
    }).then(() => {
      const {uid, email , displayName ,photoURL} = auth.currentUser;
      dispatch(addUser({uid:uid,email:email , displayName:displayName , photoURL:photoURL}))
    }).catch((error) => {
     setErrorMessage(error.message);
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });

   }
   else{
    //Sign In Logic
    signInWithEmailAndPassword(auth,email.current.value,password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode+"-"+errorMessage)
    });
   }
  }

  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm);
  }

  return (
    <div>
        <Header/>

        <div className='absolute'>
            <img  className='h-screen w-screen' src={Background_IMG}
             alt='Background'
            />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold m-4 text-3xl text-left'>{isSignInForm? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && <input type='text' ref={name} placeholder='Enter Name' className='p-3 m-4 w-full rounded-md bg-gray-700'/>}
            <input ref={email} type='email' placeholder='Enter Email' className='p-3 m-4 w-full rounded-md bg-gray-700'/>
            <input ref={password} type='password' placeholder='Enter Password' className='p-3 m-4 w-full rounded-md bg-gray-700'/>
            <p className='text-red-500 py-2 text-lg'>{errorMessage}</p>
            <button className='bg-red-600 w-full rounded-md p-3 m-4' onClick={handleButtonClick}>{isSignInForm? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm?"New to Netflix? Sign Up Now" : "Already have an account? Sign In here"}</p>
        </form>
    </div>
  )
}

export default Login