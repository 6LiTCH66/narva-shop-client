import axios from "axios";
import { BASE_URL } from '@env';

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    size: string[];
}

export const getAllProducts = async () => {
    try{
        const products = await axios.get(`${BASE_URL}/product/all`);
        return products.data

    }catch(err){
        throw err;
    }
}

export const getProductDetail = async (id: number) => {
    try{
        const productDetail = await axios.get<Product>(`${BASE_URL}/product/${id}`);
        return productDetail.data

    }catch(err){
        throw err;
    }
}
