import { Form, Button, Container, Row, Stack } from 'react-bootstrap';
import { addProduct, updateProduct, getProduct } from '../../util/product.js';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FormProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    code: '', 
    thumbnail: '',   
    description: '',
    stock: ''
  });

  useEffect(() => {
    if( id !== '0'){
      getProduct(id)
        .then((response) => {
          setProduct(response);
        })
        .catch((err) => {
          console.log("Error: ", err)
        });
    }
  }, [id]);

  const handleFormSumbit = async(e) => {    
    e.preventDefault();
    switch (id) {
      case '0':
        await addProduct(product);
        break;
      default:
        await updateProduct(product);
        break;
    }
    navigate('/');
  }

  const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value});    
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Form onSubmit={handleFormSumbit} className='col-6 mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name='name' type="text" placeholder="Ingrese nombre..." value={product.name} required onChange={handleChange}/>
            <Form.Label>Precio</Form.Label>
            <Form.Control name='price' type="number" placeholder="Ingrese precio.." value={product.price} required onChange={handleChange}/>
            <Form.Label>Código</Form.Label>
            <Form.Control name='code' type="text" placeholder="Ingrese código..." value={product.code} required onChange={handleChange}/>
            <Form.Label>Imagen</Form.Label>
            <Form.Control name='thumbnail' type="text" placeholder="Ingrese dirección url de la imagen..." value={product.thumbnail} required onChange={handleChange}/>
            <Form.Label>Descripción</Form.Label>
            <Form.Control name='description' type="text" placeholder="Ingrese descripción..." value={product.description} required onChange={handleChange}/>
            <Form.Label>Stock</Form.Label>
            <Form.Control name='stock' type="number" placeholder="Ingrese stock..." value={product.stock} required onChange={handleChange}/>
          </Form.Group>
          <Stack direction="horizontal" gap={3}>
            <Button variant="primary" type="submit">
              {id==='0'?'Agregar':'Modificar'}
            </Button>
          </Stack>
        </Form>
      </Row>
    </Container>
  );
}