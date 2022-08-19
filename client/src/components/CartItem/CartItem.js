import { Card, Button } from 'react-bootstrap';
import { deleteProductCart } from '../../util/cart.js';

export const CartItem = ({ id_cart, prod, setUpdateCart, updateCart }) => {

  const handleClick = async (id, prod_id) => {
    await deleteProductCart(id, prod_id);
    setUpdateCart(!updateCart);
  };

  return(
    <Card className = 'col-9 col-sm-2 m-3'>
      <Card.Img variant="top" src={prod.thumbnail} />
      <Card.Body className='d-flex flex-column justify-content-center'>
        <Card.Title className='text-center'>{prod.name}</Card.Title>
        <Card.Subtitle className='mb-2 text-center'>$ {prod.price}</Card.Subtitle>
        <Button variant="danger" onClick={() => handleClick(id_cart, prod.id)}>Eliminar</Button>
      </Card.Body>
    </Card> 
  );
};