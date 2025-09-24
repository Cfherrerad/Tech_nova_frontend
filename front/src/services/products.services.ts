/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "@/interfaces/service.interface";

export const getAllProducts = async () => {
    try {
        const res = await fetch(`http://localhost:3000/products`,{
            method: "GET",
        });
        const products : Product[] = await res.json();
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getProductById = async (idByParam: string) => {
  try {
    const allProducts = await getAllProducts();
    const product = allProducts.find(
        (product) => product.id.toString() === idByParam);
        if ( !product ) {
            throw new Error("Product not found");
        }
        return product;
  } catch (error: any) {
    throw new Error (error);
  }
}