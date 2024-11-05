import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import {getMe, logout, signin} from "../http/userAPI";
import axios from "axios";
import {getAllProducts} from "../http/productAPI";
import products from "./Products";
import Signup from "./Signup";
// import { loginWithEmail } from '../components/Firebase/firebase';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        getMe().then((user) => {
            console.log(user)
        }).catch(err => {
            console.log(err)
        })
    }, []);

    const handleLogin = () => {

        // logout().then((data) => {
        //     console.log(data)
        // })

        signin(email, password).then((user) => {
            console.log(user)
            navigation.navigate("Home")

        }).catch(err => {
            console.log(err.message)
        })

        // getAllProducts().then((products) => {
        //     console.log(products)
        // }).catch(err => {
        //     console.log(err)
        // })

        // loginWithEmail(email, password);
        // console.log(email)
        // console.log(password)
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize='none'
            />
            <TextInput
                style={styles.inputBox}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                autoCapitalize='none'
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Button
                title="Don't have an account yet? Sign up"
                onPress={() => navigation.navigate("Signup")}
            />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#832438',
        borderRadius: 5,
        width: 200,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});
