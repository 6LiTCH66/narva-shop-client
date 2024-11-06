import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import {AuthError, NewUser, signup} from "../http/userAPI";

const Signup: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [newUser, setNewUser] = useState<NewUser>({firstName: "", lastName: "", email: "", password: ""});

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleSignup = () => {
        console.log(newUser)
    };

    const handleInputChange = (field: keyof NewUser, value: string) => {
        setNewUser(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const validateFields = () => {
        let isValid = true;
        let newErrors = { ...errors };

        Object.keys(newUser).forEach(key => {
            const value = newUser[key as keyof NewUser];
            if (!value.trim()) {
                newErrors[key as keyof NewUser] = "This field cannot be empty";
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateFields()) {
            signup(newUser).then((_) => {
                navigation.navigate("Login")
            }).catch((err: AuthError) => {
                Alert.alert("Error while singing up!", err.message);
            })

        } else {
            Alert.alert("Validation Error", "Please fill in all fields");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputBox}
                value={newUser.firstName}
                onChangeText={(text) => handleInputChange('firstName', text)}
                placeholder='First name'
                onBlur={() => validateFields()}
            />
            <TextInput
                style={styles.inputBox}
                value={newUser.lastName}
                onChangeText={(text) => handleInputChange('lastName', text)}
                placeholder='Second name'
                onBlur={() => validateFields()}
            />
            <TextInput
                style={styles.inputBox}
                value={newUser.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder='Email'
                autoCapitalize='none'
                onBlur={() => validateFields()}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.inputBox}
                value={newUser.password}
                onChangeText={(text) => handleInputChange('password', text)}
                placeholder='Password'
                secureTextEntry={true}
                onBlur={() => validateFields()}

            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    inputBox: { width: '85%', margin: 10, padding: 15, fontSize: 16, borderBottomWidth: 1, textAlign: 'center' },
    button: { marginTop: 30, paddingVertical: 5, backgroundColor: '#832438', borderRadius: 5, width: 200, alignItems: 'center' },
    buttonText: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
});
