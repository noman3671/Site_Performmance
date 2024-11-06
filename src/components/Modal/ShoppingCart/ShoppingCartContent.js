import React from 'react'
import { cartIconAddSvg } from "components/Icons";

function ShoppingCartContent({ description }) {
  return (
    <div className='flex justify-center items-center flex-col w-[269px]'>
      <img src={cartIconAddSvg} alt="cartIconAddSvg" className='mt-[25px]' />
      <p className='shoppingcart_success_message'>{description}</p>
    </div>
  )
}

export default ShoppingCartContent
