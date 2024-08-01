import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user =useSelector((store)=>store.user);
    
    useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
        
          const {uid, email , displayName ,photoURL} = user;
          dispatch(addUser({uid:uid,email:email , displayName:displayName , photoURL:photoURL}));
          navigate("/browse")
        
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });

      return()=>unsubscribe();

      },[])

  const handleSignOut=()=>{
    signOut(auth).then(() => {
      navigate("/")
     
    }).catch((error) => {
      //We need to create a new error page
    });
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black flex justify-between'>
        <img 
        className='w-44 mx-auto md:mx-0'
         src={LOGO}
        alt='logo'
        />
      { user && <div className='flex p-2'>
          <img className='w-12 h-12' src={user?.photoURL}/>
          <button onClick={handleSignOut} className= 'font-bold text-white'>Sign out</button>
        </div>}
    </div>
  )
}

export default Header