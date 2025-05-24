import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';
import toast from 'react-hot-toast';

const MyOrders = () => {

  const { cartItems, currency, axios, user } = useAppContext();

  const [myOrders, setMyOrders] = useState([]);
  console.log(currency);


  const fetchMyOrders = async () => {
    try {
      const res = await axios.get('/api/order/user');
      const { data } = await res;
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }
  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user])
  console.log(myOrders);

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-start w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My Orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
      {
        myOrders.map((order, i) => {
          return (
            <div key={i} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
              <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                <span>OrderId : {order._id}</span>
                <span>Payment : {order.paymentType}</span>
                <span>Total Amount : {currency}{order.amount}</span>
              </p>
              {
                order.items.map((item, i) => {
                  return (
                    <div key={i} className={`relative bg-white text-gray-500/70 ${order.items.length != i + 1 && 'border-b'} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>
                      <div className='flex items-center mb-4 md:mb-0'>
                        <div className='bg-primary/10 p-4 rounded-lg'>
                          <img src={item?.product?.image[0]} alt="Product Photo" className='w-16 h-16' />
                        </div>
                        <div className='ml-4'>
                          <h2 className='text-lg font-medium text-gray-800'>{item?.product?.name}</h2>
                          <p>Category: {item?.product?.category}</p>
                        </div>
                      </div>
                      <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                        <p>Quantity: {item?.quantity || '1'}</p>
                        <p>Status: {order?.status || '1'}</p>
                        <p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p>Amount: {currency}{item?.product?.offerPrice * item?.quantity}</p>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default MyOrders