import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyProducts } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {

  const {products, searchQuery} = useAppContext();
  const [filteredProducts , setFilteredProducts] = useState([]);

  useEffect(()=>{
    if(searchQuery.length>0){
      let dataToDisplay = products.filter((product)=>product.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredProducts(dataToDisplay);
    }else{
      setFilteredProducts(products);
    }
  },[products,searchQuery]);

  return (
    // items-center
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-start w-full'>
        <p className='text-2xl font-medium uppercase'>ALL PRODUCTS</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        {/* grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 mt-6 */}
        <div className='w-full flex flex-col items-center mt-6 sm:flex-row sm:justify-start gap-5'>
          {
            filteredProducts.filter((product)=>product?.inStock).map((product,i)=>{
              return(
                <ProductCard className='' key={i} product={product} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AllProducts