import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validates';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';


const Login = () => {

  const [isSignInForm , setIsSignInForm] = useState(true);

  const [errorMessage , setErrorMessage] = useState(null);




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
    console.log(user);
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
    console.log(user)
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
            <img  src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
             alt='Background'
            />
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 text-center absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white'>
            <h1 className='font-bold m-4 text-3xl text-left'>{isSignInForm? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && <input type='text' placeholder='Enter Name' className='p-3 m-4 w-full rounded-md bg-gray-700'/>}
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