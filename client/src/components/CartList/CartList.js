import { useState, useEffect } from 'react';
import { getProductsCart } from '../../util/cart.js';
import { Accordion } from 'react-bootstrap';
import { CartItem } from '../CartItem/CartItem.js';

export const CartList = () => {

  const [cartProducts, setCartProducts] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);

  useEffect( () => {
    getProductsCart(1)
      .then((res) => {
        setCartProducts(res);
      });
  }, [updateCart])

  return(
    <>
      <h1 className='text-center'>Carrito</h1>
      <Accordion className='container'>
        <Accordion.Item>
          <Accordion.Header>Carrito</Accordion.Header>
          <Accordion.Body className='row'>
            {
              Object.keys(cartProducts).length > 0 
              ?
              cartProducts.map((prod) => {
                  return (
                    <CartItem 
                      key={prod.id}
                      id_cart={1}
                      prod={prod}
                      setUpdateCart={setUpdateCart}
                      updateCart = {updateCart}
                    />
                  );
                })
              :
                <h4 style={{ textAlign: 'center' }}>Carrito vacio.</h4>
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
