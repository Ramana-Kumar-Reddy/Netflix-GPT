import React from 'react'
import Header from './Header'

const Login = () => {
  return (
    <div>
        <Header/>

        <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
             alt='Background'
            />
        </div>
        <form className='w-3/12 text-center absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white'>
            <h1 className='font-bold m-4 text-3xl text-left'>Sign In</h1>
            <input type='email' placeholder='Enter Email' className='p-3 m-4 w-full rounded-md bg-gray-700'/>
            <input type='password' placeholder='Enter Password' className='p-3 m-4 w-full rounded-md bg-gray-700'/>
            <button className='bg-red-600 w-full rounded-md p-3 m-4'>Sign In</button>
        </form>
    </div>
  )
}

export default Login