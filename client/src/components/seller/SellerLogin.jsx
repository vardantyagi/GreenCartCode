import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate('/seller');
    }
  }, [isSeller]);

  const onSubmitHandeler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post('/api/seller/login',{email,password});
      const { data } = await res;
      if(data.success){
        setIsSeller(true);
        navigate('/seller')
      }else{
        toast.error(data.message);
      }
    } catch (e) {
        toast.error(e.message);
    }
  }
  return !isSeller && (
    <form onSubmit={onSubmitHandeler} className='min-h-screen flex items-center text-sm text-gray-600'>
      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
        <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>
        <div className="w-full">
          <p>Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="enter your email" className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input value={password} onChange={(e) => (setPassword(e.target.value))} type="password" placeholder="enter your password" className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
      </div>
    </form>
  )
}

export default SellerLogin