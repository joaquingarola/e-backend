import { useState, useEffect } from 'react';
import { getProducts } from '../../util/product.js';
import { Row, Container } from 'react-bootstrap';
import { Item } from '../Item/Item.js';

export const ItemList = () => {

  const [products, setProducts] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect( () => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
  }, [updateList])

  return(
    <Container>
      <Row className='d-flex justify-content-center'>
        <h1 className='text-center'>Productos</h1>
        {
          Object.keys(products).length > 0 ?
          products.map( (prod) => {
            return(
              <Item 
                key={prod.id}
                prod={prod} 
                updateList={updateList}
                setUpdateList={setUpdateList}
              />
            )
          })
          :
          <h4 style={{textAlign: 'center'}}>No existen productos.</h4>
        }
      </Row>
    </Container>
  );
};