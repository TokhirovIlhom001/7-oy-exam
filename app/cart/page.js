'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
const apiUrl = 'http://207.154.221.44:4002';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartedDishes = JSON.parse(localStorage.getItem('cart')) || [];
    const groupedItems = cartedDishes.reduce((r, e) => {
      const item = r.find((i) => i.id === e.id);
      if (!item) {
        r.push({ ...e, quantity: 1 });
      } else {
        item.quantity++;
      }
      return r;
    }, []);

    setCart(groupedItems);
  }, []);

  const updateQuantity = (id, amount) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity += amount;
        if (item.quantity === 0) return null;
      }
      return item;
    });

    setCart(newCart.filter(Boolean));
    localStorage.setItem('cart', JSON.stringify(newCart.filter(Boolean)));
  };

  const total = cart.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );

  return (
    <>
      <Header/>
      <section className='cart'>
        <div className="containers">
          <div className='carts_div'>
            {cart.length ? (
              cart.map((item) => (
                <div className='carts' key={item.id}>
                  <div className='carts_left-div '>
                    <img className='carts_img ' src={apiUrl + '/' + item.image} />
                    <div className='carts_left-div-div'>
                      <h3 className='carts_h3'>{item.name}</h3>
                      <p className='carts_price'>{item.price}</p>
                    </div>
                  </div>
                  <div className='carts_right'>
                    <div className='carts_right-div'>
                      <button className='carts_btn-minus' onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <p className='carts_quantity'> {item.quantity}</p>
                      <button className='carts_btn-puls' onClick={() => updateQuantity(item.id, 1)}>+</button>  
                    </div>
                    <p className='carts_price-quantity'> {Math.floor(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <h3>Hali hech qanday product yo'q!</h3>
            )}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Cart;
