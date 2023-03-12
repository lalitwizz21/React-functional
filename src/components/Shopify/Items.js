import React, { useContext } from 'react'
import ShopifyContext from '../../contexts/ShopifyContext'

const Items = ({ item, img }) => {
  const { setcartData, cartData } = useContext(ShopifyContext)
  const handlechangeCart = () => {

    setcartData(cartData => [...cartData, { ...item, img }])
  }

  return (
    <div className='item-outer'>
      <div className='img-container'>
        <img src={img} alt={item.style} />
      </div>
      <p>{item.title}</p>
      <p>{item.currencyFormat} {item.price}</p>
      <button onClick={handlechangeCart}>Add to Cart</button>
    </div>
  )
}

export default Items
