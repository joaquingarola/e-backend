import { SERVER } from "./server";

export const addProduct = async (prod, id) => {
  try {
    await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/carts/${id}/productos`, {
      method: "POST",
      headers: {
          'Content-type': "application/json"
      },
      body: JSON.stringify(prod)
    });
  } catch (error) {
    console.log(error)
  }
};

export const getProductsCart = async (id) => {
  let data;
  try {
    data = await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/carts/${id}/productos`);
    return data.json();
  } catch (error) {
    console.log(error)
  }
};

export const deleteProductCart = async (id, id_prod) => {
  try{
    await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/carts/${id}/productos/${id_prod}`, { method: "DELETE" });
  } catch (error) {
    console.log(error)
  }
}