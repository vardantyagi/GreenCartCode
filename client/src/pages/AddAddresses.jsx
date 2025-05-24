import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

// input field component
const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={handleChange}
    value={address[name]}
    required
  />
}
const AddAddresses = () => {

  const { axios, navigate, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  const handleChange = (e) => {
    let { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value, // email: abc@gmail.com or city: Delhi
    }))
  }

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/address/add', { address });
      const { data } = await res;      
      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [])
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span> </p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandeler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='First Name' />
              <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name' />
            </div>
            <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Email Address' />
            <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street' />
            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City' />
              <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField handleChange={handleChange} address={address} name='zipcode' type='number' placeholder='Zip Code' />
              <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country' />
            </div>
            <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Phone' />
            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
          </form>
        </div>
        <img className='mb-16 md:mr-16 md:mt-0' src={assets?.add_address_iamge} alt="Add Address" />
      </div>
    </div>
  )
}

export default AddAddresses