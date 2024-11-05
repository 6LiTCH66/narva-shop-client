import axios from "axios";

export interface User{
    id: number | null;
    email: string;
    firstName: string;
    lastName: string;
    photo: string | null;
}

export const signin = async (email: string, password: string) => {
    try{
        const userCred = {
            email: email,
            password: password
        }
        // 192.168.88.218
        const user = await axios.post("http://10.0.2.2:3000/user/signin", userCred, {withCredentials: true})
        return user.data

    }catch(err){
        console.log(err)
        throw err;
    }
}

export const logout = async () => {
    try{
        const user = await axios.delete("http://10.0.2.2:3000/user/logout", {withCredentials: true})
        return user.data
    }catch(err){
        throw err;
    }
}

export const getMe = async () => {
    try {
        const user = await axios.get("http://10.0.2.2:3000/user/me");
        return user.data
    }catch (err){
        throw err;
    }
}
