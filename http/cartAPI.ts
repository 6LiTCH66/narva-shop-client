import axios from "axios";
import {Product} from "./productAPI";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    size: string;
}

export interface ICart {
    cartItems: CartItem[];
}

export const getUserCart = async () => {
    try {
        const cart = await axios.get<ICart>('http://10.0.2.2:3000/cart/me');
        return cart.data;
    }catch (err){
        throw err;
    }
}

export const deleteProductFromCart = async (id: number) => {
    try{
        const item = await axios.delete(`http://10.0.2.2:3000/cart/remove/${id}`);
        return item.data

    }catch(err){
        throw err;
    }
}

export interface NewCartItem {
    quantity: number;
    productId: number;
    size: string;
}

export const addProductToCart = async (newCartItem: NewCartItem) => {
    try {
        const newProduct = await axios.post(`http://10.0.2.2:3000/cart/add`, newCartItem, {withCredentials: true});
        return newProduct.data

    }catch (err){
        throw err;
    }
}
export type Operation = "increase" | "decrease"

export interface EditProduct{
    quantity: number;
    operation: Operation;
    id: number
}

export const editProductInCart = async (editProduct: EditProduct) => {
    try{
        const editedItem = await axios.patch(`http://10.0.2.2:3000/cart/edit/${editProduct.id}`, {quantity: editProduct.quantity, operation: editProduct.operation}, {withCredentials: true})
        return editedItem.data

    }catch (err){
        throw err
    }
}

export const useEditProductInCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProductInCart,
        onError: (error) => {
            console.log(error.message)
        },
        onSuccess: (data) => {
            console.log(data)
            // Invalidate the userCart query to refetch cart data after deletion
            queryClient.invalidateQueries({queryKey: ['userCart']});
        },
    });
}

export const useUserCart = () => {
    return useQuery({queryKey: ['userCart'], queryFn: getUserCart});
};


export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProductToCart,
        onSuccess: () => {
            // Invalidate the userCart query to refetch cart data after deletion
            queryClient.invalidateQueries({queryKey: ['userCart']});
        },
    });
}


export const useDeleteFromCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProductFromCart,
        onSuccess: () => {
            // Invalidate the userCart query to refetch cart data after deletion
            queryClient.invalidateQueries({queryKey: ['userCart']});
        },
    });
};