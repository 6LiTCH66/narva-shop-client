import axios from "axios";

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
        const products = await axios.get('http://10.0.2.2:3000/product/all');
        return products.data

    }catch(err){
        throw err;
    }
}

export const getProductDetail = async (id: number) => {
    try{
        const productDetail = await axios.get('http://10.0.2.2:3000/product/' + id);
        return productDetail.data

    }catch(err){
        throw err;
    }
}
