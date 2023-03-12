import React, { useEffect, useState } from 'react'
import "./Shopify.css"
import Items from './Items'
import ShopifyContext from '../../contexts/ShopifyContext'

const Shopify = (props) => {
  const [initailData, setInitialData] = useState([])
  const [imageData, setImageData] = useState([])
  const [isExpand, setInExpand] = useState(false)
  const [cartData, setcartData] = useState([])

  useEffect(() => {
    fetch(`https://react-shopping-cart-67954.firebaseio.com/products.json`)
      .then((res) => res.json())
      .then((data) => setInitialData(data.products))
      .catch((err) => console.log(err))

    fetch(`https://api.unsplash.com/search/photos?page=1&per_page=30&orientation=portrait&query=cloths`, {
      headers: new Headers({
        'Authorization': 'Client-ID vPQUMHjlSyUEcjinOfQEcSe8pvy1noKDUTw-1xaxPcg'
      }),
    })
      .then((res) => res.json())
      .then((data) => setImageData(data.results))
      .catch((err) => console.log(err))
  }, [])

  const toggleCart = () => {
    setInExpand(!isExpand)
    if (isExpand) {
      console.log("cartData", cartData)
    }
  }

  useEffect(() => {
    // console.log(initailData)
    // console.log(imageData)
    if (cartData) {
      console.log(cartData)
    }
  }, [initailData, imageData, cartData])

  return (
    <ShopifyContext.Provider value={{ initailData, setInitialData, imageData, setImageData, isExpand, setInExpand, cartData, setcartData }} >
      <div className='shopify-outer'>
        <button className={isExpand ? ' cart cart-expand' : 'cart cart-collapse'} onClick={toggleCart}>
          <i className={isExpand ? "fa fa-times fa-2x" : "fa-solid fa-2x fa-cart-shopping"}>
          </i>
        </button>
        <div className={isExpand ? ' checkout checkout-expand' : 'checkout checkout-collapse'}>
          {
            isExpand ?
              <>
                <i className="fa-solid fa-1x fa-cart-shopping"> &nbsp;Cart</i>

                {
                  cartData && cartData.length ?
                    <div className='cart-details checkout-items'>
                      {cartData.map((item) =>
                        <div className='order'>
                          <img src={item.img} alt={item.title} />
                          <div>
                            <p>
                              {item.title}
                            </p>
                            <p>
                              {item.currencyFormat} {item.price}
                            </p>
                          </div>

                        </div>
                      )}
                      <br />
                    </div>
                    :
                    <div className='cart-details'>
                      Add some products in the cart
                      <br />
                      :)
                    </div>
                }

                <div className='cart-total'>
                  <span>
                    SUBTOTAL
                  </span>
                  <span>
                    {
                      cartData && cartData.length ?
                        <>
                          $ {Math.round((cartData.reduce((total, current) => ({ price: total.price + current.price })).price) * 100) / 100}
                        </>
                        :
                        <>
                          $ 0.00
                        </>
                    }
                  </span>
                </div>

                <button className='cart-button'>CHECKOUT</button>
              </>
              : null
          }
        </div>
        <div className='main'>
          <div className='sizes'>
            <h3>Sizes:</h3>
            <button>XS</button>
            <button>S</button>
            <button>M</button>
            <button>ML</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>
          <div className='shopify-items'>
            {
              initailData && initailData.length ? initailData.map((item) =>
                <Items item={item} key={item.id} img={imageData[item.id]?.urls?.small} />
              ) : null
            }
          </div>
        </div>
      </div>
    </ShopifyContext.Provider>
  )
}

export default Shopify;
