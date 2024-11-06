import axios, {AxiosError} from "axios";
import { BASE_URL } from '@env';

export interface User{
    id: number | null;
    email: string;
    firstName: string;
    lastName: string;
    photo: string | null;
}

export interface NewUser{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface AuthError{
    error: string;
    message: string;
    statusCode: number;
}

export const signin = async (email: string, password: string) => {
    try{
        const userCred = {
            email: email,
            password: password
        }
        // 192.168.88.218
        const user = await axios.post(`${BASE_URL}/user/signin`, userCred, {withCredentials: true})
        return user.data

    }catch(error){
        if (axios.isAxiosError(error)) {

            if (error.response && error.response.data) {
                throw error.response.data
            }
        }
        throw { message: 'An unexpected error occurred', error: String(error) };
    }
}

export const signup = async (newUser: NewUser) => {
    try{
        // 192.168.88.218
        const user = await axios.post(`${BASE_URL}/user/signup`, newUser, {withCredentials: true})
        return user.data

    }catch(error){

        if (axios.isAxiosError(error)) {

            if (error.response && error.response.data) {
                throw error.response.data
            }
        }
        throw { message: 'An unexpected error occurred', error: String(error) };
    }
}

export const logout = async () => {
    try{
        const user = await axios.delete(`${BASE_URL}/user/logout`, {withCredentials: true})
        return user.data
    }catch(err){
        throw err;
    }
}

export const getMe = async () => {
    try {
        const user = await axios.get(`${BASE_URL}/user/me`);
        return user.data
    }catch (err){
        throw err;
    }
}
