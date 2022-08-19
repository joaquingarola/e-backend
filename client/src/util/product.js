import { SERVER } from "./server";

export const getProducts = async () => {
  let data;
  try {
    data = await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/products/`);
    return data.json();
  } catch (error) {
    console.log(error)
  }
};

export const getProduct = async (id) => {
  let data;
  try {
    data = await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/products/${id}`);
    return data.json();
  } catch (error) {
    console.log(error)
  }
};

export const addProduct = async (product) => {
  try {
    await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/products/`, {
      method: "POST",
      headers: {
          'Content-type': "application/json"
      },
      body: JSON.stringify(product)
    });
  } catch (error) {
    console.log(error)
  }
};

export const updateProduct = async (product) => {
  try {
    await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/products/${product.id}`, {
      method: "PUT",
      headers: {
          'Content-type': "application/json"
      },
      body: JSON.stringify(product)
    });
  } catch (error) {
    console.log(error)
  }
};

export const deleteProduct = async (id) => {
  try {
    await fetch(`${SERVER.api_base_url}${SERVER.api_port}/api/products/${id}`, { method: "DELETE" });
  } catch (error) {
    console.log(error)
  }
}
