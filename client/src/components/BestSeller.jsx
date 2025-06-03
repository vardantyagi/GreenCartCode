import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
  const {products} = useAppContext();  
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      {/* grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 */}
      <div className='flex flex-wrap mt-6 justify-center sm:justify-start gap-5'> 
        {
          products?.filter((product)=>product?.inStock)?.slice(0,5)?.map((product,i)=>{
            return(
              <ProductCard key={i} product={product} />
            )
          })
        }
      </div>
    </div>
  )
}

export default BestSeller